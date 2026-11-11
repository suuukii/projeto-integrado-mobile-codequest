-- Primeira trilha do Codequest: fundamentos de Python.
-- Para adicionar conteúdo, crie uma nova migração no mesmo formato.

create temporary table python_track_seed (doc jsonb);

insert into python_track_seed (doc) values ($seed$
[
 {
  "title": "Introdução ao Python",
  "description": "Seus primeiros passos com a linguagem.",
  "questions": [
   {
    "prompt": "O que o comando abaixo faz?",
    "code": "print(\"Olá, mundo!\")",
    "options": [
     "Mostra o texto na tela",
     "Salva o texto em um arquivo",
     "Cria uma variável chamada mundo",
     "Apaga o texto da tela"
    ],
    "correct": 0,
    "explanation": "A função print() exibe valores na tela."
   },
   {
    "prompt": "Qual é a forma correta de escrever um comentário em Python?",
    "code": null,
    "options": [
     "# isto é um comentário",
     "// isto é um comentário",
     "<!-- isto é um comentário -->",
     "** isto é um comentário"
    ],
    "correct": 0,
    "explanation": "Em Python, um comentário de linha começa com #."
   },
   {
    "prompt": "O que o Python exibe ao executar este código?",
    "code": "print(2 + 3)",
    "options": [
     "2 + 3",
     "5",
     "23",
     "Um erro"
    ],
    "correct": 1,
    "explanation": "Sem aspas, o Python calcula a expressão e exibe o resultado."
   },
   {
    "prompt": "Por que a indentação é importante em Python?",
    "code": null,
    "options": [
     "Ela só deixa o código bonito",
     "Ela define os blocos de código",
     "Ela acelera o programa",
     "Ela só é usada em comentários"
    ],
    "correct": 1,
    "explanation": "O Python usa a indentação para saber quais linhas pertencem a cada bloco."
   }
  ]
 },
 {
  "title": "Variáveis",
  "description": "Guarde valores e use-os depois.",
  "questions": [
   {
    "prompt": "Como criar uma variável idade com o valor 20?",
    "code": null,
    "options": [
     "idade = 20",
     "int idade = 20;",
     "var idade := 20",
     "20 = idade"
    ],
    "correct": 0,
    "explanation": "Em Python, basta escrever o nome, o sinal = e o valor."
   },
   {
    "prompt": "Qual destes nomes de variável é válido?",
    "code": null,
    "options": [
     "2nome",
     "meu-nome",
     "meu_nome",
     "class"
    ],
    "correct": 2,
    "explanation": "Nomes não começam com número, não têm hífen e não podem ser palavras reservadas."
   },
   {
    "prompt": "O que este código exibe?",
    "code": "x = 5\nx = 8\nprint(x)",
    "options": [
     "5",
     "8",
     "13",
     "x"
    ],
    "correct": 1,
    "explanation": "A segunda atribuição substitui o valor anterior."
   },
   {
    "prompt": "O que este código exibe?",
    "code": "a = 3\nb = a + 1\nprint(b)",
    "options": [
     "3",
     "a + 1",
     "4",
     "b"
    ],
    "correct": 2,
    "explanation": "b recebe o valor de a somado a 1."
   }
  ]
 },
 {
  "title": "Tipos de dados",
  "description": "Conheça os tipos básicos.",
  "questions": [
   {
    "prompt": "Qual é o tipo do valor 3.14?",
    "code": null,
    "options": [
     "int",
     "float",
     "str",
     "bool"
    ],
    "correct": 1,
    "explanation": "Números com parte decimal são do tipo float."
   },
   {
    "prompt": "Qual é o tipo do valor \"42\"?",
    "code": null,
    "options": [
     "int",
     "float",
     "str",
     "bool"
    ],
    "correct": 2,
    "explanation": "Tudo que está entre aspas é uma string, mesmo que pareça um número."
   },
   {
    "prompt": "Quais são os dois valores do tipo bool?",
    "code": null,
    "options": [
     "sim e não",
     "0 e 1",
     "True e False",
     "true e false"
    ],
    "correct": 2,
    "explanation": "Os booleanos em Python são escritos com inicial maiúscula."
   },
   {
    "prompt": "O que este código exibe?",
    "code": "print(type(10))",
    "options": [
     "<class 'int'>",
     "<class 'float'>",
     "10",
     "int(10)"
    ],
    "correct": 0,
    "explanation": "A função type() informa o tipo do valor."
   }
  ]
 },
 {
  "title": "Strings",
  "description": "Trabalhe com textos.",
  "questions": [
   {
    "prompt": "O que este código exibe?",
    "code": "nome = \"Ana\"\nprint(\"Oi, \" + nome)",
    "options": [
     "Oi, nome",
     "Oi, Ana",
     "\"Oi, \" + nome",
     "Um erro"
    ],
    "correct": 1,
    "explanation": "O operador + junta duas strings."
   },
   {
    "prompt": "O que este código exibe?",
    "code": "print(len(\"Python\"))",
    "options": [
     "5",
     "6",
     "7",
     "Python"
    ],
    "correct": 1,
    "explanation": "len() retorna a quantidade de caracteres."
   },
   {
    "prompt": "O que este código exibe?",
    "code": "texto = \"Python\"\nprint(texto[0])",
    "options": [
     "P",
     "y",
     "n",
     "Um erro"
    ],
    "correct": 0,
    "explanation": "Os índices começam em 0, então texto[0] é o primeiro caractere."
   },
   {
    "prompt": "O que este código exibe?",
    "code": "print(\"abc\".upper())",
    "options": [
     "abc",
     "Abc",
     "ABC",
     "Um erro"
    ],
    "correct": 2,
    "explanation": "O método upper() converte o texto para maiúsculas."
   }
  ]
 },
 {
  "title": "Números",
  "description": "Faça cálculos com o Python.",
  "questions": [
   {
    "prompt": "O que este código exibe?",
    "code": "print(7 / 2)",
    "options": [
     "3",
     "3.5",
     "4",
     "1"
    ],
    "correct": 1,
    "explanation": "O operador / sempre faz a divisão real."
   },
   {
    "prompt": "O que este código exibe?",
    "code": "print(7 // 2)",
    "options": [
     "3",
     "3.5",
     "4",
     "1"
    ],
    "correct": 0,
    "explanation": "O operador // faz a divisão inteira e descarta a parte decimal."
   },
   {
    "prompt": "O que este código exibe?",
    "code": "print(7 % 2)",
    "options": [
     "3",
     "3.5",
     "2",
     "1"
    ],
    "correct": 3,
    "explanation": "O operador % retorna o resto da divisão."
   },
   {
    "prompt": "O que este código exibe?",
    "code": "print(2 ** 3)",
    "options": [
     "6",
     "8",
     "9",
     "23"
    ],
    "correct": 1,
    "explanation": "O operador ** calcula a potência: 2 elevado a 3."
   }
  ]
 },
 {
  "title": "Operadores",
  "description": "Compare valores e combine condições.",
  "questions": [
   {
    "prompt": "O que este código exibe?",
    "code": "print(5 > 3)",
    "options": [
     "True",
     "False",
     "5 > 3",
     "Um erro"
    ],
    "correct": 0,
    "explanation": "A comparação é verdadeira, então o resultado é True."
   },
   {
    "prompt": "Qual operador verifica se dois valores são iguais?",
    "code": null,
    "options": [
     "=",
     "==",
     "===",
     "!="
    ],
    "correct": 1,
    "explanation": "= atribui um valor, enquanto == compara dois valores."
   },
   {
    "prompt": "O que este código exibe?",
    "code": "print(True and False)",
    "options": [
     "True",
     "False",
     "None",
     "Um erro"
    ],
    "correct": 1,
    "explanation": "and só resulta em True quando os dois lados são verdadeiros."
   },
   {
    "prompt": "O que este código exibe?",
    "code": "print(not False)",
    "options": [
     "True",
     "False",
     "None",
     "Um erro"
    ],
    "correct": 0,
    "explanation": "not inverte o valor booleano."
   }
  ]
 }
]
$seed$::jsonb);

with new_language as (
  insert into public.languages (slug, name)
  values ('python', 'Python')
  returning id
)
insert into public.tracks (language_id, slug, title, description, position)
select id, 'python-fundamentos', 'Fundamentos de Python',
  'Aprenda Python do zero, um passo de cada vez.', 1
from new_language;

insert into public.stages (track_id, position, title, description)
select t.id, s.ord, s.item ->> 'title', s.item ->> 'description'
from public.tracks t
cross join python_track_seed seed
cross join lateral jsonb_array_elements(seed.doc) with ordinality as s (item, ord)
where t.slug = 'python-fundamentos';

insert into public.questions (stage_id, position, prompt, code_snippet, explanation)
select st.id, q.ord, q.item ->> 'prompt', q.item ->> 'code', q.item ->> 'explanation'
from public.tracks t
join public.stages st on st.track_id = t.id
cross join python_track_seed seed
cross join lateral jsonb_array_elements(seed.doc -> (st.position - 1)::int -> 'questions')
  with ordinality as q (item, ord)
where t.slug = 'python-fundamentos';

insert into public.question_options (question_id, position, text, is_correct)
select qu.id, o.ord, o.value #>> '{}', (o.ord - 1) = (q.item ->> 'correct')::int
from public.tracks t
join public.stages st on st.track_id = t.id
join public.questions qu on qu.stage_id = st.id
cross join python_track_seed seed
cross join lateral (
  select seed.doc -> (st.position - 1)::int -> 'questions' -> (qu.position - 1)::int as item
) q
cross join lateral jsonb_array_elements(q.item -> 'options') with ordinality as o (value, ord)
where t.slug = 'python-fundamentos';

drop table python_track_seed;
