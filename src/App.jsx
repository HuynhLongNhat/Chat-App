import Chat from "./components/Chat"
import Details from "./components/Details"
import List from "./components/List"
import Login from "./components/Login"
import Notifycation from "./components/Notifycation"

const App = () => {
  const user = true;

  return (
    <div className='container'>
      {user ? (
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