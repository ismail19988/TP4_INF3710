import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";

@injectable()
export class DatabaseService {

    // A MODIFIER POUR VOTRE BD
    public connectionConfig: pg.ConnectionConfig = {
        user: "postgres",
        database: "Hotel",
        password: "password",
        port: 5432,
        host: "127.0.0.1",
        keepAlive : true
    };

    private pool: pg.Pool = new pg.Pool(this.connectionConfig);

    public constructor() {
        this.pool.connect();
    }

    //queries here
}
