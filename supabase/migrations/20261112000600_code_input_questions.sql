-- Corrige questões repetidas e cria o formato "escrever o código".
--
-- 1. Remove cópias idênticas de questões na mesma etapa, como as criadas ao
--    executar uma migração de conteúdo mais de uma vez, e impede novas cópias.
-- 2. Reescreve as questões de completar e de ordenar que repetiam o que as
--    questões de múltipla escolha da mesma etapa já cobravam.
-- 3. code_input: code_snippet tem uma lacuna ___ que o usuário preenche
--    digitando. Cada opção é uma resposta aceita, todas com is_correct = true,
--    e a de menor position é a exibida como solução. O aplicativo ignora
--    espaços entre símbolos e trata aspas simples e duplas como iguais.
--
-- Pode ser executada de novo sem duplicar nada.

-- 1. Cópias idênticas: mantém a de menor posição. As opções caem em cascata.
delete from public.questions q
using public.questions original
where q.stage_id = original.stage_id
  and q.type = original.type
  and q.prompt = original.prompt
  and q.code_snippet is not distinct from original.code_snippet
  and q.position > original.position;

create unique index if not exists questions_stage_content_unique
  on public.questions (stage_id, prompt, coalesce(code_snippet, ''));

alter table public.questions drop constraint if exists questions_type_check;
alter table public.questions add constraint questions_type_check
  check (type in ('multiple_choice', 'code_completion', 'code_order', 'code_input'));

-- 2. Questões reescritas, localizadas pela etapa e pelo enunciado antigo.
create temporary table python_question_fix (doc jsonb);

insert into python_question_fix (doc) values ($seed$
[
 {
  "stage": 1,
  "old_prompt": "Monte o programa que exibe Início, 5 e Fim, nessa ordem.",
  "prompt": "Monte o programa que exibe Início, 6 e Fim, nessa ordem.",
  "code": null,
  "options": ["print(\"Início\")", "print(10 - 4)", "print(\"Fim\")"],
  "correct": null,
  "explanation": "O Python executa as linhas de cima para baixo, uma de cada vez."
 },
 {
  "stage": 2,
  "old_prompt": "Complete o código para guardar \"Ana\" na variável nome.",
  "prompt": "Complete o código para exibir o valor guardado na variável cidade.",
  "code": "cidade = \"Recife\"\nprint(___)",
  "options": ["cidade", "\"cidade\"", "Cidade", "city"],
  "correct": 0,
  "explanation": "Sem aspas, o Python usa o valor da variável. Com aspas, seria só o texto cidade. Letras maiúsculas e minúsculas fazem diferença."
 },
 {
  "stage": 3,
  "old_prompt": "Complete o código para descobrir o tipo de 3.14.",
  "prompt": "Complete o código para transformar o texto \"42\" em número e exibir 43.",
  "code": "numero = ___(\"42\")\nprint(numero + 1)",
  "options": ["int", "str", "type", "len"],
  "correct": 0,
  "explanation": "int() converte o texto \"42\" no número inteiro 42, que pode ser somado."
 },
 {
  "stage": 3,
  "old_prompt": "Monte o programa que exibe os tipos str, int e bool, nessa ordem.",
  "prompt": "Monte o programa que exibe <class 'float'>.",
  "code": null,
  "options": ["altura = \"1.75\"", "altura = float(altura)", "print(type(altura))"],
  "correct": null,
  "explanation": "altura começa como str. float() a converte em número decimal antes de o tipo ser exibido."
 },
 {
  "stage": 4,
  "old_prompt": "Complete o código para exibir PYTHON.",
  "prompt": "Complete o código para exibir python.",
  "code": "texto = \"PYTHON\"\nprint(texto.___())",
  "options": ["lower", "upper", "title", "strip"],
  "correct": 0,
  "explanation": "O método lower() devolve o texto em letras minúsculas."
 },
 {
  "stage": 4,
  "old_prompt": "Monte o programa que exibe Oi, Ana!",
  "prompt": "Monte o programa que exibe a letra A.",
  "code": null,
  "options": ["nome = \"ana\"", "inicial = nome[0].upper()", "print(inicial)"],
  "correct": null,
  "explanation": "nome[0] pega o primeiro caractere, \"a\", e upper() o deixa maiúsculo."
 },
 {
  "stage": 5,
  "old_prompt": "Complete o código para exibir o resto da divisão de 7 por 2.",
  "prompt": "Complete o código para exibir 12.",
  "code": "print(4 ___ 3)",
  "options": ["*", "+", "**", "//"],
  "correct": 0,
  "explanation": "O operador * faz a multiplicação: 4 vezes 3 é 12."
 },
 {
  "stage": 5,
  "old_prompt": "Monte o programa que exibe 3.5.",
  "prompt": "Monte o programa que exibe 16, a área de um quadrado de lado 4.",
  "code": null,
  "options": ["lado = 4", "area = lado ** 2", "print(area)"],
  "correct": null,
  "explanation": "lado ** 2 eleva o lado ao quadrado: 4 vezes 4 é 16."
 },
 {
  "stage": 6,
  "old_prompt": "Complete o código para verificar se a idade é igual a 18.",
  "prompt": "Complete o código para exibir True somente quando as duas condições forem verdadeiras.",
  "code": "idade = 20\ntem_ingresso = True\nprint(idade >= 18 ___ tem_ingresso)",
  "options": ["and", "or", "not", "="],
  "correct": 0,
  "explanation": "and só resulta em True quando os dois lados são verdadeiros. Com or, bastaria um deles."
 },
 {
  "stage": 6,
  "old_prompt": "Monte o programa que exibe True.",
  "prompt": "Monte o programa que verifica se a nota 7 está entre 6 e 10.",
  "code": null,
  "options": ["nota = 7", "aprovado = nota >= 6 and nota <= 10", "print(aprovado)"],
  "correct": null,
  "explanation": "As duas comparações são verdadeiras, então aprovado guarda True."
 }
]
$seed$::jsonb);

create temporary table fixed_questions as
select qu.id, qu.type, fix.value as item
from python_question_fix seed
cross join lateral jsonb_array_elements(seed.doc) as fix (value)
join public.tracks t on t.slug = 'python-fundamentos'
join public.stages st
  on st.track_id = t.id and st.position = (fix.value ->> 'stage')::int
join public.questions qu
  on qu.stage_id = st.id and qu.prompt = fix.value ->> 'old_prompt';

update public.questions qu
set prompt = fq.item ->> 'prompt',
    code_snippet = fq.item ->> 'code',
    explanation = fq.item ->> 'explanation'
from fixed_questions fq
where qu.id = fq.id;

delete from public.question_options o
using fixed_questions fq
where o.question_id = fq.id;

insert into public.question_options (question_id, position, text, is_correct)
select
  fq.id,
  opt.ord,
  opt.value,
  case
    when fq.type = 'code_order' then true
    else opt.ord - 1 = (fq.item ->> 'correct')::int
  end
from fixed_questions fq
cross join lateral jsonb_array_elements_text(fq.item -> 'options')
  with ordinality as opt (value, ord);

drop table fixed_questions;
drop table python_question_fix;

-- 3. Uma questão de escrever o código por etapa, no fim de cada uma.
create temporary table python_input_seed (doc jsonb);

insert into python_input_seed (doc) values ($seed$
[
 {
  "prompt": "Escreva o que falta para exibir Codequest na tela.",
  "code": "print(___)",
  "answers": ["\"Codequest\""],
  "explanation": "Textos precisam ficar entre aspas, simples ou duplas. Sem elas, o Python procuraria uma variável chamada Codequest."
 },
 {
  "prompt": "O jogador perdeu uma vida. Escreva o que falta para que vidas passe a valer 2, usando a própria variável.",
  "code": "vidas = 3\nvidas = ___\nprint(vidas)",
  "answers": ["vidas - 1"],
  "explanation": "vidas - 1 usa o valor atual, 3, e guarda o resultado, 2, na mesma variável."
 },
 {
  "prompt": "Escreva o valor booleano que indica que o usuário não está logado.",
  "code": "logado = ___\nprint(type(logado))",
  "answers": ["False"],
  "explanation": "Os booleanos são True e False, sempre com a inicial maiúscula."
 },
 {
  "prompt": "Escreva o índice que faz o código exibir a letra y.",
  "code": "texto = \"Python\"\nprint(texto[___])",
  "answers": ["1", "-5"],
  "explanation": "Os índices começam em 0: P é o 0 e y é o 1."
 },
 {
  "prompt": "Escreva o operador que faz o código exibir 3, a divisão inteira de 10 por 3.",
  "code": "print(10 ___ 3)",
  "answers": ["//"],
  "explanation": "// divide e descarta a parte decimal: 10 / 3 é 3.33..., e 10 // 3 é 3."
 },
 {
  "prompt": "Escreva o operador que exibe True quando os dois números são diferentes.",
  "code": "print(4 ___ 9)",
  "answers": ["!="],
  "explanation": "!= compara dois valores e resulta em True quando eles são diferentes."
 }
]
$seed$::jsonb);

with new_questions as (
  insert into public.questions (stage_id, position, type, prompt, code_snippet, explanation)
  select
    st.id,
    (select coalesce(max(q.position), 0) from public.questions q where q.stage_id = st.id) + 1,
    'code_input',
    item.value ->> 'prompt',
    item.value ->> 'code',
    item.value ->> 'explanation'
  from public.tracks t
  join public.stages st on st.track_id = t.id
  cross join python_input_seed seed
  cross join lateral (select seed.doc -> (st.position - 1)::int as value) item
  where t.slug = 'python-fundamentos'
    and item.value is not null
  on conflict do nothing
  returning id, stage_id
)
insert into public.question_options (question_id, position, text, is_correct)
select nq.id, answer.ord, answer.value, true
from new_questions nq
join public.stages st on st.id = nq.stage_id
cross join python_input_seed seed
cross join lateral jsonb_array_elements_text(seed.doc -> (st.position - 1)::int -> 'answers')
  with ordinality as answer (value, ord);

drop table python_input_seed;
