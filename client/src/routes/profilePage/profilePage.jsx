import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import apiRequest from "../../lib/apiReques";
import { Link, useNavigate } from "react-router-dom";
import "./profilePage.scss";
import { useContext, useEffect } from "react";
import { Suspense } from "react";
import { AuthContext } from "../../context/AuthContext";

function ProfilePage() {
  const { updateUser, currentUser } = useContext(AuthContext);

  const navigate = useNavigate();
  console.log(currentUser)
  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>Информация о пользователе</h1>
            <Link to="/profile/update">
            <button>Обновить профиль</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Аватар:
              <img
                src={currentUser.avatar || "../../public/noavatar.png"}
                alt=""
              />
            </span>
            <span>
              Имя: <b>{currentUser.username}</b>
            </span>
            <span>
              Почта: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>выход</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/add">
            <button>Создать новый пост</button>
            </Link>
          </div>
          <List/>
          <div className="title"> 
            <h1>Сохраненный список</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
