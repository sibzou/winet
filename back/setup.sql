create table wine(
    id integer primary key,
    name text not null,
    categoryId integer references category(id),
    vineyardId integer references vineyard(id),
    colorId integer references color(id)
);

create table category(
    id integer primary key,
    name text not null
);

create table vineyard(
    id integer primary key,
    name text not null
);

create table color(
    id integer primary key,
    name text not null
);

create table user(
    id integer primary key,
    name text not null,
    password text not null
);

create table rate(
    userId integer references user(id),
    wineId integer references wine(id),
    rate integer not null,
    primary key(userId, wineId)
);

create table favorite(
    userId integer references user(id),
    wineId integer references wine(id),
    primary key(userId, wineId)
);

create table comment(
    id integer primary key,
    userId integer references user(id),
    wineId integer references wine(id),
    message text not null
);

create table commentLike(
    userId integer references user(id),
    commentId integer references comment(id),
    primary key(userId, commentId)
);

insert into category(name) values("rosé"),
                                 ("blanc"),
                                 ("rouge");

insert into color(name) values("or"),
                              ("framboise"),
                              ("grenat"),
                              ("roux"),
                              ("jaune paille"),
                              ("tuilé");
