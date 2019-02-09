import React, { createContext, useState } from "react";

export const LocationContext = createContext();

function Location({ children }) {
  const [location, setLocation] = useState({});
  console.log(children);

  if (!!navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      setLocation({ latitude, longitude });
    });
  }

  return (
    <LocationContext.Provider value={(location, setLocation)}>{children}</LocationContext.Provider>
  );
}

export default Location;
