<template>
  <q-layout class="bg-purple-10 text-cyan-11 text-neon">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Personal Pump Player </q-toolbar-title>

        <div>Version {{ COMMITS }} ({{ HASH }})</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
const { COMMITS, HASH } = process.env;
</script>
