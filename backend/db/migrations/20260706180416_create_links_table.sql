-- migrate:up
CREATE TABLE links (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    slug text NOT NULL UNIQUE,
    destination_url text NOT NULL,
    CONSTRAINT links_slug_not_blank CHECK (trim(slug) <> ''),
    CONSTRAINT links_destination_url_not_blank CHECK (trim(destination_url) <> '')
);

-- migrate:down
DROP TABLE links;

