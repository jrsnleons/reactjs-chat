import { useState } from "react";
import "./chatList.css";
import avatar from "./../../../assets/avatar.png"

const ChatList = () => {
  const [addMode, setAddMode] = useState(false)
  const toggleAddMode = () => setAddMode((prev) => !prev);


  return (
    <div className="chatlist">
      <div className="search">
        <div className="searchBar">
          <i className="fa-solid fa-magnifying-glass srch"></i>
          <input type="text" placeholder="Search..." />
        </div>
        <i onClick={toggleAddMode} className={`add fa-solid ${addMode ? "fa-minus" : "fa-plus"}`}></i>
      </div>
      <div className="item">
        <img src={avatar} alt="avatar" />
        <div className="text">
          <span>Jane Doe</span>
          <p>Hello!</p>
        </div>
      </div>
      <div className="item">
        <img src={avatar} alt="avatar" />
        <div className="text">
          <span>Jane Doe</span>
          <p>Hello!</p>
        </div>
      </div>
      <div className="item">
        <img src={avatar} alt="avatar" />
        <div className="text">
          <span>Jane Doe</span>
          <p>Hello!</p>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
