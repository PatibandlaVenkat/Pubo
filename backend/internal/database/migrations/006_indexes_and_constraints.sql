CREATE INDEX IF NOT EXISTS idx_posts_queue_scan
ON posts(scheduled_at,created_at)
WHERE status IN ('queued','processing');

CREATE INDEX IF NOT EXISTS idx_post_targets_queue_scan
ON post_targets(created_at)
WHERE target_status IN ('queued','processing','failed');

--data integrity checks

DO $$
BEGIN 
IF NOT EXISTS(
    SELECT 1 FROM pg_constraint
WHERE conname='chk_posts_schedule_when_queued'
)THEN 
ALTER TABLE posts 
ADD CONSTRAINT chk_posts_schedule_when_queued
CHECK(
    status <> 'queued'
    OR scheduled_at IS NOT NULL
);
END IF;
END$$;


DO $$
BEGIN 
IF NOT EXISTS(
    SELECT 1
    FROM pg_constraint
    WHERE conname='chk_post_attempts_attempt_no_positive'
)THEN 
ALTER TABLE post_attempts
ADD CONSTRAINT  chk_post_attempt_no_positive
CHECK(attempt_no>0);
END IF;
END $$;


DO $$
BEGIN 
IF NOT EXISTS(
    SELECT 1 FROM pg_constraint
    WHERE conname='chk_connected_accounts_tokens'
)
THEN 
ALTER TABLE connected_accounts
ADD CONSTRAINT  chk_connected_accounts_tokens
CHECk(
    is_active=FALSE
    OR access_token_encrypted IS NOT NULL
);
END IF;
END $$;