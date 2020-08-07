export const dbg = (label, val = null) => {
  if (process.env.NODE_ENV === "development") {
    if (val) {
      console.log(label, val);
    } else {
      console.log(label);
    }
  }
};
