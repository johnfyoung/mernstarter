import bcrypt from "bcrypt";
import { dbg } from "../tools";

export const encrypt = password => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
  } catch (err) {
    console.log("Error encrypting password");
    throw err;
  }
};
