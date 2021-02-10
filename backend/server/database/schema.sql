--DROP DATABASE IF EXISTS bluemark;
--CREATE DATABASE bluemark;

CREATE EXTENSION IF NOT EXISTS LTREE;


DROP TABLE IF EXISTS products;

CREATE TABLE products (
  product_id SERIAL NOT NULL PRIMARY KEY,
  product_name VARCHAR(256) NOT NULL,
  product_description TEXT
);

CREATE INDEX product_names ON products (product_name);


DROP TABLE IF EXISTS locations;

CREATE TABLE locations (
  location_id SERIAL NOT NULL PRIMARY KEY,
  location_parent_id INTEGER REFERENCES locations (location_id),
  location_path LTREE UNIQUE,
  location_name VARCHAR(256) NOT NULL,
  location_description TEXT
);

CREATE INDEX location_names ON locations (location_name);
CREATE INDEX location_parents ON locations (location_parent_id);
CREATE INDEX location_paths ON locations USING GIST (location_path);

DROP FUNCTION IF EXISTS update_location_path;

CREATE FUNCTION update_location_path() RETURNS TRIGGER AS $$
  DECLARE path LTREE;
  BEGIN
    IF NEW.location_parent_id IS NULL THEN
      NEW.location_path = NEW.location_id::TEXT::LTREE;
    ELSEIF TG_OP = 'INSERT' OR OLD.location_parent_id IS NULL OR OLD.location_parent_id != NEW.location_parent_id THEN
      SELECT location_path || NEW.location_id::TEXT FROM locations
      WHERE location_id = NEW.location_parent_id INTO path;
      IF path IS NULL THEN
        RAISE EXCEPTION 'Invalid location_parent_id %', NEW.location_parent_id;
      END IF;
      NEW.location_path = path;
    END IF;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER location_path_trigger
  BEFORE INSERT OR UPDATE ON locations
  FOR EACH ROW EXECUTE PROCEDURE update_location_path();


DROP TABLE IF EXISTS product_movements;

CREATE TABLE product_movements (
  product_movement_id SERIAL NOT NULL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products (product_id),
  created TIMESTAMP NOT NULL DEFAULT current_timestamp
);

CREATE INDEX product_movement_product_ids ON product_movements (product_id);
CREATE INDEX product_movement_creations ON product_movements (created);


DROP TABLE IF EXISTS product_movement_entries;

CREATE TABLE product_movement_entries (
  product_movement_entry_id SERIAL NOT NULL PRIMARY KEY,
  product_movement_id INTEGER NOT NULL REFERENCES product_movements (product_movement_id),
  location_path LTREE NOT NULL REFERENCES locations (location_path),
  quantity_out NUMERIC NOT NULL DEFAULT 0,
  quantity_in NUMERIC NOT NULL DEFAULT 0
);

CREATE INDEX product_movement_entry_product_movement_ids ON product_movement_entries  (product_movement_id);
CREATE INDEX product_movement_entry_location_paths ON product_movement_entries USING GIST (location_path);


DROP VIEW IF EXISTS product_location_movements;

CREATE VIEW product_location_movements AS SELECT
pm.product_movement_id AS product_movement_id,
pm.product_id AS product_id,
pm.created AS created,
pme.location_path AS location_path,
pme.quantity_in AS quantity_in,
pme.quantity_out AS quantity_out
FROM product_movements AS pm INNER JOIN product_movement_entries AS pme
ON (pm.product_movement_id = pme.product_movement_id);


DROP VIEW IF EXISTS product_location_inventory;

CREATE VIEW product_location_inventory AS SELECT
l.location_id AS location_id,
l.location_parent_id AS location_parent_id,
l.location_path AS location_path,
l.location_name AS location_name,
pm.product_id AS product_id,
SUM(pme.quantity_in) AS quantity_in,
SUM(pme.quantity_out) AS quantity_out,
SUM(pme.quantity_in) - SUM(pme.quantity_out) AS quantity_total
FROM locations AS l
INNER JOIN
product_movement_entries AS pme
ON (pme.location_path <@ l.location_path)
INNER JOIN
product_movements AS pm
ON (pm.product_movement_id = pme.product_movement_id)
GROUP BY l.location_id, l.location_parent_id, l.location_path, l.location_name, pm.product_id;
