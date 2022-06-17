import { v4 as uuidv4 } from "uuid";

export let users = [
  {
    id: "b16dc972-b65a-41e1-933f-e44d5f21affb",
    username: "blinkoliver",
    age: 27,
    hobbies: ["sex", "drug", "rock'N'roll"],
  },
  {
    id: uuidv4(),
    username: "brainstormer",
    age: 47,
    hobbies: ["drug", "math"],
  },
  {
    id: uuidv4(),
    username: "bighead",
    age: 16,
    hobbies: ["math", "code"],
  },
];
