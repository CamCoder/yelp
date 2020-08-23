INSERT INTO restaurants (name, location, price_range) values ('DQ', 'Texas', 3);
INSERT INTO restaurants (name, location, price_range) values ('DQ', 'Texas', 3);
INSERT INTO restaurants (name, location, price_range) values ('WingStop', 'USA', 2);
INSERT INTO restaurants (name, location, price_range) values ('PizzaHUt', 'Chicago', 4);

DELETE FROM restaurants where id = 7;

CREATE TABLE reviews(id BIGSERIAL NOT NULL PRIMARY KEY, restaurant_id BIGINT NOT NULL REFERENCES restaurants(id), name varchar(50) NOT NULL, review TEXT NOT NULL, rating INT NOT NULL CHECK(rating >= 1 and rating <=5) );

INSERT INTO reviews (restaurant_id, name, review, rating) values (2, 'carl', 'AMAZING', 5);