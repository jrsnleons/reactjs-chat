import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import avatar from "./../../assets/avatar.png";
import "./chat.css";

const Chat = () => {

  const [open, setOpen] = useState(false)
  const [text, setText] = useState("")

  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({behavior:"smooth"})
  }, [])

  const toggleOpen = () => setOpen((prev) => !prev);

  const handleEmoji = (e) => {
    setText(prev => prev+e.emoji)
    setOpen(false)
  }



  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={avatar} alt="usr" />
          <div className="texts">
            <span>Jane Doe</span>
            <p>user descroption idk what to put</p>
          </div>
        </div>
        <div className="icons">
          <i className="fa-solid fa-phone"></i>
          <i className="fa-solid fa-video"></i>
          <i className="fa-solid fa-circle-info"></i>
        </div>
      </div>
      <div className="center">
        <div className="message own">
          <div className="texts">
            <img src="https://images.pexels.com/photos/27539883/pexels-photo-27539883/free-photo-of-a-bride-and-groom-standing-in-front-of-a-fence.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
            <p> Hi there i am a nerd!</p>
            <span>2 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src={avatar} alt="" />
          <div className="texts">
            <p> Hi nerd i am dad</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p> Hi there i am a nerd!</p>
            <span>2 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src={avatar} alt="" />
          <div className="texts">
            <p> Hi nerd i am dad</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p> Hi there i am a nerd!</p>
            <span>2 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src={avatar} alt="" />
          <div className="texts">
            <p> Hi nerd i am dad</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <i className="fa-solid fa-image"></i>
          <i className="fa-solid fa-camera"></i>
          <i className="fa-solid fa-microphone"></i>
        </div>
        <input type="text" placeholder="Type a message..." onChange={e=>setText(e.target.value)} value={text}/>      
        <div className="emoji">
          <i onClick={toggleOpen} className="fa-regular fa-face-smile"></i>
          <div className="picker">
          <EmojiPicker onEmojiClick={handleEmoji} open={open}/>
          </div>
        </div>
        <button className="sendButton">Send</button>
      </div>
    </div>
  );
};

export default Chat;
