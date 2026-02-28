import type { RootStore } from '../rootStore.ts';

export const userSelector = (state: RootStore) => state.user;
