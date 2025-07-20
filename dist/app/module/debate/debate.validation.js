"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinDebateSchema = exports.createDebateSchema = void 0;
const zod_1 = require("zod");
exports.createDebateSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        description: zod_1.z.string().optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
        category: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        duration: zod_1.z.number().optional(),
    }),
});
exports.joinDebateSchema = zod_1.z.object({
    body: zod_1.z.object({
        side: zod_1.z.enum(["support", "oppose"]),
    }),
    params: zod_1.z.object({
        id: zod_1.z.string(),
    }),
});
