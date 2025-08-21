import { FilterType } from '@/src/@Types/Filter';
import { FavoriteButton } from '@/src/components/Buttons/favoriteButton';
import { NavigationButton } from '@/src/components/Buttons/navigationButton';
import { FilterOption } from '@/src/components/SearchBar/filterOption';
import { StyledText } from '@/src/components/StyledText';
import { useFilters } from '@/src/Context/filterContext';
import { useTheme } from '@/src/hooks/useTheme';
import { StylesType } from '@/src/themes/Colors';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function FilterFundsPage() {
  const { filters, setFilters } = useFilters();
  const theme = useTheme();
  const style = styles(theme);

  const [valueFilters, setValueFilters] = useState<FilterType[]>([
    //filtros por valor monetario
    {
      id: 1,
      value: '500', //adaptar para como funcionara na api
      text: 'R$0 - R$500',
      selected: false,
    },
    {
      id: 2,
      value: '1000',
      text: 'R$500 - R$1000',
      selected: false,
    },
    {
      id: 3,
      value: '1001',
      text: '+ R$1000',
      selected: false,
    },
  ]);
  const [riskFilters, setRiskFilters] = useState<FilterType[]>([
    //filtros por risco
    {
      id: 4,
      value: 'muito baixo',
      text: 'Muito Baixo',
      color: theme.risk.veryLow,
      selected: false,
    },
    {
      id: 5,
      value: 'baixo',
      text: 'Baixo',
      color: theme.risk.low,
      selected: false,
    },
    {
      id: 6,
      value: 'medio',
      text: 'Médio',
      color: theme.risk.medium,
      selected: false,
    },
    {
      id: 7,
      value: 'alto',
      text: 'Alto',
      color: theme.risk.high,
      selected: false,
    },
  ]);
  const [starFilter, setStarFilter] = useState<FilterType>({
    id: 8,
    value: 'favoritos',
    text: 'Favoritos',
    selected: false,
    color: '#F2C94C', //cor do filtro de favoritos
  });

  useEffect(() => {
    if (filters.length > 1) {
      //atualiza os fltros com base no que foi selecionado anteriormente
      const tempArrayRisk = [...riskFilters]; //cria uma copia da array de filtros de risco
      filters.forEach((e) => {
        if (e.id < 4) {
          const tempArrayValue = [...valueFilters];
          tempArrayValue[e.id - 1] = e;
          setValueFilters(tempArrayValue); //define a risco de filtross igual a sua copia modifica pois pode conter mais de uma alteração
        } else if (e.id < 8) {
          //caso o id esteja no intervalo de ids de filtros de risco altera a copia da array de riscos
          tempArrayRisk[e.id - 4] = e;
        } else {
          //filtro de favoritos
          setStarFilter(e);
        }
      });
      setRiskFilters(tempArrayRisk); //define os filtros de risco igual a sua copia modifica, pois pode conter mais de uma alteração
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateValueFilter = (id: number) => {
    // Atualiza o filtro de valor conforme o selecionado
    setValueFilters((prev) =>
      prev.map(
        (
          filter, //setta uma nova lista de filtros com base no valor retornado nesse map
        ) =>
          filter.id === id
            ? { ...filter, selected: !filter.selected }
            : { ...filter, selected: false }, //caso o filter seja p procurado(id iguais) mudamos o valor do seu selected caso n definimos como false, pois só um filtro de valor pode estar definido por vez
      ),
    );
  };

  const updateRiskFilter = (id: number) => {
    // Atualiza o filtro de valor selecionado
    setRiskFilters((prev) =>
      prev.map(
        (
          filter, //setta uma nova lista de filtros com base no valor retornado nesse map
        ) =>
          filter.id === id ? { ...filter, selected: !filter.selected } : filter, //caso o filter seja p procurado(id iguais) mudamos o valor do seu selected caso n definimos retornamos o filtro sem alterações
      ),
    );
  };

  const updaterStarFilter = () => {
    setStarFilter((prev) => prev! && { ...prev, selected: !prev.selected }); // Atualiza o filtro de favoritos
  };

  const filterSelected = (list: FilterType[]) => {
    return list.filter((e) => e.selected === true); //separa os filtros que estão selecionados
  };

  const updateFilters = () => {
    // cria uma array somente com os filtros selecionados
    let selectedFilters: FilterType[] = [
      ...filterSelected(valueFilters),
      ...filterSelected(riskFilters),
    ];
    if (starFilter.selected) {
      //caso o filtro de favoritos esteja seleciionado adiciona-o no array de filtros selecionados
      selectedFilters = [...selectedFilters, starFilter];
    }
    setFilters(selectedFilters); //defini o valor dos filtros globais de acordo com os filtros selecionados
    router.push('/fundosInvestimentos');
  };

  return (
    <View style={style.pageTheme}>
      <View style={style.starCategorie}>
        <StyledText style={style.categoriesTitle}>Favoritos</StyledText>
        <View style={style.starButton}>
          <FavoriteButton
            onPress={() => updaterStarFilter()}
            selected={starFilter?.selected!}
            text={'Favoritos'}
          />
        </View>
      </View>
      <View>
        <StyledText style={style.categoriesTitle}>Aplicação Inicial</StyledText>
        <View style={style.categoriesCards}>
          {valueFilters.map((e) => (
            <FilterOption
              key={e.id}
              info={e}
              isSelected={e.selected}
              onSelect={(e) => updateValueFilter(e)}
            />
          ))}
        </View>
      </View>
      <View>
        <StyledText style={style.categoriesTitle}>Risco</StyledText>
        <View style={style.categoriiesRiskCards}>
          {riskFilters.map((e) => (
            <FilterOption
              key={e.id}
              info={e}
              isSelected={e.selected}
              onSelect={(e) => updateRiskFilter(e)}
              height={22}
              width={94}
            />
          ))}
        </View>
      </View>
      <View style={style.redirectButton}>
        <NavigationButton onPress={() => updateFilters()} text='Filtrar' />
      </View>
    </View>
  );
}

const styles = (theme: StylesType) => {
  return StyleSheet.create({
    categoriesTitle: {
      color: theme.text,
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 16,
      marginLeft: 22,
      marginTop: 10,
    },
    pageTheme: {
      backgroundColor: theme.background,
      height: '100%',
    },
    categoriesCards: {
      display: 'flex',
      flexDirection: 'row',
      gap: 8,
      justifyContent: 'center',
      width: '100%',
      borderBottomColor: theme.border,
      borderBottomWidth: 1,
      paddingBottom: 24,
      marginBottom: 18,
    },
    starCategorie: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      borderBottomColor: theme.border,
      borderBottomWidth: 1,
      paddingBottom: 16,
      marginBottom: 18,
    },
    starButton: {
      marginLeft: 21,
    },
    categoriiesRiskCards: {
      display: 'flex',
      flexDirection: 'row',
      gap: 4,
      justifyContent: 'center',
      width: '100%',
      borderBottomColor: theme.border,
      borderBottomWidth: 1,
      paddingBottom: 24,
      marginBottom: 18,
    },
    redirectButton: {
      alignItems: 'center',
    },
  });
};
