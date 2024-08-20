import ChatList from "../list/chatList/ChatList";
import UserInfo from "../list/userInfo/UserInfo";
import "./list.css";

const List = () => {
  return (
    <div className="list">
      <UserInfo />
      <ChatList />
    </div>
  );
};

export default List;
