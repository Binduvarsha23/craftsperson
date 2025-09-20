// routes/sweetRoutes.js
import express from "express";
import {
  getSweets,
  searchSweets,
  addSweet,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
} from "../controllers/sweetController.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

// 🌍 PUBLIC
router.get("/", getSweets);          // get all sweets
router.get("/search", searchSweets); // search sweets

// 👤 USER
router.post("/:id/purchase", protect, purchaseSweet);

// 👑 ADMIN
router.post("/", protect, admin, addSweet);
router.put("/:id", protect, admin, updateSweet);
router.delete("/:id", protect, admin, deleteSweet);
router.post("/:id/restock", protect, admin, restockSweet);

export default router;
