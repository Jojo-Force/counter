import { useState, useEffect, useRef } from 'react';
import { saveAll, loadItems, loadGroups, loadSettings } from './db';

const DEFAULT_GLOBAL_SETTING = {
  singerCount: false,
  username: '',
  nowGroupId: -1,
  nowItemId: -1,
  fontSize: '30',
  lineHeight: '1.5',
  buttonX: '-50',
  buttonY: '0',
  pinyinEnable: true,
  soundEnable: true,
};

export function useStorage() {
  const [itemDatas, setItemDatas] = useState<any[]>([]);
  const [groupDatas, setGroupDatas] = useState<any[]>([]);
  const [globalSetting, setGlobalSetting] = useState<any>(DEFAULT_GLOBAL_SETTING);
  const [isHydrated, setIsHydrated] = useState(false);
  const hydrated = useRef(false);

  useEffect(() => {
    async function init() {
      const [items, groups, settings] = await Promise.all([
        loadItems(),
        loadGroups(),
        loadSettings(),
      ]);
      setItemDatas(items);
      setGroupDatas(groups);
      if (settings) setGlobalSetting(settings);
      hydrated.current = true;
      setIsHydrated(true);
    }
    init();
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    saveAll(itemDatas, groupDatas, globalSetting).catch((e) =>
      console.error('保存失败', e),
    );
  }, [itemDatas, groupDatas, globalSetting]);

  return {
    itemDatas,
    setItemDatas,
    groupDatas,
    setGroupDatas,
    globalSetting,
    setGlobalSetting,
    isHydrated,
  };
}
