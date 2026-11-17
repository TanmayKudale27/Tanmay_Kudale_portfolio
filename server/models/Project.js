import mongoose from "mongoose";
const schema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  features: [String],
  tech: [String],
  link: { type: String, default: "" },
  order: { type: Number, default: 0 },
});
export default mongoose.model("Project", schema);
