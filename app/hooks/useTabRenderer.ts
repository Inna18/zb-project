import { useEffect, useState } from 'react';

export const useTabRenderer = (
  list: { id: number; value: string; component: React.JSX.Element }[]
) => {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  useEffect(() => {
    if (list.length > 0) setActiveTab(list[0].value);
  }, [list.length]);

  const handleActiveTab = (tab: string) => setActiveTab(tab);

  const tabRenderer = () => {
    if (activeTab) return getComponent(activeTab);
  };

  const getComponent = (tab: string) => {
    if (list.length > 0) {
      return list.filter((element) => {
        return element.value === tab;
      })[0].component;
    }
  };

  return { handleActiveTab, tabRenderer, activeTab };
};
