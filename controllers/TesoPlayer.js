const Player = require("../models/TesoPlayer");

const getTesoPlayers = (req, res) => {
    Player
    .find()
    .then((player) => {
        res.json(player);
    })
    .catch((err) => {
        res.status(500).send(err.message);
    });
};

const getTesoPlayerById = (req, res) => {
    Player
    .findOne({ _id: req.params.playerID })
    .then((player) => {
        res.json(player);
    })
    .catch((err) => {
        res.status(500).send(err.message);
    });
};

const createTesoPlayer = (req, res) => {
    const player = new Player({
        name: req.body.name,
        attributes: req.body.attributes,
        skills: req.body.skills,
        weapons: req.body.weapons,
        armor: req.body.armor,
        inventaire: req.body.inventaire,
        spells: req.body.spells,
        session: req.body.session,
    });

    player
    .save()
    .then((player) => {
        res.json(player);
    })
    .catch((err) => {
        res.status(500).send(err.message);
    });
};

const updateTesoPlayer = (req, res) => {
    Player
    .findOneAndUpdate(
        { _id: req.params.playerID },
        {
            $set: {
                name: req.body.name,
                attributes: req.body.attributes,
                skills: req.body.skills,
                weapons: req.body.weapons,
                armor: req.body.armor,
                inventaire: req.body.inventaire,
                spells: req.body.spells,
                session: req.body.session,
            },
        },
        { new: true },
    )
    .then((player) => {
        res.json(player);
    })
    .catch((err) => {
        res.status(500).send(err.message);
    });
};

const deleteTesoPlayer = (req, res) => {
    Player
    .deleteOne({ _id: req.params.playerID })
    .then(() => res.json({ message: "Player Deleted" }))
    .catch((err) => res.send(err));
};

module.exports = {
    getTesoPlayers,
    getTesoPlayerById,
    createTesoPlayer,
    updateTesoPlayer,
    deleteTesoPlayer,
};