export const schema: string =`
SET search_path = 'netflixDB';
DROP SCHEMA IF EXISTS netflixDB CASCADE;
CREATE SCHEMA netflixDB;

CREATE TABLE IF NOT EXISTS netflixDB.membre (
	courriel				VARCHAR(30),
	motDePasse				VARCHAR(100),
	nom						VARCHAR(30),
	adressePostale			VARCHAR(40),
	codePostal				VARCHAR(6),
	PRIMARY KEY (courriel)
);

CREATE TABLE IF NOT EXISTS netflixDB.membreMensuel (
	courriel				VARCHAR(30),
	motDePasse				VARCHAR(100),
	nom						VARCHAR(30),
	adressePostale			VARCHAR(40),
	codePostal				VARCHAR(6),
	prix_abonnement			FlOAT,
	date_échéhance			DATE,
	PRIMARY KEY (courriel),
	FOREIGN KEY (courriel) REFERENCES netflixDB.membre(courriel)
);


CREATE TABLE IF NOT EXISTS netflixDB.membreVisionnement (
	courriel				VARCHAR(30),
	motDePasse				VARCHAR(100),
	nom						VARCHAR(30),
	adressePostale			VARCHAR(40),
	codePostal				VARCHAR(6),
	nbFilms					INTEGER,
	PRIMARY KEY (courriel),
	FOREIGN KEY (courriel) REFERENCES netflixDB.membre(courriel)
);

CREATE TABLE IF NOT EXISTS netflixDB.carteCredit (
	noCarte					INTEGER,
	Titulaire				VARCHAR(30),
	dateExpiration			DATE,
	CCV						INTEGER,
	courriel				VARCHAR(30),
	PRIMARY KEY (noCarte),
	FOREIGN KEY (courriel) REFERENCES netflixDB.membre(courriel)
);

CREATE TABLE IF NOT EXISTS netflixDB.film (
	noFilm					INTEGER,
	titre					VARCHAR(30),
	genre					VARCHAR(30),
	dateProduction			DATE,
	durée					INTEGER,
	PRIMARY KEY (noFilm)
);



CREATE TABLE IF NOT EXISTS netflixDB.visionnement (
	courriel				VARCHAR(30),
	noFilm					INTEGER,
	dateVisionnement		DATE,
	duréeVisionnement		INTEGER,
	PRIMARY KEY (noFilm, courriel),
	FOREIGN KEY (noFilm) REFERENCES netflixDB.film(noFilm),
	FOREIGN KEY (courriel) REFERENCES netflixDB.membre(courriel)
	
);

CREATE TABLE IF NOT EXISTS netflixDB.dvdphysique (
	numéroDVD				VARCHAR(5),
	noFilm					INTEGER,
	PRIMARY KEY (numéroDVD, noFilm),
	FOREIGN KEY (noFilm) REFERENCES netflixDB.film(noFilm)
);

CREATE TABLE IF NOT EXISTS netflixDB.achat (
	courriel				VARCHAR(30),
	noFilm					INTEGER,
	noDVD					VARCHAR(5),
	coutEnvoi				FLOAT,
	dateEnvoi				DATE,
	PRIMARY KEY (courriel, noFilm, noDVD),
	FOREIGN KEY (noFilm) REFERENCES netflixDB.film(noFilm),
	FOREIGN KEY (courriel) REFERENCES netflixDB.membre(courriel)
);

CREATE TABLE IF NOT EXISTS netflixDB.ceremonie (
    idCeremonie                 VARCHAR(20),
    maitreCeremonie              VARCHAR(20),
    dateCeremonie                DATE,
    lieu                        VARCHAR(20),
    PRIMARY KEY (idCeremonie)
);

CREATE TABLE IF NOT EXISTS netflixDB.categorieOscar (
    nomCategorie                VARCHAR(20),
    idCeremonie                 VARCHAR(20),
    filmGagnant                 INTEGER,
    PRIMARY KEY (nomCategorie, idCeremonie),
    FOREIGN KEY (idCeremonie) REFERENCES netflixDB.ceremonie(idCeremonie),
    FOREIGN KEY (filmGagnant) REFERENCES netflixDB.film(noFilm)
);

CREATE TABLE IF NOT EXISTS netflixDB.nomination (
    categorie                VARCHAR(20),
    noFilm                   INT,
    PRIMARY KEY (categorie, noFilm),
    FOREIGN KEY (noFilm) REFERENCES netflixDB.film(noFilm)
);
CREATE TABLE IF NOT EXISTS netflixDB.personne(
    noPersonne                INT,
    nom                    	  VARCHAR(20),
    age                       INT,
    nationalite               VARCHAR(20),
    sexe                      VARCHAR(10),
    PRIMARY KEY (noPersonne)
);

CREATE TABLE IF NOT EXISTS netflixDB.participation (
    noPersonne                INT,
    noFilm                    INT,
    PRIMARY KEY (noPersonne, noFilm),
    FOREIGN KEY (noPersonne) REFERENCES netflixDB.personne(noPersonne),
    FOREIGN KEY (noFilm) REFERENCES netflixDB.film(noFilm)
);
CREATE TABLE IF NOT EXISTS netflixDB.role (
    nom                        VARCHAR(20),
    noPersonne                 INT,
    salaire                    FLOAT,
    PRIMARY KEY (nom, noPersonne),
    FOREIGN KEY (noPersonne) REFERENCES netflixDB.personne(noPersonne)
);

`;