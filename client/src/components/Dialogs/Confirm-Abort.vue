<template>
  <v-btn color="red" @click="openDialog">
    Abbrechen
    <v-dialog
      v-model="confirmAbortDialog"
      width="auto"
    >
      <v-card>
        <v-card-text>
          Bist du sicher, dass du Abbrechen möchtest? Ungespeicherte Änderungen werden verworfen und du wirst zurück auf
          die Übersichtsseite geleitet.
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="primary" @click="closeDialog">Nein</v-btn>
          <v-btn color="primary"><router-link to="/">Ja</router-link></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<script setup>
import {ref} from "vue";

const confirmAbortDialog = ref();

const openDialog = () => {
  confirmAbortDialog.value = true;
};

const closeDialog = () => {
  confirmAbortDialog.value = false;
};

</script>
