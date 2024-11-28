import express from 'express';
import getSVGMap from '../controllers/mapController.js';
const router = express.Router();

router.route("/").get(getSVGMap);

export default router;