const { Schema, model } = require('mongoose');

const RecipeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    ingredients: [{ name: String, amount: Number, unit: {type: String, required: false}}],
    steps: [{ stepNumber: Number, description: String }]
});

const Recipe = model('recipe', RecipeSchema);

module.exports = Recipe;