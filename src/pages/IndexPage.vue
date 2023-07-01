<template>
  <q-page>
    <q-stepper
      v-model="step"
      ref="stepper"
      animated
      contracted
      header-class="hidden"
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
              <q-badge :label="`${channel.songs.length} songs`" />
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
            @click="selectSong(song)"
          >
            <q-item-section>
              <q-item-label>
                {{ song.label }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-step>

      <q-step name="levels" title="Levels">
        <q-list>
          <q-item
            v-for="(level, index) in selectedSong?.levels"
            :key="index"
            :done="selectedLevel"
            clickable
            @click="selectLevel(level)"
          >
            <q-item-section>
              <q-item-label class="text-uppercase">
                {{ level.STEPSTYPE?.slice(level.STEPSTYPE?.indexOf('-') + 1) }}
                {{ level.METER }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn v-if="selectedChannel" label="Back" @click="back" />
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
import { Level } from 'ssc-parser';

const { channels } = useChannelsStore();
const stepper: Ref<QStepper | null> = ref(null);
const step = ref('channels');

let selectedChannel: Channel | null;
let selectedSong: Song | null;
let selectedLevel: Level | null;

const selectChannel = (channel: Channel) => {
  selectedChannel = channel;
  stepper.value?.next();
};

const selectSong = (song: Song) => {
  selectedSong = song;
  stepper.value?.next();
};

const selectLevel = (level: Level) => {
  selectedLevel = level;
  stepper.value?.next();
};

const back = () => {
  if (step.value === 'levels') {
    selectedSong = null;
    stepper.value?.previous();

    return;
  }

  selectedChannel = null;
  stepper.value?.previous();
};
</script>
