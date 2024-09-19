CREATE DATABASE login;
USE login;

CREATE TABLE usuario(
	email varchar(50) primary key,
	username varchar(30),
    pass varchar(100)
);

select * from usuario;


