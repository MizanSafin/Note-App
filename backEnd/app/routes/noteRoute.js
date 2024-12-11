import express from "express"

import { addNote, deleteNote, editNote, notes, userNotes } from "../controllers/noteController.js"
import authMiddleware from "../middleware/authMiddleware.js"

const noteRouter = express.Router()

noteRouter.post("/add", authMiddleware, addNote)
noteRouter.get("/userNotes",authMiddleware,userNotes)
noteRouter.put("/:id",editNote)
noteRouter.delete("/:id",deleteNote)



noteRouter.get("/",authMiddleware,notes)

export default noteRouter
