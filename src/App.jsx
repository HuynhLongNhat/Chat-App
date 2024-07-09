import Chat from "./components/Chat"
import Details from "./components/Details"
import List from "./components/List"


const App = () => {
  return (
    <div className='container'>
      <List />
      <Chat />
      <Details />
    </div>
  )
}

export default App