/**
 * @file Funções utilitárias para transformar e formatar dados, especialmente datas.
 */

/**
 * Converte uma string de data (ISO 8601) ou timestamp para um objeto Date.
 * Retorna null se a entrada for inválida.
 * * @param dateString - A string de data vinda da API (ex: "2023-10-27T10:00:00.000Z").
 * @returns Um objeto Date ou null.
 */
export function convertApiDateToDate(dateString: string | number | undefined | null): Date | null {
    if (!dateString) {
        return null;
    }

    // O construtor Date aceita strings ISO e timestamps numéricos
    const date = new Date(dateString);

    // Verifica se a data é válida (getTime() retorna NaN para datas inválidas)
    if (isNaN(date.getTime())) {
        console.error("Data string inválida recebida da API:", dateString);
        return null;
    }

    return date;
}

/**
 * Formata um objeto Date (ou string de API) para o formato DD/MM/AAAA.
 * * @param dateInput - Objeto Date, string da API, ou null/undefined.
 * @returns A data formatada como string (ex: "27/10/2023") ou uma string vazia.
 */
export function formatDateToBr(dateInput: Date | string | undefined | null): string {
    const date = typeof dateInput === 'string'
        ? convertApiDateToDate(dateInput)
        : dateInput;

    if (!date) {
        return '';
    }

    // Usa Intl.DateTimeFormat para formatação robusta e localizada
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(date);
}


/**
 * Formata um objeto Date (ou string de API) para o formato DD/MM/AAAA HH:MM:SS.
 * * @param dateInput - Objeto Date, string da API, ou null/undefined.
 * @returns A data e hora formatadas (ex: "27/10/2023 10:00:00") ou uma string vazia.
 */
export function formatDateTimeToBr(dateInput: Date | string | undefined | null): string {
    const date = typeof dateInput === 'string'
        ? convertApiDateToDate(dateInput)
        : dateInput;

    if (!date) {
        return '';
    }

    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    }).format(date);
}

