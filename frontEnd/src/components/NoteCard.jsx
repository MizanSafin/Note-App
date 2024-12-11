import React from 'react'
import { AiOutlineDelete } from "react-icons/ai"
import { CiEdit } from "react-icons/ci"

function NoteCard({ note, onEdit, deleteNote }) {
  const { title, description } = note

  return (
    <div className="bg-[#12111455] rounded-md p-5 flex gap-2 text-slate-200 flex-col">
      <h2>{title.toUpperCase()}</h2>
      <p className="font-medium ">{description}</p>
      <div className="flex gap-5 mt-3">
        <button className="text-red-500" onClick={() => deleteNote(note._id)}>
          <AiOutlineDelete />
        </button>
        <button className="text-green-600" onClick={() => onEdit(note)}>
          <CiEdit />
        </button>
      </div>
    </div>
  )
}

export default NoteCard