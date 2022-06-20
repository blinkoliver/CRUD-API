export const parseURL = (string: string): string => {
  const begin: number = string.indexOf("$%7B");
  const end: number = string.lastIndexOf("%7D");
  if (begin === -1 && end === -1) {
    return string;
  } else {
    return string.slice(begin + 4, end);
  }
};
export const getReqData = async (req: any) => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req.on("data", (chunk: any) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        const result = JSON.parse(body);
        const isUsername = typeof result.username === "string";
        const isAge = result.age && typeof parseInt(result.age) === "number";
        const isHobby = Array.isArray(result.hobbies);
        if (isUsername && isAge && isHobby) {
          resolve(result);
        } else {
          resolve("fill required fields");
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};
