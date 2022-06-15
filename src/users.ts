import { v4 as uuidv4 } from "uuid";

export let users = [
  {
    id: uuidv4(),
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
];
