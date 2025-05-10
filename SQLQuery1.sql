IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'registration')
BEGIN
    CREATE DATABASE registration;
END;

-- Use the database
USE registration;

-- Create the table
CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100),
    mobile INT,
    gender VARCHAR(10),
    dob INT,
    course VARCHAR(100),
    address VARCHAR(255),
    additional VARCHAR(255)
);

-- Insert data into the table (using placeholders for user input)
-- Example with actual values (replace with real data or use parameters in your application code)
INSERT INTO users (name, email, password, mobile, gender, dob, course, address, additional) 
VALUES ('John Doe', 'john.doe@example.com', 'password123', 1234567890, 'Male', '19900101', 'Computer Science', '123 Main St', 'None');