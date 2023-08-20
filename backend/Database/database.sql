-- All instructions executed on the database are written here

-- change COLUMN password character in student from 50 to 100 
ALTER TABLE student
ALTER COLUMN password TYPE character varying(100);

-- change COLUMN password character in register_request from 50 to 100 
ALTER TABLE register_request
ALTER COLUMN password TYPE character varying(100);






