import React from "react";
import store from "store";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import Button from "@material-ui/core/Button";

import "./location.css";

class Location extends React.Component {
  componentWillMount() {
    const locationStore = store.get("location");
    let lat, lng;
    if (locationStore) {
      lat = locationStore.latitude;
      lng = locationStore.longitude;
    } else {
      lat = 51.505;
      lng = -0.09;
    }
    this.setState({
      lat,
      lng,
      zoom: 13
    });
  }

  updatePosition() {
    if (!!navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          const loc = {
            latitude,
            longitude
          };
          this.setState({
            lat: latitude,
            lng: longitude
          });
          store.set("location", loc);
        },
        error => console.warn(error),
        { timeout: 10000 }
      );
    } else {
      console.warn("Geolocation is required for this application. Sorry.");
    }
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <>
        <LeafletMap className='map' center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          <Marker position={position}>
            <Popup>Your Location</Popup>
          </Marker>
        </LeafletMap>
        <Button
          style={{ margin: "1em" }}
          variant='outlined'
          color='primary'
          onClick={() => this.updatePosition()}
        >
          Update location
        </Button>
      </>
    );
  }
}

export default Location;
