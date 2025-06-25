"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, statusCode, message, data = null, error = null) => {
    res.status(statusCode).json(Object.assign({ success: statusCode < 400, message,
        data }, (error && { error })));
};
exports.sendResponse = sendResponse;
