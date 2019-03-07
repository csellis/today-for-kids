import store from "store";

function useLocationStoreOrRedirect(setLocation, setRedirect) {
  const locationStore = store.get("location");
  if (locationStore) {
    const { latitude, longitude } = locationStore;
    setLocation({ latitude, longitude });
  } else {
    setLocation(null);
    setRedirect(true);
  }
}

export { useLocationStoreOrRedirect };
