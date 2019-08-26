export const dbg = (label, val = null) => {
  if (process.env.NODE_ENV === "development") {
    console.log(label, val);
  }
};
