# App IPSUM

![React Native](https://img.shields.io/badge/React_Native-v0.76-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-v5.0-blue)

## Visão Geral do Projeto

O **App IPSUM** é uma demonstração de uma aplicação móvel desenvolvida para simular o ecossistema de investimentos de um banco digital. O projeto apresenta uma interface de alta fidelidade que permite ao utilizador gerir o seu património, consultar a evolução de ativos e realizar simulações de rendimento em tempo real.

| Dashboard | Home-page | Carteira |
|:---:|:---:|:---:|
| <img src="https://github.com/rafaelbcrema/images-ipsum/blob/main/main.png?raw=true" width="200" /> | <img src="https://github.com/rafaelbcrema/images-ipsum/blob/main/home.png?raw=true" width="200" /> | <img src="https://github.com/rafaelbcrema/images-ipsum/blob/main/wallet.png?raw=true" width="200" /> |

## Arquitetura e Decisões Técnicas

A aplicação foi construída sobre o ecossistema **Expo (SDK 52)**, tirando partido das mais recentes funcionalidades do React Native.

Foi adotado o **Expo Router** para uma gestão de rotas baseada em ficheiros. A estrutura de pastas segue uma organização modular, separando claramente as camadas de visualização (`src/app`), lógica de negócio (`src/hooks`) e componentes de interface (`src/components`).

A aplicação integra a **Context API** na gestão centralizada de estados globais e o **NativeWind** para uma estilização dinâmica. A performance visual é assegurada pela biblioteca **Reanimated**, otimizando a renderização de listas e transições para manter uma fluidez constante de 60fps.

Todo o projeto foi desenvolvido em **TypeScript**. As interfaces definidas em `src/@Types` asseguram a integridade dos dados que fluem entre os componentes.
## Funcionalidades Implementadas

A aplicação cobre os principais pontos de uma jornada essencial para um investidor:

1.  **Dashboard e Carteira:** Visualização do saldo total e gráficos de alocação de ativos renderizados via SVG.
2.  **Sistema de Filtros:** Um motor de busca que permite classificar fundos por nível de risco, valor mínimo e categoria.
3.  **Personalização:** Suporte completo a tema escuro, com a preferência do utilizador salva localmente.
4.  **Simulação:** Ferramenta para projeção de rendimentos futuros com base em taxas pré-definidas.

## Estrutura do Projeto e Pastas
```
src/
├── @Types/         # Definições de Tipos TypeScript
├── app/            # Rotas e Telas
├── components/     # Componentes Reutilizáveis
├── Context/        # Gestão de Estado Global
├── data/           # Mock Data (Simulação de API)
├── hooks/          # Custom Hooks
├── themes/         # Definições de cores e estilos
└── utils/          # Funções utilitárias (Formatação de moeda/hora)
```

## Pré-requisitos e Instalação

Para executar este projeto localmente, é necessário ter o ambiente Node.js configurado.

```bash
# 1. Clonar o repositório
git clone [https://github.com/Garotos-de-programa-DEVETEEME/APP-Bancario.git](https://github.com/Garotos-de-programa-DEVETEEME/APP-Bancario.git)

# 2. Ir ao diretório do projeto
cd APP-BANCARIO

# 3. Instalar as dependências
npm install

# 4. Executar o servidor de desenvolvimento
npm start
```

   ## Equipe

   Projeto desenvolvido com dedicação por:

**[Arthur Marinho](https://www.linkedin.com/in/arthurcmarinho/)** •  **[Lucas Machado](https://www.linkedin.com/in/dev-lucas-machado/)** •  **[Rafael Crema](https://www.linkedin.com/in/rafaelbcrema/)**

© 2026 **Arthur Marinho, Lucas Machado e Rafael Crema**. Todos os direitos reservados.
Este projeto é para fins exclusivos de portfólio e demonstração. A reprodução, distribuição ou uso comercial deste código sem autorização expressa dos autores é proibida.
