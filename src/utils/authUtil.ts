import jwt from "jsonwebtoken";

function generateAccessToken(username: string) {
  return jwt.sign({ username }, process.env.TOKEN_SECRET as string, {
    expiresIn: "1d",
  });
}

export { generateAccessToken };
