export const data: string = `
SET search_path = netflixDB;

TRUNCATE membre CASCADE;
TRUNCATE membreMensuel CASCADE;
TRUNCATE membreVisionnement CASCADE;
TRUNCATE carteCredit CASCADE;
TRUNCATE film CASCADE;
TRUNCATE visionnement CASCADE;
TRUNCATE dvdphysique CASCADE;
TRUNCATE achat CASCADE;
TRUNCATE ceremonie CASCADE;
TRUNCATE categorieOscar CASCADE;
TRUNCATE nomination CASCADE;
TRUNCATE personne CASCADE;
TRUNCATE participation CASCADE;
ALTER SEQUENCE netflixDB.noFilm_seq RESTART WITH 1; 

INSERT INTO membre VALUES('yuhan@gmail.com', 'Mdp123', 'Li', '2075 rue Namur', 'H7M 5L1');
INSERT INTO membre VALUES('ismail@hotmail.com', 'mdp12345', 'Bakkouri', '6590 34e Avenue', 'H1T 3B4');
INSERT INTO membre VALUES('justin@hotmail.com', '123mdp', 'Trudeau', '216 Kindersley Ave', 'H3R 1R6');
INSERT INTO membre VALUES('dawut@hotmail.com', '12mdp', 'Esse', '216 Kindersley Ave', 'H3R 1R6');
INSERT INTO membre VALUES('niene@hotmail.com', '1234mdp', 'thon', '216 Kindersley Ave', 'H3R 1R6');
INSERT INTO membre VALUES('thxForInvite@hotmail.com', '12345mdp', 'patel', '216 Kindersley Ave', 'H3R 1R6');
INSERT INTO membre VALUES('123god@hotmail.com', '12345mdp', 'ashashahan', '216 Kindersley Ave', 'H3R 1R6');
INSERT INTO membre VALUES('ming@hotmail.com', '1234567mdp', 'xiao Yuhan', '216 Kindersley Ave', 'H3R 1R6');
INSERT INTO membre VALUES('andie@hotmail.com', '12345678mdp', 'pogdorica', '216 Kindersley Ave', 'H3R 1R6');
INSERT INTO membre VALUES('victor@hotmail.com', '123456789mdp', 'kim', '216 Kindersley Ave', 'H3R 1R6');
INSERT INTO membre VALUES('finalUser@hotmail.com', '123456789mdp', 'eleven', '216 Kindersley Ave', 'H3R 1R6');

INSERT INTO membreMensuel VALUES('yuhan@gmail.com', 'Mdp123', 'Li', '2075 rue Namur', 'H7M 5L1', 10.99,'2020-01-03', '2020-12-4');
INSERT INTO membreMensuel VALUES('justin@hotmail.com', '123mdp', 'Trudeau', '216 Kindersley Ave', 'H3R 1R6', 10.99, '2020-01-03', '2021-01-01');
INSERT INTO membreMensuel VALUES('dawut@hotmail.com', '12mdp', 'Esse', '216 Kindersley Ave', 'H3R 1R6', 11.99,'2020-01-03', '2021-01-01');
INSERT INTO membreMensuel VALUES('niene@hotmail.com', '1234mdp', 'thon', '216 Kindersley Ave', 'H3R 1R6', 10.99,'2020-01-03', '2020-12-4');
INSERT INTO membreMensuel VALUES('thxForInvite@hotmail.com', '12345mdp', 'patel', '216 Kindersley Ave', 'H3R 1R6', 11.99,'2020-01-03', '2021-01-01');

INSERT INTO membreVisionnement VALUES('ismail@hotmail.com', 'mdp12345','Bakkouri', '6590 34e Avenue', 'H1T 3B4', 10);
INSERT INTO membreVisionnement VALUES('123god@hotmail.com', '12345mdp', 'ashashahan', '216 Kindersley Ave', 'H3R 1R6', 1);
INSERT INTO membreVisionnement VALUES('ming@hotmail.com', '1234567mdp', 'xiao Yuhan', '216 Kindersley Ave', 'H3R 1R6', 5);
INSERT INTO membreVisionnement VALUES('andie@hotmail.com', '12345678mdp', 'pogdorica', '216 Kindersley Ave', 'H3R 1R6', 9);
INSERT INTO membreVisionnement VALUES('victor@hotmail.com', '123456789mdp', 'kim', '216 Kindersley Ave', 'H3R 1R6', 2);

INSERT INTO carteCredit VALUES(123456, 'Yuhan Li', '2023-11-08', 432, 'yuhan@gmail.com');
INSERT INTO carteCredit VALUES(345678, 'Ismail Bakkouri', '2021-05-15', 139, 'ismail@hotmail.com');
INSERT INTO carteCredit VALUES(456789, 'Justin Trudeau', '2025-04-11', 781, 'justin@hotmail.com');

INSERT INTO film VALUES(default, 'Star Wars I', 'Action', '1978-02-19', '132');
INSERT INTO film VALUES(DEFAULT, 'Star Wars II', 'Action', '1980-01-12', '136');
INSERT INTO film VALUES(DEFAULT, 'Star Wars III', 'Action', '1983-03-20', '124');
INSERT INTO film VALUES(DEFAULT, 'Harry Potter I', 'Action', '2000-05-23', '129');
INSERT INTO film VALUES(DEFAULT, 'Harry Potter II', 'Action', '2002-02-13', '131');
INSERT INTO film VALUES(DEFAULT, 'Harry Potter III', 'Action', '2003-06-07', '124');
INSERT INTO film VALUES(DEFAULT, 'Harry Potter IIII', 'Action', '2004-11-12', '146');
INSERT INTO film VALUES(DEFAULT, 'Titanic', 'Romance', '1997-10-30', '162');
INSERT INTO film VALUES(DEFAULT, 'The Notebook', 'Romance', '2004-03-12', '151');
INSERT INTO film VALUES(DEFAULT, 'Halloween', 'Horreur', '1978-07-10', '117');
INSERT INTO film VALUES(DEFAULT,'It', 'Horreur', '2017-06-21', '142');
INSERT INTO film VALUES(DEFAULT,'Mommy', 'Drame', '2014-09-21', '134');
INSERT INTO film VALUES(DEFAULT,'Laurence Anyways', 'Drame', '2012-07-18', '168');
INSERT INTO film VALUES(DEFAULT, 'Scoop', 'Romance', '2006-07-28', '121');

INSERT INTO visionnement VALUES('yuhan@gmail.com', 2, '2020-02-03', '67');
INSERT INTO visionnement VALUES('yuhan@gmail.com', 4, '2020-03-11', '102');

INSERT INTO visionnement VALUES('dawut@hotmail.com', 5, '2019-12-05', '100');
INSERT INTO visionnement VALUES('justin@hotmail.com', 5, '2020-01-10', '86');
INSERT INTO visionnement VALUES('niene@hotmail.com', 5, '2020-01-10', '90');
INSERT INTO visionnement VALUES('yuhan@gmail.com', 5, '2020-03-11', '112');
INSERT INTO visionnement VALUES('ismail@hotmail.com', 5, '2018-03-01', '68');
INSERT INTO visionnement VALUES('thxForInvite@hotmail.com', 5, '2019-11-30', '27');
INSERT INTO visionnement VALUES('123god@hotmail.com', 5, '2019-05-17', '110');
INSERT INTO visionnement VALUES('ming@hotmail.com', 5, '2020-01-10', '110');
INSERT INTO visionnement VALUES('andie@hotmail.com', 5, '2017-06-02', '127');
INSERT INTO visionnement VALUES('victor@hotmail.com', 5, '2016-03-17', '108');
INSERT INTO visionnement VALUES('finalUser@hotmail.com', 5, '2019-01-07', '110');

INSERT INTO visionnement VALUES('ismail@hotmail.com', 2, '2020-01-03', '114');
INSERT INTO visionnement VALUES('ismail@hotmail.com', 11, '2020-02-22', '20');
INSERT INTO visionnement VALUES('ismail@hotmail.com', 6, '2019-12-23', '2');

INSERT INTO dvdphysique VALUES('DVD1', 1, 9.99);
INSERT INTO dvdphysique VALUES('DVD2', 1, 9.99);
INSERT INTO dvdphysique VALUES('DVD3', 1, 9.99);
INSERT INTO dvdphysique VALUES('DVD4', 2, 10.99);
INSERT INTO dvdphysique VALUES('DVD5', 2, 10.99);
INSERT INTO dvdphysique VALUES('DVD6', 3, 10.99);
INSERT INTO dvdphysique VALUES('DVD7', 3, 10.99);
INSERT INTO dvdphysique VALUES('DVD8', 3, 10.99);
INSERT INTO dvdphysique VALUES('DVD9', 4, 10.99);
INSERT INTO dvdphysique VALUES('DVD10', 4, 10.99);
INSERT INTO dvdphysique VALUES('DVD11', 5, 10.99);
INSERT INTO dvdphysique VALUES('DVD12', 5, 10.99);
INSERT INTO dvdphysique VALUES('DVD13', 6, 11.99);
INSERT INTO dvdphysique VALUES('DVD14', 6, 11.99);
INSERT INTO dvdphysique VALUES('DVD15', 6, 11.99);
INSERT INTO dvdphysique VALUES('DVD16', 7, 11.99);
INSERT INTO dvdphysique VALUES('DVD17', 7, 11.99);
INSERT INTO dvdphysique VALUES('DVD18', 7, 11.99);
INSERT INTO dvdphysique VALUES('DVD19', 8, 10.99);
INSERT INTO dvdphysique VALUES('DVD20', 8, 10.99);
INSERT INTO dvdphysique VALUES('DVD21', 9, 10.99);
INSERT INTO dvdphysique VALUES('DVD22', 9, 10.99);
INSERT INTO dvdphysique VALUES('DVD23', 9, 10.99);
INSERT INTO dvdphysique VALUES('DVD24', 10, 6.99);
INSERT INTO dvdphysique VALUES('DVD25', 10, 6.99);
INSERT INTO dvdphysique VALUES('DVD26', 10, 6.99);
INSERT INTO dvdphysique VALUES('DVD27', 11, 7.99);
INSERT INTO dvdphysique VALUES('DVD28', 11, 7.99);
INSERT INTO dvdphysique VALUES('DVD29', 11, 7.99);
INSERT INTO dvdphysique VALUES('DVD30', 12, 8.99);
INSERT INTO dvdphysique VALUES('DVD31', 12, 8.99);
INSERT INTO dvdphysique VALUES('DVD32', 13, 8.50);
INSERT INTO dvdphysique VALUES('DVD33', 13, 8.50);

INSERT INTO achat VALUES('yuhan@gmail.com', 4, 'DVD9', 10.0, '2020-01-03');
INSERT INTO achat VALUES('yuhan@gmail.com', 11, 'DVD27', 10.0, '2020-01-03');
INSERT INTO achat VALUES('ismail@hotmail.com', 7, 'DVD16', 2.0, '2020-01-03');
INSERT INTO achat VALUES('ismail@hotmail.com', 2, 'DVD4', 2.0, '2020-01-03');
INSERT INTO achat VALUES('ismail@hotmail.com', 11, 'DVD28', 2.0, '2020-01-03');

INSERT INTO ceremonie VALUES(1, 'Maitre John', '2005-12-05', 'New York');
INSERT INTO ceremonie VALUES(2, 'Maitre George', '2018-12-11', 'Los Angeles');

INSERT INTO categorieOscar VALUES(1, 'Meilleur film', 1);
INSERT INTO categorieOscar VALUES(1, 'Meilleur acteur', 2);
INSERT INTO categorieOscar VALUES(2, 'Meilleur actrice', 2);
INSERT INTO categorieOscar VALUES(2, 'Meilleur film', 4);
INSERT INTO categorieOscar VALUES(2, 'Meilleur acteur', 1);
INSERT INTO categorieOscar VALUES(1, 'Meilleur scenario', 3);
INSERT INTO categorieOscar VALUES(1, 'Meilleur realisateur', 6);
INSERT INTO categorieOscar VALUES(1, 'Meilleur musique', 1);

INSERT INTO nomination VALUES(1, 'Meilleur film', 1);
INSERT INTO nomination VALUES(1, 'Meilleur film', 3);
INSERT INTO nomination VALUES(1, 'Meilleur film', 4);
INSERT INTO nomination VALUES(2, 'Meilleur acteur', 5);
INSERT INTO nomination VALUES(2, 'Meilleur acteur', 6);
INSERT INTO nomination VALUES(1, 'Meilleur acteur', 2);
INSERT INTO nomination VALUES(1, 'Meilleur actrice', 3);
INSERT INTO nomination VALUES(1, 'Meilleur actrice', 7);
INSERT INTO nomination VALUES(2, 'Meilleur actrice', 10);
INSERT INTO nomination VALUES(2, 'Meilleur musique', 9);
INSERT INTO nomination VALUES(1, 'Meilleur musique', 3);
INSERT INTO nomination VALUES(1, 'Meilleur musique', 2);
INSERT INTO nomination VALUES(1, 'Meilleur musique', 12);
INSERT INTO nomination VALUES(2, 'Meilleur musique', 6);
INSERT INTO nomination VALUES(2, 'Meilleur musique', 10);

INSERT INTO personne VALUES(1201, 'Woody Allen', '1964-09-07', 'Americain', 'M');
INSERT INTO personne VALUES(4341, 'George Lucas', '1944-06-14', 'Americain', 'M');
INSERT INTO personne VALUES(11, 'JK Rowling', '1949-07-12', 'Anglaise', 'F');
INSERT INTO personne VALUES(12, 'Chris Columbus', '1937-10-13', 'Americain', 'M');
INSERT INTO personne VALUES(13, 'Mike Newell', '1964-10-03', 'Anglais', 'M');
INSERT INTO personne VALUES(55, 'Leonardo Dicaprio', '1974-10-10', 'Americain', 'M');
INSERT INTO personne VALUES(342, 'Ryan Gosling', '1994-09-07', 'Americain', 'M');
INSERT INTO personne VALUES(420, 'Jamie Curtis', '1984-07-02', 'Americaine', 'F');
INSERT INTO personne VALUES(8977, 'Bill Skarsgård', '1964-09-07', 'Suedois', 'M');
INSERT INTO personne VALUES(332, 'Anne Dorval', '1924-10-30', 'Quebecoise', 'F');
INSERT INTO personne VALUES(333, 'Suzanne Clement', '1992-03-03', 'Quebecoise', 'F');
INSERT INTO personne VALUES(334, 'Xavier Dolan', '1927-10-02', 'Quebecois', 'M');

INSERT INTO participation VALUES('Realisateur', 4341, 1, 55000000);
INSERT INTO participation VALUES('Realisateur', 12, 5, 12000000);
INSERT INTO participation VALUES('Realisateur', 13, 12, 1000000);
INSERT INTO participation VALUES('Realisateur', 334, 12, 3000000);
INSERT INTO participation VALUES('Realisateur', 4341, 6, 50000000);
INSERT INTO participation VALUES('Redacteur', 1201, 9, 20000000);
INSERT INTO participation VALUES('Acteur', 1201, 5, 2000000);
INSERT INTO participation VALUES('Acteur', 55, 6, 2500000);
INSERT INTO participation VALUES('Acteur', 342, 2, 1000000);
INSERT INTO participation VALUES('Acteur', 420, 1, 100000);
INSERT INTO participation VALUES('Acteur', 8977, 7, 150000);
INSERT INTO participation VALUES('Acteur', 332, 10, 50000);
INSERT INTO participation VALUES('Acteur', 333, 14, 30000);
`;
