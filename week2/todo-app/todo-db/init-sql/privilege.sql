ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root';

CREATE USER 'todo'@'localhost' IDENTIFIED WITH mysql_native_password BY 'todo';
CREATE USER 'todo'@'%' IDENTIFIED WITH mysql_native_password BY 'todo';

GRANT ALL PRIVILEGES ON *.* TO 'todo'@'localhost';
GRANT ALL PRIVILEGES ON *.* TO 'todo'@'%';

FLUSH PRIVILEGES;