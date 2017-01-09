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

-- User Table
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
  cellphone varchar(255),
  account_bca varchar(255),
  account_mandiri varchar(255),
  account_other varchar(255),
  account_bca_holder varchar(255),
  account_mandiri_holder varchar(255),
  account_other_holder varchar(255),
  account_other_name varchar(255),
  ym varchar(255),
  email varchar(255),
  notes varchar(255),
  operator_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  modified TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  deleted_at TIMESTAMP WITH TIME ZONE,
  FOREIGN KEY (operator_id) REFERENCES users (id),
);

CREATE TRIGGER update_modified_column
BEFORE UPDATE ON players FOR EACH ROW EXECUTE PROCEDURE update_modified_column();


-- Games Table
CREATE TABLE IF NOT EXISTS games(
  id UUID PRIMARY KEY NOT NULL,
  name varchar(255) NOT NULL,
  player_id UUID NOT NULL,
  balance int,
  deposit int,
  withdraw int,
  bonus int,
  cancel_bonus int,
  notes varchar(255),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  modified TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  deleted_at TIMESTAMP WITH TIME ZONE,
  FOREIGN KEY (player_id) REFERENCES players (id),
);

CREATE TRIGGER update_modified_column
BEFORE UPDATE ON games FOR EACH ROW EXECUTE PROCEDURE update_modified_column();


-- Transactions Table
CREATE TABLE IF NOT EXISTS transactions(
  id UUID PRIMARY KEY NOT NULL,
  name varchar(255) NOT NULL,
  player_id UUID NOT NULL,
  site_id UUID NOT NULL,
  operator_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  modified TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reff varchar(255),
  transfer int,
  deposit int,
  withdraw int,
  bonus int,
  transaction_notes varchar(255),
  transfer_notes varchar(255),
  bonus_notes varchar(255),
  bank varchar(255) NOT NULL,
  FOREIGN KEY (player_id) REFERENCES players (id),
  FOREIGN KEY (site_id) REFERENCES sites (id),
  FOREIGN KEY (operator_id) REFERENCES users (id)
);

CREATE TRIGGER update_modified_column
BEFORE UPDATE ON transactions FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
