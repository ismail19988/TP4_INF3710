SET search_path = netflixDB;

-- 1) Affichez toutes les informations sur un film specifie par l'utilisateur (selon le titre)
-- ici nous supposons que le titre de la clause where sera entre par un utilisateur.
select titre, genre, dateproduction, duree, nomRole as participant, nom as nomParticipant
from netflixdb.participation natural Join netflixdb.personne natural join netflixdb.film
where titre = 'Harry Potter III';

--2) Pour chaque genre de film, listez tous les titres de films ainsi que la dernière date à laquelle
-- un film a ete achete (DVD) ou visionne
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
				select v.noFilm as numeroFilmVisionne, dateVisionnement
				from visionnement v
			) visio
			full join
			(
				select a.noFilm as numeroFilmAchete, dateEnvoi
				from achat a
			) ach
		on visio.numeroFilmVisionne = ach.numeroFilmAchete
	) r on r.numeroFilmVisionne = f.nofilm or r.numeroFilmAchete = f.nofilm
group by titre, genre
order by genre;

-- 3) Pour chaque genre de film, trouvez les noms et courriels des membres qui les ont visionnes le
-- plus souvent. Par exemple, Amal Z est le membre qui a visionne le plus de documentaires
-- animaliers 
select genre, nom, courriel, count(*) as nbVue
from(
	  netflixdb.membre
	  natural join netflixdb.visionnement
	  natural join netflixdb.film
)
group by genre, nom, courriel
order by nbVue desc;

-- 4)  Trouvez le nombre total de films groupes par realisateur 
select nomRole, nom, count(*) as nbfilms
from netflixdb.participation natural join netflixdb.film natural join netflixdb.personne
where nomRole = 'Realisateur' 
group by nomRole, nom
order by nbfilms desc;


-- 5) Trouvez les noms des membres dont le coût total d’achat de DVD est plus eleve que la moyenne
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


-- 6) Ordonnez et retournez les films en termes de quantite totale vendue (DVD) et en nombre de 
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


-- 7) Trouvez le titre et le prix des films qui n’ont jamais ete commandes sous forme de DVD mais qui ont ete visionnes plus de 10 fois 
-- comme il y'a plusieurs dvd, nous retournons la moyenne des prix de ces dvd pour evite une abiguite
select titre, avg(prix)
from film f join (
		select * from
			(
				select v.noFilm as numeroFilmVisionne, count(*) as visio_count
				from visionnement v
				group by v.noFilm
			) visio
			full join
			(
				select a.noFilm as numeroFilmAchete, count(*) as achat_count
				from achat a
				group by a.noFilm
			) ach
		on visio.numeroFilmVisionne = ach.numeroFilmAchete
	) r on r.numeroFilmVisionne = f.nofilm or r.numeroFilmAchete = f.nofilm natural join dvdPhysique
where r.visio_count > 10 and r.achat_count is null 
group by titre;

-- 8) Trouvez le nom et date de naissance des acteurs qui jouent dans les films qui sont visionnes
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

-- 9) Trouvez le nom du ou des realisateurs qui ont realise les films qui ont le plus grand nombre
-- de nominations aux oscars. Par exemple, Woody Allen et Steven Spielberg ont realise 10
-- films qui ont ete nomines aux oscars. 
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

-- 10) Trouvez le nom des realisateurs qui ont ete le plus souvent nomines aux oscars mais qui
-- n’ont jamais gagne d’oscar
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

-- 11) Trouvez les films (titre, annee) qui ont gagne le plus d’oscars. Listez egalement leur
-- realisateurs et leurs acteurs
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

-- 12) Quelles paires de femmes québécoises ont le plus souvent travaillé ensemble dans différents
-- films ? 
with paires_Qc as (
SELECT distinct p1.nom, p1.noPersonne AS no1, p2.nom as nom2, p2.noPersonne AS no2
	FROM netflixDB.personne p1 INNER JOIN netflixDB.personne p2 ON p1.noPersonne != p2.noPersonne
	WHERE p1.nationalite = 'Quebecoise' AND p2.nationalite = 'Quebecoise' AND p1.sexe = 'F' AND p2.sexe = 'F'
), 
collegue AS (
  	SELECT part1.noPersonne AS no1, part2.noPersonne AS no2, COUNT(*) as nbCollab
   		FROM netflixDB.participation part1  INNER JOIN netflixDB.participation part2 ON part1.noPersonne > part2.noPersonne
   		WHERE part1.nofilm = part2.nofilm AND (part1.noPersonne, part2.noPersonne) IN (SELECT no1, no2 FROM paires_Qc)
  		GROUP BY(part1.noPersonne, part2.noPersonne)
)
select distinct p1.nom as nom1, p2.nom as nom2, nbCollab
from collegue inner join netflixDB.personne p1 on p1.noPersonne = no1 inner join netflixDB.personne p2 on p2.noPersonne = no2
where nbCollab is not null and nbCollab >= all (select nbCollab from collegue);

-- 13) Comment a evolue la carrière de Woody Allen ? (On veut connaitre tous ses rôles dans un
-- film (realisateur, acteur, etc.) du plus ancien au plus recent)
SELECT nomRole, titre, dateProduction
FROM netflixDB.participation NATURAL JOIN netflixDB.personne personne NATURAL JOIN netflixDB.film
WHERE personne.nom = 'Woody Allen'
ORDER BY dateProduction;











