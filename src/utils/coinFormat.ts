export const coinFormat = (valor: number) => {
  const formatador = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return formatador.format(valor)
}
