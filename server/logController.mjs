/**
 * Project codename ledlight
 * @author Maxwell DeVos
 * @since June 4, 2022
 */
import chalk from 'chalk'
import { isDebug } from "./utility.mjs";

function logController(io) {
    const logger = (socketId) => {
        return (event, message = "") => {
            console.log(`${chalk.blue(socketId)} :: ${chalk.green(event)}${message ? ` :: ${message}` : ""}`)
        }
    }

    io.on("connection", (socket) => {
        const log = logger(socket.id);
        log("connection");
        socket.onAny((eventName, info) => {
            if (isDebug()) {
                log(eventName, JSON.stringify(info))
            } else {
                log(eventName)
            }
        });

        socket.on("disconnect", () => {
            log("disconnect");
        });
    });
}

export { logController };