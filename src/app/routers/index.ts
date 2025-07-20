import { Router } from "express";
import { UserRoutes } from "../module/user/user.route";
import { ArgumentRoutes } from "../module/argument/argument.route";
import { VotingRoutes } from "../module/voting/voting.route";
import { ScoreboardRoutes } from "../module/scoreBoard/scoreBoard.route";
import { DebateRoutes } from "../module/debate/debate.route";


const router = Router();

const moduleROuters = [
    {

        path: "/auth",
        route: UserRoutes,
    
    },
    {
        path:"/arguments",
        route:ArgumentRoutes
    },
    {
        path:"/vote",
        route:VotingRoutes
    },
    {
        path:"/score",
        route:ScoreboardRoutes
    },
    {
        path:"/debates",
        route:DebateRoutes
    }
   
]
moduleROuters.forEach((route) => router.use(route.path, route.route));
export default router;