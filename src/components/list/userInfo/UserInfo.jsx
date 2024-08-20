import "./userInfo.css";
import usrImage from "./../../../assets/avatar.png"
import { useUserStore } from "../../../lib/userStore";

const UserInfo = () => {
  const {currentUser,} = useUserStore()

  return (
    <div className="userInfo">
      <div className="user">
        <img src={currentUser.avatar || usrImage} alt="avatar" />
        <h2>{currentUser.username}</h2>
      </div>
      <div className="icons">
        <i className="fa-solid fa-ellipsis"></i>
        <i className="fa-solid fa-video"></i>
        <i className="fa-solid fa-pen-to-square"></i>
      </div>
    </div>
  );
};

export default UserInfo;
