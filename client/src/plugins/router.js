import { createRouter, createWebHistory } from "vue-router";
import RecipesList from "@/components/RecipesList.vue";
import CreateRecipe from "@/components/Forms/CreateRecipe.vue";
import SearchRecipe from "@/components/Forms/SearchRecipe.vue";

const routes = [
  { path: '/', component: RecipesList},
  { path: '/create', component: CreateRecipe},
  { path: '/search', component: SearchRecipe }
]

export default createRouter({
  history: createWebHistory(),
  routes
});
