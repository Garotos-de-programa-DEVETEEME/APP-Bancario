// dados temporarios para a criação do componente

export type fundosType = {
    id: number,
    type: string,
    name: string,
    initialApplication: number,
    rentability: number,
    risk: 'muito baixo' | 'baixo' | 'medio' | 'alto',
    globalTax: number,
    limitTimer: number,//alterar para data
    movimentation:number,
    daysRescue:number,
    daysLiquidation:number,
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
        globalTax: 0.8,
        limitTimer: 17,//alterar para data
        movimentation: 1,
        daysRescue: 30,
        daysLiquidation: 1,
    },
    {
        id: 2,
        type: 'Fundos Simples',
        name: 'Banestes Dividendo Fi',
        initialApplication: 5,
        rentability: 2.10,
        risk: 'baixo',
        globalTax: 0.8,
        limitTimer: 17,//alterar para data
        movimentation: 1,
        daysRescue: 30,
        daysLiquidation: 1,
    },
    {
        id: 3,
        type: 'Fundos Simples',
        name: 'Banestes Invest Money FI Renda Fixa',
        initialApplication: 3000,
        rentability: -8.05,
        risk: 'alto',
        globalTax: 0.8,
        limitTimer: 17,//alterar para data
        movimentation: 1,
        daysRescue: 30,
        daysLiquidation: 1,
    },
]