import express, { response } from "express";
import Hotel from "../models/Hotel.js";
import {
  countByCity,
  countByType,
  createHotels,
  deleteHotels,
  getAllHotels,
  getHotelRooms,
  getHotels,
  updateHotels,
} from "../controller/hotels.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyAdmin, createHotels);

router.put("/:id", verifyAdmin, updateHotels);

router.delete("/:id", verifyAdmin, deleteHotels);

router.get("/find/:id", getHotels);

router.get("/", getAllHotels);

router.get("/countByCity", countByCity);

router.get("/countByType", countByType);

router.get("/room/:id", getHotelRooms)

export default router;
