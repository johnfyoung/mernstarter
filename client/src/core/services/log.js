import axios from "axios";

const captureUserEvent = event => {
  axios
    .post("/api/events", event)
    .then(res => {
      if (res.status === 200) {
        return true;
      }
    })
    .catch(err => {
      throw err;
    });
};

export const logServices = {
  captureUserEvent
};
