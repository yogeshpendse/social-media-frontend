import { isAlpha, isStrongPassword } from "validator";
export function checkdata(username, password, name) {
  const one = isStrongPassword(password);
  const onehalf = password.length > 6;
  const two = isAlpha(username);
  const twohalf = username.length > 4;
  const three = name.length > 0;
  const namebool = three;
  const passwordbool = one && onehalf;
  const usernamebool = two && twohalf;
  // console.log({ namebool, usernamebool, passwordbool });
  return namebool && usernamebool && passwordbool;
}
