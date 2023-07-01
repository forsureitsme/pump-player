<template>
  <q-page>
    <q-stepper
      v-model="step"
      ref="stepper"
      animated
      swipeable
      contracted
      :header-nav="false"
    >
      <q-step name="channels" title="Channels">
        <q-list>
          <q-item
            v-for="channel in channels"
            :key="channel.name"
            :done="selectedChannel"
            clickable
            @click="selectChannel(channel)"
          >
            <q-item-section>
              <q-item-label>{{ channel.name }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-badge :label="channel.songs.length" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-step>

      <q-step name="songs" title="Songs">
        <q-list>
          <q-item
            v-for="(song, index) in selectedChannel?.songs"
            :key="index"
            :done="selectedSong"
            clickable
            @click="selectedSong = song"
          >
            <q-item-section>
              <q-item-label>
                {{ song.label }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn v-if="selectedChannel" label="Back" />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </q-page>
</template>
<script lang="ts" setup>
import { Ref, ref } from 'vue';
import { useChannelsStore } from '../stores/channels';
import { Channel } from '../models/channel';
import { Song } from '../models/song';
import { QStepper } from 'quasar';

const { channels } = useChannelsStore();
const stepper: Ref<QStepper | null> = ref(null);
const step = ref('channels');

let selectedChannel: Channel;
let selectedSong: Song;

const selectChannel = (channel: Channel) => {
  selectedChannel = channel;
  stepper.value?.next();
};
</script>
