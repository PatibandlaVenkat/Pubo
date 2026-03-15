DO $$
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname='post_target_status') THEN 
     CREATE TYPE post_target_status AS ENUM(
        'queued',
        'processing',
        'posted',
        'failed',
        'canceled'

     );
     END IF;
END$$;

CREATE TABLE IF NOT EXISTS post_targets(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    connected_account_id UUID NOT NULL REFERENCES connected_accounts(id) ON DELETE CASCADE,
    target_status post_target_status NOT NULL DEFAULT 'queued',
    external_post_id TEXT,
    published_at TIMESTAMP,
    last_error TEXT,
    retry_count INT NOT NULL DEFAULT 0,
    last_attempt_at TIMESTAMP,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    UNIQUE(post_id,connected_account_id)
);

CREATE TABLE IF NOT EXISTS post_attempts(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_target_id UUID NOT NULL REFERENCES post_targets(id) ON DELETE CASCADE,
    attempt_no INT NOT NULL,
    request_payload JSONB,
    response_payload JSONB,
    http_status INT ,
    error_code TEXT,
    error_message TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE(post_target_id,attempt_no)

);

CREATE INDEX IF NOT EXISTS idx_post_targets_post_id ON post_targets(post_id);
CREATE INDEX IF NOT EXISTS idx_post_targets_connected_account_id ON post_targets(connected_account_id);
CREATE INDEX IF NOT EXISTS idx_post_targets_status ON post_targets(target_status);
CREATE INDEX IF NOT EXISTS idx_post_attempts_post_target_id ON post_attempts(post_target_id);
CREATE INDEX IF NOT EXISTS idx_post_attempts_created_at ON post_attempts(created_at DESC);