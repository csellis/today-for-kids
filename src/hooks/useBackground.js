import { useEffect, useState } from "react";
import store from "store";

function useBackground(weather) {
  const [background, setBackground] = useState("white");

  useEffect(() => {
    if (weather) {
      const currentTemp = weather.currently.apparentTemperature;
      const dailyHigh = weather.daily.data[0].apparentTemperatureHigh;
      const warmTemp = store.get("temp");
      if (dailyHigh < warmTemp) {
        console.log(`Brrr it's cold`);
        setBackground("aliceblue");
      } else if (dailyHigh > warmTemp && currentTemp < warmTemp) {
        console.log(`It'll warm up later`);
        setBackground("white");
      } else {
        console.log(`It's a little warm.`);
        setBackground("lightcoral");
      }
    }
  }, [weather]);

  return [background, setBackground];
}

export { useBackground };
