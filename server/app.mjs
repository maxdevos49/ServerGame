/**
 * Project codename ledlight
 * @author Maxwell DeVos
 * @since October 3, 2017
 */
import { Server } from "socket.io";

import { logController } from "./logController.mjs";
import { chatController } from "./chatController.mjs";
import { gameController } from "./gameController.mjs";

/**
 * Entry point.
 */
(function main() {
	const port = process.env.PORT;
	const io = new Server(port, {});

	for (const controller of [logController, chatController, gameController]) {
		controller(io);
	}

	console.log(`Socket server running on http://localhost:${port}`);
})();
