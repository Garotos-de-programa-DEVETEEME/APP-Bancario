import { FundoInvestimento } from '@/src/@Types/fundos'; // Verifique se este caminho está correto
import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

//TODO: Trocar essa tela placeholder com a tela oficial

export default function DetalhesInvestimento() {
    const { fundData } = useLocalSearchParams();
    
    const fund: FundoInvestimento | null =
    typeof fundData === 'string' ? JSON.parse(fundData) : null

  return (
    <ScrollView style={styles.scrollView}>
      <Stack.Screen options={{ title: 'Detalhes do Fundo' }} />
      <View style={styles.container}>
        {!fund ? (
          <Text>Erro: Dados do fundo não encontrados.</Text>
        ) : (
          <>
            <Text style={styles.title}>{fund.nome}</Text>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Aplicação Inicial</Text>
              <Text style={styles.value}>
                R$ {fund.valorAplicacaoInicial.toFixed(2)}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Rentabilidade (12M)</Text>
              <Text style={styles.value}>{fund.taxaRentabilidade}%</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Taxa de Administração</Text>
              <Text style={styles.value}>{fund.taxaAdministracao}% a.a.</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Prazo de Resgate</Text>
              <Text style={styles.value}>
                D+{fund.prazoConversaoResgate} (Dias Úteis)
              </Text>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: { backgroundColor: '#FFFFFF' },
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#1A202C',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  label: { fontSize: 16, color: '#4A5568' },
  value: { fontSize: 16, fontWeight: '600', color: '#2D3748' },
})