-- Oito novas etapas na trilha de Python, depois das que já existem:
-- condicionais, várias condições, listas, for, while, funções, retorno de
-- funções e dicionários. Cada etapa tem 3 cartões de explicação e 7 questões
-- nos quatro formatos.
--
-- Pode ser executada de novo sem duplicar nada: etapas já existentes na trilha,
-- com o mesmo título, são mantidas como estão.

create temporary table python_stage_seed (doc jsonb);

insert into python_stage_seed (doc) values ($seed$
[
 {
  "title": "Condicionais",
  "description": "Tome decisões com if e else.",
  "cards": [
   {
    "visual": "code",
    "title": "Decidindo com if",
    "body": "O if executa um bloco só quando a condição é verdadeira. Repare nos dois-pontos e no recuo da linha de dentro.",
    "code": "idade = 20\nif idade >= 18:\n    print(\"Pode votar\")",
    "output": "Pode votar",
    "points": []
   },
   {
    "visual": "code",
    "title": "E se não for? Use else",
    "body": "O else executa quando a condição do if é falsa. Sempre um dos dois caminhos acontece.",
    "code": "nota = 4\nif nota >= 6:\n    print(\"Aprovado\")\nelse:\n    print(\"Recuperação\")",
    "output": "Recuperação",
    "points": []
   },
   {
    "visual": "points",
    "title": "Regras do if",
    "body": "Quatro detalhes que evitam a maioria dos erros.",
    "code": null,
    "output": null,
    "points": [
     "A linha do if termina com dois-pontos",
     "O bloco de dentro fica recuado com 4 espaços",
     "O else não tem condição",
     "Linhas sem recuo depois do bloco sempre executam"
    ]
   }
  ],
  "questions": [
   {
    "type": "multiple_choice",
    "prompt": "O que este código exibe?",
    "code": "x = 10\nif x > 5:\n    print(\"grande\")\nelse:\n    print(\"pequeno\")",
    "options": [
     "grande",
     "pequeno",
     "Nada",
     "Um erro"
    ],
    "correct": 0,
    "explanation": "10 é maior que 5, então só o bloco do if executa."
   },
   {
    "type": "multiple_choice",
    "prompt": "Qual linha de if está escrita corretamente?",
    "code": null,
    "options": [
     "if x > 5:",
     "if x > 5",
     "if (x > 5) then",
     "if x > 5 {"
    ],
    "correct": 0,
    "explanation": "Em Python, a condição do if termina com dois-pontos, sem then nem chaves."
   },
   {
    "type": "multiple_choice",
    "prompt": "O que este código exibe?",
    "code": "x = 3\nif x > 5:\n    print(\"A\")\nprint(\"B\")",
    "options": [
     "A",
     "B",
     "Nada",
     "Um erro"
    ],
    "correct": 1,
    "explanation": "A condição é falsa, então print(\"A\") é pulado. print(\"B\") está fora do bloco e sempre executa."
   },
   {
    "type": "multiple_choice",
    "prompt": "Quando o bloco do else é executado?",
    "code": null,
    "options": [
     "Quando a condição do if é falsa",
     "Sempre depois do if",
     "Quando a condição do if é verdadeira",
     "Nunca, ele é só decorativo"
    ],
    "correct": 0,
    "explanation": "O else é o caminho alternativo: só executa se a condição do if for falsa."
   },
   {
    "type": "code_completion",
    "prompt": "Complete o código para exibir Positivo.",
    "code": "n = 7\n___ n > 0:\n    print(\"Positivo\")",
    "options": [
     "if",
     "else",
     "elif",
     "def"
    ],
    "correct": 0,
    "explanation": "if testa a condição n > 0, que é verdadeira, e executa o bloco."
   },
   {
    "type": "code_order",
    "prompt": "Monte o programa que exibe Frio.",
    "code": null,
    "options": [
     "temperatura = 12",
     "if temperatura > 25:",
     "    print(\"Calor\")",
     "else:",
     "    print(\"Frio\")"
    ],
    "correct": null,
    "explanation": "12 não é maior que 25, então o programa segue pelo else."
   },
   {
    "type": "code_input",
    "prompt": "Escreva a palavra que faz o código exibir Ímpar quando o número não for par.",
    "code": "n = 7\nif n % 2 == 0:\n    print(\"Par\")\n___:\n    print(\"Ímpar\")",
    "options": [
     "else"
    ],
    "correct": null,
    "explanation": "else executa quando a condição do if é falsa. 7 % 2 é 1, então o número é ímpar."
   }
  ]
 },
 {
  "title": "Várias condições",
  "description": "Use elif para escolher entre vários caminhos.",
  "cards": [
   {
    "visual": "code",
    "title": "elif: senão, se",
    "body": "Com elif você testa outra condição quando a anterior foi falsa. O Python para no primeiro caminho verdadeiro.",
    "code": "nota = 7\nif nota >= 9:\n    print(\"Ótimo\")\nelif nota >= 6:\n    print(\"Bom\")\nelse:\n    print(\"Estude mais\")",
    "output": "Bom",
    "points": []
   },
   {
    "visual": "code",
    "title": "Condições combinadas",
    "body": "and, or e not também funcionam dentro do if, juntando várias comparações.",
    "code": "idade = 15\ntem_autorizacao = True\nif idade >= 18 or tem_autorizacao:\n    print(\"Pode entrar\")",
    "output": "Pode entrar",
    "points": []
   },
   {
    "visual": "points",
    "title": "A ordem importa",
    "body": "O Python lê as condições de cima para baixo.",
    "code": null,
    "output": null,
    "points": [
     "Só o primeiro bloco verdadeiro executa",
     "Os seguintes são ignorados, mesmo se forem verdadeiros",
     "Coloque as condições mais específicas primeiro",
     "Você pode usar quantos elif quiser"
    ]
   }
  ],
  "questions": [
   {
    "type": "multiple_choice",
    "prompt": "O que este código exibe?",
    "code": "x = 15\nif x > 20:\n    print(\"A\")\nelif x > 10:\n    print(\"B\")\nelse:\n    print(\"C\")",
    "options": [
     "A",
     "B",
     "C",
     "B e C"
    ],
    "correct": 1,
    "explanation": "15 não é maior que 20, mas é maior que 10. O elif executa e o else é ignorado."
   },
   {
    "type": "multiple_choice",
    "prompt": "O que este código exibe?",
    "code": "x = 50\nif x > 10:\n    print(\"maior que 10\")\nelif x > 40:\n    print(\"maior que 40\")",
    "options": [
     "maior que 10",
     "maior que 40",
     "As duas frases",
     "Nada"
    ],
    "correct": 0,
    "explanation": "A primeira condição já é verdadeira, então o elif nem chega a ser testado."
   },
   {
    "type": "multiple_choice",
    "prompt": "Quantos blocos elif um if pode ter?",
    "code": null,
    "options": [
     "Nenhum",
     "Apenas um",
     "No máximo três",
     "Quantos forem necessários"
    ],
    "correct": 3,
    "explanation": "Não há limite: você pode encadear quantos elif precisar entre o if e o else."
   },
   {
    "type": "multiple_choice",
    "prompt": "O que este código exibe?",
    "code": "dia = \"sábado\"\nif dia == \"sábado\" or dia == \"domingo\":\n    print(\"Fim de semana\")\nelse:\n    print(\"Dia útil\")",
    "options": [
     "Fim de semana",
     "Dia útil",
     "Nada",
     "Um erro"
    ],
    "correct": 0,
    "explanation": "Com or, basta uma das comparações ser verdadeira, e dia == \"sábado\" é."
   },
   {
    "type": "code_completion",
    "prompt": "Complete o código para exibir Morno.",
    "code": "temp = 22\nif temp > 30:\n    print(\"Quente\")\n___ temp > 18:\n    print(\"Morno\")\nelse:\n    print(\"Frio\")",
    "options": [
     "elif",
     "else",
     "then",
     "elseif"
    ],
    "correct": 0,
    "explanation": "elif testa uma nova condição quando a do if é falsa. Em Python não existe elseif nem then."
   },
   {
    "type": "code_order",
    "prompt": "Monte o programa que exibe Bom.",
    "code": null,
    "options": [
     "pontos = 7",
     "if pontos >= 9:",
     "    print(\"Ótimo\")",
     "elif pontos >= 6:",
     "    print(\"Bom\")"
    ],
    "correct": null,
    "explanation": "7 não chega a 9, mas é pelo menos 6, então o bloco do elif executa."
   },
   {
    "type": "code_input",
    "prompt": "Escreva o operador lógico que aprova a compra quando há saldo ou cartão.",
    "code": "saldo = 0\ntem_cartao = True\nif saldo > 0 ___ tem_cartao:\n    print(\"Compra aprovada\")",
    "options": [
     "or"
    ],
    "correct": null,
    "explanation": "or resulta em True quando pelo menos um dos lados é verdadeiro. Aqui, só tem_cartao é."
   }
  ]
 },
 {
  "title": "Listas",
  "description": "Guarde vários valores em uma só variável.",
  "cards": [
   {
    "visual": "code",
    "title": "Criando uma lista",
    "body": "Uma lista guarda vários valores em ordem, entre colchetes e separados por vírgulas.",
    "code": "frutas = [\"maçã\", \"uva\", \"pera\"]\nprint(frutas)",
    "output": "['maçã', 'uva', 'pera']",
    "points": []
   },
   {
    "visual": "code",
    "title": "Acessando itens",
    "body": "Cada item tem um índice, que começa em 0. Índices negativos contam a partir do fim, e len() mostra o tamanho.",
    "code": "frutas = [\"maçã\", \"uva\", \"pera\"]\nprint(frutas[0])\nprint(frutas[-1])\nprint(len(frutas))",
    "output": "maçã\npera\n3",
    "points": []
   },
   {
    "visual": "code",
    "title": "Mudando a lista",
    "body": "append() adiciona um item ao fim, e você pode trocar um item usando o índice.",
    "code": "notas = [7, 8]\nnotas.append(10)\nnotas[0] = 9\nprint(notas)",
    "output": "[9, 8, 10]",
    "points": []
   }
  ],
  "questions": [
   {
    "type": "multiple_choice",
    "prompt": "O que este código exibe?",
    "code": "cores = [\"azul\", \"verde\", \"rosa\"]\nprint(cores[1])",
    "options": [
     "azul",
     "verde",
     "rosa",
     "Um erro"
    ],
    "correct": 1,
    "explanation": "O índice 1 é o segundo item, porque a contagem começa em 0."
   },
   {
    "type": "multiple_choice",
    "prompt": "O que este código exibe?",
    "code": "nums = [4, 8, 15, 16]\nprint(len(nums))",
    "options": [
     "3",
     "4",
     "16",
     "43"
    ],
    "correct": 1,
    "explanation": "len() conta os itens da lista: são 4."
   },
   {
    "type": "multiple_choice",
    "prompt": "Qual destas linhas cria uma lista corretamente?",
    "code": null,
    "options": [
     "dias = [\"seg\", \"ter\"]",
     "dias = (\"seg\" \"ter\")",
     "dias = {seg, ter}",
     "dias = <\"seg\", \"ter\">"
    ],
    "correct": 0,
    "explanation": "Listas usam colchetes e separam os itens com vírgulas."
   },
   {
    "type": "multiple_choice",
    "prompt": "O que este código exibe?",
    "code": "letras = [\"a\", \"b\", \"c\"]\nprint(letras[3])",
    "options": [
     "c",
     "a",
     "None",
     "Um erro"
    ],
    "correct": 3,
    "explanation": "A lista tem os índices 0, 1 e 2. Pedir o índice 3 causa um IndexError."
   },
   {
    "type": "code_completion",
    "prompt": "Complete o código para adicionar 5 ao fim da lista.",
    "code": "pontos = [1, 2]\npontos.___(5)\nprint(pontos)",
    "options": [
     "append",
     "add",
     "push",
     "insert"
    ],
    "correct": 0,
    "explanation": "append() coloca o novo item no fim da lista."
   },
   {
    "type": "code_order",
    "prompt": "Monte o programa que exibe ['pão', 'leite'].",
    "code": null,
    "options": [
     "compras = []",
     "compras.append(\"pão\")",
     "compras.append(\"leite\")",
     "print(compras)"
    ],
    "correct": null,
    "explanation": "A lista começa vazia e cada append() adiciona um item no fim, na ordem em que é chamado."
   },
   {
    "type": "code_input",
    "prompt": "Escreva o índice negativo que faz o código exibir o último item.",
    "code": "animais = [\"gato\", \"cão\", \"peixe\"]\nprint(animais[___])",
    "options": [
     "-1"
    ],
    "correct": null,
    "explanation": "-1 é sempre o último item, qualquer que seja o tamanho da lista."
   }
  ]
 },
 {
  "title": "Repetição com for",
  "description": "Repita ações sem copiar código.",
  "cards": [
   {
    "visual": "code",
    "title": "Percorrendo uma lista",
    "body": "O for passa por cada item da lista, um de cada vez, e executa o bloco recuado para cada um.",
    "code": "for fruta in [\"maçã\", \"uva\"]:\n    print(fruta)",
    "output": "maçã\nuva",
    "points": []
   },
   {
    "visual": "code",
    "title": "Contando com range",
    "body": "range(n) gera os números de 0 até n - 1. range(a, b) começa em a e para antes de b.",
    "code": "for i in range(3):\n    print(i)\nfor i in range(5, 7):\n    print(i)",
    "output": "0\n1\n2\n5\n6",
    "points": []
   },
   {
    "visual": "code",
    "title": "Acumulando valores",
    "body": "Uma variável criada antes do for pode guardar um total que cresce a cada volta.",
    "code": "total = 0\nfor n in [2, 4, 6]:\n    total = total + n\nprint(total)",
    "output": "12",
    "points": []
   }
  ],
  "questions": [
   {
    "type": "multiple_choice",
    "prompt": "Quantas vezes Oi é exibido?",
    "code": "for i in range(4):\n    print(\"Oi\")",
    "options": [
     "3",
     "4",
     "5",
     "1"
    ],
    "correct": 1,
    "explanation": "range(4) gera 0, 1, 2 e 3: quatro voltas."
   },
   {
    "type": "multiple_choice",
    "prompt": "Qual é o último número exibido?",
    "code": "for i in range(1, 6):\n    print(i)",
    "options": [
     "5",
     "6",
     "4",
     "1"
    ],
    "correct": 0,
    "explanation": "range(1, 6) começa em 1 e para antes do 6."
   },
   {
    "type": "multiple_choice",
    "prompt": "O que este código exibe?",
    "code": "palavra = \"\"\nfor letra in \"abc\":\n    palavra = letra + palavra\nprint(palavra)",
    "options": [
     "abc",
     "cba",
     "a",
     "c"
    ],
    "correct": 1,
    "explanation": "O for também percorre strings. Cada letra entra na frente das anteriores, invertendo o texto."
   },
   {
    "type": "multiple_choice",
    "prompt": "O que este código exibe?",
    "code": "conta = 0\nfor x in [3, 7, 1]:\n    conta = conta + 1\nprint(conta)",
    "options": [
     "3",
     "11",
     "1",
     "0"
    ],
    "correct": 0,
    "explanation": "conta soma 1 a cada volta, e a lista tem 3 itens. Os valores de x não são usados."
   },
   {
    "type": "code_completion",
    "prompt": "Complete o código para exibir os números de 0 a 4.",
    "code": "for n in ___(5):\n    print(n)",
    "options": [
     "range",
     "len",
     "list",
     "int"
    ],
    "correct": 0,
    "explanation": "range(5) gera os números 0, 1, 2, 3 e 4."
   },
   {
    "type": "code_order",
    "prompt": "Monte o programa que exibe 6, a soma de 1, 2 e 3.",
    "code": null,
    "options": [
     "soma = 0",
     "for n in [1, 2, 3]:",
     "    soma = soma + n",
     "print(soma)"
    ],
    "correct": null,
    "explanation": "soma começa em 0, recebe cada número dentro do laço e é exibida depois dele, sem recuo."
   },
   {
    "type": "code_input",
    "prompt": "Escreva a palavra que falta para exibir cada nome da lista.",
    "code": "nomes = [\"Ana\", \"Bia\"]\nfor nome ___ nomes:\n    print(nome)",
    "options": [
     "in"
    ],
    "correct": null,
    "explanation": "A estrutura é for variável in sequência:."
   }
  ]
 },
 {
  "title": "Repetição com while",
  "description": "Repita enquanto uma condição for verdadeira.",
  "cards": [
   {
    "visual": "code",
    "title": "Enquanto for verdade",
    "body": "O while repete o bloco enquanto a condição for verdadeira. Ele testa a condição antes de cada volta.",
    "code": "n = 1\nwhile n <= 3:\n    print(n)\n    n = n + 1",
    "output": "1\n2\n3",
    "points": []
   },
   {
    "visual": "points",
    "title": "Cuidado com o laço infinito",
    "body": "Se a condição nunca ficar falsa, o programa não para.",
    "code": null,
    "output": null,
    "points": [
     "Altere dentro do laço a variável da condição",
     "n = n + 1 pode ser escrito como n += 1",
     "break interrompe o laço na hora"
    ]
   },
   {
    "visual": "code",
    "title": "Parando com break",
    "body": "break sai do laço imediatamente, mesmo que a condição ainda seja verdadeira.",
    "code": "n = 0\nwhile True:\n    n += 1\n    if n == 3:\n        break\nprint(n)",
    "output": "3",
    "points": []
   }
  ],
  "questions": [
   {
    "type": "multiple_choice",
    "prompt": "O que este código exibe?",
    "code": "x = 10\nwhile x > 7:\n    x = x - 1\nprint(x)",
    "options": [
     "7",
     "8",
     "10",
     "6"
    ],
    "correct": 0,
    "explanation": "x diminui até 7. Aí a condição x > 7 fica falsa e o laço termina."
   },
   {
    "type": "multiple_choice",
    "prompt": "Por que este laço nunca termina?",
    "code": "n = 0\nwhile n < 5:\n    print(n)",
    "options": [
     "n nunca muda de valor",
     "Falta um else",
     "while não aceita <",
     "print não pode ficar no laço"
    ],
    "correct": 0,
    "explanation": "Como n continua 0, a condição n < 5 é sempre verdadeira."
   },
   {
    "type": "multiple_choice",
    "prompt": "O que n += 2 faz?",
    "code": null,
    "options": [
     "Soma 2 ao valor de n",
     "Compara n com 2",
     "Guarda 2 em n",
     "Multiplica n por 2"
    ],
    "correct": 0,
    "explanation": "n += 2 é um atalho para n = n + 2."
   },
   {
    "type": "multiple_choice",
    "prompt": "O que este código exibe?",
    "code": "total = 1\nwhile total < 20:\n    total = total * 3\nprint(total)",
    "options": [
     "9",
     "20",
     "27",
     "81"
    ],
    "correct": 2,
    "explanation": "total vale 1, 3, 9 e 27. Com 27, a condição fica falsa e o laço para."
   },
   {
    "type": "code_completion",
    "prompt": "Complete o código para parar o laço quando n chegar a 5.",
    "code": "n = 0\nwhile True:\n    n += 1\n    if n == 5:\n        ___\nprint(n)",
    "options": [
     "break",
     "stop",
     "else",
     "return"
    ],
    "correct": 0,
    "explanation": "break encerra o laço. return só pode ser usado dentro de funções."
   },
   {
    "type": "code_order",
    "prompt": "Monte a contagem regressiva que exibe 3, 2 e 1.",
    "code": null,
    "options": [
     "n = 3",
     "while n > 0:",
     "    print(n)",
     "    n -= 1"
    ],
    "correct": null,
    "explanation": "O número é exibido antes de diminuir. Na ordem inversa, a contagem mostraria 2, 1 e 0."
   },
   {
    "type": "code_input",
    "prompt": "Escreva a condição que faz o laço exibir 0, 1 e 2.",
    "code": "i = 0\nwhile ___:\n    print(i)\n    i += 1",
    "options": [
     "i < 3",
     "i <= 2",
     "3 > i",
     "2 >= i",
     "i != 3"
    ],
    "correct": null,
    "explanation": "O laço precisa continuar enquanto i for menor que 3, como em i < 3."
   }
  ]
 },
 {
  "title": "Funções",
  "description": "Crie seus próprios comandos com def.",
  "cards": [
   {
    "visual": "code",
    "title": "Criando uma função",
    "body": "def cria uma função: um bloco de código com nome que você pode executar quantas vezes quiser.",
    "code": "def saudar():\n    print(\"Olá!\")\n\nsaudar()\nsaudar()",
    "output": "Olá!\nOlá!",
    "points": []
   },
   {
    "visual": "code",
    "title": "Parâmetros",
    "body": "Parâmetros são valores que a função recebe entre os parênteses quando é chamada.",
    "code": "def saudar(nome):\n    print(\"Olá, \" + nome)\n\nsaudar(\"Ana\")\nsaudar(\"Leo\")",
    "output": "Olá, Ana\nOlá, Leo",
    "points": []
   },
   {
    "visual": "points",
    "title": "Anatomia de uma função",
    "body": "Toda função segue o mesmo formato.",
    "code": null,
    "output": null,
    "points": [
     "def, o nome e os parênteses",
     "Dois-pontos no fim da linha",
     "Corpo recuado com 4 espaços",
     "Ela só executa quando é chamada"
    ]
   }
  ],
  "questions": [
   {
    "type": "multiple_choice",
    "prompt": "Qual linha define uma função corretamente?",
    "code": null,
    "options": [
     "def ola():",
     "function ola() {",
     "def ola:",
     "ola() = def"
    ],
    "correct": 0,
    "explanation": "Uma função começa com def, o nome, os parênteses e os dois-pontos."
   },
   {
    "type": "multiple_choice",
    "prompt": "O que este código exibe?",
    "code": "def dobro(n):\n    print(n * 2)\n\ndobro(4)",
    "options": [
     "4",
     "8",
     "n * 2",
     "Nada"
    ],
    "correct": 1,
    "explanation": "A chamada dobro(4) faz n valer 4, e a função exibe 4 * 2."
   },
   {
    "type": "multiple_choice",
    "prompt": "O que este código exibe?",
    "code": "def avisar():\n    print(\"Atenção\")\n\nprint(\"Início\")",
    "options": [
     "Início",
     "Atenção",
     "Atenção e Início",
     "Nada"
    ],
    "correct": 0,
    "explanation": "A função foi criada, mas nunca foi chamada. Só print(\"Início\") executa."
   },
   {
    "type": "multiple_choice",
    "prompt": "Como chamar a função abaixo com o valor 3?",
    "code": "def quadrado(n):\n    print(n * n)",
    "options": [
     "quadrado(3)",
     "def quadrado(3)",
     "quadrado = 3",
     "call quadrado 3"
    ],
    "correct": 0,
    "explanation": "Para chamar uma função, escreva o nome e os valores entre parênteses."
   },
   {
    "type": "code_completion",
    "prompt": "Complete o código para criar a função.",
    "code": "___ boas_vindas():\n    print(\"Bem-vindo!\")\n\nboas_vindas()",
    "options": [
     "def",
     "function",
     "func",
     "fun"
    ],
    "correct": 0,
    "explanation": "Em Python, toda função é criada com a palavra def."
   },
   {
    "type": "code_order",
    "prompt": "Monte o programa que exibe Oi, Bia.",
    "code": null,
    "options": [
     "def cumprimentar(nome):",
     "    print(\"Oi, \" + nome)",
     "cumprimentar(\"Bia\")"
    ],
    "correct": null,
    "explanation": "A função precisa ser criada antes de ser chamada."
   },
   {
    "type": "code_input",
    "prompt": "Escreva a chamada que faz o código exibir 15.",
    "code": "def triplo(n):\n    print(n * 3)\n\n___",
    "options": [
     "triplo(5)"
    ],
    "correct": null,
    "explanation": "Chamar triplo(5) faz n valer 5, e 5 * 3 é 15."
   }
  ]
 },
 {
  "title": "Retorno de funções",
  "description": "Devolva resultados com return.",
  "cards": [
   {
    "visual": "code",
    "title": "Devolvendo um valor",
    "body": "return devolve um resultado para quem chamou a função. Assim, dá para guardar o valor ou usá-lo em contas.",
    "code": "def soma(a, b):\n    return a + b\n\nresultado = soma(2, 3)\nprint(resultado)",
    "output": "5",
    "points": []
   },
   {
    "visual": "points",
    "title": "print ou return?",
    "body": "Parecem iguais, mas têm papéis diferentes.",
    "code": null,
    "output": null,
    "points": [
     "print mostra o valor na tela",
     "return devolve o valor para o programa",
     "Uma função sem return devolve None",
     "O return encerra a função na hora"
    ]
   },
   {
    "visual": "code",
    "title": "Usando o retorno",
    "body": "O valor retornado pode entrar direto em outras expressões.",
    "code": "def dobro(n):\n    return n * 2\n\nprint(dobro(3) + 1)",
    "output": "7",
    "points": []
   }
  ],
  "questions": [
   {
    "type": "multiple_choice",
    "prompt": "O que este código exibe?",
    "code": "def area(lado):\n    return lado * lado\n\nprint(area(5))",
    "options": [
     "10",
     "25",
     "lado * lado",
     "None"
    ],
    "correct": 1,
    "explanation": "area(5) devolve 5 * 5, e o print exibe esse valor."
   },
   {
    "type": "multiple_choice",
    "prompt": "O que este código exibe?",
    "code": "def nada():\n    x = 1\n\nprint(nada())",
    "options": [
     "1",
     "None",
     "x",
     "Um erro"
    ],
    "correct": 1,
    "explanation": "A função não tem return, então devolve None."
   },
   {
    "type": "multiple_choice",
    "prompt": "O que este código exibe?",
    "code": "def teste():\n    return \"A\"\n    print(\"B\")\n\nprint(teste())",
    "options": [
     "A",
     "B",
     "A e B",
     "None"
    ],
    "correct": 0,
    "explanation": "O return encerra a função na hora, então print(\"B\") nunca executa."
   },
   {
    "type": "multiple_choice",
    "prompt": "Quantos parâmetros a função abaixo recebe?",
    "code": "def media(a, b, c):\n    return (a + b + c) / 3",
    "options": [
     "1",
     "2",
     "3",
     "4"
    ],
    "correct": 2,
    "explanation": "Os parâmetros ficam entre os parênteses: a, b e c."
   },
   {
    "type": "code_completion",
    "prompt": "Complete o código para que a função devolva o maior número.",
    "code": "def maior(a, b):\n    if a > b:\n        ___ a\n    return b\n\nprint(maior(9, 4))",
    "options": [
     "return",
     "print",
     "break",
     "def"
    ],
    "correct": 0,
    "explanation": "return a devolve a e encerra a função antes do return b."
   },
   {
    "type": "code_order",
    "prompt": "Monte o programa que exibe 20.",
    "code": null,
    "options": [
     "def metade(n):",
     "    return n // 2",
     "x = metade(40)",
     "print(x)"
    ],
    "correct": null,
    "explanation": "A função é criada, depois chamada com 40, e o resultado guardado em x é exibido."
   },
   {
    "type": "code_input",
    "prompt": "Escreva o que a função deve devolver para exibir True quando o número for par.",
    "code": "def eh_par(n):\n    return ___\n\nprint(eh_par(6))",
    "options": [
     "n % 2 == 0",
     "n % 2 != 1",
     "0 == n % 2"
    ],
    "correct": null,
    "explanation": "Um número é par quando o resto da divisão por 2 é 0: n % 2 == 0."
   }
  ]
 },
 {
  "title": "Dicionários",
  "description": "Guarde dados em pares de chave e valor.",
  "cards": [
   {
    "visual": "code",
    "title": "Chave e valor",
    "body": "Um dicionário liga cada chave a um valor, entre chaves { }. Você busca o valor pela chave, não pela posição.",
    "code": "aluno = {\"nome\": \"Ana\", \"idade\": 16}\nprint(aluno[\"nome\"])",
    "output": "Ana",
    "points": []
   },
   {
    "visual": "code",
    "title": "Alterando e adicionando",
    "body": "Atribuir a uma chave que já existe troca o valor. Atribuir a uma chave nova cria o par.",
    "code": "aluno = {\"nome\": \"Ana\"}\naluno[\"nome\"] = \"Bia\"\naluno[\"turma\"] = \"7A\"\nprint(aluno)",
    "output": "{'nome': 'Bia', 'turma': '7A'}",
    "points": []
   },
   {
    "visual": "code",
    "title": "Percorrendo um dicionário",
    "body": "items() entrega cada chave junto com o seu valor dentro do for.",
    "code": "precos = {\"pão\": 2, \"café\": 5}\nfor item, preco in precos.items():\n    print(item, preco)",
    "output": "pão 2\ncafé 5",
    "points": []
   }
  ],
  "questions": [
   {
    "type": "multiple_choice",
    "prompt": "O que este código exibe?",
    "code": "carro = {\"marca\": \"Fiat\", \"ano\": 2020}\nprint(carro[\"ano\"])",
    "options": [
     "2020",
     "ano",
     "Fiat",
     "Um erro"
    ],
    "correct": 0,
    "explanation": "carro[\"ano\"] busca o valor ligado à chave \"ano\"."
   },
   {
    "type": "multiple_choice",
    "prompt": "Qual linha cria um dicionário corretamente?",
    "code": null,
    "options": [
     "pessoa = {\"nome\": \"Leo\"}",
     "pessoa = [\"nome\": \"Leo\"]",
     "pessoa = {\"nome\" = \"Leo\"}",
     "pessoa = (\"nome\", \"Leo\")"
    ],
    "correct": 0,
    "explanation": "Dicionários usam chaves { } e separam a chave do valor com dois-pontos."
   },
   {
    "type": "multiple_choice",
    "prompt": "O que este código exibe?",
    "code": "estoque = {\"maçã\": 3}\nestoque[\"maçã\"] = 10\nprint(estoque[\"maçã\"])",
    "options": [
     "3",
     "10",
     "13",
     "Um erro"
    ],
    "correct": 1,
    "explanation": "A atribuição troca o valor da chave \"maçã\" de 3 para 10."
   },
   {
    "type": "multiple_choice",
    "prompt": "O que este código exibe?",
    "code": "notas = {\"Ana\": 9}\nprint(notas[\"Bia\"])",
    "options": [
     "None",
     "9",
     "Bia",
     "Um erro"
    ],
    "correct": 3,
    "explanation": "A chave \"Bia\" não existe, então o Python gera um KeyError."
   },
   {
    "type": "code_completion",
    "prompt": "Complete o código para exibir quantos pares o dicionário tem.",
    "code": "capitais = {\"SP\": \"São Paulo\", \"RJ\": \"Rio\"}\nprint(___(capitais))",
    "options": [
     "len",
     "sum",
     "count",
     "size"
    ],
    "correct": 0,
    "explanation": "len() também funciona com dicionários e conta os pares de chave e valor."
   },
   {
    "type": "code_order",
    "prompt": "Monte o programa que exibe Recife.",
    "code": null,
    "options": [
     "cidade = {}",
     "cidade[\"nome\"] = \"Recife\"",
     "print(cidade[\"nome\"])"
    ],
    "correct": null,
    "explanation": "O dicionário começa vazio, ganha a chave \"nome\" e depois o valor é exibido."
   },
   {
    "type": "code_input",
    "prompt": "Escreva a chave que faz o código exibir 1.75.",
    "code": "perfil = {\"nome\": \"Leo\", \"altura\": 1.75}\nprint(perfil[___])",
    "options": [
     "\"altura\""
    ],
    "correct": null,
    "explanation": "A chave é uma string, por isso precisa de aspas: perfil[\"altura\"]."
   }
  ]
 }
]
$seed$::jsonb);

create temporary table new_stage_items as
select item.value as item, item.ord
from python_stage_seed seed
cross join lateral jsonb_array_elements(seed.doc) with ordinality as item (value, ord);

insert into public.stages (track_id, position, title, description)
select
  t.id,
  (select coalesce(max(s.position), 0) from public.stages s where s.track_id = t.id)
    + row_number() over (order by n.ord),
  n.item ->> 'title',
  n.item ->> 'description'
from public.tracks t
cross join new_stage_items n
where t.slug = 'python-fundamentos'
  and not exists (
    select 1 from public.stages s
    where s.track_id = t.id and s.title = n.item ->> 'title'
  );

-- Liga cada item do conteúdo à sua etapa pelo título.
create temporary table seeded_stages as
select st.id as stage_id, n.item
from public.tracks t
join public.stages st on st.track_id = t.id
join new_stage_items n on n.item ->> 'title' = st.title
where t.slug = 'python-fundamentos';

insert into public.lesson_cards
  (stage_id, position, visual, title, body, code_snippet, code_output, points)
select
  ss.stage_id,
  c.ord,
  c.item ->> 'visual',
  c.item ->> 'title',
  c.item ->> 'body',
  c.item ->> 'code',
  c.item ->> 'output',
  array(select jsonb_array_elements_text(c.item -> 'points'))
from seeded_stages ss
cross join lateral jsonb_array_elements(ss.item -> 'cards') with ordinality as c (item, ord)
on conflict do nothing;

-- code_order: todas as opções são corretas e a posição guarda a ordem certa.
-- code_input: cada opção é uma resposta aceita.
with new_questions as (
  insert into public.questions (stage_id, position, type, prompt, code_snippet, explanation)
  select
    ss.stage_id,
    q.ord,
    q.item ->> 'type',
    q.item ->> 'prompt',
    q.item ->> 'code',
    q.item ->> 'explanation'
  from seeded_stages ss
  cross join lateral jsonb_array_elements(ss.item -> 'questions') with ordinality as q (item, ord)
  on conflict do nothing
  returning id, stage_id, position
)
insert into public.question_options (question_id, position, text, is_correct)
select
  nq.id,
  opt.ord,
  opt.value,
  case
    when q.item ->> 'type' in ('code_order', 'code_input') then true
    else opt.ord - 1 = (q.item ->> 'correct')::int
  end
from new_questions nq
join seeded_stages ss on ss.stage_id = nq.stage_id
cross join lateral (select ss.item -> 'questions' -> (nq.position - 1) as item) q
cross join lateral jsonb_array_elements_text(q.item -> 'options') with ordinality as opt (value, ord);

drop table seeded_stages;
drop table new_stage_items;
drop table python_stage_seed;
