"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const debateSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [{ type: String }],
    category: { type: String, required: true },
    image: { type: String },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    duration: { type: Number, required: true },
    endsAt: { type: Date, required: true },
    supportSide: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    opposeSide: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });
const Debate = (0, mongoose_1.model)("Debate", debateSchema);
exports.default = Debate;
