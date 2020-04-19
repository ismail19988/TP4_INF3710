export const schema: string =`
SET search_path = 'netflixDB';
DROP SCHEMA IF EXISTS netflixDB CASCADE;
CREATE SCHEMA netflixDB;

CREATE TABLE IF NOT EXISTS netflixDB.membre (
	courriel				VARCHAR(30),
	motDePasse				VARCHAR(200),
	nom						VARCHAR(30),
	adressePostale			VARCHAR(40),
	codePostal				VARCHAR(7),
	PRIMARY KEY (courriel)
);

CREATE TABLE IF NOT EXISTS netflixDB.membreMensuel (
	courriel				VARCHAR(30),
	motDePasse				VARCHAR(200),
	nom						VARCHAR(30),
	adressePostale			VARCHAR(40),
	codePostal				VARCHAR(7),
	prix_abonnement			FlOAT,
	date_échéhance			DATE,
	PRIMARY KEY (courriel),
	FOREIGN KEY (courriel) REFERENCES netflixDB.membre(courriel) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS netflixDB.membreVisionnement (
	courriel				VARCHAR(30),
	motDePasse				VARCHAR(200),
	nom						VARCHAR(30),
	adressePostale			VARCHAR(40),
	codePostal				VARCHAR(7),
	nbFilms					INTEGER,
	PRIMARY KEY (courriel),
	FOREIGN KEY (courriel) REFERENCES netflixDB.membre(courriel) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS netflixDB.carteCredit (
	noCarte					INTEGER,
	Titulaire				VARCHAR(30),
	dateExpiration			DATE,
	CCV						INTEGER,
	courriel				VARCHAR(30),
	PRIMARY KEY (noCarte),
	FOREIGN KEY (courriel) REFERENCES netflixDB.membre(courriel) ON DELETE CASCADE
);

CREATE SEQUENCE netflixDB.noFilm_seq;

CREATE TABLE IF NOT EXISTS netflixDB.film (
	noFilm					INTEGER NOT NULL DEFAULT NEXTVAL('netflixDB.noFilm_seq'),
	titre					VARCHAR(30),
	genre					VARCHAR(30),
	dateProduction			DATE,
	duree					INTEGER,
	PRIMARY KEY (noFilm)
);



CREATE TABLE IF NOT EXISTS netflixDB.visionnement (
	courriel				VARCHAR(30),
	noFilm					INTEGER,
	dateVisionnement		DATE,
	dureeVisionnement		INTEGER,
	PRIMARY KEY (noFilm, courriel),
	FOREIGN KEY (noFilm) REFERENCES netflixDB.film(noFilm) ON DELETE CASCADE,
	FOREIGN KEY (courriel) REFERENCES netflixDB.membre(courriel) ON DELETE CASCADE
	
);

CREATE TABLE IF NOT EXISTS netflixDB.dvdphysique (
	numéroDVD				VARCHAR(5),
	noFilm					INTEGER,
	prix					FLOAT,
	PRIMARY KEY (numéroDVD, noFilm),
	FOREIGN KEY (noFilm) REFERENCES netflixDB.film(noFilm) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS netflixDB.achat (
	courriel				VARCHAR(30),
	noFilm					INTEGER,
	noDVD					VARCHAR(5),
	coutEnvoi				FLOAT,
	dateEnvoi				DATE,
	PRIMARY KEY (courriel, noFilm, noDVD),
	FOREIGN KEY (noFilm) REFERENCES netflixDB.film(noFilm) ON DELETE CASCADE,
	FOREIGN KEY (courriel) REFERENCES netflixDB.membre(courriel) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS netflixDB.ceremonie (
    idCeremonie                 INTEGER,
    maitreCeremonie             VARCHAR(20),
    dateCeremonie               DATE,
    lieu                        VARCHAR(20),
    PRIMARY KEY (idCeremonie)
);

CREATE TABLE IF NOT EXISTS netflixDB.categorieOscar (
	idCeremonie                 INTEGER,
    nomCategorie                VARCHAR(20),
    filmGagnant                 INTEGER,
    PRIMARY KEY (nomCategorie, idCeremonie),
    FOREIGN KEY (idCeremonie) REFERENCES netflixDB.ceremonie(idCeremonie) ON DELETE CASCADE,
    FOREIGN KEY (filmGagnant) REFERENCES netflixDB.film(noFilm) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS netflixDB.nomination (
	idCeremonie              INTEGER,
	categorie                VARCHAR(20),
    noFilm                   INTEGER,
    PRIMARY KEY (categorie, idCeremonie, noFilm),
	FOREIGN KEY (noFilm) REFERENCES netflixDB.film(noFilm) ON DELETE CASCADE,
	FOREIGN KEY (idCeremonie) REFERENCES netflixDB.ceremonie(idCeremonie) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS netflixDB.personne(
    noPersonne                INTEGER,
    nom                    	  VARCHAR(20),
    dateNaissance             date,
    nationalite               VARCHAR(20),
    sexe                      VARCHAR(10),
    PRIMARY KEY (noPersonne)
);

CREATE TABLE IF NOT EXISTS netflixDB.participation (
	nomRole                   VARCHAR(20),
    noPersonne                INTEGER,
    noFilm                    INTEGER,
	salaire                   FLOAT,
    PRIMARY KEY (nomRole, noPersonne, noFilm),
    FOREIGN KEY (noPersonne) REFERENCES netflixDB.personne(noPersonne) ON DELETE CASCADE,
    FOREIGN KEY (noFilm) REFERENCES netflixDB.film(noFilm) ON DELETE CASCADE
);
`;