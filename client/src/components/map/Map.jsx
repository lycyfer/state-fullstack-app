// import { MapContainer, TileLayer } from 'react-leaflet'
// import './map.scss'
// import "leaflet/dist/leaflet.css";
// import Pin from '../pin/Pin';

// function Map({items}){
  
//   return (
//     <MapContainer center={[55.67469204656442, 37.68196778602708]} zoom={7} scrollWheelZoom={false} className='map'>
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       {items.map(item=>(
//         <Pin item={item} key={item.id}/>
//       ))}
//     </MapContainer>
//   )
// }

// // export default Map

import React from 'react';
import { MapContainer, TileLayer, AttributionControl } from 'react-leaflet';
import './map.scss';
import "leaflet/dist/leaflet.css";
import Pin from '../pin/Pin';

function Map({ items }) {
  return (
    <MapContainer
      center={items.length === 1 ? [items[0].latitude, items[0].longitude]:[55.7558, 37.6173]}
      zoom={7}
      scrollWheelZoom={false}
      className='map'
      attributionControl={false} // Отключаем атрибуцию по умолчанию
    >
      <TileLayer
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <AttributionControl prefix="Leaflet | &copy; <a href='https://leafletjs.com/'>Leaflet</a>, <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors" />
      {items.map(item => (
        <Pin item={item} key={item.id} />
      ))}
    </MapContainer>
  );
}

export default Map;