-- ================================
-- USERS TABLE
-- ================================
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    address TEXT,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'normal',
    created_at TIMESTAMP DEFAULT NOW()
);

-- ================================
-- STORES TABLE
-- ================================
CREATE TABLE IF NOT EXISTS stores (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    name VARCHAR(255),
    email VARCHAR(255),
    address TEXT
);

-- ================================
-- RATINGS TABLE
-- ================================
CREATE TABLE IF NOT EXISTS ratings (
    id SERIAL PRIMARY KEY,
    store_id INTEGER REFERENCES stores(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

--------------------------------------------------------
-- DEFAULT USERS
--------------------------------------------------------

-- ADMIN USER (Login works now)
-- Email: admin@example.com
-- Password: Admin@123
-- ADMIN USER
INSERT INTO users (name, email, address, password, role)
VALUES (
    'System Admin',
    'admin@example.com',
    '',
    '$2a$10$pMdsncHsvnhR1GlN5/sL2OB6xTJdfRO//WC8jqy8K6EkS9PX.xLOe',
    'admin'
)
ON CONFLICT (email) DO NOTHING;

-- NORMAL USER
INSERT INTO users (name, email, address, password, role)
VALUES (
    'Test User',
    'user@example.com',
    'Sample Address',
    '$2a$10$YmKbiXewvGS8yGZ8OVUDSOce.T/cRTXVafxmVCpHYaT50DlSDxCYe',
    'normal'
)
ON CONFLICT (email) DO NOTHING;

-- STORE OWNER
INSERT INTO users (name, email, address, password, role)
VALUES (
    'Store Owner',
    'owner@example.com',
    'Owner Address',
    '$2a$10$Mdm4UWEFTvN0DshyAknPxOEEs.//CY6qJs.RF7sioBDUToTH1a4lW',
    'store_owner'
)
ON CONFLICT (email) DO NOTHING;

--------------------------------------------------------
-- Default Store for store owner
--------------------------------------------------------
INSERT INTO stores (name, email, address, owner_id)
SELECT
    'Sample Store',
    'store@example.com',
    'Store Address',
    id
FROM users
WHERE email = 'owner@example.com'
ON CONFLICT DO NOTHING;
