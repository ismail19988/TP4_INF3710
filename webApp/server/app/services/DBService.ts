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

    public async checkUsername(username: string, password: string): Promise<Message> {
        console.log(password);
        
        let request = { title: '', body: '' };

        await this.pool.query("SELECT * FROM netflixDB.membre WHERE courriel = '" + username + "'").then(
        (res) => {
            if(res.rowCount > 0 ){
                 password === res.rows[0].motdepasse ?
                    request = {
                        title:'success',
                        body:'Connexion réussie. Bienvenue, '+ username + '!'
                    } : 
                    request = {
                        title:'fail',
                        body:'Connexion échouée. Courriel ou mot de passe incorrect.'
                    }
            }
            else {
                request =  {
                    title:'fail',
                    body:'Connexion échouée. Courriel ou mot de passe incorrect.'
                }
            }
        }).catch(
        (err) => {
            request = {
                title: 'fail',
                body: "Une erreur s'est produite " + err
            };
        });

        return request;
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
