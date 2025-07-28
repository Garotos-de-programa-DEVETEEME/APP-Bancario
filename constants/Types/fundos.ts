// dados temporarios para a criação do componente

export type fundosType = {
    id: number,
    type: string,
    name: string,
    initialApplication: number,
    rentability: number,
    risk: 'very low' | 'low' | 'medium' | 'high',
}

export const tempFundos:fundosType[]  = [
    {
        id: 1,
        type: 'Fundos Simples',
        name: 'Banestes Invest Facil',
        initialApplication: 1,
        rentability: 102.10,
        risk: 'very low',
    },
    {
        id: 2,
        type: 'Fundos Simples',
        name: 'Banestes Invest Facil',
        initialApplication: 5,
        rentability: 2.10,
        risk: 'low',
    },
    {
        id: 3,
        type: 'Fundos Simples',
        name: 'Banestes Invest Facil',
        initialApplication: 30000,
        rentability: -8.05,
        risk: 'high'
    },
]