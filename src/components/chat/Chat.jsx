import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import avatar from "./../../assets/avatar.png";
import "./chat.css";
import { onSnapshot, doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import upload from "../../lib/upload";

const Chat = () => {
  const [chat, setChat] = useState()
  const [open, setOpen] = useState(false)
  const [text, setText] = useState("")
  const [img, setImg] = useState({
    file: null,
    url:"",
  })

  const {chatId, user, isCurrentUserBlocked, isReceiverBlocked} = useChatStore()
  const {currentUser} = useUserStore()


  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({behavior:"smooth"})
  }, [])

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data())
    })
    return() => {
      unSub()
    }
  },[chatId])

  const toggleOpen = () => setOpen((prev) => !prev);

  const handleEmoji = (e) => {
    setText(prev => prev+e.emoji)
    setOpen(false)
  }

  const handleImg = e => {
    if(e.target.files[0]){
        setImg({
            file:e.target.files[0],
            url: URL.createObjectURL(e.target.files[0])
        })
    }
}

  const handleSend = async() => {
    if (text === "") return

    let imgUrl = null

    try{

      if(img.file){
        imgUrl = await upload(img.file)
      }

      await updateDoc(doc(db, "chats", chatId),{
        messages:arrayUnion({
          sender: currentUser,
          text,
          createdAt: new Date(),
          ...(imgUrl && {img:imgUrl})
        })
      });

      const userIDs = [currentUser.id, user.id]

      userIDs.forEach(async(id)=>{
        const userChatsRef = doc(db, "userChats", id)
        const userChatsSnapshot = await getDoc(userChatsRef)
        
        if(userChatsSnapshot.exists()){
          const userChatsData = userChatsSnapshot.data()
          
          const chatIndex = userChatsData.chats.findIndex((c)=> c.chatId === chatId)
          
          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false
          userChatsData.chats[chatIndex].updatedAt = Date.now()
          
          await updateDoc(userChatsRef, {
            chats: userChatsData.chats
            
          })
        }
      })


    }catch(err){
      console.log(err)
    }

    setImg({
      file: null,
      url:""
    })
    setText("")
  }

  console.log("UID" + currentUser)


  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={user?.avatar || avatar} alt="usr" />
          <div className="texts">
            <span>{user?.username}</span>
            <p>Description...</p>
          </div>
        </div>
        <div className="icons">
          <i className="fa-solid fa-phone"></i>
          <i className="fa-solid fa-video"></i>
          <i className="fa-solid fa-circle-info"></i>
        </div>
      </div>
      <div className="center">
      {chat?.messages?.map((message) =>(
        <div className={message.sender.id === currentUser?.id ? "message own": "message"} key={message?.createAt}>
          <div className="texts">
            {message.img && <img src={message.img} alt="" />}
            <p>{message.text}</p>
            {/* <span>{message}</span> */}
          </div>
        </div>
      ))}
        {img.url && (<div className="message own">
          <div className="texts">
            <img src={img.url} alt="" />
          </div>
        </div>)}
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <i className="fa-solid fa-image"></i>
          </label>
          <input type="file" id="file" style={{display: "none"}} onChange={handleImg} />
          <i className="fa-solid fa-camera"></i>
          <i className="fa-solid fa-microphone"></i>
        </div>
        <input type="text" placeholder={(isCurrentUserBlocked || isReceiverBlocked) ? "You cannot send a message" : "Type a message..."} onChange={e=>setText(e.target.value)} value={text} disabled={isCurrentUserBlocked|| isReceiverBlocked}/>      
        <div className="emoji">
          <i onClick={toggleOpen} className="fa-regular fa-face-smile"></i>
          <div className="picker">
          <EmojiPicker onEmojiClick={handleEmoji} open={open}/>
          </div>
        </div>
        <button className="sendButton" onClick={handleSend} disabled={isCurrentUserBlocked|| isReceiverBlocked}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
