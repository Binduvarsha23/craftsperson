import express from "express";
import {
  addSweet, getSweets, searchSweets,
  updateSweet, deleteSweet,
  purchaseSweet, restockSweet
} from "../controllers/sweetController.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, admin, addSweet);
router.get("/", protect, getSweets);
router.get("/search", protect, searchSweets);
router.put("/:id", protect, admin, updateSweet);
router.delete("/:id", protect, admin, deleteSweet);

router.post("/:id/purchase", protect, purchaseSweet);
router.post("/:id/restock", protect, admin, restockSweet);

export default router;
