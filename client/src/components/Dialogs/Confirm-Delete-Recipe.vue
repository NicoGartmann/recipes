<template>
  <v-dialog
    v-model="props.openDialog"
    width="auto"
  >
    <v-card>
      <v-card-text>
        Bist du sicher, dass du das Rezept löschen möchtest?
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="primary" @click="emit('closeDialog')">Nein</v-btn>
        <v-btn color="primary" @click="deleteRecipe">Ja</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import axios from "axios";

const props = defineProps({
  openDialog: Boolean,
  recipe: Object
})

const emit = defineEmits(['recipeDeletedSuccess', 'recipeDeletedFailed', 'closeDialog']);
const deleteRecipe = () => {
  axios.delete(`api/recipeList/${props.recipe._id}`)
    .then((response) => {
      emit("recipeDeletedSuccess", "Rezept erfolgreich gelöscht");
      emit("closeDialog");
    })
    .catch((error) => {
      console.log(error);
      emit("recipeDeletedFailed", "Beim Löschen des Rezeptes ist ein Fehler aufgetreten.");
    })
};
</script>
