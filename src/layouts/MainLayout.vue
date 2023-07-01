<template>
  <q-layout class="bg-purple-10 text-cyan-11 text-neon">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Personal Pump Player </q-toolbar-title>

        <div>Version {{ commits }} ({{ hash }})</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useAppStore } from 'src/stores/app';

const { commits, hash } = useAppStore();
</script>
