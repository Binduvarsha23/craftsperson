import Sweet from "../models/Sweet.js";

export const addSweet = async (req, res) => {
  const sweet = await Sweet.create(req.body);
  res.status(201).json(sweet);
};

export const getSweets = async (_, res) => {
  const sweets = await Sweet.find();
  res.json(sweets);
};

export const searchSweets = async (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;
  const query = {};
  if (name) query.name = new RegExp(name, "i");
  if (category) query.category = category;
  if (minPrice || maxPrice)
    query.price = { ...(minPrice && { $gte: minPrice }), ...(maxPrice && { $lte: maxPrice }) };

  const sweets = await Sweet.find(query);
  res.json(sweets);
};

export const updateSweet = async (req, res) => {
  const sweet = await Sweet.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(sweet);
};

export const deleteSweet = async (req, res) => {
  await Sweet.findByIdAndDelete(req.params.id);
  res.json({ message: "Sweet deleted" });
};

export const purchaseSweet = async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);
  if (!sweet || sweet.quantity === 0) return res.status(400).json({ message: "Out of stock" });
  sweet.quantity -= 1;
  await sweet.save();
  res.json(sweet);
};

export const restockSweet = async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);
  if (!sweet) return res.status(404).json({ message: "Not found" });
  sweet.quantity += req.body.amount || 1;
  await sweet.save();
  res.json(sweet);
};
