create database if not exists todo;

create table if not exists todo.todo
(
    id     int auto_increment
        primary key,
    text   varchar(255)         not null,
    status tinyint(1) default 0 null
);