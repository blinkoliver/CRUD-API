import { createServer } from "http";
import dotenv from "dotenv";
import { parseURL, getReqData } from "./utils";
import { users } from "./users";
import { findOne, updateOne, writeOne } from "./controllers";
import { validate as isValidUUID } from "uuid";

dotenv.config();
const PORT = process.env.PORT || 3000;

const getHandler = async (req: any) => {
  const parseUserId = parseURL(req);
  if (req === parseUserId) {
    return users;
  } else if (isValidUUID(parseUserId)) {
    const resultFromFind = findOne(parseUserId);
    return resultFromFind;
  } else {
    return "Invalid id";
  }
};
const postHandler = async (req: any) => {
  return await getReqData(req);
};
const putHandler = async (req: any) => {
  const parseUserId = parseURL(req.url);
  const parseData = await getReqData(req);
  if (isValidUUID(parseUserId)) {
    const resultFromUpdate = updateOne(parseUserId, parseData);
    if (resultFromUpdate) {
      return resultFromUpdate;
    } else {
      return undefined;
    }
  } else {
    return "Invalid id";
  }
};
const deleteHandler = (req: any) => {
  console.log("delete", req);
};

const server = createServer(async (req, res) => {
  switch (req.method) {
    case "GET":
      const resultFromGet = await getHandler(req.url);
      if (resultFromGet && typeof resultFromGet !== "string") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ data: resultFromGet }));
      } else if (resultFromGet) {
        res.writeHead(400, "invalid ID", {
          "Content-Type": "application/json",
        });
        res.end("error, invalid ID");
      } else {
        res.writeHead(404, "doesn't exist", {
          "Content-Type": "application/json",
        });
        res.end("error, doesn't exist");
      }
      break;
    case "POST":
      const resultFromPost = await postHandler(req);
      if (typeof resultFromPost !== "string") {
        writeOne(resultFromPost);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ data: resultFromPost }));
      } else {
        res.writeHead(400, resultFromPost, {
          "Content-Type": "application/json",
        });
        res.end(`error, ${resultFromPost}`);
      }
      break;
    case "PUT":
      const resultFromPut = await putHandler(req);
      if (resultFromPut && typeof resultFromPut !== "string") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ data: resultFromPut }));
      } else if (resultFromPut) {
        res.writeHead(400, "invalid ID", {
          "Content-Type": "application/json",
        });
        res.end("error, invalid ID");
      } else {
        res.writeHead(404, "doesn't exist", {
          "Content-Type": "application/json",
        });
        res.end("error, doesn't exist");
      }
      break;
    case "DELETE":
      deleteHandler(req.url);
      break;
    default:
  }
});

server.listen(PORT);
console.log(`listen server at port:${PORT}`);
