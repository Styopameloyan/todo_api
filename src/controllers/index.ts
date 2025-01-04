import * as express from "express";
import getSchemaClasses from "../schema/initSchemas";

// Routes
import { BaseController } from "./Base";
import { UserController } from "./User";
// import { DocumentController } from "./Documents";
// import { DynamicDataController } from "./DynamicData";
// import { CommentController } from "./Comment";
const router: express.Router = express.Router();

const defineRoutes = async (): Promise<express.Router> => {
    // Hier neue Routen definieren
    // ...

    router.use("/users", UserController);



    // router.use("/file", DocumentController);
    // router.use("/dynamicdata", DynamicDataController);
    // router.use("/comment", CommentController);

    // Standard Routen 
    const { models } = await getSchemaClasses();
    const defaultRoutes = Object.keys(models);
    defaultRoutes.forEach((name: string) => router.use(`/${name.toLowerCase()}`, BaseController));

    // Route not found
    router.all("*", (req, res) => {
        res.status(404).send(`Route: '${req.originalUrl}' not exist.`);
    });

    return router;
}

export default defineRoutes;