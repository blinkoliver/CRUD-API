import { createServer } from "http";
import dotenv from "dotenv";
import { parseURL, getReqData } from "./utils";
import { users } from "./users";
import { deleteOne, findOne, updateOne, writeOne } from "./controllers";
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
const deleteHandler = async (req: any) => {
  const parseUserId = parseURL(req);
  if (isValidUUID(parseUserId)) {
    const resultFromDelete = deleteOne(parseUserId);
    if (resultFromDelete) {
      return resultFromDelete;
    } else {
      return undefined;
    }
  } else {
    return "Invalid id";
  }
};

const server = createServer(async (req, res) => {
  if (req.url && !req.url.startsWith("/api/users")) {
    res.writeHead(404, "non-existing endpoint", {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ data: "non-existing endpoint" }));
    return;
  }
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
        const resultFromWrite = writeOne(resultFromPost);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ data: resultFromWrite }));
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
      const resultFromDelete = await deleteHandler(req.url);
      if (resultFromDelete === "success") {
        res.writeHead(204, { "Content-Type": "application/json" });
        res.end("success");
      } else if (resultFromDelete === "Invalid id") {
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
    default:
      res.writeHead(500, "server error", {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({ data: "server error" }));
  }
});

server.listen(PORT);
console.log(`listen server at port:${PORT}`);
