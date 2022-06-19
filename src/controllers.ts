import { users } from "./users";
import { v4 as uuidv4 } from "uuid";
interface user {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export const findOne = (id: string) => {
  const desired = users.find((el: user) => el.id === id);
  if (desired) {
    return desired;
  } else {
    return undefined;
  }
};
export const writeOne = (data: any): void => {
  const newUser = { ...data, id: uuidv4() };
  users.push(newUser);
  console.log(users);
};

export const updateOne = (id: string, data: any): any => {
  const desired = findOne(id);
  const indexInUsers = users.findIndex((el) => el.id === id);
  if (desired) {
    const updatedUser = {
      ...desired,
      username: data.username,
      age: data.age,
      hobbies: data.hobbies,
    };
    users.splice(indexInUsers, 1);
    users.splice(indexInUsers, 0, updatedUser);
    return updatedUser;
  } else {
    return undefined;
  }
};
