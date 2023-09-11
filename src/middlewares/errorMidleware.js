import httpStatus from "http-status";

export default function errorMidleware(error, req, res, next) {
    const {  statusCode, message, type } = error;
    if (statusCode) return res.status(statusCode).send(`${type}\n${message}`);

    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
}