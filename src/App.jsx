import { useEffect } from "react"
import Chat from "./components/Chat"
import Details from "./components/Details"
import List from "./components/List"
import Login from "./components/Login"
import Notifycation from "./components/Notifycation"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./lib/firebase.config"
import { useUserStore } from "./lib/userStore"

const App = () => {

  const { currentUser, isLoading, fetchUserInfo } = useUserStore()

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid)
    })
    return () => {
      unSub()
    }
  }, [fetchUserInfo])

  if (isLoading) {
    return <div className="loading">Loading...</div>
  }
  return (
    <div className='container'>
      {currentUser ? (
        <>
          <List />
          <Chat />
          <Details />
        </>
      ) : <Login />}

      <Notifycation />
    </div>
  )
}

export default App