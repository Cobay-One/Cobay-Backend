// Entry point: start the HTTP server on the configured port.

import { getInt } from "./utils/env.js";
import { createApp } from "./http/app.js";
import { createServer } from "./http/server.js";

const port = getInt("PORT", 3000);
const server = createServer(createApp());

server.listen(port, () => {
  process.stdout.write(`cobay-backend listening on port ${port}\n`);
});
