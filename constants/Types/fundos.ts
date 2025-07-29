// dados temporarios para a criação do componente

export type fundosType = {
    id: number,
    type: string,
    name: string,
    initialApplication: number,
    rentability: number,
    risk: 'muito baixo' | 'baixo' | 'medio' | 'alto',
}
//excluir daqui para baixo
export const tempFundos:fundosType[]  = [
    {
        id: 1,
        type: 'Fundos Simples',
        name: 'Banestes Invest Facil',
        initialApplication: 1,
        rentability: 102.10,
        risk: 'muito baixo',
    },
    {
        id: 2,
        type: 'Fundos Simples',
        name: 'Banestes Dividendo Fi',
        initialApplication: 5,
        rentability: 2.10,
        risk: 'baixo',
    },
    {
        id: 3,
        type: 'Fundos Simples',
        name: 'Banestes Invest Money FI Renda Fixa',
        initialApplication: 3000,
        rentability: -8.05,
        risk: 'alto'
    },
]