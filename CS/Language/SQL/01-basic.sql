-- PostgreSQL is a *relational database management system* (RDBMS). That means
-- it is a system for managing data stored in *relations*.

-- Each table is a named collection of *rows*, each row of a given table has
-- the same set of named *columns*, and each column is of a specified data
-- type. Tables are grouped into databases and a collection of databases managed
-- by a single PostgreSQL server instance constitutes a database *cluster*.

CREATE TABLE weather (
    city        varchar(80),
    temp_lo     int,    -- high temperature
    temp_hi     int,    -- low  temperature
    prcp        real,   -- precipitation
    date        date
);

-- varchar(80) specifies a data type that can store arbitrary character up to
-- 80 characters in length.
-- int is the normal integer type.
-- real is a type for storing single precision floating-point numbers.

-- PostgreSQL supports the standard SQL types (int, smallint, real, double
-- precision, char(N), varchar(N), date, time, timestamp and interval)

DROP TABLE weather;

-- If you don't need a table anymore, then remove it using `DROP TABLE`.

INSERT INTO weather VALUES ('San Francisco', 46, 50, 0.25, '1994-11-27');

-- The syntax used so far requires you to remember the order of the columns. An
-- alternative syntax allows you to list the columns explicitly:

INSERT INTO weather (city, temp_lo, temp_hi, prcp, date)
    VALUES ('San Francisco', 43, 57, 0.0, '1994-11-29');

-- You can list the column in a different order if you wish or even omit
-- some columns. In the following example, column 'prcp' is missing.

INSERT INTO weather (city, temp_hi, temp_lo, date)
    VALUES ('Shanghai', 45, 34, '2001-02-21');

COPY weather FROM '/home/usr/weather.txt';

-- You can also use `COPY` to load large amounts of data from flat-text files.
-- This is usually faster because the `COPY` command is optimized for this
-- application while allowing less flexibility than `INSERT`.

-- To retrieve data from a table, the table is *queried*. An SQL `SELECT`
-- statement is used to do this.

SELECT * FROM weather;

-- Here * is a shorthand for all columns. You can write expressions not just
-- simple column references. `AS` is to relabel the output column.

SELECT city, (temp_lo + temp_hi) / 2 AS temp_avg, date FROM weather;

-- A query can be verified by adding a `WHERE` clause contains a Boolean
-- expression and only rows for which the Boolean expression is true are
-- returned.

SELECT * FROM weather
    WHERE city = 'San Francisco' AND prcp > 0.1;

-- We can use `ORDER` clause to returned the result in sorted order. `DESC`
-- keyword can show the result in reversed order.

SELECT * FROM weather ORDER BY temp_lo;
SELECT * FROM weather ORDER BY city DESC, temp_lo;

-- You can request that duplicate rows be removed from the result of a query

SELECT DISTINCT city FROM weather;

CREATE TABLE cities (
    name        varchar(80),
    location    point
);

INSERT INTO cities VALUES ('San Francisco', '(-120, 120)');

SELECT * FROM weather JOIN cities ON city = name;

-- + There is no result row for the city Shanghai, this is because there is no
--   matching entry in the `cities` table for Shanghai, so the join ignores
--   the unmatched rows in the `weather` table.
-- + There are two columns containing the city name. This is correct because the
--   lists of columns from the weather and cities table are concatenated

SELECT
    weather.city,
    weather.temp_lo,
    weather.temp_hi,
    weather.prcp,
    weather.date,
    cities.location
FROM weather JOIN cities ON weather.city = cities.name;

-- If no matching row is found we want some "empty values" to be substituted for
-- the cities table's column. This kind of join is called *outer join*.

SELECT * FROM weather LEFT OUTER JOIN cities ON weather.city = cities.name;

-- This query is called a *left outer join* because the table mentioned on the
-- left of the join operator will have each of its rows in