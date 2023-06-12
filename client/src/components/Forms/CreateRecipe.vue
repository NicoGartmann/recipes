<template>
  <h1>Rezept hinzufügen</h1>
  <v-form>
    <v-text-field v-model="name" label="Name" clearable required/>
    <v-textarea v-model="description" label="Beschreibung" clearable/>
    <h2>Zutaten</h2>
    <v-row>
      <v-col cols="2">
        <v-text-field v-model="ingredient.amount" label="Anzahl"/>
      </v-col>
      <v-col cols="3">
        <v-text-field v-model="ingredient.unit" label="Einheit"/>
      </v-col>
      <v-col cols="5">
        <v-text-field v-model="ingredient.name" label="Zutat" clearable/>
      </v-col>
      <v-col cols="2">
        <v-btn @click="addIngredient">Zutat hinzufügen</v-btn>
      </v-col>
    </v-row>
   <v-list>
      <v-list-item v-for="(ing, index) in ingredients" :key="index" :title="ing.name"/>
    </v-list>
    <h2>Zubereitungsschritte</h2>
    <v-text-field v-model="stepDescription" label="Schritt" append-inner-icon="mdi-plus" @click:append-inner="addStep" clearable/>
    <v-list>
      <v-list-item v-for="step in steps" :key="step.stepNumber" :title="step.description"/>
    </v-list>
    <v-btn-group>
      <v-btn color="red" prepend-icon="mdi-close">
        Abbrechen
      </v-btn>

      <v-btn color="green" prepend-icon="mdi-content-save" @click="save">
        Speichern
      </v-btn>
    </v-btn-group>
  </v-form>
</template>

<script setup>
import axios from 'axios'
import {reactive, ref} from 'vue'

const ingredient = reactive({
  name: '',
  unit: '',
  amount: ''
});

const stepDescription = ref();

const name = ref();
const description = ref();
const ingredients = reactive([]);
const steps = reactive([]);

function abort() {
}

const save = () => {
  const recipe = {
    name: name.value,
    description: description.value,
    ingredients: ingredients,
    steps: steps
  }
  console.log(recipe);
  axios.post("api/recipeList",recipe)
    .then((response) => {
      console.log("Erfolg");
    })
    .catch((error) => {
      console.log("Error");
    })
}

const addIngredient = () => {
  const newIngredient = { ...ingredient };
  ingredients.push(newIngredient);
}

const addStep = () => {
  const newStep = { stepNumber: steps.length + 1, description: stepDescription.value }
  steps.push(newStep);
}

function closeDialog() {
}
</script>



