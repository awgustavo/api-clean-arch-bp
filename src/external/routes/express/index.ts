import express, { Express } from 'express';

export const startExpress = () => {
    const app = express();
    app.use(express.json());
    app.get("/", (req, res) => {
        res.json({ keepAlive: Date.now()});
    })
    
    return app;
}

export const listenExpress = (app: Express, port: number) => {
    app.listen(port, () => {
        return console.log(`Express is listening at http://localhost:${port}`);
    });
}