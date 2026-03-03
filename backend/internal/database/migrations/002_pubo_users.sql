CREATE TABLE pubo_users(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPZ NOT NULL DEFAULT CURRENT_TIMESTAMPZ,
    user_id TEXT NOT NULL,

)

CREATE INDEX idx_pubo_users_user_id on pubo_users(user_id)
CREATE TRIGGER set_updated_at_pubo_users
BEFORE EACH UPDATE ON pubo_users
FOR EACH ROW
EXECUTE FUNCTION trigger_set_updated_at();
