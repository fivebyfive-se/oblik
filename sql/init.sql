CREATE TABLE IF NOT EXISTS ok_json_schemas (
    id SERIAL PRIMARY KEY,
    friendly_name VARCHAR(64) NOT NULL,
    schema_data JSONB
);

CREATE TABLE IF NOT EXISTS ok_users (
    id SERIAL PRIMARY KEY,
    friendly_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash TEXT,
    user_data JSONB
);

CREATE TABLE IF NOT EXISTS ok_groups (
    id SERIAL PRIMARY KEY,
    friendly_name VARCHAR(255) NOT NULL,
    owner_id INTEGER REFERENCES ok_users (id)
);

CREATE TABLE IF NOT EXISTS ok_group_member (
    group_id INTEGER REFERENCES ok_groups (id),
    user_id INTEGER REFERENCES ok_users (id),
    is_admin BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (group_id, user_id)
);

CREATE TYPE object_type AS ENUM ('password', 'payment', 'note', 'custom')

CREATE TABLE IF NOT EXISTS ok_objects (
    id SERIAL PRIMARY KEY,
    friendly_name VARCHAR(255) NOT NULL,
    user_id REFERENCES ok_users (id) ON DELETE CASCADE,
    "type" object_type DEFAULT 'password',
    object_data JSONB
);
CREATE TABLE IF NOT EXISTS ok_object_parent (
    parent_id INTEGER REFERENCES ok_object (id),
    child_id INTEGER REFERENCES ok_objects (id),
    PRIMARY KEY (parent_id, child_id),
    CONSTRAINT valid_relationship CHECK (parent_id <> child_id)
);

CREATE TABLE IF NOT EXISTS ok_device_connections (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP(SECOND) DEFAULT NOW(),
    friendly_name VARCHAR(255) NOT NULL,
    user_id REFERENCES ok_users (id) ON DELETE CASCADE,
    private_key TEXT NOT NULL -- server's private key
);

CREATE TYPE message_type AS ENUM ('message', 'handshake');

CREATE TABLE IF NOT EXISTS ok_message_queue (
    id SERIAL PRIMARY KEY,
    received_at TIMESTAMP DEFAULT NOW(),
    nonce TEXT,
    "type" message_type DEFAULT 'message',
    encrypted_content TEXT -- nacl.secretbox(msg, nonce, sharedKey)
);
