import React from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/ContextProvider"

function Navbar({ setSearchText }) {
  const { user, logout} = useAuth()

  return (
    <>
      <nav className="flex justify-between items-center px-5 py-5 shadow-md">
        <h2>
          <Link to={"/"}>NoteApp</Link>
        </h2>
        <input
          className="w-44 md:w-56  inputBg px-3 py-1 md:py-2 rounded-md"
          placeholder="search notes"
          type="search"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className="nav-end flex gap-4 items-center">
          {user ? (
            <>
              <span>{user}</span>

              <button className="btn-sm btn " onClick={() => logout()}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="btn-sm btn ">
                <Link to={"/signin"}>Login</Link>
              </button>
              <button className="btn-sm btn ">
                <Link to={"/signup"}>Signup</Link>
              </button>
            </>
          )}
        </div>
      </nav>
    </>
  )
}

export default Navbar
