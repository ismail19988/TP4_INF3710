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

    public async checkUsername(username:string, password:string): Promise<Message> {
        console.log(password);
        this.pool.query("select * from netflixDB.membre where courriel = '1'").then((res) => {
            console.error(res.rows.length);
            if(res.rowCount > 0 ){
                console.error(res.rowCount);
                return password === res.rows[0].motdepasse ?
                    {
                        title:'success',
                        body:'Connexion réussie. Bienvenue, '+ username + '!'
                    } : 
                    {
                        title:'fail',
                        body:'Connexion échouée. Courriel ou mot de passe incorrect.'
                    }
            }
            else {
                return {
                    title:'fail',
                    body:'Connexion échouée. Courriel ou mot de passe incorrect.'
                }
            }
        }).catch((err) => {
            console.log('erreur!');
        });

        return {
            title:'fail',
            body:"Une erreur s'est produite"
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
