import { useEffect, useState } from "react";
import "./chatList.css";
import avatar from "./../../../assets/avatar.png"
import AddUser from "./addUser/AddUser";
import { useUserStore } from "../../../lib/userStore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useChatStore } from "../../../lib/chatStore";

const ChatList = () => {
  const [chats, setChats] = useState([])
  const [addMode, setAddMode] = useState(false)
  const [input, setInput] = useState("")
  const toggleAddMode = () => setAddMode((prev) => !prev);

  const {currentUser} = useUserStore()
  const {chatId, changeChat} = useChatStore()

  useEffect(()=>{
    const unSub = onSnapshot(doc(db, "userChats", currentUser.id), async (res) => {
      const items = res.data().chats;

      const promises = items.map(async (item)=>{
        const userDocRef = doc(db, "users", item.receiverId)
        const userDocSnap = await getDoc(userDocRef)

        const user = userDocSnap.data()

        return {...item,user}
      })

      const chatData = await Promise.all(promises)

      setChats(chatData.sort((a,b) => b.updatedAt - a.updatedAt))

    });

    return () => {
      unSub()
    }
  },[currentUser.id])


  const handleSelect = async(chat) => {
    
    const userChats = chats.map((item) =>{
      const{user, ...rest} = item
      return rest
    })

    const chatIndex = userChats.findIndex((item) =>item.chatId === chat.chatId)

    userChats[chatIndex].isSeen = true

    const userChatsRef = doc(db, "userChats", currentUser.id)

    try{
      await updateDoc(userChatsRef, {
        chats:userChats,
      })
      changeChat(chat.chatId, chat.user)
    }catch(err){
      console.log(err)
    }
  }

  const fileteredChats = chats.filter((c) => c.user.username.toLowerCase().includes(input.toLowerCase())) 

  return (
    <div className="chatlist">
      <div className="search">
        <div className="searchBar">
          <i className="fa-solid fa-magnifying-glass srch"></i>
          <input type="text" placeholder="Search..." onChange={(e) => setInput(e.target.value)}/>
        </div>
        <i onClick={toggleAddMode} className={`add fa-solid ${addMode ? "fa-minus" : "fa-plus"}`}></i>
      </div>
      {fileteredChats.map(chat => (
        <div className="item" key={chat.chatId} onClick={() => handleSelect(chat)} style={{backgroundColor: chat?.isSeen? "transparent" : "#5E5CE6FF"}}>
          <img src={chat.user.blocked.includes(currentUser.id) ? avatar : chat.user.avatar} alt="avatar" />
          <div className="text">
            <span>{chat.user.blocked.includes(currentUser.id) ? "User" : chat.user.username}</span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}
      {addMode && <AddUser setAddMode={setAddMode} />}
    </div>
  );
};

export default ChatList;
