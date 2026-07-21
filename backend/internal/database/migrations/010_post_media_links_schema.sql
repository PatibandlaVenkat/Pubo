CREATE TABLE post_media_links(
    post_id UUID NOT NULL  REFERENCES posts(id) ON DELETE CASCADE,
    media_id UUID NOT NULL REFERENCES post_media(id) ON DELETE CASCADE,
    position INT NOT NULL DEFAULT 0,
    PRIMARY KEY(post_id,media_id)
);