import "./userInfo.css";
import usrImage from "./../../../assets/avatar.png"

const UserInfo = () => {
  return (
    <div className="userInfo">
      <div className="user">
        <img src={usrImage} alt="avatar" />
        <h2>John Doe</h2>
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
