<template>
  <v-app>
    <v-main>
      <Header/>
      <v-container>
        <router-view/>
      </v-container>
      <Footer/>
    </v-main>
  </v-app>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<style>

</style>
