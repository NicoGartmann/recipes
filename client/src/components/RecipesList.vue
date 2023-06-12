<template>
  <h1>Rezepte</h1>
  <v-row>
    <v-col cols="4" v-for="recipe in recipes" :key="recipe.name">
      <v-card :title=recipe.name :subtitle=recipe.author :text=recipe.description>
        <v-card-actions>
          <v-btn>Details anzeigen</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import {ref} from "vue";
import axios from "axios";

const recipes = ref();
const fetchRecipes = () => {
  axios.get("api/recipeList")
    .then((response) => {
      recipes.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    })
}

fetchRecipes()

</script>
