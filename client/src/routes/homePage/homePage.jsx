import { useContext } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import { AuthContext } from "../../context/AuthContext";

function HomePage() {

const {currentUser} = useContext(AuthContext)

console.log(currentUser)

  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Найдите недвижимость и приобретите жилье Своей мечты</h1>
          <p>
          Откройте дверь к вашему идеальному дому - найдите свое пристанище в нашем разнообразии недвижимости!
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Многолетний опыт работы</h2>
            </div>
            <div className="box">
              <h1>200</h1>
              <h2>Полученная награда</h2>
            </div>
            <div className="box">
              <h1>2000+</h1>
              <h2>Недвижимость готова</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default HomePage;
