import React, { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import NoteModal from "../components/NoteModal"
import axios from "axios"
import NoteCard from "../components/NoteCard"
import { useAuth } from "../context/ContextProvider"
import { toast } from "react-toastify"

function HomePage() {
  const [isModelOpen, setIsModalOpen] = useState(false)
  const [notes, setNotes] = useState([])
  const [filteredNotes,setFilteredNotes] = useState([])
  const [currentNote, setCurrentNote] = useState(null)
  const [searchText,setSearchText]= useState("");
  const {user,setUser} = useAuth();


  const closeModal = () => {
    setIsModalOpen(false)
  }

  const onEdit = (note) => {
    setIsModalOpen(true)
    setCurrentNote(note)
  }

  const fetchNotes = async () => {
    try {
      let res = await axios.get(`http://localhost:5051/api/note/`,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      })
      setNotes(res.data.notes)
    } catch (error) {
      console.log(error.message)
      setNotes([])
    }
  }

 

  const addNote = async (title, description) => {
    if (title.trim() == "" || description.trim() == "") {
      return
    } else {
      let response = await axios.post(
        `http://localhost:5051/api/note/add`,
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )

      if (response.data.success) {
        fetchNotes()
        closeModal()
        
      }else{
        alert("Login please .")
      }
    }
  }

  const editNote = async(id,title,description)=>{
     if (title.trim() == "" || description.trim() == "") {
       return
     } else {
       let response = await axios.put(
         `http://localhost:5051/api/note/${id}`,
         {
           title,
           description,
         }
       )

       if (response.data.success) {
         fetchNotes()
         closeModal()
         setCurrentNote(null)
       }
     }
  }

  const deleteNote = async(id)=>{
    try {
      let response = await axios.delete(`http://localhost:5051/api/note/${id}`)

      if (response.data.success) {
        fetchNotes()
        toast.success("Note deleted successfully .")
      }
    } catch (error) {
      console.log(error.message)
    }
  }
   
 useEffect(() => {
   fetchNotes()
 }, [user,setUser])

 useEffect(()=>{
   setFilteredNotes(notes.filter((note)=>{
    return note.title.toLowerCase().includes(searchText.toLowerCase()) || note.description.toLowerCase().includes(searchText.toLowerCase())
   }))
 },[searchText,notes])
  
   
  return (
    <div className="w-[100%] max-w-[1000px] mx-auto min-h-screen">
      <Navbar setSearchText={setSearchText} />
      <div className="p-3 grid grid-cols-1 md:grid-cols-3 gap-5">
        {filteredNotes.length > 0
          ? filteredNotes.map((note, index) => {
              return (
                <NoteCard
                  onEdit={onEdit}
                  deleteNote={deleteNote}
                  key={index}
                  note={note}
                />
              )
            })
          : <> <h2>Empty notes 📒</h2></>}
      </div>
      {isModelOpen && (
        <NoteModal
          closeModal={closeModal}
          currentNote={currentNote}
          setCurrentNote={setCurrentNote}
          addNote={addNote}
          editNote={editNote}
        />
      )}
      <button
        onClick={() => setIsModalOpen(true)}
        className="z-30 text-4xl btn btn-md p-0 w-12 h-12 pb-2 btn-info fixed bottom-5 right-4"
      >
        +
      </button>
    </div>
  )
}

export default HomePage
