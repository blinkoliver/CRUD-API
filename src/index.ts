import { createServer } from "http";
import dotenv from "dotenv";
import { parseURL } from "./utils";
import { users } from "./users";
import { findOne } from "./controllers";

dotenv.config();
const PORT = process.env.PORT || 3000;

const getHandler = async (req: any) => {
  const parseString = parseURL(req);
  if (req === parseString) {
    return users;
  } else {
    return await findOne(parseString);
  }
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
      const result = await getHandler(req.url);
      if (result) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ data: result }));
      } else {
        res.writeHead(404, "doesn't exist", {
          "Content-Type": "application/json",
        });
        res.end("error");
      }
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
});

server.listen(PORT);
console.log(`listen server at port:${PORT}`);
