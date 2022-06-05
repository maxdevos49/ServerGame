/**
 * Project codename ledlight
 * @author Maxwell DeVos
 * @since June 4, 2022
 */

function isDebug() {
    return process.env.ENVIRONMENT === "debug";
}

export {
    isDebug
}