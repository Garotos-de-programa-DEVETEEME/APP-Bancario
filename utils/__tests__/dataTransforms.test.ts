import {
    convertApiDateToDate,
    formatDateTimeToBr,
    formatDateToBr,
} from '../data-transforms.utils'

describe('Data Transforms (Utilitários)', () => {

    const ISO_DATE_STRING = '2025-10-16T10:30:00.000Z';
    const dateUTC = new Date(ISO_DATE_STRING);

    // --- Testes de Conversão ---

    describe('convertApiDateToDate', () => {
        it('deve retornar um objeto Date válido para uma string ISO', () => {
            const result = convertApiDateToDate(ISO_DATE_STRING);
            expect(result).toBeInstanceOf(Date);
            expect(result?.getTime()).toBe(dateUTC.getTime());
        });

        it('deve retornar null para entrada null ou undefined', () => {
            expect(convertApiDateToDate(null)).toBeNull();
            expect(convertApiDateToDate(undefined)).toBeNull();
        });

        it('deve retornar null para uma string de data inválida', () => {
            expect(convertApiDateToDate('data-invalida')).toBeNull();
        });
    });

    // --- Testes de Formatação ---

    describe('formatDateToBr', () => {
        it('deve formatar a string ISO para DD/MM/AAAA', () => {
            // Se a entrada é 2025-10-16T... , a saída deve ser 16/10/2025.
            expect(formatDateToBr(ISO_DATE_STRING)).toBe('16/10/2025');
        });

        it('deve retornar string vazia para entrada null', () => {
            expect(formatDateToBr(null)).toBe('');
        });
    });

    describe('formatDateTimeToBr', () => {
        // Mock global para estabilizar a data e hora (opcional, mas recomendado)
        // Se você não usar o mock de fuso horário, a saída do teste pode variar
        // dependendo de onde ele é executado.

        const originalDateTimeFormat = Intl.DateTimeFormat;

        beforeAll(() => {
            // MOCK: Temporariamente forçamos o fuso horário para UTC/GMT.
            // Isso garante que 10:30:00Z seja interpretado como 10:30:00.
            global.Intl.DateTimeFormat = jest.fn((_locale, options) => {
                return new originalDateTimeFormat('pt-BR', {
                    ...options,
                    timeZone: 'UTC', // Força o fuso horário para UTC
                })
            }) as any
        });

        afterAll(() => {
            // Restaura o objeto original após todos os testes
            global.Intl.DateTimeFormat = originalDateTimeFormat;
        });

        it('deve formatar a string ISO (UTC) para DD/MM/AAAA HH:MM:SS (UTC)', () => {
            const expected = '16/10/2025, 10:30:00';

            const result = formatDateTimeToBr(ISO_DATE_STRING);

            expect(result).toBe(expected);
        });

        it('deve formatar um objeto Date (UTC) para DD/MM/AAAA HH:MM:SS (UTC)', () => {
            const dateObjectUTC = new Date(ISO_DATE_STRING);
            const expected = '16/10/2025, 10:30:00';

            const result = formatDateTimeToBr(dateObjectUTC);

            expect(result).toBe(expected);
        });

        it('deve retornar string vazia para entrada null, undefined ou inválida', () => {
            expect(formatDateTimeToBr(null)).toBe('');
            expect(formatDateTimeToBr(undefined)).toBe('');
            expect(formatDateTimeToBr('data-ruim')).toBe('');
        });
    });

});
