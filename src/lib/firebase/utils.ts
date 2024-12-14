import { auth } from "./firebase";
export const getUserId = (action: string): string => {
  if (!auth.currentUser) {
    throw new TypeError(`user is undefined while trying to ${action}`);
  }
  return auth.currentUser.uid;
};
