import React, { useState, useEffect } from "react";
import store from "store";

function Location() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    function locationError(err) {
      console.warn(err);
    }
    if (!!navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          const loc = {
            latitude,
            longitude
          };
          setLocation(loc);
          store.set("location", loc);
        },
        locationError,
        { timeout: 10000 }
      );
    } else {
      console.warn("Geolocation is required for this application. Sorry.");
    }
  }, []);

  return <div>Hi, I'm the location</div>;
}

export default Location;
