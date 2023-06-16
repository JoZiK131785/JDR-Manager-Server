const mongoose = require("mongoose");

const TesoPlayerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    attributes: {
        type: Object,
        required: true,
    },
    skills: {
        type: Object,
        required: true,
    },
    weapons: {
        type: Object,
        required: true,
    },
    armor: {
        type: Object,
        required: true,
    },
    inventaire: {
        type: Object,
        required: true,
    },
    spells: {
        type: Object,
        required: true,
    },
    session: {
        type: Object,
        required: true,
    }
});

const tesoPlayers = mongoose.connection.useDb('TesoPlayers');

module.exports = tesoPlayers.model("Player", TesoPlayerSchema);
