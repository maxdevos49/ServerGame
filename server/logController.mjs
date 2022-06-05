/**
 * Project codename ledlight
 * @author Maxwell DeVos
 * @since June 4, 2022
 */
import chalk from 'chalk'
import { isDebug } from "./utility.mjs";

function logController(io) {

    const logger = (socketId) => {
        return (event, incoming = true, message = "",) => console.log(`${chalk.blue(socketId)} :: ${incoming ? `${chalk.yellow("Incoming")}` : `${chalk.red("Outgoing")}`} :: ${chalk.green(event)}${message ? ` :: ${message}` : ""}`);
    }

    io.on("connection", (socket) => {
        const log = logger(socket.id);
        log("connection", true);

        socket.onAny((eventName, info) => {
            if (isDebug()) {
                log(eventName, true, JSON.stringify(info))
            } else {
                log(eventName, true)
            }
        });

        socket.onAnyOutgoing((eventName, info) => {
            if (isDebug()) {
                log(eventName, false, JSON.stringify(info))
            } else {
                log(eventName, false)
            }
        });

        socket.on("disconnect", () => {
            log("disconnect", true);
        });
    });
}

export { logController };