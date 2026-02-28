import type { RootStore } from '../rootStore.ts';
import type { ApiStore } from './slice.ts';

export const apiSelector = (state: RootStore): ApiStore => state.api;
