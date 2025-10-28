export function converterNumeroParaHora(numero: number): string {
  const numeroString = numero.toString().padStart(4, '0');
  const horas = numeroString.slice(0, 2);
  const minutos = numeroString.slice(2, 4);

  return `${horas}:${minutos}`;
}
