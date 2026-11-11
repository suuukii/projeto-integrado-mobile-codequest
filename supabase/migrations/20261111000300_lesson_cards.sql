-- Explicações exibidas antes das questões de cada etapa.

create table public.lesson_cards (
  id uuid primary key default gen_random_uuid(),
  stage_id uuid not null references public.stages (id) on delete cascade,
  position integer not null,
  visual text not null check (visual in ('mascot', 'code', 'points', 'variable')),
  title text not null,
  body text not null,
  code_snippet text,
  code_output text,
  points text[] not null default '{}',
  created_at timestamptz not null default now(),
  unique (stage_id, position)
);

alter table public.lesson_cards enable row level security;

create policy "Autenticados leem explicações" on public.lesson_cards
  for select to authenticated using (true);

grant select on public.lesson_cards to authenticated;

-- Conteúdo da trilha de Python: um item por etapa, na ordem das posições.
create temporary table python_lesson_seed (doc jsonb);

insert into python_lesson_seed (doc) values ($seed$
[
 [
  {
   "visual": "mascot",
   "title": "Bem-vindo ao Python!",
   "body": "Python é uma linguagem de programação criada pelo holandês Guido van Rossum e lançada em 1991. O nome vem do grupo de humor britânico Monty Python, e não da cobra.",
   "code": null,
   "output": null,
   "points": []
  },
  {
   "visual": "points",
   "title": "Onde o Python está",
   "body": "É uma das linguagens mais usadas do mundo, presente em empresas como Google, Netflix e Instagram.",
   "code": null,
   "output": null,
   "points": [
    "Inteligência artificial e ciência de dados",
    "Sites e aplicativos web",
    "Automação de tarefas repetitivas",
    "Jogos, robótica e muito mais"
   ]
  },
  {
   "visual": "points",
   "title": "Por que começar por Python?",
   "body": "Python foi pensado para ser fácil de ler e de escrever. Por isso, é uma ótima primeira linguagem.",
   "code": null,
   "output": null,
   "points": [
    "Código limpo, parecido com inglês",
    "Poucos símbolos para decorar",
    "Uma comunidade enorme para ajudar"
   ]
  },
  {
   "visual": "code",
   "title": "Seu primeiro programa",
   "body": "A função print() mostra na tela o que estiver entre os parênteses. Textos ficam entre aspas.",
   "code": "print(\"Olá, mundo!\")",
   "output": "Olá, mundo!",
   "points": []
  },
  {
   "visual": "code",
   "title": "Contas e comentários",
   "body": "Sem aspas, o Python calcula a expressão antes de mostrar. Tudo que vem depois de # é um comentário, que o Python ignora e serve para explicar o código.",
   "code": "# Isto é um comentário\nprint(2 + 3)",
   "output": "5",
   "points": []
  },
  {
   "visual": "code",
   "title": "A indentação importa",
   "body": "O Python usa os espaços no começo da linha para saber quais linhas formam um bloco. Não se preocupe com o if agora, você vai aprendê-lo mais adiante.",
   "code": "if True:\n    print(\"Dentro do bloco\")\nprint(\"Fora do bloco\")",
   "output": "Dentro do bloco\nFora do bloco",
   "points": []
  }
 ],
 [
  {
   "visual": "variable",
   "title": "O que é uma variável?",
   "body": "Uma variável é como uma caixa com etiqueta. O nome é a etiqueta, e o valor fica guardado dentro dela.",
   "code": "idade = 20",
   "output": null,
   "points": []
  },
  {
   "visual": "code",
   "title": "Criando variáveis",
   "body": "Escreva o nome, o sinal = e o valor. Aqui, o = significa \"guarde este valor\", e não \"é igual a\".",
   "code": "nome = \"Ana\"\nidade = 20\nprint(nome)\nprint(idade)",
   "output": "Ana\n20",
   "points": []
  },
  {
   "visual": "points",
   "title": "Regras para os nomes",
   "body": "Prefira nomes que expliquem o conteúdo, como total_compras.",
   "code": null,
   "output": null,
   "points": [
    "Use letras, números e _",
    "Não comece com um número",
    "Sem espaços nem hífen",
    "Maiúsculas e minúsculas são diferentes"
   ]
  },
  {
   "visual": "code",
   "title": "Trocando o valor",
   "body": "Uma nova atribuição substitui o valor que estava guardado.",
   "code": "pontos = 5\npontos = 8\nprint(pontos)",
   "output": "8",
   "points": []
  }
 ],
 [
  {
   "visual": "points",
   "title": "Cada valor tem um tipo",
   "body": "O tipo diz ao Python que dado é aquele e o que dá para fazer com ele.",
   "code": null,
   "output": null,
   "points": [
    "int: números inteiros, como 10",
    "float: números com casas decimais, como 3.14",
    "str: textos entre aspas, como \"oi\"",
    "bool: True ou False"
   ]
  },
  {
   "visual": "code",
   "title": "Descobrindo o tipo",
   "body": "A função type() mostra o tipo de qualquer valor.",
   "code": "print(type(10))\nprint(type(3.14))\nprint(type(\"oi\"))\nprint(type(True))",
   "output": "<class 'int'>\n<class 'float'>\n<class 'str'>\n<class 'bool'>",
   "points": []
  },
  {
   "visual": "code",
   "title": "As aspas mudam tudo",
   "body": "Entre aspas, até um número vira texto. Por isso \"42\" é str e 42 é int.",
   "code": "print(type(\"42\"))\nprint(type(42))",
   "output": "<class 'str'>\n<class 'int'>",
   "points": []
  }
 ],
 [
  {
   "visual": "points",
   "title": "Strings são textos",
   "body": "Uma string é uma sequência de caracteres entre aspas simples ou duplas.",
   "code": null,
   "output": null,
   "points": [
    "\"Olá\"",
    "'Python'",
    "\"123\""
   ]
  },
  {
   "visual": "code",
   "title": "Juntando textos",
   "body": "O operador + junta duas strings.",
   "code": "nome = \"Ana\"\nprint(\"Oi, \" + nome)",
   "output": "Oi, Ana",
   "points": []
  },
  {
   "visual": "code",
   "title": "Tamanho e posições",
   "body": "len() conta os caracteres. Cada caractere tem uma posição, e a contagem começa em 0.",
   "code": "texto = \"Python\"\nprint(len(texto))\nprint(texto[0])",
   "output": "6\nP",
   "points": []
  },
  {
   "visual": "code",
   "title": "Métodos de texto",
   "body": "Métodos são ações que a string sabe fazer. Eles são chamados com um ponto depois do texto.",
   "code": "print(\"abc\".upper())\nprint(\"ABC\".lower())",
   "output": "ABC\nabc",
   "points": []
  }
 ],
 [
  {
   "visual": "code",
   "title": "Python é uma calculadora",
   "body": "Os operadores básicos funcionam como na matemática.",
   "code": "print(2 + 3)\nprint(10 - 4)\nprint(3 * 5)",
   "output": "5\n6\n15",
   "points": []
  },
  {
   "visual": "code",
   "title": "Três jeitos de dividir",
   "body": "/ dá o resultado exato, // descarta a parte decimal e % devolve o resto.",
   "code": "print(7 / 2)\nprint(7 // 2)\nprint(7 % 2)",
   "output": "3.5\n3\n1",
   "points": []
  },
  {
   "visual": "code",
   "title": "Potência",
   "body": "O operador ** eleva um número a outro.",
   "code": "print(2 ** 3)\nprint(5 ** 2)",
   "output": "8\n25",
   "points": []
  }
 ],
 [
  {
   "visual": "code",
   "title": "Comparando valores",
   "body": "Toda comparação resulta em True ou False.",
   "code": "print(5 > 3)\nprint(2 == 3)\nprint(2 != 3)",
   "output": "True\nFalse\nTrue",
   "points": []
  },
  {
   "visual": "points",
   "title": "= ou ==?",
   "body": "Confundir os dois é um dos erros mais comuns de quem está começando.",
   "code": null,
   "output": null,
   "points": [
    "= guarda um valor: x = 5",
    "== compara dois valores: x == 5"
   ]
  },
  {
   "visual": "code",
   "title": "and, or e not",
   "body": "and exige que os dois lados sejam verdadeiros, or exige pelo menos um, e not inverte o valor.",
   "code": "print(True and False)\nprint(True or False)\nprint(not False)",
   "output": "False\nTrue\nTrue",
   "points": []
  }
 ]
]
$seed$::jsonb);

insert into public.lesson_cards
  (stage_id, position, visual, title, body, code_snippet, code_output, points)
select
  st.id,
  c.ord,
  c.item ->> 'visual',
  c.item ->> 'title',
  c.item ->> 'body',
  c.item ->> 'code',
  c.item ->> 'output',
  array(select jsonb_array_elements_text(c.item -> 'points'))
from public.tracks t
join public.stages st on st.track_id = t.id
cross join python_lesson_seed seed
cross join lateral jsonb_array_elements(seed.doc -> (st.position - 1)::int)
  with ordinality as c (item, ord)
where t.slug = 'python-fundamentos';

drop table python_lesson_seed;
