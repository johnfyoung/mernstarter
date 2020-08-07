import Validator from "validator";
import { isEmpty } from "../tools";

export const validateUserRegistration = data => {
  let errors = {};

  data.userFirstName = !isEmpty(data.userFirstName) ? data.userFirstName : "";
  data.userLastName = !isEmpty(data.userLastName) ? data.userLastName : "";
  data.userEmail = !isEmpty(data.userEmail) ? data.userEmail : "";
  data.userPassword = !isEmpty(data.userPassword) ? data.userPassword : "";
  data.userPassword2 = !isEmpty(data.userPassword2) ? data.userPassword2 : "";

  if (
    !Validator.isLength(data.userFirstName, {
      min: 2,
      max: 30
    })
  ) {
    errors.userFirstName = "First name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.userFirstName)) {
    errors.userFirstName = "First name field is required";
  }

  if (
    !Validator.isLength(data.userLastName, {
      min: 2,
      max: 30
    })
  ) {
    errors.userLastName = "Last name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.userLastName)) {
    errors.userLastName = "Last name field is required";
  }

  if (!Validator.isEmail(data.userEmail)) {
    errors.userEmail = "Email is invalid";
  }

  if (Validator.isEmpty(data.userEmail)) {
    errors.userEmail = "Email field is required";
  }

  if (
    !Validator.isLength(data.userPassword, {
      min: 6,
      max: 30
    })
  ) {
    errors.userPassword = "Password must be at least 6 characters";
  }

  if (Validator.isEmpty(data.userPassword)) {
    errors.userPassword = "Password field is required";
  }

  if (!Validator.equals(data.userPassword, data.userPassword2)) {
    errors.userPassword2 = "Passwords must match";
  }

  if (Validator.isEmpty(data.userPassword2)) {
    errors.userPassword2 = "Confirm password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
