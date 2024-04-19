import { useState } from "react";
import "./filter.scss";
import { useSearchParams } from "react-router-dom";

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    property: searchParams.get("property") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    bedroom: searchParams.get("bedroom") || "",
  });

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };
  const handleFilter = () => {
    setSearchParams(query);
  };

  return (
    <div className="filter">
      <h1>
        Результаты поиска по <b>{searchParams.get("city")}</b>
      </h1>
      <div className="top">
        <div className="item">
          <label htmlFor="city">Местоположение</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="Местоположение в городе"
            onChange={handleChange}
            defaultValue={query.city}
          />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="type">Тип</label>
          <select
            name="type"
            id="type"
            onChange={handleChange}
            defaultValue={query.type}
          >
            <option value="">Все</option>
            <option value="buy">Покупка</option>
            <option value="rent">Аренда</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="property">Жилье</label>
          <select
            name="property"
            id="property"
            onChange={handleChange}
            defaultValue={query.property}
          >
            <option value="all">Все</option>
            <option value="apartment">Квартира</option>
            <option value="house">Дом</option>
            {/* <option value="condo">Condo</option> */}
            <option value="land">Земля</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="minPrice">Минимальная цена</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="любая"
            onChange={handleChange}
            defaultValue={query.minPrice}
          />
        </div>
        <div className="item">
          <label htmlFor="maxPrice">Максимальная цена</label>
          <input
            type="text"
            id="maxPrice"
            name="maxPrice"
            placeholder="любая"
            onChange={handleChange}
            defaultValue={query.maxPrice}
          />
        </div>
        <div className="item">
          <label htmlFor="bedroom">Спальня</label>
          <input
            type="text"
            id="bedroom"
            name="bedroom"
            placeholder="любая"
            onChange={handleChange}
            defaultValue={query.bedroom}
          />
        </div>
        <button onClick={handleFilter}>
          <img src="/search.png" alt="" />
        </button>
      </div>
    </div>
  );
}

export default Filter;
