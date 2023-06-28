import { createRouter, createWebHistory } from "vue-router";
import RecipesList from "@/components/RecipesList.vue";
import CreateRecipe from "@/components/Forms/CreateRecipe.vue";
import SearchRecipe from "@/components/Forms/SearchRecipe.vue";
import RecipeDetail from "@/components/RecipeDetail.vue";

const routes = [
  { path: '/', component: RecipesList},
  { path: '/create', component: CreateRecipe},
  { path: '/search', component: SearchRecipe },
  { path: '/:id', component: RecipeDetail}
]

export default createRouter({
  history: createWebHistory(),
  routes
});
