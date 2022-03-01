const { Schema, model } = require("mongoose");

const materialSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
            default: 'nombre desconocido'
        },

        imageUrl: {
            type: String,

            default: "https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG"
        },

        website: {
            type: String,
        },

    },

    {
        timestamps: true
    }

);


const Material = model("Material", materialSchema);

module.exports = Material;