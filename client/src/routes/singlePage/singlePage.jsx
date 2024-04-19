import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { singlePostData, userData } from "../../lib/dummydata";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify"
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiReques";

function SinglePage() {

  const post = useLoaderData()
  const {currentUser} = useContext(AuthContext)
  const [saved, setSaved] = useState(post.isSaved)
  const navigate = useNavigate()



  const handleSave = async () => {

    if(!currentUser) {
      navigate("/login")
    }

setSaved((prev) => !prev)
    try {
      await apiRequest.post("/users/save", {postId: post.id})
    } catch (err) {
      console.log(err)
      setSaved((prev) => !prev)
    }
  }

  console.log(post)

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">{post.price} ₽</div>
              </div>
              <div className="user">
                <img src={post.user.avatar} alt="" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div className="bottom" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post.postDetail.desc)}}></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">Общие</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Коммунальные услуги</span>
                {
                  post.postDetail.utilities === "owner" ? 
                  <p>Владелец несет ответственность</p> : (<p>арендатор несет ответственность</p>)
                }
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Политика в отношении домашних животных</span>
                {post.postDetail.pet === "allowen" ? <p>Домашние животные разрешены</p> : <p>Домашние животные не разрешены</p>}
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Плата за недвижимость</span>
              {post.postDetail.income}
              </div>
            </div>
          </div>
          <p className="title">Размер</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span> {post.postDetail.size}</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post.bedroom} кровати</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post.bathroom} ванная</span>
            </div>
          </div>
          <p className="title">Ближайщие места</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>Школа</span>
                <p>{post.postDetail.school}м</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Автобусная остановка</span>
                <p>{post.postDetail.bus}м</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Ресторан</span>
                <p>{post.postDetail.restaurant}м</p>
              </div>
            </div>
          </div>
          <p className="title">Местоположение</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            <button>
              <img src="/chat.png" alt="" />
              Отправить сообщение
            </button>
            <button
              onClick={handleSave}
              style={{
                backgroundColor: saved ? "#fece51" : "white",
              }}
            >
              <img src="/save.png" alt="" />
              {saved ? "Сохраненное место" : "Сохраните это место"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
