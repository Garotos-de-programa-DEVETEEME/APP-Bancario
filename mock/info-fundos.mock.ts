import { InfoFundosResponse } from '@/services/info-fundos.service'

const MOCK_INFO_FUNDOS_RESPONSE: InfoFundosResponse = {
    fundos: [
        {
            id: '36_tenax',
            nomeCompleto:
                'BANESTES TENAX AÇÕES FIF EM COTAS DE FUNDOS DE INVESTIMENTO EM AÇÕES RESPONSABILIDADE LIMITADA',
            descricaoCurta:
                "O fundo se caracteriza como fundo de investimento financeiro 'FIF' e contará com CLASSE única de cotas.",
            publicoAlvo:
                'O FUNDO é destinado à captação de recursos de investidores pessoas físicas e/ou jurídicas em geral, sujeitos a limites de aplicações estabelecidos pelo ADMINISTRADOR, designados, coletivamente, COTISTAS ou, individualmente, COTISTA.',
            objetivo:
                'A CLASSE tem por objetivo propiciar aos seus COTISTAS a valorização de suas cotas por meio da aplicação dos recursos em cotas da SUBCLASSE TENAX BS AÇÕES FIA, identificador CVM AFWZN1749667659, (SUBCLASSE INVESTIDA) DA CLASSE ÚNICA DE COTAS DO TENAX AÇÕES MASTER FUNDO DE INVESTIMENTO FINANCEIRO EM AÇÕES RESPONSABILIDADE LIMITADA, inscrita no CNPJ sob o nº 45.127.383/0001-00, designada CLASSE INVESTIDA, além de outros ativos financeiros disponíveis no âmbito do mercado financeiro e de capitais, sem perseguir uma correlação com qualquer índice de ações ou benchmark específico. O objetivo da CLASSE, o qual o GESTOR perseguirá, não constitui, em hipótese alguma, garantia ou promessa de rendimento por parte do ADMINISTRADOR e/ou do GESTOR.',
            politicaInvestimento:
                "A CLASSE é classificada como classe de investimento em cotas de classe de fundos de investimento em ações e investirá, no mínimo 95% (noventa e cinco por cento) de seu patrimônio líquido em cotas da SUBCLASSE TENAX BS AÇÕES FIA (identificador CVM AFWZN1749667659), designada SUBCLASSE INVESTIDA, DA CLASSE ÚNICA DE COTAS DO TENAX AÇÕES MASTER FUNDO DE INVESTIMENTO FINANCEIRO EM AÇÕES RESPONSABILIDADE LIMITADA, inscrita no CNPJ sob o nº 45.127.383/0001-00, designada CLASSE INVESTIDA. Os 5% (cinco por cento) remanescentes de seu patrimônio líquido podem ser aplicados em: a) Títulos de emissão do Tesouro Nacional registrados no Sistema Especial de Liquidação e Custódia - SELIC e/ou operações compromissadas lastreadas nesses títulos; b) Ativos financeiros de renda fixa de emissão ou coobrigação de instituição financeira bancária autorizada a funcionar pelo Banco Central do Brasil ressalvadas as vedações previstas nas Resoluções CMN n° 4.994/22 e 4.963/21 e alterações posteriores; c) cotas de classe de FIF classificadas como 'Renda Fixa'.",
            caracteristicas: {
                classificacaoRisco: 'Alto',
                classificacaoCVM: 'Ações',
                subclasseCVM: 'Não se aplica',
                tipoANBIMA: 'Ações Ativos Livre',
            },
            condicoesComerciais: {
                aplicacaoInicial: 'R$ 1.000,00',
                investimentoAdicionalMinimo: 'R$ 0,00',
                resgateMinimo: 'R$ 0,00',
                saldoMinimoPermanencia: 'R$ 100,00',
                tipoCota: 'Fechamento',
                carencia: 'Não há',
                cotaAplicacao: 'D+1 dias úteis',
                cotaResgate: 'D+28 dias corridos',
                debitoContaCorrente: 'D+0',
                creditoContaCorrente: 'D+32 (28 dias corridos + 4 dias úteis)',
                horarioLimite: 'Até as 12:00h',
            },
            taxas: {
                taxaGlobal: '2,00 % a.a.',
                taxaPerformance: 'Não há',
                taxaIngresso: 'Não há',
                taxaSaida: 'Não há',
            },
            prestadoresServicos: {
                administradorFiduciario: 'Banestes DTVM S.A.',
                gestorRecursos: 'Banestes DTVM S.A.',
                tesourariaControleProcessamento: 'Banestes DTVM S.A.',
                escrituracaoEmissaoResgate: 'Banestes DTVM S.A.',
                custodiaAtivosFinanceiros: 'Banestes S.A.',
                distribuicaoCotas: 'Banestes S.A.',
                auditorIndependente: 'RSM Brasil Auditores Independentes',
            },
            tributacao: {
                iof: {
                    titulo: 'IOF',
                    descricao:
                        'Atualmente, os resgates de cotas dos fundos de investimento em ações estão isentos de Imposto Sobre Operações Financeiras (IOF).',
                },
                ir: {
                    titulo: 'IR',
                    descricao:
                        'Os cotistas do Fundo sofrerão tributação na fonte, exclusivamente no resgate de cotas, sobre o rendimento auferido no período, à alíquota de 15% (quinze por cento).',
                },
                tabelaLongoPrazo: null,
                tabelaCurtoPrazo: null,
                observacao: null,
            },
            documentos: [
                {
                    titulo: 'Lâmina',
                    url: '/investimentos/pdf/lamina_tenax.pdf',
                },
                {
                    titulo: 'Política de Exercício de Direito de Voto em Assembleia',
                    url: '/investimentos/pdf/36_politica_tenax.pdf',
                },
                {
                    titulo: 'Principais Fatores de Risco do Fundo',
                    url: '/investimentos/pdf/36_risco_tenax.pdf',
                },
                {
                    titulo: 'Regulamento',
                    url: 'pdf/36_regulamento_tenax.pdf',
                },
                {
                    titulo: 'Sumário de Remuneração',
                    url: 'pdf/36_sumario_tenax.pdf',
                },
                {
                    titulo: 'Termo de Adesão',
                    url: 'pdf/termo_tenax.pdf',
                },
            ],
            comunicados: [],
        },
        {
            id: '13_tesouro',
            nomeCompleto: 'Banestes Tesouro FI Renda Fixa Referenciado DI',
            descricaoCurta:
                'O FUNDO se caracteriza como fundo de investimento financeiro »FIF« e contará com a CLASSE única de cotas.',
            publicoAlvo:
                'O FUNDO é destinado à aplicação de recursos de órgãos da administração pública direta e indireta vinculadas ao Poder Executivo do Estado do Espírito Santo doravante designados, coletivamente, COTISTAS ou, individualmente, COTISTA.',
            objetivo:
                'A CLASSE tem por objetivo propiciar aos seus COTISTAS a valorização de suas cotas por meio da aplicação dos recursos em ativos financeiros e/ou demais modalidades operacionais disponíveis no âmbito do mercado financeiro, buscando acompanhar as variações das taxas de juros CDI, observado que a rentabilidade da CLASSE será impactada pelos custos e despesas do FUNDO, da CLASSE e da(s) subclasse(s), se houver. O objetivo descrito no caput, o qual o GESTOR perseguirá, não constitui, em hipótese alguma, garantia ou promessa de rendimento por parte do ADMINISTRADOR e/ou do GESTOR.',
            politicaInvestimento:
                'A CLASSE é classificada como Renda Fixa Referenciada DI e, para atingir seus objetivos, no mínimo, 95% (noventa e cinco por cento) do seu patrimônio líquido será aplicado em ativos financeiros e/ou modalidades operacionais que acompanhem, direta ou indiretamente, a variação da taxa de juros dos Certificados de Depósito Interbancário - CDI ou da taxa SELIC.',
            caracteristicas: {
                classificacaoRisco: 'Baixo',
                classificacaoCVM: 'Renda Fixa',
                subclasseCVM: 'Referenciado DI',
                tipoANBIMA: 'Renda Fixa Duração Baixa Grau de Investimento',
            },
            condicoesComerciais: {
                aplicacaoInicial: 'R$ 0,00',
                investimentoAdicionalMinimo: 'R$ 0,00',
                resgateMinimo: 'R$ 0,00',
                saldoMinimoPermanencia: 'R$ 0,00',
                tipoCota: 'Fechamento',
                carencia: 'Não há',
                cotaAplicacao: 'D+0',
                cotaResgate: 'D+0',
                debitoContaCorrente: 'D+0',
                creditoContaCorrente: 'D+0',
                horarioLimite: 'Até as 17:00h',
            },
            taxas: {
                taxaAdministracao: '0,20 % a.a.', // Note: Aqui é 'taxaAdministracao' em vez de 'taxaGlobal'
                taxaPerformance: 'Não há',
                taxaIngresso: 'Não há',
                taxaSaida: 'Não há',
            },
            prestadoresServicos: {
                administradorFiduciario: 'Banestes DTVM S.A.',
                gestorRecursos: 'Banestes DTVM S.A.',
                tesourariaControleProcessamento: 'Banestes DTVM S.A.',
                escrituracaoEmissaoResgate: 'Banestes DTVM S.A.',
                custodiaAtivosFinanceiros: 'Banestes S.A.',
                distribuicaoCotas: 'Banestes S.A.',
                auditorIndependente: 'RSM Brasil Auditores Independentes',
            },
            tributacao: {
                iof: {
                    titulo: 'IOF',
                    descricao:
                        'Imposto sobre operações financeiras - os percentuais do IOF são decrescentes conforme tabela válida para todo o mercado. Há incidência sobre o valor dos rendimentos, quando a aplicação for efetuada por prazo inferior a 30 dias.',
                },
                ir: {
                    titulo: 'IR',
                    descricao:
                        'Para fins de incidência do Imposto de Renda (IR) para os cotistas, por ocasião do resgate e em função do prazo de permanência, o Fundo busca o tratamento tributário aplicado aos fundos classificados como de longo prazo, considerados aqueles cuja carteira de títulos tenha prazo médio superior a 365 dias.',
                },
                tabelaLongoPrazo: {
                    descricao:
                        'Neste caso os rendimentos obtidos pelos cotistas sujeitam-se à incidência do IR no último dia útil dos meses de maio e novembro de cada ano (come-cotas), a alíquota de 15%, ou por ocasião do resgate, às seguintes alíquotas:',
                    aliquotas: [
                        {
                            prazo: '0 até 180',
                            aliquotaBasica: '15,00%',
                            aliquotaComplementar: '7,50%',
                            total: '22,50%',
                        },
                        {
                            prazo: '181 até 360',
                            aliquotaBasica: '15,00%',
                            aliquotaComplementar: '5,00%',
                            total: '20,00%',
                        },
                        {
                            prazo: '361 até 720',
                            aliquotaBasica: '15,00%',
                            aliquotaComplementar: '2,50%',
                            total: '17,50%',
                        },
                        {
                            prazo: 'Acima de 720',
                            aliquotaBasica: '15,00%',
                            aliquotaComplementar: '0,00%',
                            total: '15,00%',
                        },
                    ],
                },
                tabelaCurtoPrazo: {
                    descricao:
                        'Na hipótese do prazo médio da carteira do Fundo permanecer igual ou inferior a 365 dias por mais de 3 vezes ou por mais de 45 dias no ano, os Cotistas passarão a ser tributados conforme tributações aplicáveis aos fundos de investimento de curto prazo. Neste caso, os rendimentos obtidos pelos cotistas sujeitam-se à incidência do IR no último dia útil dos meses de maio e novembro de cada ano (come-cotas), a alíquota de 20%, ou por ocasião do resgate, às seguintes alíquotas:',
                    aliquotas: [
                        {
                            prazo: '0 até 180',
                            aliquotaBasica: '20,00%',
                            aliquotaComplementar: '2,50%',
                            total: '22,50%',
                        },
                        {
                            prazo: 'Acima de 180',
                            aliquotaBasica: '20,00%',
                            aliquotaComplementar: '0,00%',
                            total: '20,00%',
                        },
                    ],
                },
                observacao:
                    'O Gestor busca manter a carteira de ativos do Fundo com prazo médio superior a 365 dias. Contudo, não há garantia de que o Fundo terá tratamento tributário para fundos de longo prazo, existindo o risco de aplicar a tributação dos fundos de investimento de curto prazo.',
            },
            documentos: [
                {
                    titulo: 'Declarações Complementares do Investidor',
                    url: 'pdf/declaracao_investidor.pdf',
                },
                {
                    titulo: 'Demonstração de Desempenho',
                    url: 'pdf/demonstracao_de_desempenho_banestes-tesouro.pdf',
                },
                {
                    titulo: 'Demonstrações Contábeis',
                    url: '/institucional/demo_fundos_tesouro.html',
                },
                {
                    titulo: 'Lâmina',
                    url: 'pdf/lamina_tesouro_novo.pdf',
                },
                {
                    titulo: 'Material Publicitário',
                    url: 'pdf/tesouro_novo_1.pdf',
                },
                {
                    titulo: 'Política de Exercício de Direito de Voto em Assembleia',
                    url: '/investimentos/pdf/politica_exercicio_direito_voto-assembleia.pdf',
                },
                {
                    titulo: 'Principais Fatores de Risco do Fundo',
                    url: '/investimentos/pdf/13_risco_tesouro.pdf',
                },
                {
                    titulo: 'Regulamento',
                    url: 'pdf/13_regulamento_tesouro.pdf',
                },
                {
                    titulo: 'Rentabilidade e Carteira',
                    url: 'pdf/rentabilidade-tesouro1.pdf',
                },
                {
                    titulo: 'Sumário de Remuneração',
                    url: 'pdf/13_sumario_tesouro.pdf',
                },
                {
                    titulo: 'Termo de Adesão',
                    url: 'pdf/13_adesao_tesouro_175.pdf',
                },
            ],
            comunicados: [
                {
                    data: '29.05.2025',
                    titulo: 'Ata da Assembleia Geral de Cotistas',
                    url: 'pdf/comunicados/13TESOURO-ATA.pdf',
                },
                {
                    data: '29.05.2025',
                    titulo: 'Resumo das Deliberações da Assembleia Geral de Cotistas',
                    url: 'pdf/comunicados/13TESOURO-ResumodasDeliberacoes.pdf',
                },
                {
                    data: '16.04.2025',
                    titulo: 'Edital de Convocação - Assembleia Geral de Cotistas',
                    url: 'pdf/comunicados/13TESOURO-Edital_de_Convocação.pdf',
                },
                {
                    data: '20.03.2025',
                    titulo: 'Adaptação do Regulamento aos termos da Resolução CVM n°175',
                    url: 'pdf/comunicados/Comunicado_Banestes_Tesouro_.pdf',
                },
                {
                    data: '27.02.2025',
                    titulo: 'Funcionamento no Feriado de Carnaval 2025 - Fundos de Investimento',
                    url: 'pdf/comunicados/comunicado_27_02_2025.pdf',
                },
                {
                    data: '16.12.2024',
                    titulo: 'Procedimentos Final do Ano - Fundos de Investimento',
                    url: 'pdf/comunicados/invest_comunicado_16_12_2024.pdf',
                },
                {
                    data: '09.12.2024',
                    titulo: 'Ata da Assembleia Geral Extraordinária',
                    url: 'pdf/comunicados/invest_comunicado_ata_age_09_12_2024.pdf',
                },
                {
                    data: '09.12.2024',
                    titulo: 'Resumo das Deliberações da Assembleia Geral Extraordinária',
                    url: 'pdf/comunicados/resumo-das-deliberacoes.pdf',
                },
                {
                    data: '09.12.2024',
                    titulo: 'Minuta de Alteração do Regulamento',
                    url: 'pdf/comunicados/minuta-de-alteracao-do-regulamento.pdf',
                },
                {
                    data: '09.12.2024',
                    titulo: 'Edital de Convocação- Assembleia Geral Extraordinária',
                    url: 'pdf/comunicados/resumo_das_alteracoes_tesouro.pdf',
                },
            ],
        },
    ],
}

/**
 * Simula uma chamada assíncrona para consultar as informações detalhadas dos fundos.
 * Simula um atraso de rede e retorna os dados mockados.
 */
export async function mockConsultarInfoFundos(): Promise<InfoFundosResponse> {
    console.log('[MOCK] Consultando informações detalhadas de fundos (simulado)...')

    // Simula um atraso de rede
    await new Promise(resolve => setTimeout(resolve, 1200)) // 1.2 segundos de atraso

    console.log('[MOCK] Informações detalhadas de fundos retornadas com sucesso (simulado).')

    return MOCK_INFO_FUNDOS_RESPONSE
}
