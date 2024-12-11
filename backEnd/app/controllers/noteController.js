import NotesModel from "../models/NotesModel.js"

export const addNote = async (req, res) => {
  try {
    let { title, description } = req.body
    let userId = req.headers["user_id"]
    let newNote = new NotesModel({
      title,
      description,
      userId,
    })
    await newNote.save()
    return res.status(201).json({
      success: true,
      note: newNote,
      message: "Note is created successfully .",
    })
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message })
  }
}
export const editNote = async (req, res) => {
  try {
    const { id } = req.params
    const reqBody = req.body
    const updatedNote = await NotesModel.updateOne({_id:id}, reqBody)
   
    return res.status(200).json({
      success: true,
      note: updatedNote,
      message: "Note is updated successfully .",
    })
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message })
  }
}


export const deleteNote = async(req,res)=>{
  try {
     const { id } = req.params
   
     const deletedNote = await NotesModel.findByIdAndDelete({ _id: id })

     return res.status(200).json({
       success: true,
       note: deletedNote,
       message: "Note is deleted successfully .",
     })
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message })
    
  }
}
export const userNotes = async (req, res) => {
  try {
    let userId = req.headers["user_id"]
    let notes = await NotesModel.find({ userId })
    return res.status(201).json({
      success: true,
      notes,
      message: "Note data retrieved successfully .",
    })
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message })
  }
}

export const notes = async (req, res) => {
  try {
    let userId = req.headers.user_id;
    let notes = await NotesModel.find({userId})
    return res.status(201).json({
      success: true,
      notes,
      message: "Note data retrieved successfully .",
    })
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message })
  }
}


