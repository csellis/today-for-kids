import React, { useState, useEffect } from "react";
import store from "store";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";

import "./location.css";

class Location extends React.Component {
  constructor() {
    super();

    const locationStore = store.get("location");

    this.state = {
      lat: locationStore.latitude || 51.505,
      lng: locationStore.longitude || -0.09,
      zoom: 13
    };
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <LeafletMap className='map' center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={position}>
          <Popup>Your Location</Popup>
        </Marker>
      </LeafletMap>
    );
  }
}

// function Location() {
//   const [location, setLocation] = useState(null);

//   useEffect(() => {
//     function locationError(err) {
//       console.warn(err);
//     }
//     if (!!navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         position => {
//           const { latitude, longitude } = position.coords;
//           const loc = {
//             latitude,
//             longitude
//           };
//           setLocation(loc);
//           store.set("location", loc);
//         },
//         locationError,
//         { timeout: 10000 }
//       );
//     } else {
//       console.warn("Geolocation is required for this application. Sorry.");
//     }
//   }, []);
//   if (!location) return <div>Loading...</div>;

//   const position = [location.latitude, location.longitude];
//   console.log(position);

//   return <Map className='map' center={position} zoom={13} />;
// }

export default Location;
