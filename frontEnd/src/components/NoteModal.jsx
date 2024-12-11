import React, { useEffect, useState } from "react"

function NoteModal({
  closeModal,
  addNote,
  setCurrentNote,
  currentNote,
  editNote,
}) {
  const [title, setTitle] = useState("title")
  const [description, setDescription] = useState("description")

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title)
      setDescription(currentNote.description)
    }
  }, [currentNote])

  const handleSubmit = () => {
    if (currentNote) {
      editNote(currentNote._id, title, description)
    }else{
      addNote(title, description)
    }
    
  }

  const cancelModal = ()=>{
    closeModal()
    setCurrentNote(null)
  }



  return (
    <>
      <div className="w-full h-screen fixed top-0 left-0 bg-[#000000df] flex justify-center items-center">
        <form className="max-w-[300px] bg-gray-700 shadow-md  px-8 pt-6 pb-8 mb-4 rounded-md">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="shadow appearance-none min-h-20 border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Note description"
            />
          </div>
          <div className="flex gap-5 flex-col items-start">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSubmit}
            >
              {currentNote ? "Update note" : "Add note"}
            </button>

            <button className="btn btn-sm" onClick={cancelModal}>
              cancel
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default NoteModal
