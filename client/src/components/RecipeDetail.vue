<template>
  <v-row>
    <v-col>
      <h1>{{ recipe.name }}</h1>
      <small><i>Autor: {{ recipe.author }}</i></small>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-btn color="grey"><v-icon>mdi-pencil</v-icon>Bearbeiten</v-btn>
      <v-btn color="red"><v-icon>mdi-trash-can-outline</v-icon>Löschen</v-btn>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <p>{{ recipe.description }}</p>
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <h3>Zutaten:</h3>
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <v-table>
        <tbody>
        <tr v-for="ingredient in recipe.ingredients" :key="ingredient._id">
          <td>{{ ingredient.amount }} {{ ingredient.unit }}</td>
          <td>{{ ingredient.name }}</td>
        </tr>
        </tbody>
      </v-table>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <h3>Zubereitung:</h3>
    </v-col>
  </v-row>
  <v-row v-for="step in recipe.steps" :key="step._id">
    <v-col cols="2" align="center">
      {{ step.stepNumber }}
    </v-col>
    <v-col cols="9">
      <div class="">
        {{ step.description }}
      </div>
    </v-col>
  </v-row>
  <v-row>
    <v-col>


    </v-col>
  </v-row>

</template>

<script setup>
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import axios from "axios";

const route = useRoute();
const recipe_id = route.params.id;

const recipe = ref({});

onMounted(() => {
  fetchRecipe(recipe_id);
});
const fetchRecipe = (id) => {
  axios.get(`api/recipeList/${id}`)
    .then((response) => {
      recipe.value = response.data[0];
    })
    .catch((error) => {
      console.log(error);
    })
}
</script>
