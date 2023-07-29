<template>

  <v-row>
    <v-col>
      <h1>Rezept hinzufügen</h1>
    </v-col>
  </v-row>

  <v-form>
    <v-text-field v-model="name" label="Name" clearable required/>
    <v-textarea v-model="description" label="Beschreibung" clearable/>
    <h2>Zutaten</h2>
    <v-text-field v-model="ingredientInput.amount" label="Anzahl"/>
    <v-text-field v-model="ingredientInput.unit" label="Einheit"/>
    <v-text-field v-model="ingredientInput.name" label="Zutat" clearable/>
    <v-btn color="grey" @click="addIngredient" align="center">Hinzufügen</v-btn>
    <v-list>
      <v-list-item border v-for="(ing, index) in ingredients" :key="index" :title="ing.name"
                   :subtitle="ing.amount + ' ' + ing.unit">
        <template v-slot:append>
          <v-icon @click="removeIngredient(index)">
            mdi-trash-can-outline
          </v-icon>
        </template>
      </v-list-item>
    </v-list>
    <h2>Zubereitungsschritte</h2>
    <v-text-field v-model="stepDescriptionInput" label="Schritt" append-inner-icon="mdi-plus"
                  @click:append-inner="addStep"
                  clearable/>

        <v-list>
          <draggable v-model="steps" item-key="stepNumber" @end="updateStepNumbers" handle=".handle">
            <template #item="{ element }">
              <v-list-item :id="element.stepNumber" border :title="element.description">
                <template v-slot:prepend>
                  <v-icon class="handle">mdi-drag</v-icon>
                </template>
                <template v-slot:append>
                  <v-icon @click="removeStep(element.stepNumber)">mdi-trash-can-outline</v-icon>
                </template>
              </v-list-item>
            </template>
          </draggable>
        </v-list>
    <v-btn-group>
      <v-btn color="red" prepend-icon="mdi-close">
        <ConfirmAbort/>
      </v-btn>
      <v-btn color="green" prepend-icon="mdi-content-save" @click="save">
        Speichern
      </v-btn>
    </v-btn-group>
  </v-form>

  <v-row>
    <v-col>
      <v-snackbar :color="snackBarColor" v-model="snackBarTrigger">
        {{ snackBarMessage }}
      </v-snackbar>
    </v-col>
  </v-row>
</template>

<script setup>
import axios from 'axios'
import draggable from 'vuedraggable'
import {reactive, ref} from 'vue'
import ConfirmAbort from "@/components/Dialogs/Confirm-Abort.vue";

const snackBarTrigger = ref(false);
const snackBarColor = ref('');
const snackBarMessage = ref('');

const ingredientInput = reactive({
  name: '',
  unit: '',
  amount: ''
});

const stepDescriptionInput = ref();

const name = ref();
const description = ref();
const ingredients = ref([]);
const steps = ref([]);

const updateStepNumbers = () => {
  steps.value.forEach((step, index) => {
    step.stepNumber = index + 1;
  })
}

const save = () => {
  const recipe = {
    name: name.value,
    description: description.value,
    ingredients: Array.from(ingredients.value),
    steps: Array.from(steps.value)
  }

  axios.post("api/recipeList", recipe)
    .then((response) => {
      console.log("Rezept erfolgreich gespeichert.");
      showSnackbar('green', 'Rezept erfolgreich gespeichert.');
      clearInput();
    })
    .catch((error) => {
      console.log("Fehler beim Speichern des Rezeptes");
      showSnackbar('red', 'Fehler beim Speichern des Rezeptes')
    })
}

const clearInput = () => {
  name.value = '';
  description.value = '';
  ingredients.value = [];
  steps.value = [];
}

const showSnackbar = (color, message) => {
  snackBarTrigger.value = true;
  snackBarColor.value = color;
  snackBarMessage.value = message
}
const addIngredient = () => {
  const newIngredient = {...ingredientInput};
  ingredients.value.push(newIngredient);
  ingredientInput.name = '';
  ingredientInput.unit = '';
  ingredientInput.amount = '';
}

const removeIngredient = (index) => {
  ingredients.value.splice(index, 1);
}

const addStep = () => {
  const newStep = {stepNumber: steps.value.length + 1, description: stepDescriptionInput.value}
  steps.value.push(newStep);
  stepDescriptionInput.value = '';
}

const removeStep = (stepNumber) => {
  const indexFound = steps.value.findIndex((obj) => obj.stepNumber === stepNumber);
  steps.value.splice(indexFound, 1);
  updateStepNumbers();
}
</script>
