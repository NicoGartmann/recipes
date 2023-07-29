<template>
  <v-row>
    <v-col>
      <h1>Rezepte</h1>
    </v-col>
  </v-row>


  <v-row v-if="recipes.length !== 0">
    <v-col v-for="recipe in recipes" :key="recipe.name">
      <v-card :title="recipe.name" :subtitle="recipe.author" :text="recipe.description">
        <v-card-actions>
          <v-btn>
            <router-link :to="recipe._id">Details anzeigen</router-link>
          </v-btn>
          <v-spacer/>
          <v-btn color="red" @click="openDialog = true">
            <v-icon>mdi-trash-can-outline</v-icon>
            <ConfirmDeleteRecipe :open-dialog="openDialog" v-bind="{recipe}" @recipe-deleted-success="recipeDeletedSuccess"
                                 @recipe-deleted-failed="recipeDeletedFailed" @close-dialog="openDialog = false"/>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  <v-row v-else>
    <v-col>
      <p>Es sind noch keine Rezepte vorhanden. Erstelle ein neues Rezept
        <router-link to="/create">hier</router-link>
      </p>
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <v-snackbar :color="snackBarColor" v-model="snackBarTrigger">
        {{ snackBarMessage }}
      </v-snackbar>
    </v-col>
  </v-row>
</template>

<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import ConfirmDeleteRecipe from "@/components/Dialogs/Confirm-Delete-Recipe.vue";

const openDialog = ref(false);

const snackBarTrigger = ref(false);
const snackBarMessage = ref();
const snackBarColor = ref('');

const recipes = ref([]);
const fetchRecipes = () => {
  axios.get("api/recipeList")
    .then((response) => {
      recipes.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    })
}

const recipeDeletedSuccess = (message) => {
  showSnackbar('green', message);
  fetchRecipes();
}

const recipeDeletedFailed = (message) => {
  showSnackbar('red', message);
  fetchRecipes();
}

const showSnackbar = (color, message) => {
  snackBarTrigger.value = true;
  snackBarColor.value = color;
  snackBarMessage.value = message;
}

onMounted(fetchRecipes);
</script>
