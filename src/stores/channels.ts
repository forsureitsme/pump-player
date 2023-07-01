import { defineStore } from 'pinia';
import { Channel } from 'src/models/channel';

export const useChannelsStore = defineStore('channels', {
  state: () => ({
    channels: Array<Channel>(),
  }),
});
