export const data: string =`
SET search_path = 'netflixDB';
truncate table netflixDB.membre cascade;
INSERT INTO netflixDB.membre values('1', '1', 'ismail Xiao Li', 'hood vimont', '666666');
INSERT INTO netflixDB.membre values('12', '12', 'ismail Xiao Li', 'hood vimont', '666666');
`;