import AddUserBtn from "./components/AddUserBtn"
import UsersTable from "./components/UsersTable"
import "./style.scss"

function App() {
  return (
    <div className="app-container">
      <header className="header">
        <h2>User list</h2>
        <AddUserBtn />
      </header>
      <UsersTable />
    </div>
  )
}

export default App
