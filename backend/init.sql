CREATE DATABASE IF NOT EXISTS eaglebox;
USE eaglebox;

CREATE TABLE IF NOT EXISTS branches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  branch_name VARCHAR(100) NOT NULL,
  location VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS grounds (
  id INT AUTO_INCREMENT PRIMARY KEY,
  branch_id INT NOT NULL,
  ground_name VARCHAR(100) NOT NULL,
  capacity INT NOT NULL DEFAULT 10,
  FOREIGN KEY (branch_id) REFERENCES branches(id)
);

CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  branch_id INT NOT NULL,
  ground_id INT NOT NULL,
  booking_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'confirmed',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (branch_id) REFERENCES branches(id),
  FOREIGN KEY (ground_id) REFERENCES grounds(id)
);

CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

INSERT INTO branches (branch_name, location) VALUES
('Eagle Box Cricket - Madhapur', 'Madhapur'),
('Eagle Box Cricket - Kukatpally', 'Kukatpally'),
('Eagle Box Cricket - Kompally', 'Kompally');

INSERT INTO grounds (branch_id, ground_name, capacity) VALUES
(1, 'Ground A', 10),
(1, 'Ground B', 10),
(2, 'Ground A', 10),
(2, 'Ground B', 10),
(3, 'Ground A', 10),
(3, 'Ground B', 10);

INSERT INTO admins (username, password) VALUES
('admin', 'admin');
