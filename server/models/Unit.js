const { Schema, model } = require('mongoose');

const UnitSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
});

const Unit = model('unit', UnitSchema);

module.exports = Unit;