import * as pg from "pg";
import "reflect-metadata";
import { Message } from '../../../common/communication/message';
import { schema } from "../schema";
import { data } from "../data";

export class DatabaseService {

    public connectionConfig: pg.ConnectionConfig = {
        user: "postgres",
        database: "netflix",
        password: "123456",
        port: 5432,
        host: "127.0.0.1",
        keepAlive : true
    };

    private pool: pg.Pool = new pg.Pool(this.connectionConfig);

    public constructor() {

        this.pool.connect();
        this.createSchema();

    }

    public async checkUsername(username:string, password:string): Promise<Message>{
        console.log('a envoyer a la DB:', username, password);
        return {
            title:'success',
            body:'Enregistrement réussi.' + 'Welcome, name!'
        }
    }

    createSchema(){
        this.pool.query(schema);
        this.populateDB();
    }

    populateDB(){
        this.pool.query(data);
    }





    //queries here
}
