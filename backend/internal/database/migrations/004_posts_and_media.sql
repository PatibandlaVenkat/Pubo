DO $$
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname='post_status') THEN
    CREATE TYPE post_status AS ENUM(
        'draft',
        'queued',
        'processing',
    'posted',
    'failed',
    'canceled'
    );
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS posts(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_user_id UUID NOT NULL REFERENCES pubo_users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    status post_status NOT NULL DEFAULT 'draft',
    scheduled_at TIMESTAMP,
    posted_at TIMESTAMP,
    failure_reason TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS post_media(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_user_id TEXT,
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    original_name TEXT NOT NULL,
    blob_name TEXT NOT NULL,
    storage_url TEXT NOT NULL,
    container_name TEXT NOT NULL,
    content_type TEXT NOT NULL,
    size_bytes BIGINT,
    etag TEXT,
    width INT,
    height INT,
    duration_seconds NUMERIC(10,3),
    position INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
id,owner_user_id,original_name,blob_name,storage_url,container_name,content_type,size_bytes,etag,created_at,updated_at

CREATE INDEX IF NOT EXISTS idx_posts_author_user_id ON posts(author_user_id);
CREATE INDEX IF NOT EXISTS idx_posts_status_scheduled_at ON posts(status,scheduled_at);
CREATE INDEX IF NOT EXISTS idx_posts_author_status ON posts(author_user_id,status);
CREATE INDEX IF NOT EXISTS idx_post_media_post_id ON post_media(post_id);
CREATE INDEX IF NOT EXISTS idx_post_media_post_position ON post_media(post_id,position);