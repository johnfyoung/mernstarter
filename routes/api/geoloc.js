import express from "express";
import { geolocController } from "../../controllers";

const router = express.Router();

router.get("/search/:query", async (req, res) => {
    let result = null;
    try {
        result = geolocController.searchGeocode(req.params.query);

        if (result) {
            res.send(result);
        } else {
            res.status(404).send("Couldn't find a geoloc for that query")
        }
    } catch (err) {
        res.status(500).send("Unexpected result seaarching for geoloc");
    }
});

router.get("/reverse/:lat/:long", async (req, res) => {
    let result = null;
    try {
        result = await geolocController.reverseGeocode(req.params.lat, req.params.long);

        if (result) {
            result.address.county = result.address.county.replace(" County", "");
            res.send(result);
        } else {
            res.status(404).send("Couldn't find a place for that lat/long")
        }
    } catch (err) {
        res.status(500).send("Unexpected result reversing that geoloc");
    }
});

export default router;