export const data: string = `
SET search_path = 'netflixDB';
truncate table netflixDB.membre cascade;
truncate table netflixDB.film cascade;
INSERT INTO netflixDB.membre values('1', '1', 'ismail Xiao Li', 'hood vimont', '666666');
INSERT INTO netflixDB.membre values('12', '12', 'ismail Xiao Li', 'hood vimont', '666666');
INSERT INTO netflixDB.film VALUES('1', 'film1', 'genre1', '2006-05-04', '105');
INSERT INTO netflixDB.film VALUES('2', 'film2', 'genre2', '2006-05-04', '105');
INSERT INTO netflixDB.film VALUES('3', 'film3', 'genre3', '2006-05-04', '105');
INSERT INTO netflixDB.film VALUES('4', 'film4', 'genre4', '2006-05-04', '105');
INSERT INTO netflixDB.film VALUES('5', 'film5', 'genre5', '2006-05-04', '105');
`;