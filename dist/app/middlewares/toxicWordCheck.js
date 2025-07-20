"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toxicWordCheck = void 0;
const bannedWords = ["stupid", "idiot", "dumb"];
const toxicWordCheck = (req, res, next) => {
    const content = req.body.content;
    if (!content)
        return next();
    const found = bannedWords.find(word => content.toLowerCase().includes(word));
    if (found) {
        res.status(400).json({
            statusCode: 400,
            success: false,
            message: `Inappropriate word detected: ${found}`,
            data: null,
        });
        return;
    }
    next();
};
exports.toxicWordCheck = toxicWordCheck;
