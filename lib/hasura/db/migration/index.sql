DROP TYPE IF EXISTS status CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS verification_requests;

CREATE TYPE status AS ENUM ('in progress', 'rejected', 'blocked', 'accepted', 'closed', 'open');

CREATE TABLE accounts
  (
    id                   BIGSERIAL,
    scope                VARCHAR(255),
    token_type           VARCHAR(255),
    id_token             VARCHAR(255),
    user_id              UUID NOT NULL,
    provider_type        VARCHAR(255) NOT NULL,
    provider_id          VARCHAR(255) NOT NULL,
    provider_account_id  VARCHAR(255) NOT NULL,
    access_token         TEXT,
    access_token_expires TIMESTAMPTZ,
    created_at           TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at           TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );

CREATE TABLE sessions
  (
    id              SERIAL,
    user_id         UUID NOT NULL,
    expires         TIMESTAMPTZ NOT NULL,
    session_token   VARCHAR(255) NOT NULL,
    access_token    VARCHAR(255),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );

CREATE TABLE users
  (
    id             SERIAL NOT NULL,
    user_id        UUID NOT NULL UNIQUE DEFAULT gen_random_uuid(),
    name           VARCHAR(255) NOT NULL,
    email          VARCHAR(255) NOT NULL,
    email_verified TIMESTAMPTZ,
    image          TEXT,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );

CREATE TABLE tasks
  (
    id              UUID NOT NULL UNIQUE DEFAULT gen_random_uuid(),
    title           VARCHAR(255) NOT NULL,
    process         VARCHAR(255) NOT NULL,
    status          status NOT NULL DEFAULT 'open',
    user_id         UUID NOT NULL,
    description     VARCHAR(255),
    role            VARCHAR(255),
    queue           VARCHAR(255),
    sched_date      DATE,
    sched_time      TIME,
    priority        SMALLINT,
    complete        TIMESTAMPTZ,
    datasheet       VARCHAR(255) NOT NULL,
    subprocess      VARCHAR(255) NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );

CREATE TABLE projects
  (
    id              UUID NOT NULL UNIQUE DEFAULT gen_random_uuid(),
    title           VARCHAR(255) NOT NULL,
    user_id         UUID NOT NULL,
    status          status NOT NULL DEFAULT 'open',
    started_at      TIMESTAMPTZ,
    parent_process  VARCHAR(255),
    parent_task     VARCHAR(255),
    datasheet       VARCHAR(255),
    description     VARCHAR(255),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );

CREATE TABLE verification_requests
  (
    id              SERIAL,
    user_id         UUID NOT NULL,
    identifier      VARCHAR(255) NOT NULL,
    token           VARCHAR(255) NOT NULL,
    expires         TIMESTAMPTZ NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );

CREATE UNIQUE INDEX id_token
  ON accounts(id_token);

CREATE INDEX provider_account_id
  ON accounts(provider_account_id);

CREATE INDEX provider_id
  ON accounts(provider_id);

CREATE INDEX user_id
  ON accounts(user_id);

CREATE UNIQUE INDEX session_token
  ON sessions(session_token);

CREATE UNIQUE INDEX access_token
  ON sessions(access_token);

CREATE UNIQUE INDEX email
  ON users(email);

CREATE UNIQUE INDEX token
  ON verification_requests(token);
  
ALTER TABLE tasks 
  ADD FOREIGN KEY (user_id) REFERENCES users (user_id)
  ON DELETE CASCADE;
  
ALTER TABLE projects 
  ADD FOREIGN KEY (user_id) REFERENCES users (user_id)
  ON DELETE CASCADE;

ALTER TABLE accounts
  ADD FOREIGN KEY (user_id) REFERENCES users (user_id)
  ON DELETE CASCADE;
  
ALTER TABLE sessions 
  ADD FOREIGN KEY (user_id) REFERENCES users (user_id)
  ON DELETE CASCADE;

ALTER TABLE verification_requests 
  ADD FOREIGN KEY (user_id) REFERENCES users (user_id)
  ON DELETE CASCADE;

ALTER TABLE accounts
  ALTER COLUMN id_token TYPE TEXT NOT NULL;
