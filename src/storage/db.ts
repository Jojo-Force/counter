import Dexie, { type Table } from 'dexie';

interface ItemData {
  id: number;
  groupId: number;
  num: number;
  title: string;
  time: string;
  name: string;
  selected: string;
}

interface GroupData {
  id: number;
  groupName: string;
}

interface GlobalSetting {
  singerCount: boolean;
  username: string;
  nowGroupId: number;
  nowItemId: number;
  fontSize: string;
  lineHeight: string;
  buttonX: string;
  buttonY: string;
  pinyinEnable: boolean;
  soundEnable: boolean;
}

interface AppDataRow {
  key: string;
  value: unknown;
}

class CounterDB extends Dexie {
  appData!: Table<AppDataRow, string>;

  constructor() {
    super('CounterDB');
    this.version(1).stores({
      appData: 'key',
    });
  }
}

export const db = new CounterDB();

export async function saveAll(
  items: ItemData[],
  groups: GroupData[],
  settings: GlobalSetting,
): Promise<void> {
  await db.transaction('rw', db.appData, async () => {
    await db.appData.put({ key: 'items', value: items });
    await db.appData.put({ key: 'groups', value: groups });
    await db.appData.put({ key: 'settings', value: settings });
  });
}

export async function loadItems(): Promise<ItemData[]> {
  const row = await db.appData.get('items');
  return (row?.value as ItemData[]) ?? [];
}

export async function loadGroups(): Promise<GroupData[]> {
  const row = await db.appData.get('groups');
  return (row?.value as GroupData[]) ?? [];
}

export async function loadSettings(): Promise<GlobalSetting | null> {
  const row = await db.appData.get('settings');
  return (row?.value as GlobalSetting) ?? null;
}
