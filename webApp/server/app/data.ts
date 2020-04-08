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

INSERT INTO netflixDB.film VALUES('1', 'film1', 'genre1', '2006-05-04', '105');
INSERT INTO netflixDB.film VALUES('2', 'film2', 'genre2', '2006-05-04', '105');
INSERT INTO netflixDB.film VALUES('3', 'film3', 'genre3', '2006-05-04', '105');
INSERT INTO netflixDB.film VALUES('4', 'film4', 'genre4', '2006-05-04', '105');
INSERT INTO netflixDB.film VALUES('5', 'film5', 'genre5', '2006-05-04', '105');

INSERT INTO netflixDB.visionnement VALUES('1', 2, '2020-04-01', 1);
INSERT INTO netflixDB.visionnement VALUES('1', 3, '2020-04-01', 2);
INSERT INTO netflixDB.visionnement VALUES('1', 4, '2020-04-01', 3);
INSERT INTO netflixDB.visionnement VALUES('1', 5, '2020-04-01', 4);
`;
