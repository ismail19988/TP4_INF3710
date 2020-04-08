export const data: string = `
SET search_path = 'netflixDB';
truncate table netflixDB.membre cascade;
truncate table netflixDB.film cascade;
truncate table netflixDB.visionnement cascade;

INSERT INTO netflixDB.membre values('1', '1', 'ismail Xiao Li', 'hood vimont', '666666');
INSERT INTO netflixDB.membre values('123', '123', 'ismail Xiao Li', 'hood vimont', '666666');
INSERT INTO netflixDB.membre values('1234', '1234', 'ismail Xiao Li', 'hood vimont', '666666');
INSERT INTO netflixDB.membre values('12345', '12345', 'ismail Xiao Li', 'hood vimont', '666666');
INSERT INTO netflixDB.membre values('123456', '123456', 'ismail Xiao Li', 'hood vimont', '666666');

INSERT INTO netflixDB.film VALUES('1', 'film1', 'genre1', '2001-01-01', '111');
INSERT INTO netflixDB.film VALUES('2', 'film2', 'genre2', '2002-02-02', '122');
INSERT INTO netflixDB.film VALUES('3', 'film3', 'genre3', '2003-03-03', '133');
INSERT INTO netflixDB.film VALUES('4', 'film4', 'genre4', '2004-04-04', '144');
INSERT INTO netflixDB.film VALUES('5', 'film5', 'genre5', '2005-05-05', '155');
INSERT INTO netflixDB.film VALUES('6', 'film1', 'genre1', '2001-01-01', '111');
INSERT INTO netflixDB.film VALUES('7', 'film2', 'genre2', '2002-02-02', '122');
INSERT INTO netflixDB.film VALUES('8', 'film3', 'genre3', '2003-03-03', '133');
INSERT INTO netflixDB.film VALUES('9', 'film4', 'genre4', '2004-04-04', '144');
INSERT INTO netflixDB.film VALUES('10', 'film5', 'genre5', '2005-05-05', '155');

INSERT INTO netflixDB.visionnement VALUES('123', 2, '2020-04-01', 1);
INSERT INTO netflixDB.visionnement VALUES('1', 3, '2020-04-01', 2);
INSERT INTO netflixDB.visionnement VALUES('1', 4, '2020-04-01', 3);
INSERT INTO netflixDB.visionnement VALUES('123', 5, '2020-04-01', 4);
`;
