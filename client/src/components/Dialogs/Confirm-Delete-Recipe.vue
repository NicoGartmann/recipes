<template>
  <v-btn color="red" @click="openDialog">
    <v-icon>mdi-trash-can-outline</v-icon>
    <v-dialog
      v-model="confirmDeleteRecipeDialog"
      width="auto"
    >
      <v-card>
        <v-card-text>
          Bist du sicher, dass du das Rezept löschen möchtest?
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="primary" @click="closeDialog">Nein</v-btn>
          <v-btn color="primary" @click="deleteRecipe">Ja</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<script setup>
import {ref} from "vue";
import axios from "axios";

const props = defineProps({
  recipe: Object
})

const confirmDeleteRecipeDialog = ref();

const emit = defineEmits(['recipeDeletedSuccess', 'recipeDeletedFailed']);
const deleteRecipe = () => {
  axios.delete(`api/recipeList/${props.recipe._id}`)
    .then((response) => {
      closeDialog();
      emit("recipeDeletedSuccess", "Rezept erfolgreich gelöscht");
    })
    .catch((error) => {
      console.log(error);
      closeDialog();
      emit("recipeDeletedFailed", "Beim Löschen des Rezeptes ist ein Fehler aufgetreten.");
    })
};

const openDialog = () => {
  confirmDeleteRecipeDialog.value = true;
};

const closeDialog = () => {
  confirmDeleteRecipeDialog.value = false;
};

</script>
