SET search_path = netflixDB;

-- 1) Affichez toutes les informations sur un film spécifié par l'utilisateur (selon le titre)
-- ici nous supposons que le titre de la clause where sera entré par un utilisateur.
select titre, genre, dateproduction, duree, nomRole as participant, nom as nomParticipant
from netflixdb.participation natural Join netflixdb.personne natural join netflixdb.film
where titre = 'Harry Potter III';

--2) Pour chaque genre de film, listez tous les titres de films ainsi que la dernière date à laquelle
-- un film a été acheté (DVD) ou visionné
select titre, genre,
max(
	case
	when dateVisionnement > dateenvoi or dateenvoi is null then dateVisionnement
	else dateenvoi
	end
) as dernieredate
from film f join (
		select * from
			(
				select v.noFilm as numéroFilmVisionné, dateVisionnement
				from visionnement v
			) visio
			full join
			(
				select a.noFilm as numeroFilmAcheté, dateEnvoi
				from achat a
			) ach
		on visio.numéroFilmVisionné = ach.numeroFilmAcheté
	) r on r.numéroFilmVisionné = f.nofilm or r.numeroFilmAcheté = f.nofilm
group by titre, genre
order by genre;




-- 3) Pour chaque genre de film, trouvez les noms et courriels des membres qui les ont visionnés le
-- plus souvent. Par exemple, Amal Z est le membre qui a visionné le plus de documentaires
-- animaliers 
select genre, nom, courriel, count(*) as nbVue
from(
	  netflixdb.membre
	  natural join netflixdb.visionnement
	  natural join netflixdb.film
)
group by genre, nom, courriel
order by nbVue desc;

-- 4)  Trouvez le nombre total de films groupés par réalisateur 
select nomRole, nom, count(*) as nbfilms
from netflixdb.participation natural join netflixdb.film natural join netflixdb.personne
where nomRole = 'Realisateur' 
group by nomRole, nom
order by nbfilms desc;


-- 5) Trouvez les noms des membres dont le coût total d’achat de DVD est plus élevé que la moyenne
select membre.nom as nom, sum(prix) as cout_total
from netflixdb.membre as membre natural join achat natural join netflixdb.dvdPhysique
group by nom
having sum(prix) > (
	select avg(somme) from (
		select nom, sum(prix) as somme
			from netflixdb.membre natural join achat natural join netflixdb.dvdPhysique
    	group by nom
	) as moyenne
);


-- 6) Ordonnez et retournez les films en termes de quantité totale vendue (DVD) et en nombre de 
-- visionnements 
select titre, sum(count) as acces_total
from(
	(
		select v.noFilm, count(*)
		from visionnement v
		group by v.noFilm
	)
	union all
	(
		select a.noFilm, count(*)
		from achat a
		group by a.noFilm
	)
) total natural join netflixdb.film
group by noFilm, titre
order by acces_total desc;


-- 7) Trouvez le titre et le prix des films qui n’ont jamais été commandés sous forme de DVD mais qui ont été visionnés plus de 10 fois 
-- comme il y'a plusieurs dvd, nous retournons la moyenne des prix de ces dvd pour evite une abiguité
select titre, avg(prix)
from film f join (
		select * from
			(
				select v.noFilm as numéroFilmVisionné, count(*) as visio_count
				from visionnement v
				group by v.noFilm
			) visio
			full join
			(
				select a.noFilm as numeroFilmAcheté, count(*) as achat_count
				from achat a
				group by a.noFilm
			) ach
		on visio.numéroFilmVisionné = ach.numeroFilmAcheté
	) r on r.numéroFilmVisionné = f.nofilm or r.numeroFilmAcheté = f.nofilm natural join dvdPhysique
where r.visio_count > 10 and r.achat_count is null 
group by titre;

-- 8) Trouvez le nom et date de naissance des acteurs qui jouent dans les films qui sont visionnés
-- le plus souvent (soit plus que la moyenne) 
WITH info_acteur as (
	SELECT p.nom as nomActeur, p.dateNaissance as naissanceActeur, COUNT(v.noFilm) AS myCount
	FROM netflixDB.personne p NATURAL JOIN netflixDB.participation part NATURAL JOIN netflixDB.visionnement v
	WHERE part.nomRole = 'Acteur'
	GROUP BY nomActeur, naissanceActeur
)
SELECT nomActeur, naissanceActeur
FROM info_acteur
WHERE myCount > (
	SELECT AVG(myCount)
	FROM info_acteur
);

-- 9) Trouvez le nom du ou des réalisateurs qui ont réalisé les films qui ont le plus grand nombre
-- de nominations aux oscars. Par exemple, Woody Allen et Steven Spielberg ont réalisé 10
-- films qui ont été nominés aux oscars. 
WITH realisateur
AS (
	SELECT p.nom as nomRealisateur, COUNT(n.noFilm) as myCount
	FROM netflixDB.personne p NATURAL JOIN netflixDB.participation part NATURAL JOIN netflixDB.nomination n 
	WHERE part.nomRole = 'Realisateur'
	GROUP BY p.nom
)
SELECT nomRealisateur
FROM realisateur
WHERE myCount = (
  SELECT MAX(myCount) 
  FROM realisateur
);

-- 10) Trouvez le nom des réalisateurs qui ont été le plus souvent nominés aux oscars mais qui
-- n’ont jamais gagné d’oscar
WITH realisateur_nonGagnant
AS (
	SELECT p.nom as nomRealisateur, COUNT(n.noFilm) as myCount
  	FROM netflixDB.personne p NATURAL JOIN netflixDB.participation part NATURAL JOIN netflixDB.nomination n 
  	WHERE part.nomRole = 'Realisateur'
	AND n.noFilm NOT IN (
  		SELECT c.filmGagnant
  		FROM netflixDB.categorieOscar c
  	)
	GROUP BY p.nom
)
SELECT nomRealisateur
FROM realisateur_nonGagnant
WHERE myCount = (
	SELECT MAX(myCount) 
	FROM realisateur_nonGagnant
);

-- 11) Trouvez les films (titre, année) qui ont gagné le plus d’oscars. Listez également leur
-- réalisateurs et leurs acteurs
WITH film_acteur
as (
	SELECT DISTINCT f.noFilm as noFilm, f.titre as titreFilm, f.dateProduction as dateFilm, 
		part.nomRole as r, p.nom as nomPersonne, COUNT(*) as myCount
	FROM netflixDB.film f NATURAL JOIN netflixDB.participation part NATURAL JOIN netflixDB.personne p
	WHERE part.nomRole IN ('Realisateur', 'Acteur')
	AND noFilm IN (
		SELECT noFilm 
		FROM netflixDB.categorieOscar
	)
	GROUP BY noFilm, titreFilm, dateFilm, r, nomPersonne
	ORDER BY titreFilm
)
SELECT titreFilm, dateFilm, r, nomPersonne
FROM film_acteur
WHERE myCount = (
  SELECT MAX(myCount) 
  FROM film_acteur
);

-- 13) Comment a évolué la carrière de Woody Allen ? (On veut connaitre tous ses rôles dans un
-- film (réalisateur, acteur, etc.) du plus ancien au plus récent)
SELECT nomRole, titre, dateProduction
FROM netflixDB.participation NATURAL JOIN netflixDB.personne personne NATURAL JOIN netflixDB.film
WHERE personne.nom = 'Woody Allen'
ORDER BY dateProduction;










