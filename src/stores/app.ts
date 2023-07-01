import { defineStore } from 'pinia';

export interface AppState {
  commits: string | null;
  hash: string | null;
}

export const useAppStore = defineStore('app', {
  state: () =>
    ({
      commits: null,
      hash: null,
    } as AppState),
});
