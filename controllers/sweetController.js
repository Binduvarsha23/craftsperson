// controllers/sweetController.js
import Sweet from "../models/Sweet.js";

// ➕ Add a new sweet (Admin only)
export const addSweet = async (req, res) => {
  try {
    const sweet = await Sweet.create(req.body);
    res.status(201).json(sweet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 📦 Get all sweets (Public)
export const getSweets = async (_, res) => {
  try {
    const sweets = await Sweet.find();
    res.json(sweets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔍 Search sweets by name, category, or price range
export const searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;
    const query = {};

    if (name) query.name = new RegExp(name, "i"); // case-insensitive regex
    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {
        ...(minPrice && { $gte: Number(minPrice) }),
        ...(maxPrice && { $lte: Number(maxPrice) }),
      };
    }

    const sweets = await Sweet.find(query);
    res.json(sweets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✏️ Update sweet (Admin only)
export const updateSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!sweet) return res.status(404).json({ message: "Sweet not found" });
    res.json(sweet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 🗑 Delete sweet (Admin only)
export const deleteSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findByIdAndDelete(req.params.id);
    if (!sweet) return res.status(404).json({ message: "Sweet not found" });
    res.json({ message: "Sweet deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🛒 Purchase sweet (User)
export const purchaseSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ message: "Sweet not found" });
    if (sweet.quantity === 0)
      return res.status(400).json({ message: "Out of stock" });

    sweet.quantity -= 1;
    await sweet.save();
    res.json(sweet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔄 Restock sweet (Admin)
export const restockSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ message: "Sweet not found" });

    sweet.quantity += req.body.amount || 1; // default restock = 1
    await sweet.save();
    res.json(sweet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
