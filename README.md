# Codequest

Aplicativo Android para aprender programação por meio de uma trilha de etapas e questões progressivas. A primeira linguagem é Python.

**Versão:** 1.1.0

## Tecnologias

- React Native 0.88 com TypeScript
- Supabase (autenticação e banco de dados)
- Android (API mínima 24)

## Pré-requisitos

- Node.js 22.13+, 24.3+ ou 26+ e npm
- Android Studio com Android SDK e um emulador
- JDK 17
- Git
- Um projeto no Supabase

## Configurar o Supabase

1. Copie `.env.example` para `.env` e preencha `SUPABASE_URL` e `SUPABASE_PUBLISHABLE_KEY`.
2. Aplique os arquivos de `supabase/migrations`, em ordem, no SQL Editor do painel ou com `supabase db push`.

## Executar

```bash
npm install
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
npm start
```

Em outro terminal, com o emulador aberto:

```bash
npm run android
```

No Android 16 ou superior, o sistema pede permissão de rede local na primeira abertura do build de debug. Permita para que o app acesse o Metro.
