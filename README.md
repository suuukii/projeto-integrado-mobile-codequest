# Codequest

Aplicativo Android para aprender programação por meio de uma trilha de etapas e questões progressivas. A primeira linguagem disponível é Python, e a estrutura permite adicionar outras linguagens e trilhas.

**Versão:** 1.12.0

## Tecnologias

- React Native 0.88 com TypeScript (Android)
- Supabase: autenticação, banco de dados Postgres e Row Level Security
- React Navigation

## Estrutura da aplicação

```text
App.tsx                  Ponto de entrada do aplicativo
src/
  assets/                Logo em PNG
  components/            Componentes de interface reutilizáveis
  config/                Leitura das variáveis de ambiente
  hooks/                 Hooks reutilizáveis, como a preferência de reduzir animações
  features/auth/         Validação, força da senha, sessão e serviços de autenticação
  features/learning/     Trilha, explicações animadas, questões, sessão da etapa e progresso
  features/profile/      Fotos de perfil predefinidas, dados do perfil e resumo do progresso
  navigation/            Navegadores, barra inferior de abas e tipos das rotas
  screens/               Telas de autenticação, de aprendizado e de perfil
  services/supabase/     Cliente e tipos do banco
  theme/                 Cores, espaçamentos e tipografia
  types/                 Declarações globais de tipos
supabase/migrations/     Estrutura do banco e conteúdo inicial
```

O conteúdo fica nas tabelas `languages`, `tracks`, `stages`, `questions`, `question_options` e `lesson_cards`, que guarda as explicações exibidas antes das questões de cada etapa. Dados do usuário ficam em `profiles`, que guarda o nome de usuário e a foto de perfil escolhida, e em `user_progress`. O aplicativo se comunica diretamente com o Supabase, sem servidor próprio.

## Pré-requisitos

| Item | Versão |
| --- | --- |
| Node.js | 22.13+, 24.3+ ou 26+ |
| npm | Instalado com o Node.js |
| Git | Qualquer versão recente |
| JDK | 17 |
| Android Studio | Versão recente, com Android SDK e emulador |
| Android SDK | Platform 37. O Gradle baixa o Build Tools 37 e o NDK 27.1 no primeiro build, desde que as licenças estejam aceitas |
| Supabase | Uma conta e um projeto |

O React Native CLI já vem nas dependências do projeto, então não precisa de instalação global.

### Variáveis de ambiente

| Variável | Onde encontrar |
| --- | --- |
| `SUPABASE_URL` | Painel do Supabase, em **Project Settings > API** |
| `SUPABASE_PUBLISHABLE_KEY` | Chave pública (*publishable*), em **Project Settings > API Keys** |

Nunca use a chave `secret` ou `service_role` no aplicativo.

## Configuração

### 1. Obter o código

```bash
git clone <URL-DO-REPOSITORIO> Codequest
cd Codequest
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar as variáveis de ambiente

```bash
cp .env.example .env
```

Preencha os dois valores no arquivo `.env`. Ele não é enviado ao Git.

### 4. Configurar o Supabase

No painel do projeto:

1. Abra **Authentication > Sign In / Providers > Email** e confirme que o provedor de e-mail está ativo.
2. Na mesma tela, desative **Confirm email** e salve. Com essa opção ativa, o usuário só entra depois de confirmar o e-mail, e os testes abaixo que assumem entrada direta não se aplicam.

### 5. Configurar o banco de dados

Abra o **SQL Editor** do painel e execute o conteúdo destes arquivos, nesta ordem:

1. `supabase/migrations/20261110000100_initial_schema.sql`
2. `supabase/migrations/20261110000200_seed_python_track.sql`
3. `supabase/migrations/20261111000300_lesson_cards.sql`
4. `supabase/migrations/20261111000400_profile_avatar.sql`
5. `supabase/migrations/20261111000500_code_questions.sql`
6. `supabase/migrations/20261112000600_code_input_questions.sql`
7. `supabase/migrations/20261113000700_more_python_stages.sql`

O primeiro cria as tabelas, as políticas de RLS e o gatilho de criação de perfil. O segundo adiciona a trilha de Python com 6 etapas e 24 questões. O terceiro cria a tabela de explicações e adiciona 23 cartões, incluindo uma introdução à linguagem na primeira etapa. O quarto adiciona a foto de perfil e permite que cada usuário altere apenas a própria foto. O quinto cria os formatos "completar o código" e "ordenar o código" e adiciona uma questão de cada formato por etapa, totalizando 36 questões. O sexto remove questões copiadas por engano, reescreve as que repetiam o conteúdo de outra questão da mesma etapa, impede novas cópias e cria o formato "escrever o código", com uma questão por etapa, totalizando 42 questões. Ele pode ser executado de novo sem duplicar nada. O sétimo adiciona 8 etapas depois das existentes: condicionais, várias condições, listas, repetição com for, repetição com while, funções, retorno de funções e dicionários. Cada uma tem 3 cartões de explicação e 7 questões nos quatro formatos, e a trilha passa a ter 14 etapas, 98 questões e 47 cartões. Ele também pode ser executado de novo sem duplicar nada.

### 6. Configurar o ambiente Android

No Android Studio, abra **SDK Manager**, instale o **Android SDK Platform 37** e aceite as licenças. Em **Device Manager**, crie um emulador.

Adicione ao arquivo de configuração do seu terminal (`~/.zshrc`, por exemplo):

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
```

Esses caminhos valem para macOS. Em outros sistemas, aponte `ANDROID_HOME` para o SDK e `JAVA_HOME` para o JDK 17.

### 7. Iniciar o projeto

```bash
npm start
```

Deixe esse terminal aberto. Ele executa o Metro, que entrega o JavaScript ao aplicativo.

## Execução

### Emulador Android

Abra o emulador pelo Android Studio ou com `emulator -avd NOME_DO_EMULADOR`. Em outro terminal:

```bash
npm run android -- --active-arch-only
```

O primeiro build leva alguns minutos. No Android 16 ou superior, o build de debug pede permissão de rede local na primeira abertura. Toque em **Allow** para que ele acesse o Metro.

### Dispositivo físico

1. Ative **Opções do desenvolvedor** e **Depuração USB** no aparelho.
2. Conecte o cabo e autorize o computador.
3. Confira se o aparelho aparece em `adb devices`.
4. Encaminhe a porta do Metro com `adb reverse tcp:8081 tcp:8081`.
5. Execute `npm run android -- --active-arch-only`.

## Verificações automatizadas

```bash
npm run typecheck
npm run lint
npm test
```

## Testes manuais

Antes de começar, conclua a configuração e deixe o aplicativo aberto. Use uma senha válida como `Teste123!` e um e-mail ainda não cadastrado.

### 1. Tela de apresentação
- **Pré-condições:** nenhuma sessão ativa.
- **Passos:** abra o aplicativo, toque em **Iniciar**, volte com a seta no canto superior esquerdo e toque em **Eu já tenho uma conta**.
- **Resultado esperado:** o aplicativo abre na apresentação, com a logo e os dois botões. **Iniciar** leva ao cadastro e **Eu já tenho uma conta** leva ao login.

### 2. Cadastro de usuário
- **Pré-condições:** nenhuma sessão ativa, na tela de apresentação.
- **Passos:** toque em **Iniciar**, preencha todos os campos com dados válidos e toque em **Cadastrar**.
- **Resultado esperado:** o aplicativo abre a trilha, e a aba **Perfil** mostra o nome escolhido. O usuário aparece em **Authentication > Users** e em `profiles`.

### 3. Validação de nome de usuário
- **Pré-condições:** tela de cadastro aberta.
- **Passos:** teste vazio, `ab`, `a b` e um nome já cadastrado, tocando em **Cadastrar** a cada vez.
- **Resultado esperado:** uma mensagem em vermelho explica o problema e o cadastro não acontece. O nome repetido mostra "Este nome de usuário já está em uso."

### 4. Validação de e-mail
- **Pré-condições:** tela de cadastro aberta.
- **Passos:** teste vazio, `errado`, `a@b` e um e-mail já cadastrado.
- **Resultado esperado:** os formatos inválidos mostram erro no campo. O e-mail repetido mostra "Este e-mail já está cadastrado."

### 5. Validação de senha
- **Pré-condições:** tela de cadastro aberta.
- **Passos:** preencha a senha com `abc` e toque em **Cadastrar**.
- **Resultado esperado:** o campo fica vermelho e mostra "A senha não atende a todos os requisitos."

### 6. Regras de caracteres da senha
- **Pré-condições:** tela de cadastro aberta.
- **Passos:** digite aos poucos `Abcdef1!`.
- **Resultado esperado:** cada regra passa de `○` para `✓` em verde quando é cumprida: tamanho, minúscula, maiúscula, número e caractere especial.

### 7. Medidor de força da senha
- **Pré-condições:** tela de cadastro aberta.
- **Passos:** digite `abc`, `Abcdefg1`, `Abcdef1!` e `Abcdefghij1!`.
- **Resultado esperado:** o medidor mostra, nessa ordem, Fraca, Razoável, Boa e Forte, com mais segmentos preenchidos a cada nível.

### 8. Confirmação de senha
- **Pré-condições:** senha válida preenchida.
- **Passos:** digite um valor diferente em **Confirmar senha** e depois o valor correto.
- **Resultado esperado:** aparece "As senhas não são iguais." enquanto os valores diferem, e a mensagem some quando coincidem.

### 9. Login
- **Pré-condições:** conta criada e sessão encerrada.
- **Passos:** entre primeiro com a senha errada e depois com a correta.
- **Resultado esperado:** a senha errada mostra "E-mail ou senha incorretos." A correta abre a trilha.

### 10. Logout
- **Pré-condições:** usuário autenticado.
- **Passos:** abra a aba **Perfil** e toque em **Sair da conta**.
- **Resultado esperado:** o aplicativo volta para a tela de apresentação.

### 11. Persistência da sessão
- **Pré-condições:** usuário autenticado.
- **Passos:** feche o aplicativo pela lista de recentes e abra novamente.
- **Resultado esperado:** a trilha abre sem pedir login.

### 12. Navegação para a área principal
- **Pré-condições:** nenhuma sessão ativa.
- **Passos:** toque em **Eu já tenho uma conta**, faça login e use o botão voltar do Android na trilha.
- **Resultado esperado:** o login leva à trilha, e o botão voltar não retorna às telas de apresentação ou de login.

### 13. Seta de voltar
- **Pré-condições:** usuário autenticado na trilha.
- **Passos:** abra uma etapa e toque na seta do canto superior esquerdo. Depois conclua uma etapa e toque na seta da tela de resultado.
- **Resultado esperado:** a seta aparece no login, no cadastro, na etapa e no resultado, e volta para a tela anterior. Depois de concluir uma etapa, a seta do resultado volta para a trilha. A apresentação, a trilha e o perfil não têm seta, porque são telas iniciais.

### 14. Visualização da trilha
- **Pré-condições:** conta nova autenticada.
- **Passos:** observe a tela principal e role até o fim da trilha.
- **Resultado esperado:** o topo não tem saudação nem botão de sair. O cartão do topo mostra "Fundamentos de Python", "1. Introdução ao Python" e o progresso 0/14. Abaixo, as 14 etapas aparecem como blocos em zigue-zague, ligados por linhas sobre um fundo pontilhado. A primeira tem o símbolo ▶ e um contorno roxo, e as outras têm um cadeado e não respondem ao toque.

### 15. Barra de navegação inferior
- **Pré-condições:** usuário autenticado na trilha.
- **Passos:** toque em **Perfil** e depois em **Aprender** na barra inferior. Em seguida, abra uma etapa.
- **Resultado esperado:** a barra tem as abas **Aprender**, com um capelo, e **Perfil**, com um ícone de pessoa. A aba ativa fica destacada em roxo, e cada toque troca a tela. Dentro da etapa e na tela de resultado, a barra não aparece.

### 16. Perfil e progresso
- **Pré-condições:** usuário autenticado com pelo menos uma etapa concluída.
- **Passos:** abra a aba **Perfil**.
- **Resultado esperado:** aparecem a foto de perfil, o nome de usuário e o cartão "Progresso em Python", com o nome da trilha, a barra e a porcentagem de etapas concluídas, o total de etapas concluídas e os acertos de primeira. Os números batem com a trilha e com a tabela `user_progress`.

### 17. Foto de perfil
- **Pré-condições:** aba **Perfil** aberta.
- **Passos:** toque na foto ou em **Alterar foto**, escolha outra opção e troque de aba. Depois feche e abra o aplicativo.
- **Resultado esperado:** a janela mostra 8 fotos, com a atual contornada em roxo. Ao escolher, a janela fecha e a nova foto aparece. Ela continua após trocar de aba e reabrir o aplicativo, e a coluna `avatar` da tabela `profiles` muda. Uma conta nova começa com a cobra.

### 18. Explicações antes das questões
- **Pré-condições:** primeira etapa disponível.
- **Passos:** abra a etapa e avance pelos cartões com **Continuar**, observando cada animação.
- **Resultado esperado:** a etapa começa com 6 cartões de introdução ao Python. O primeiro mostra o mascote flutuando, os tópicos entram um a um, e nos cartões de código o texto é digitado letra a letra antes de a saída aparecer. A barra do topo avança a cada cartão, e o último botão, **Começar exercícios**, abre a primeira questão com a barra zerada. Na etapa 2, o primeiro cartão mostra o valor caindo dentro de uma caixa com o nome da variável. Com **Remover animações** ativo nas configurações de acessibilidade do Android, os cartões aparecem prontos.

### 19. Resolução das questões
- **Pré-condições:** explicações da primeira etapa concluídas.
- **Passos:** escolha uma opção errada e toque em **Verificar** e **Continuar**. Responda às demais corretamente, inclusive a que voltar.
- **Resultado esperado:** o botão **Verificar** só ativa com uma opção escolhida. A resposta errada fica vermelha, a certa fica verde, a explicação aparece e a questão errada volta no fim da etapa.

### 20. Questão de completar o código
- **Pré-condições:** explicações de uma etapa concluídas.
- **Passos:** responda até chegar à questão marcada como **Complete o código**. Escolha um bloco errado, toque em **Verificar** e depois responda corretamente quando a questão voltar.
- **Resultado esperado:** o código aparece com uma lacuna, e o bloco escolhido a preenche. **Verificar** só ativa com um bloco escolhido. Na verificação, o bloco certo fica verde, o escolhido errado fica vermelho e a lacuna ganha a mesma cor da resposta.

### 21. Questão de ordenar o código
- **Pré-condições:** explicações de uma etapa concluídas.
- **Passos:** chegue à questão marcada como **Ordene o código**. Toque em um bloco e toque nele de novo. Depois monte o código fora de ordem e verifique. Quando a questão voltar, monte na ordem certa.
- **Resultado esperado:** cada toque move o bloco para a área tracejada, com o número da linha, e tocar nele de novo o devolve. **Verificar** só ativa com todos os blocos posicionados. Na resposta errada, as linhas fora do lugar ficam vermelhas, as certas ficam verdes e aparece a ordem correta. Os blocos nunca aparecem já na ordem certa.

### 22. Questão de escrever o código
- **Pré-condições:** explicações de uma etapa concluídas.
- **Passos:** chegue à questão marcada como **Escreva o código**, a última da etapa. Digite uma resposta errada e verifique. Quando a questão voltar, digite a resposta certa com espaços extras ou aspas simples, como `'Codequest'` na etapa 1.
- **Resultado esperado:** o teclado abre sem correção automática nem letra maiúscula automática, e o texto digitado aparece dentro da lacuna. **Verificar** só ativa com algo digitado. Na resposta errada, o campo e a lacuna ficam vermelhos e aparece a resposta esperada. Espaços entre símbolos e o tipo de aspas não alteram o resultado, mas maiúsculas e minúsculas sim.

### 23. Progressão pelas etapas
- **Pré-condições:** etapa em andamento.
- **Passos:** conclua todas as questões e toque em **Voltar à trilha**.
- **Resultado esperado:** a tela de resultado mostra os acertos de primeira. Na trilha, o bloco da etapa fica roxo com ✓, a linha até a etapa seguinte fica roxa, a seguinte ganha o ▶ e o cartão do topo passa a mostrar o nome dela e o progresso atualizado.

### 24. Avanço para a próxima etapa
- **Pré-condições:** uma etapa concluída que não seja a última.
- **Passos:** na tela de resultado, toque em **Próxima etapa**. Depois toque na seta de voltar.
- **Resultado esperado:** a tela de resultado mostra "A seguir:" com o nome da próxima etapa e os botões **Próxima etapa** e **Voltar à trilha**. O primeiro abre a etapa seguinte, começando pelas explicações, e a seta volta para a trilha. Ao concluir a última etapa, só aparece **Voltar à trilha**.

### 25. Registro e recuperação do progresso
- **Pré-condições:** pelo menos uma etapa concluída.
- **Passos:** saia da conta, entre novamente e consulte a tabela `user_progress` no painel.
- **Resultado esperado:** a trilha mantém as etapas concluídas, e a tabela tem uma linha por etapa concluída.

## Solução de problemas

### Instalação

| Problema | Causa provável | Solução |
| --- | --- | --- |
| Erro de versão do Node em `npm install` | Node fora das versões suportadas | Instale uma versão listada nos pré-requisitos |
| Dependências inconsistentes | `node_modules` corrompido | Apague `node_modules` e rode `npm install` |

### Ambiente e Android

| Problema | Causa provável | Solução |
| --- | --- | --- |
| Gradle falha com erro de Java | `JAVA_HOME` ausente ou outro JDK | Rode `export JAVA_HOME=$(/usr/libexec/java_home -v 17)` e `java -version` |
| `SDK location not found` | `ANDROID_HOME` ausente | Configure a variável conforme a etapa 6 |
| Falha ao baixar Build Tools ou NDK | Licenças não aceitas ou sem internet | Aceite as licenças no SDK Manager e rode o build de novo |
| `No emulators found` ou nenhum aparelho | Emulador fechado | Abra o emulador e confira `adb devices` |
| Build lento | Compilação de todas as arquiteturas | Use `--active-arch-only` |

### Supabase

| Problema | Causa provável | Solução |
| --- | --- | --- |
| "Variável de ambiente ausente" ao abrir | `.env` ausente ou incompleto | Preencha o `.env` e rode `npm start -- --reset-cache` |
| Mudança no `.env` sem efeito | Cache do Metro | Rode `npm start -- --reset-cache` e recarregue o aplicativo |
| "Algo deu errado" no cadastro | Migrações não aplicadas | Execute os sete arquivos SQL na ordem indicada |
| "Conta criada. Confirme seu e-mail" | **Confirm email** ativo | Confirme pelo e-mail ou desative a opção |
| Limite de envio de e-mails | Limite do serviço padrão do Supabase | Aguarde ou desative **Confirm email** |
| "Não foi possível carregar esta etapa" | Tabela de explicações ausente ou sem conexão | Aplique as migrações e confira a conexão |
| "Não foi possível carregar o perfil" | Quarta migração não aplicada ou sem conexão | Execute `20261111000400_profile_avatar.sql` e confira a conexão |
| "Não foi possível salvar a foto" | Quarta migração não aplicada ou sem conexão | Execute `20261111000400_profile_avatar.sql` e tente de novo |
| Etapa sem as questões de completar e de ordenar | Quinta migração não aplicada | Execute `20261111000500_code_questions.sql` uma única vez |
| Questões repetidas ou etapa sem a questão de escrever | Sexta migração não aplicada | Execute `20261112000600_code_input_questions.sql` |
| Trilha com apenas 6 etapas | Sétima migração não aplicada | Execute `20261113000700_more_python_stages.sql` |
| Erro `already exists` no SQL | Arquivo executado duas vezes | Não execute de novo. Em um projeto sem dados importantes, remova as tabelas antes de refazer |

### Execução e testes

| Problema | Causa provável | Solução |
| --- | --- | --- |
| Tela vermelha "Unable to load script" | Metro parado ou porta sem encaminhamento | Rode `npm start` e `adb reverse tcp:8081 tcp:8081` |
| Tela em branco no Android 16 ou superior | Permissão de rede local negada | Permita a rede local nas configurações do aplicativo |
| "Não foi possível carregar a trilha" | Sem internet, migrações pendentes ou conteúdo ausente | Verifique a conexão e confirme que os dois SQL foram executados |
| Progresso não salva | Sessão expirada ou políticas ausentes | Saia, entre novamente e confira a migração inicial |
| Teste de cadastro repetido falha | E-mail ou nome já usados | Use novos dados ou apague o usuário em **Authentication > Users** |
