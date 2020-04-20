export const schema: string =`
SET search_path = 'netflixDB';
DROP SCHEMA IF EXISTS netflixDB CASCADE;
CREATE SCHEMA netflixDB;

CREATE TABLE IF NOT EXISTS netflixDB.membre (
	courriel				VARCHAR(30),
	motDePasse				VARCHAR(200) NOT NULL,
	nom						VARCHAR(30)  NOT NULL,
	adressePostale			VARCHAR(40)  NOT NULL,
	codePostal				VARCHAR(7)   NOT NULL,
	PRIMARY KEY (courriel)
);

CREATE TABLE IF NOT EXISTS netflixDB.membreMensuel (
	courriel				VARCHAR(30) NOT NULL,
	motDePasse				VARCHAR(200)NOT NULL,
	nom						VARCHAR(30) NOT NULL,
	adressePostale			VARCHAR(40) NOT NULL,
	codePostal				VARCHAR(7)  NOT NULL,
	prix_abonnement			FlOAT		NOT NULL,
	date_debut				DATE,
	date_echehance			DATE        NOT NULL,
	PRIMARY KEY (courriel),
	FOREIGN KEY (courriel) REFERENCES netflixDB.membre(courriel) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS netflixDB.membreVisionnement (
	courriel				VARCHAR(30) NOT NULL,
	motDePasse				VARCHAR(200)NOT NULL,
	nom						VARCHAR(30) NOT NULL,
	adressePostale			VARCHAR(40) NOT NULL,
	codePostal				VARCHAR(7)  NOT NULL,
	nbFilms					INTEGER,
	PRIMARY KEY (courriel),
	FOREIGN KEY (courriel) REFERENCES netflixDB.membre(courriel) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS netflixDB.carteCredit (
	noCarte					INTEGER 	NOT NULL,
	Titulaire				VARCHAR(30) NOT NULL,
	dateExpiration			DATE		NOT NULL,
	CCV						INTEGER		NOT NULL,
	courriel				VARCHAR(30) NOT NULL,
	PRIMARY KEY (noCarte),
	FOREIGN KEY (courriel) REFERENCES netflixDB.membre(courriel) ON DELETE CASCADE
);

CREATE SEQUENCE netflixDB.noFilm_seq;

CREATE TABLE IF NOT EXISTS netflixDB.film (
	noFilm					INTEGER NOT NULL DEFAULT NEXTVAL('netflixDB.noFilm_seq'),
	titre					VARCHAR(30) NOT NULL,
	genre					VARCHAR(30),
	dateProduction			DATE,
	duree					INTEGER,
	PRIMARY KEY (noFilm)
);



CREATE TABLE IF NOT EXISTS netflixDB.visionnement (
	courriel				VARCHAR(30) NOT NULL,
	noFilm					INTEGER     NOT NULL,
	dateVisionnement		DATE,
	dureeVisionnement		INTEGER     NOT NULL,
	PRIMARY KEY (noFilm, courriel),
	FOREIGN KEY (noFilm) REFERENCES netflixDB.film(noFilm) ON DELETE CASCADE,
	FOREIGN KEY (courriel) REFERENCES netflixDB.membre(courriel) ON DELETE CASCADE
	
);

CREATE TABLE IF NOT EXISTS netflixDB.dvdphysique (
	numeroDVD				VARCHAR(5) NOT NULL,
	noFilm					INTEGER	   NOT NULL,
	prix					FLOAT	   NOT NULL,
	PRIMARY KEY (numeroDVD, noFilm),
	FOREIGN KEY (noFilm) REFERENCES netflixDB.film(noFilm) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS netflixDB.achat (
	courriel				VARCHAR(30) NOT NULL,
	noFilm					INTEGER		NOT NULL,
	noDVD					VARCHAR(5)	NOT NULL,
	coutEnvoi				FLOAT		NOT NULL,
	dateEnvoi				DATE,
	PRIMARY KEY (courriel, noFilm, noDVD),
	FOREIGN KEY (noFilm) REFERENCES netflixDB.film(noFilm) ON DELETE CASCADE,
	FOREIGN KEY (courriel) REFERENCES netflixDB.membre(courriel) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS netflixDB.ceremonie (
    idCeremonie                 INTEGER		NOT NULL,
    maitreCeremonie             VARCHAR(20) NOT NULL,
    dateCeremonie               DATE,
    lieu                        VARCHAR(20),
    PRIMARY KEY (idCeremonie)
);

CREATE TABLE IF NOT EXISTS netflixDB.categorieOscar (
	idCeremonie                 INTEGER		NOT NULL,
    nomCategorie                VARCHAR(20) NOT NULL,
    filmGagnant                 INTEGER		NOT NULL,
    PRIMARY KEY (nomCategorie, idCeremonie),
    FOREIGN KEY (idCeremonie) REFERENCES netflixDB.ceremonie(idCeremonie) ON DELETE CASCADE,
    FOREIGN KEY (filmGagnant) REFERENCES netflixDB.film(noFilm) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS netflixDB.nomination (
	idCeremonie              INTEGER		NOT NULL,
	categorie                VARCHAR(20)	NOT NULL,
    noFilm                   INTEGER		NOT NULL,
    PRIMARY KEY (categorie, idCeremonie, noFilm),
	FOREIGN KEY (noFilm) REFERENCES netflixDB.film(noFilm) ON DELETE CASCADE,
	FOREIGN KEY (idCeremonie) REFERENCES netflixDB.ceremonie(idCeremonie) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS netflixDB.personne(
    noPersonne                INTEGER		NOT NULL,
    nom                    	  VARCHAR(20)	NOT NULL,
    dateNaissance             date,
    nationalite               VARCHAR(20),
    sexe                      VARCHAR(10)	NOT NULL,
    PRIMARY KEY (noPersonne)
);

CREATE TABLE IF NOT EXISTS netflixDB.participation (
	nomRole                   VARCHAR(20)	NOT NULL,
    noPersonne                INTEGER		NOT NULL,
    noFilm                    INTEGER		NOT NULL,
	salaire                   FLOAT,
    PRIMARY KEY (nomRole, noPersonne, noFilm),
    FOREIGN KEY (noPersonne) REFERENCES netflixDB.personne(noPersonne) ON DELETE CASCADE,
    FOREIGN KEY (noFilm) REFERENCES netflixDB.film(noFilm) ON DELETE CASCADE
);
`;