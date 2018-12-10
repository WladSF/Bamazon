DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(45) NOT NULL,
    department_name VARCHAR(45) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("TV", "Electronics", 500, 100),
("Xbox", "Electronics", 400, 200),
("McBook", "Electronics", 1500, 150),
("Sofa", "Furniture", 1100, 80),
("Table", "Furniture", 200, 50),
("Chair", "Furniture", 50, 100),
("The Dark", "Books", 10.50, 200),
("Macbeth", "Books", 20, 300),
("Wolf", "Books", 15.70, 400),
("iTunes card", "Music", 35.60, 600);

select * from products



