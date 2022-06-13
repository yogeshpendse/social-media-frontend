import { isAlpha, isStrongPassword } from "validator";
export function checkregistrationdata(username, password, name) {
  const passwordbool = isStrongPassword(password);
  const two = isAlpha(username);
  const namebool = name.length > 0;
  const usernamebool = two === true && username.length > 4 ? true : false;
  const finalbool =
    passwordbool === true && namebool === true && usernamebool === true
      ? false
      : true;

  return finalbool;
}
