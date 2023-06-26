<template>
  <h1>Rezept hinzufügen</h1>
  <v-form>
    <v-text-field v-model="name" label="Name" clearable required/>
    <v-textarea v-model="description" label="Beschreibung" clearable/>
    <h2>Zutaten</h2>
    <v-row>
      <v-col cols="2">
        <v-text-field v-model="ingredientInput.amount" label="Anzahl"/>
      </v-col>
      <v-col cols="3">
        <v-text-field v-model="ingredientInput.unit" label="Einheit"/>
      </v-col>
      <v-col cols="6">
        <v-text-field v-model="ingredientInput.name" label="Zutat" clearable/>
      </v-col>
      <v-col cols="1">
        <v-btn @click="addIngredient">Hinzufügen</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-list>
          <v-list-item border v-for="(ing, index) in ingredients" :key="index" :title="ing.name"
                       :subtitle="ing.amount + ' ' + ing.unit">
            <template v-slot:append>
              <v-btn icon @click="removeIngredient(index)">
                <v-icon>mdi-trash-can-outline</v-icon>
              </v-btn>
            </template>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

    <h2>Zubereitungsschritte</h2>
    <v-text-field v-model="stepDescriptionInput" label="Schritt" append-inner-icon="mdi-plus" @click:append-inner="addStep"
                  clearable/>
    <v-list>
      <draggable v-model="steps" item-key="stepNumber" @end="updateStepNumbers">
        <template #item="{ element }">
          <v-list-item :id="element.stepNumber" border :title="element.stepNumber" :subtitle="element.description">
            <template v-slot:append>
              <v-btn icon @click="removeStep(index)">
                <v-icon>mdi-trash-can-outline</v-icon>
              </v-btn>
            </template>
          </v-list-item>
        </template>
      </draggable>
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
import draggable from 'vuedraggable'
import {reactive, ref} from 'vue'

const ingredientInput = reactive({
  name: '',
  unit: '',
  amount: ''
});

const stepDescriptionInput = ref();

const name = ref();
const description = ref();
const ingredients = reactive([]);
const steps = ref([]);

const updateStepNumbers = () => {
  steps.value.forEach((step, index) => {
    step.stepNumber = index + 1;
  })
}

const abort = () => {

}

const save = () => {
  const recipe = {
    name: name.value,
    description: description.value,
    ingredients: ingredients,
    steps: Array.from(steps.value)
  }

  axios.post("api/recipeList", recipe)
    .then((response) => {
      console.log("Erfolg");
    })
    .catch((error) => {
      console.log("Error");
    })
}

const addIngredient = () => {
  const newIngredient = {...ingredientInput};
  ingredients.push(newIngredient);
  ingredientInput.name = '';
  ingredientInput.unit = '';
  ingredientInput.amount = '';
}

const removeIngredient = (index) => {
  ingredients.splice(index, 1);
}

const addStep = () => {
  const newStep = {stepNumber: steps.value.length + 1, description: stepDescriptionInput.value}
  steps.value.push(newStep);
  stepDescriptionInput.value = '';
}

const removeStep = (index) => {
  steps.value.splice(index, 1);
  updateStepNumbers();
}

const closeDialog = () => {
}
</script>



