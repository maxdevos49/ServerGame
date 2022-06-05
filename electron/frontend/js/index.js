"use strict";
/**
 * Project codename ledLight
 * @author Max DeVos
 * @since October 3, 2017
 */

import { setupSocketConnection } from "./socket.js";
import { connectionController } from "./connectionController.js";
import { clientChatController } from "./clientChatController.js";
import { clientGameController } from "./clientGameController.js";

function main() {

	listenForConnect((url, handle) => {

		setupSocketConnection(url, [
			connectionController,
			clientGameController,
			clientChatController(handle),
		]);
	});
}
document.addEventListener("DOMContentLoaded", main);


function listenForConnect(callback) {
	const $form = document.querySelector("#server-form");
	if (!$form) {
		return;
	}

	$form.addEventListener("submit", (e) => {
		e.preventDefault()

		const $handle = document.querySelector("#handle");
		const $server = document.querySelector("#server");

		if (!$handle || !$server) {
			return;
		}

		const handle = $handle.value;
		const serverURL = $server.value;

		callback(serverURL, handle);
	});
}
