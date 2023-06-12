const { Router } = require('express')
const Recipe = require('../../models/Recipe')

const router = Router();

router.get('/', async (req, res) => {
    try {
        const recipeList = await Recipe.find();
        if (!recipeList) throw new Error('No Recipes found');
        res.status(200).json(recipeList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updated = await Recipe.findByIdAndUpdate(id, req.body);
        if(!updated) throw new Error('Something went wrong updating the Recipe');
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const newRecipe = new Recipe(req.body);
    console.log(newRecipe);
    try {
        const recipe = await newRecipe.save();
        if (!recipe) throw new Error('Something went wrong saving the Recipe');
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const removed = await Recipe.findByIdAndDelete(id);
        if (!removed) throw Error("Something went wrong deleting the Recipe.");
        res.status(200).json(removed);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;