import express from "express";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./routes";
import { HttpError } from "./errors/http-errors";

export function createApp(){
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use("/docs", swaggerUi.serve, async (req: express.Request, res: express.Response) => {
        return res.send(swaggerUi.generateHTML(await import("../public/swagger.json")));
    });

    RegisterRoutes(app);

    app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
        if (err instanceof HttpError) {
            return res.status(err.status).json({
                error: err.name,
                message: err.message
            });
        }

        console.error('Unexpected error:', err);
        return res.status(500).json({
            error: 'InternalServerError',
            message: 'An unexpected error occurred'
        });
    });

    return app;
}