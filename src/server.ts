import express, { Application, json } from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "dotenv";

class App {

    public app: Application
    public port: string | number
    public mode: string

    private isDev: boolean

    constructor() {
        config()

        this.app = express()
        this.port = process.env.PORT || 3000;
        this.mode = process.env.NODE_ENV ?? 'development'

        this.isDev =this.mode !== `production`

        this.middlewares()
    }

    private middlewares(): void {
      this.app.use(helmet());
      this.app.use(cors());
      this.app.use(json());
    }
}

export default new App()