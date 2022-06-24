import { CronJob } from "cron";
import jwt from "jsonwebtoken";

import { Blacklist } from "database/models/blacklist";

// at 0 second, 0 minute, 0 hour, everyday clear expired black list token
const job = new CronJob("0 0 0 */1 * *", async function () {
  const blacklist = await Blacklist.findAll();

  blacklist.forEach(({ id, token }) => {
    const { exp } = jwt.decode(token) as jwt.JwtPayload;
    // expired
    if (Date.now() >= exp! * 1000) {
      Blacklist.destroy({ where: { id } });
    }
  });
});

job.start();
