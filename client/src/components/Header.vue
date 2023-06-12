<template>
  <v-app-bar rounded>
    <v-app-bar-title><router-link to="/">Rezepte</router-link></v-app-bar-title>
    <template v-slot:append>
      <router-link to="/create"><v-btn prepend-icon="mdi-plus">Hinzufügen</v-btn></router-link>
      <router-link to="/search"><v-btn prepend-icon="mdi-magnify">Suchen</v-btn></router-link>
    </template>
  </v-app-bar>
</template>
<script setup>
</script>
