// export const dbg = (label, val = null) => {
//   if (process.env.NODE_ENV === "development") {
//     console.log(label, val);
//   }
// };

export const dbg = {
  log: (label, val = null) => {
    if (process.env.NODE_ENV === "development") {
      console.log(label, val);
    }
  },
  group: (label) => {
    if (process.env.NODE_ENV === "development") {
      console.group(label);
    }
  },
  groupEnd: () => {
    if (process.env.NODE_ENV === "development") {
      console.groupEnd();
    }
  }
};
