import { users } from "./users";
interface user {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}
export const findOne = async (id: string) => {
  return users.find((el: user) => el.id === id);
};
