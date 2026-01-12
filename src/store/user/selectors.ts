import type { RootStore } from '../rootStore.ts';
import type { UserStore } from './slice.ts';

export const userSelector = (state: RootStore): UserStore => state.user;
