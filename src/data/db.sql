create database db_fruits_ecommerce;
use db_fruits_ecommerce;

create table users(
	user_id varchar(40) primary key default(uuid()),
    user_email varchar(50) not null unique,
    user_password varchar(150) not null,
    user_name varchar(50) not null,
    user_lastname varchar(50),
    user_phone varchar(15),
    user_is_admin tinyint default 0,
    user_status tinyint default 1
);

create table categories
(
	categories_id varchar(40) primary key default(uuid()),
    categories_name varchar(50) not null,
    categories_status tinyint default 1
);

insert into categories(categories_name) 
values
	('Frutas'),
	('verduras');
    
create table sub_categories
( 
	sub_category_id varchar(40) primary key default(uuid()),
    sub_category_name varchar(50),
    categories_id varchar(40),
	sub_category_status tinyint default 1,
    foreign key (categories_id) 
    references categories(categories_id)
);

insert into sub_categories(sub_category_name, categories_id) 
values
	('Cítricos',(SELECT categories_id FROM categories WHERE categories_name = 'Frutas')),
	('Hortalizas', (SELECT categories_id FROM categories WHERE categories_name = 'Verduras'));
    
create table units_measurement(
	um_id varchar(40) primary key default(uuid()),
    um_name varchar(20) not null,
    um_status tinyint default 1
);

insert into units_measurement(um_name) 
values
	('Kg'),
	('Unidad');

create table products
(
	product_id varchar(40) primary key default(uuid()),
    product_name varchar(40) not null,
    product_description varchar(50),
    product_image varchar(200) not null,
    sub_category_id varchar(40),
    product_stock decimal(9,2) not null,
    um_id varchar(40),
    product_sales_price	 decimal(9,2) not null,
    product_purchase_price decimal(9,2) not null,
    product_status tinyint default 1,
    foreign key (sub_category_id) references sub_categories(sub_category_id),
    foreign key (um_id) references units_measurement(um_id)
);

create table status_orders (
	status_order_id varchar(40) primary key default(uuid()),
    status_order_description varchar(30) not null
);

create table  orders
(
    order_id varchar(40) primary key default(uuid()),
    user_id varchar(40),
    order_date datetime,
    status_order_id varchar(40),
    foreign key (status_order_id) references status_orders(status_order_id),
    foreign key (user_id) references users(user_id)
);

create table order_details
(
    order_id varchar(40),
    product_id varchar(40),
    quantity int not null,
    unit_price decimal(9,2)not null,
    primary key (order_id, product_id),
	foreign key (order_id) references orders(order_id),
    foreign key (product_id) references products(product_id)
);
