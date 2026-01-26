import { FilterType } from '@/src/@Types/Filter';
import HeaderTabs from '@/src/components/customHeader/HeaderTabs';
import { filtersStringToList } from '@/src/utils/filterUtils';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import WalletPage from '../carteira';
import FundoInvestimento from '../fundosInvestimentos';

export default function PageWithTabs() {
  const { defaultTab, filter = '' } = useLocalSearchParams();
  const [currentTab, setCurrentTab] = useState<string>('');
  const [filterValue, setFilterValue] = useState<FilterType[]>([]);

  useEffect(() => {
    setCurrentTab(typeof defaultTab === 'string' ? defaultTab : '');
  }, [defaultTab]);

  useEffect(() => {
    if (filter !== '') {
      const filterStr = Array.isArray(filter) ? filter.join(',') : filter;
      setFilterValue(filtersStringToList(filterStr));
    }
  }, [filter]);

  return (
    <>
      <HeaderTabs
        activeTab={currentTab as 'carteira' | 'fundos'}
        setActiveTab={(e) => setCurrentTab(e)}
      />
      {currentTab === 'fundos' && <FundoInvestimento filters={filterValue} />}
      {currentTab === 'carteira' && <WalletPage />}
    </>
  );
}
