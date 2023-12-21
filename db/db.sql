USE rogans_app;

CREATE TABLE users(
   id bigint primary key auto_increment,
   email varchar(180) not null unique,
   name varchar(90) not null,
   lastname varchar(90) not null,
   phone varchar(90) not null,
   image varchar(255) null,
   password varchar(90) not null,
   document varchar(90) not null,
   create_at timestamp(0) not null,
   update_at timestamp(0) not null
);