import List from "./components/list/List";
import Chat from "./components/chat/Chat"
import Detail from "./components/detail/Detail"
import Login from "./components/login/Login";
import Notifications from "./components/notification/Notifications";

function App() {
  const user = true
  return (
    <div className="container ">
      {
        user ? (   
          <>   
            <List/>
            <Chat/>
            <Detail/>
          </>
        ) : (
          <Login/>
        )
      }
      <Notifications/>

    </div>
  )
}

export default App;
