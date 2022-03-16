import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import React, { useState } from "react"
import { auth } from "../firebase/clientApp"
import { useAuthState } from "react-firebase-hooks/auth"
import LoginForm from "../components/common/LoginForm"

const admin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [user, loading, error] = useAuthState(auth)

  const login = (e: React.SyntheticEvent) => {
    e.preventDefault()

    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log("user logged in: ", cred.user)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  const logout = () => {
    signOut(auth)
  }

  if (loading) {
    return (
      <div className="mx-auto mt-8 h-full max-w-6xl">
        <main className="flex w-full flex-col items-center justify-center px-4">
          Caricamento Utente...
        </main>
      </div>
    )
  }
  if (error) {
    return (
      <div className="mx-auto mt-8 h-full max-w-6xl">
        <main className="flex w-full flex-col items-center justify-center px-4">
          Errore: {error}
        </main>
      </div>
    )
  }
  if (user) {
    return (
      <div className="mx-auto mt-8 h-full max-w-6xl">
        <main className="flex w-full flex-col px-4">
          <p>Current User: {user.email}</p>
          <button onClick={logout}>Log out</button>
        </main>
      </div>
    )
  }
  return (
    <LoginForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      login={login}
    />
  )
}

export default admin
