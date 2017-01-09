DROP TABLE IF EXISTS users;
DROP TYPE IF EXISTS user_types;

-- This use is for internal use only
-- not to be confused with `player` or `member`
CREATE TYPE user_types AS ENUM ("admin", "agent", "manager", "operator");

CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.modified = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TABLE IF NOT EXISTS users(
  id UUID PRIMARY KEY NOT NULL,
  name varchar(255) NOT NULL,
  username varchar(30) NOT NULL,
  password varchar(255) NOT NULL,
  type user_types NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  modified TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TRIGGER update_modified_column
BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_modified_column();


-- Player Table
CREATE TABLE IF NOT EXISTS players(
  id UUID PRIMARY KEY NOT NULL,
  name varchar(255) NOT NULL,
)
