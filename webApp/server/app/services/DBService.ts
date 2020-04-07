import * as pg from 'pg';
import 'reflect-metadata';
import { Message } from '../../../common/communication/message';
import { schema } from '../schema';
import { data } from '../data';
import { Movie } from './Movie';

export class DatabaseService {

    //A configurer
    public connectionConfig: pg.ConnectionConfig = {
        user: 'postgres',
        database: 'netflix',
        password: '123456',
        port: 5432,
        host: '127.0.0.1',
        keepAlive: true,
    };

    private pool: pg.Pool = new pg.Pool(this.connectionConfig);

    public constructor() {
        this.pool.connect();
        //this.createSchema();
    }

    public async checkUsername(mail: string, password: string): Promise<Message> {
        console.log(mail, password)
        let answer = { title: '', body: '' };

        await this.pool
            .query("SELECT * FROM netflixDB.membre WHERE courriel = '" + mail + "'")
            .then(res => {
                if (res.rowCount > 0) {
                    password === res.rows[0].motdepasse
                        ? (answer = {
                              title: 'Success',
                              body: 'Connexion réussie. Bienvenue, ' + res.rows[0].nom + '!',
                          })
                        : (answer = {
                              title: 'Fail',
                              body: 'Connexion échouée. Courriel ou mot de passe incorrect.',
                          });
                } else {
                    answer = {
                        title: 'Fail',
                        body: 'Connexion échouée. Courriel ou mot de passe incorrect.',
                    };
                }
            })
            .catch(err => {
                answer = {
                    title: 'Fail',
                    body: "Une erreur s'est produite " + err,
                };
            });

        return answer;
    }

    public async registerUser(userData: {
        fName: string;
        lName: string;
        mail: string;
        password: string;
        adress: string;
        postalCode: string;
        price: string;
        date: String;
        membreMensuel: boolean;
    }) : Promise<Message> {

        let exist:boolean = false;
        await this.pool.query("SELECT * FROM netflixDB.membre WHERE courriel = '" + userData.mail + "'").then((res) => {
            console.log(res.rowCount);
            if(res.rowCount > 0) {
                exist = true;
            }
        })

        let answer = { title: '', body: '' };

        if(exist) {
            answer =  {
                title: 'Fail',
                body: 'Enregistrement impossible. Un utilisateur avec ce courriel exist déjà.'
            }

        } else {

            userData.membreMensuel ?
            await this.pool.query(`
            INSERT INTO netflixDB.membre VALUES('${ userData.mail }', '${ userData.password }', '${ userData.fName } ${ userData.lName }', '${ userData.adress }', '${ userData.postalCode }');
            INSERT INTO netflixDB.membreMensuel VALUES('${ userData.mail }', '${ userData.password }', '${ userData.fName } ${ userData.lName }', '${ userData.adress }', '${ userData.postalCode }', '${ userData.price }', '${ userData.date }');
            `).then(()=>{
                answer =  {
                    title: 'Success',
                    body: 'Enregistrement Réussi.'
                }
            }).catch((err) => {
                answer = {
                    title: 'Fail',
                    body: "Une erreur s'est produite. " + err,
                };
            }) :
            await this.pool.query(`
            INSERT INTO netflixDB.membre VALUES('${ userData.mail }', '${ userData.password }', '${ userData.fName } ${ userData.lName }', '${ userData.adress }', '${ userData.postalCode }');
            INSERT INTO netflixDB.membreVisionnement VALUES('${ userData.mail }', '${ userData.password }', '${ userData.fName } ${ userData.lName }', '${ userData.adress }', '${ userData.postalCode }', '0');;
            `).then(()=>{
                answer =  {
                    title: 'Success',
                    body: 'Enregistrement Réussi.'
                }
            }).catch((err) => {
                answer = {
                    title: 'Fail',
                    body: "Une erreur s'est produite " + err,
                };
            });

        }

        return answer;

    }


    public async getAllMovies(): Promise<Movie[]>{

        let movies = new Array<Movie>();
        await this.pool.query('SELECT * FROM netflixDB.film').then((res)=>{
            for(let result of res.rows){
                movies.push(new Movie(result.titre, result.genre, result.dateProduction, result.durée));
            }
        }).catch((err)=>{
            console.log('une erreur sest produite', err);
        })

        return movies;
    }

    createSchema() {
        this.pool.query(schema);
        this.populateDB();
    }

    populateDB() {
        console.log('populating')
        this.pool.query(data).then((res)=>{
        console.log(res);
        }).catch((err)=>{
            console.log(err)
        });
    }

    //queries here
}
