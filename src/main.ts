import "dotenv/config";
import server from "boot/express";

const runApp = () => {
  try {
    const port = process.env.PORT;
    server.listen(port, () => console.log(`Server is listening on port: ${port}`));
  } catch(err) {
    console.log(err);
    process.exit(1);
  }
}

runApp();