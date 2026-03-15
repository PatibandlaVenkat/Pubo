CREATE OR REPLACE VIEW vw_post_list AS SELECT
p.id,
p.author_user_id,
p.title,
p.content,
p.status,
p.scheduled_at,
p.posted_at,
p.created_at,
p.updated_at,

COUNT(pt.id) AS target_count,
COUNT(*) FILTER (WHERE pt.target_status='posted') AS posted_target_count,
COUNT(*) FILTER (WHERE pt.target_status='failed')AS  failed_target_count,
COUNT(*) FILTER (WHERE pt.target_status IN ('queued','processing')) AS pending_target_count,

CASE
WHEN p.status='draft' THEN 'draft'
WHEN p.status IN ('queued','processing') THEN 'queued'
WHEN p.status='posted' THEN 'posted'
WHEN p.status='failed' THEN 'failed'
ELSE 'other'
END AS list_bucket
FROM posts p
LEFT JOIN post_targets pt ON pt.post_id=p.id
GROUP BY
p.id,p.author_user_id,p.title,p.content,p.status,
p.scheduled_at,p.posted_at,p.created_at,p.updated_at;