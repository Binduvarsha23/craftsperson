import mongoose from "mongoose";

const sweetSchema = new mongoose.Schema({
  name:     { type: String, required: true, unique: true },
  category: { type: String, required: true },
  price:    { type: Number, required: true },
  quantity: { type: Number, required: true },
  image:    { type: String } // Base64 string
});

export default mongoose.model("Sweet", sweetSchema);
