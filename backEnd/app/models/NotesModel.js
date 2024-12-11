import mongoose from "mongoose"

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true, versionKey: false }
)

const NotesModel = mongoose.model("notes", noteSchema)

export default NotesModel
