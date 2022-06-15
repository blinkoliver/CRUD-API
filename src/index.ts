import { createServer } from "http";
import { users } from "./users.js";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3000;

const getHandler = (req: any) => {
  console.log("get", req);
};
const postHandler = (req: any) => {
  console.log("post", req);
};
const putHandler = (req: any) => {
  console.log("put", req);
};
const deleteHandler = (req: any) => {
  console.log("delete", req);
};

const server = createServer(async (req, res) => {
  switch (req.method) {
    case "GET":
      getHandler(req.url);
      break;
    case "POST":
      postHandler(req.url);
      break;
    case "PUT":
      putHandler(req.url);
      break;
    case "DELETE":
      deleteHandler(req.url);
      break;
    default:
  }
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      data: "Hello World!",
    })
  );
});

server.listen(PORT);
console.log(`listen server at port:${PORT}`);
