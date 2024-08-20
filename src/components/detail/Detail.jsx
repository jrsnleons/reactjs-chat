import "./detail.css";
import avatar from "./../../assets/avatar.png"
import { auth, db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

const Detail = () => {
  const {chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock} = useChatStore()
  const {currentUser} = useUserStore()


  const handleBlock = async () => {
    if(!user) return
   
    const userDocRef = doc(db, "users", currentUser.id)

    try{
      
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id)
      })
      changeBlock()
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar || avatar} alt="" />
        <h2>{user?.username}</h2>
        <p>I am such a big nerd of a lot of things.</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <i className="fa-solid fa-angle-up"></i>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <i className="fa-solid fa-angle-up"></i>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <i className="fa-solid fa-angle-down"></i>
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://images.pexels.com/photos/27441561/pexels-photo-27441561/free-photo-of-iland-in-igatpuri.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                <span>photo_title.png</span>
              </div>
              <i className="fa-solid fa-download icon"></i>           
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://images.pexels.com/photos/27441561/pexels-photo-27441561/free-photo-of-iland-in-igatpuri.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"  alt="" />
                <span>photo_title.png</span>
              </div>
              <i className="fa-solid fa-download icon"></i>           
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://images.pexels.com/photos/27441561/pexels-photo-27441561/free-photo-of-iland-in-igatpuri.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                <span>photo_title.png</span>
              </div>
              <i className="fa-solid fa-download icon"></i>           
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://images.pexels.com/photos/27441561/pexels-photo-27441561/free-photo-of-iland-in-igatpuri.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                <span>photo_title.png</span>
              </div>
              <i className="fa-solid fa-download icon"></i>           
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <i className="fa-solid fa-angle-up"></i>
          </div>
        </div>
        <button onClick={handleBlock}>{
          isCurrentUserBlocked ? " You are Blocked!" : isReceiverBlocked? "User blocked": "Block User"
        }</button>
        <button className="logout" onClick={()=> auth.signOut()}>Logout</button>
      </div>
    </div>
  );
};

export default Detail;
