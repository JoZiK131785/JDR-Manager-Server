const { 
    getTesoPlayers, 
    getTesoPlayerById, 
    createTesoPlayer, 
    updateTesoPlayer, 
    deleteTesoPlayer 
} = require("../controllers/TesoPlayer");

const router = require("express").Router();

router.get("/players", getTesoPlayers);
router.get("/players/:playerID", getTesoPlayerById);
router.post("/players", createTesoPlayer);
router.put("/players/:playerID", updateTesoPlayer);
router.delete("/players/:playerID", deleteTesoPlayer);

module.exports = router;