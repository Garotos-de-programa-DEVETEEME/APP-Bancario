# Rodar projeto antigo em outra porta enquanto o novo roda na porta principal

npx expo start -w -p NUMERO_DA_PORTA


# Front-end Asset

## Descrição

Este é o front-end do projeto Asset, desenvolvido com React Native e TypeScript. O projeto é responsável por gerenciar os ativos e suas operações.

## Pré-requisitos

- React Native (versão recomendada: 18.x ou superior)
- npm ou yarn
- TypeScript

## Instalação

1. Clone o repositório:

```bash
git clone https://gitlab.com/ti-banestes-asset/front-end.git
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

## Scripts Disponíveis

- `npm start`: Inicia a aplicação
- `npm run android`: Inicia a aplicação no android studio
- `npm run test`: Executa os testes
- `npm run lint`: Executa o linter para verificar o código

## Estrutura do Projeto

```
src/
  ├── app/                # Contém as rotas e telas principais do aplicativo, organizadas segundo a convenção de roteamento do Expo Router.
  ├── assets/             # Contém todos os recursos estáticos da aplicação, como imagens, fontes e ícones.
  ├── components/         # Contém componentes visuais e lógicos reutilizáveis.
  ├── constants/          # Armazena valores fixos e reutilizáveis utilizados em diferentes partes da aplicação, como paleta de cores, que não alteram durante a execução do aplicativo
  ├── hooks/              # Contém funções reutilizáveis baseadas nos React Hooks.
  ├── scripts/            # Contém scripts auxiliares usados durante o desenvolvimento.
  ├── .gitignore/         # Contém a lista de arquivos que vão ser ignorados em cada Commit no Git do projeto. Usado par armazenar informações confidenciais
  └── app.json/           # Arquivo de configuração do Expo.
```
