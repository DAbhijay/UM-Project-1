CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE user_role AS ENUM (
    'customer',
    'provider',
    'admin'
);

CREATE TYPE service_type AS ENUM (
    'electrician',
    'plumber',
    'carpenter',
    'tailor',
    'maintenance'
);

CREATE TYPE request_status AS ENUM (
    'PENDING',
    'ACCEPTED',
    'REJECTED',
    'IN_PROGRESS',
    'COMPLETED'
);

-- USER DATA 

CREATE TABLE users (
    id                  UUID            DEFAULT uuid_generate_v4() PRIMARY KEY,
    email               VARCHAR(225)    NOT NULL UNIQUE,
    password_hash       VARCHAR(225)    NOT NULL,
    full_name           VARCHAR(225)    NOT NULL,
    role                user_role       NOT NULL DEFAULT 'customer',
    phone               VARCHAR(15)     UNIQUE,
    address             TEXT,
    created_at          TIMESTAMPZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPZ NOT NULL DEFAULT NOW()
);

-- Fast Login 

CREATE INDEX idx_user_email ON users (email);
CREATE INDEX idx_user_role ON users (role);

-- SERVICE PROVIDERS

CREATE TABLE service_providers (
    id                  UUID            DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id             UUID            NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,

    service_type        service_type    NOT NULL,
    experience_years    INTEGER         NOT NULL DEFAULT 0 CHECK (experience_years >= 0),

    is_verified         BOOLEAN         NOT NULL DEFAULT FALSE,
    bio                 TEXT,
    avg_rating          NUMERIC(3,1)    NOT NULL DEFAULT 0.0 CHECK (avg_rating >= 0 AND avg_rating <= 5),

    created_at          TIMESTAMPZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPZ NOT NULL DEFAULT NOW()
);

-- The two columns the search page filters on most
CREATE INDEX idx_providers_service_type     ON service_providers (service_type);
CREATE INDEX idx_providers_is_verified      ON service_providers (is_verified);

CREATE INDEX idx_providers_user_id          ON service_providers (user_id);

-- SERVICE REQUESTS

CREATE TABLE service_requests (
    id                  UUID            DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id         UUID            NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider_id         UUID            REFERENCES service_providers(id) ON DELETE SET NULL,

    service_type        service_type    NOT NULL,
    description         TEXT            NOT NULL,
    address             TEXT            NOT NULL,
    status              request_status  NOT NULL DEFAULT '{PENDING',

    scheduled_at        TIMESTAMPZ,
    created_at          TIMESTAMPZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPZ NOT NULL DEFAULT NOW()
);

-- PROVIDER AND CUSTOMER DASHBOARD

CREATE INDEX idx_requests_provider_status    ON service_requests (provider_id, status);
CREATE INDEX idx_requests_customer           ON service_requests (customer_id);

-- ADMIN / Search using filter

CREATE INDEX idx_requests_service_type  ON service_requests (service_type);
CREATE INDEX idx_requests_status        ON service_requests (status);

-- AVAILABILITY

CREATE TABLE availability (
    id                  UUID            DEFAULT uuid_generate_v4() PRIMARY KEY,
    provider_id          UUID            NOT NULL REFERENCES service_providers(id) ON DELETE CASCADE,

    date                DATE            NOT NULL,
    start_time          TIME            NOT NULL,
    end_time            TIME            NOT NULL,
    is_booked           BOOLEAN         NOT NULL DEFAULT FALSE,

    created_at          TIMESTAMPZ NOT NULL DEFAULT NOW()

    -- CONSTRAINTS
    CONSTRAINT uq_availability UNIQUE (provider_id, date, start_time),
    CONSTRAINT chk_time_order CHECK (end_time > start_time) 
);

CREATE INDEX idx_availability_provider_date ON availability (provider_id, date, is_booked);

-- REVIEWS

CREATE TABLE reviews (
    id                  UUID            DEFAULT uuid_generate_v4() PRIMARY KEY,
    service_requests_id UUID            NOT NULL UNIQUE REFERENCES service_requests(id) ON DELETE CASCADE,
    provider_id         UUID            NOT NULL REFERENCES service_providers(id) ON DELETE CASCADE,
    customer_id         UUID            NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    rating              SMALLINT        NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment             TEXT,
    created_at          TIMESTAMPZ      NOT NULL DEFAULT NOW()
);

-- PROVIDER INDEX

CREATE INDEX idx_reviews_provider ON reviews (provider_id, created_at DESC);

-- SAMPLE DATA

-- A test admin
INSERT INTO users (email, password_hash, full_name, role)
VALUES (
  'admin@test.com',
  '$2y$10$dhZzUDwh3qv/79QnRMLGteRRiGETKxPFTwN2A8YomfUmayZdSB1Ia', -- admin123
  'Admin User',
  'admin'
);

-- A test customer
INSERT INTO users (email, password_hash, full_name, role, address)
VALUES (
  'customer@test.com',
  '$2y$10$Ej9NzXREe2X4uE9HixXIE.9jiQ11aMZ5xovai8oC1QEbLDw/y9/uy', -- user123
  'Rahul Mehta',
  'customer',
  '42 Shri Ram Nagar, Indore, MP 452001'
);

-- A test provider (user row first, then the provider row)
INSERT INTO users (id, email, password_hash, full_name, role, phone)
VALUES (
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  'provider@test.com',
  '$2y$10$KHefy7ceDeBlWrosqGmd4umNABsS9reqTHRCYt7srvR2WarIqEGtK', -- provider123
  'Sunil Electrician',
  'provider',
  '9876543210'
);

INSERT INTO service_providers (user_id, service_type, experience_years, is_verified, bio)
VALUES (
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  'electrician',
  7,
  TRUE,
  'Certified electrician with 7 years of residential & commercial work.'
);

-- Two availability slots for the provider (tomorrow 9-11 and 14-16)
INSERT INTO availability (provider_id, date, start_time, end_time)
SELECT sp.id, CURRENT_DATE + 1, '09:00', '11:00'
  FROM service_providers sp
 WHERE sp.user_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

INSERT INTO availability (provider_id, date, start_time, end_time)
SELECT sp.id, CURRENT_DATE + 1, '14:00', '16:00'
  FROM service_providers sp
 WHERE sp.user_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';