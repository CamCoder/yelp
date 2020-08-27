INSERT INTO restaurants (name, location, price_range) values ('DQ', 'Texas', 3);
INSERT INTO restaurants (name, location, price_range) values ('DQ', 'Texas', 3);
INSERT INTO restaurants (name, location, price_range) values ('WingStop', 'USA', 2);
INSERT INTO restaurants (name, location, price_range) values ('PizzaHUt', 'Chicago', 4);

DELETE FROM restaurants where id = 7;


CREATE TABLE restaurants(id BIGSERIAL NOT NULL PRIMARY KEY, name varchar(50) NOT NULL, location varchar(50) NOT NULL, price_range INT NOT NULL CHECK(price_range >= 1 and price_range <=5) );
CREATE TABLE reviews(id BIGSERIAL NOT NULL PRIMARY KEY, restaurant_id BIGINT NOT NULL REFERENCES restaurants(id), name varchar(50) NOT NULL, review TEXT NOT NULL, rating INT NOT NULL CHECK(rating >= 1 and rating <=5) );

INSERT INTO reviews (restaurant_id, name, review, rating) values (2, 'carl', 'AMAZING', 5);

SELECT * FROM reviews;

SELECT restaurant_id, Avg(rating), count(rating) FROM reviews group by restaurant_id;

SELECT * FROM restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) as average_rating FROM reviews group by restaurant_id) reviews on restaurant.id = reviews.restaurant_id;