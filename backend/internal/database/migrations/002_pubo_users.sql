CREATE TABLE pubo_users(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clerk_user_id TEXT UNIQUE NOT NULL,
    email TEXT NOT NULL UNIQUE,
    display_name TEXT,
    avatar_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
   

);
CREATE INDEX IF NOT EXISTS idx_pubo_users_clerk_user_id ON pubo_users(clerk_user_id);
CREATE INDEX IF NOT EXISTS idx_pubo_users_email ON pubo_users(email)

