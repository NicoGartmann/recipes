<template>
  <v-dialog
    v-model="props.openDialog"
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
        <v-btn color="primary">
          <router-link to="/">Ja</router-link>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  openDialog: Boolean
});

const emit = defineEmits(['closeDialog'])
const closeDialog = () => {
  emit("closeDialog");
};
</script>
