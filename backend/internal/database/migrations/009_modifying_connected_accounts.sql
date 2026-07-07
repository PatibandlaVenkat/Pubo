--droping the existing foreign key constraint if constraint name is not specified postgresql will automaticaaly generate the name for the constraint

ALTER TABLE connected_accounts DROP CONSTRAINT connected_accounts_user_id_fkey;

--change the coloumn type
ALTER TABLE connected_accounts ALTER COLUMN user_id TYPE TEXT USING user_id::TEXT;

--re adding the fk with same on delete behavior

ALTER TABLE connected_accounts ADD CONSTRAINT connected_accounts_user_id_fkey FOREIGN KEY (user_id) REFERENCES pubo_users(clerk_user_id) ON DELETE CASCADE
