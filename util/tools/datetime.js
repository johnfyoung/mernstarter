import moment from "moment";

export const isABefore = (a, b) => {
  return moment(a, "YYYY-MM-DDTHH:mm:ss.SSSZ").isBefore(
    moment(b, "YYYY-MM-DDTHH:mm:ss.SSSZ")
  );
};
