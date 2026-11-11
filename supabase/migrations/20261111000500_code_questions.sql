-- Novos formatos de questão: completar o código e ordenar os blocos.
--
-- code_completion: code_snippet tem uma lacuna ___ e só uma opção é correta.
-- code_order: todas as opções fazem parte da resposta, e a coluna position
-- guarda a ordem correta. O aplicativo embaralha os blocos ao exibir.

alter table public.questions drop constraint questions_type_check;
alter table public.questions add constraint questions_type_check
  check (type in ('multiple_choice', 'code_completion', 'code_order'));

create temporary table python_question_seed (doc jsonb);

insert into python_question_seed (doc) values ($seed$
[
 [
  {
   "type": "code_completion",
   "prompt": "Complete o código para exibir Olá na tela.",
   "code": "___(\"Olá\")",
   "options": [
    "print",
    "input",
    "show",
    "echo"
   ],
   "correct": 0,
   "explanation": "print() é a função que mostra valores na tela."
  },
  {
   "type": "code_order",
   "prompt": "Monte o programa que exibe Início, 5 e Fim, nessa ordem.",
   "code": null,
   "options": [
    "print(\"Início\")",
    "print(2 + 3)",
    "print(\"Fim\")"
   ],
   "correct": null,
   "explanation": "O Python executa as linhas de cima para baixo, uma de cada vez."
  }
 ],
 [
  {
   "type": "code_completion",
   "prompt": "Complete o código para guardar \"Ana\" na variável nome.",
   "code": "nome ___ \"Ana\"\nprint(nome)",
   "options": [
    "=",
    "==",
    ":",
    "->"
   ],
   "correct": 0,
   "explanation": "Um único = guarda o valor da direita na variável da esquerda."
  },
  {
   "type": "code_order",
   "prompt": "Monte o programa que exibe 15.",
   "code": null,
   "options": [
    "preco = 10",
    "preco = preco + 5",
    "print(preco)"
   ],
   "correct": null,
   "explanation": "A variável precisa ser criada antes de ser usada ou alterada."
  }
 ],
 [
  {
   "type": "code_completion",
   "prompt": "Complete o código para descobrir o tipo de 3.14.",
   "code": "print(___(3.14))",
   "options": [
    "type",
    "len",
    "str",
    "int"
   ],
   "correct": 0,
   "explanation": "type() mostra o tipo do valor. 3.14 é um float."
  },
  {
   "type": "code_order",
   "prompt": "Monte o programa que exibe os tipos str, int e bool, nessa ordem.",
   "code": null,
   "options": [
    "print(type(\"oi\"))",
    "print(type(10))",
    "print(type(True))"
   ],
   "correct": null,
   "explanation": "\"oi\" é str, 10 é int e True é bool."
  }
 ],
 [
  {
   "type": "code_completion",
   "prompt": "Complete o código para exibir PYTHON.",
   "code": "texto = \"python\"\nprint(texto.___())",
   "options": [
    "upper",
    "lower",
    "title",
    "strip"
   ],
   "correct": 0,
   "explanation": "O método upper() devolve o texto em letras maiúsculas."
  },
  {
   "type": "code_order",
   "prompt": "Monte o programa que exibe Oi, Ana!",
   "code": null,
   "options": [
    "nome = \"Ana\"",
    "frase = \"Oi, \" + nome + \"!\"",
    "print(frase)"
   ],
   "correct": null,
   "explanation": "Primeiro guardamos o nome, depois juntamos os textos com + e por fim exibimos."
  }
 ],
 [
  {
   "type": "code_completion",
   "prompt": "Complete o código para exibir o resto da divisão de 7 por 2.",
   "code": "print(7 ___ 2)",
   "options": [
    "%",
    "//",
    "/",
    "**"
   ],
   "correct": 0,
   "explanation": "O operador % devolve o resto da divisão. 7 dividido por 2 dá 3 e sobra 1."
  },
  {
   "type": "code_order",
   "prompt": "Monte o programa que exibe 3.5.",
   "code": null,
   "options": [
    "total = 7",
    "metade = total / 2",
    "print(metade)"
   ],
   "correct": null,
   "explanation": "O operador / faz a divisão exata, então 7 / 2 resulta em 3.5."
  }
 ],
 [
  {
   "type": "code_completion",
   "prompt": "Complete o código para verificar se a idade é igual a 18.",
   "code": "idade = 18\nprint(idade ___ 18)",
   "options": [
    "==",
    "=",
    "!=",
    "<"
   ],
   "correct": 0,
   "explanation": "== compara dois valores e resulta em True quando são iguais."
  },
  {
   "type": "code_order",
   "prompt": "Monte o programa que exibe True.",
   "code": null,
   "options": [
    "x = 5",
    "maior = x > 3",
    "print(maior)"
   ],
   "correct": null,
   "explanation": "A comparação x > 3 resulta em True e fica guardada em maior."
  }
 ]
]
$seed$::jsonb);

-- As novas questões entram depois das que já existem em cada etapa.
with new_questions as (
  insert into public.questions (stage_id, position, type, prompt, code_snippet, explanation)
  select
    st.id,
    (select coalesce(max(q.position), 0) from public.questions q where q.stage_id = st.id) + item.ord,
    item.value ->> 'type',
    item.value ->> 'prompt',
    item.value ->> 'code',
    item.value ->> 'explanation'
  from public.tracks t
  join public.stages st on st.track_id = t.id
  cross join python_question_seed seed
  cross join lateral jsonb_array_elements(seed.doc -> (st.position - 1)::int)
    with ordinality as item (value, ord)
  where t.slug = 'python-fundamentos'
  returning id, stage_id, prompt
)
insert into public.question_options (question_id, position, text, is_correct)
select
  nq.id,
  opt.ord,
  opt.value,
  case
    when item.value ->> 'type' = 'code_order' then true
    else opt.ord - 1 = (item.value ->> 'correct')::int
  end
from new_questions nq
join public.stages st on st.id = nq.stage_id
cross join python_question_seed seed
cross join lateral jsonb_array_elements(seed.doc -> (st.position - 1)::int) as item (value)
cross join lateral jsonb_array_elements_text(item.value -> 'options')
  with ordinality as opt (value, ord)
where item.value ->> 'prompt' = nq.prompt;

drop table python_question_seed;
