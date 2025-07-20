"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../module/user/user.route");
const argument_route_1 = require("../module/argument/argument.route");
const voting_route_1 = require("../module/voting/voting.route");
const scoreBoard_route_1 = require("../module/scoreBoard/scoreBoard.route");
const debate_route_1 = require("../module/debate/debate.route");
const router = (0, express_1.Router)();
const moduleROuters = [
    {
        path: "/auth",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/arguments",
        route: argument_route_1.ArgumentRoutes
    },
    {
        path: "/vote",
        route: voting_route_1.VotingRoutes
    },
    {
        path: "/score",
        route: scoreBoard_route_1.ScoreboardRoutes
    },
    {
        path: "/debates",
        route: debate_route_1.DebateRoutes
    }
];
moduleROuters.forEach((route) => router.use(route.path, route.route));
exports.default = router;
