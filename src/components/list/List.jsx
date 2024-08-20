import ChatList from "../list/chatList/ChatList";
import "./list.css";
import UserInfo from "../list/userInfo/UserInfo";

const List = () => {
  return (
    <div className="list">
      <UserInfo />
      <ChatList />
    </div>
  );
};

export default List;
