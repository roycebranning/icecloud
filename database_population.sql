use keenanknights;

LOCK TABLES `dorms` WRITE;
INSERT INTO `dorms` VALUES (1,'alumni'),(2,'badin'),(3,'breen-phillips'),(4,'carroll'),(5,'cavanaugh'),(6,'dillon'),(7,'duncan'),(8,'dunne'),(9,'farley'),(10,'fisher'),(11,'flaherty'),(12,'howard'),(13,'keenan'),(14,'keough'),(15,'knott'),(16,'lewis'),(17,'lyons'),(18,'mcglinn'),(19,'morrissey'),(20,'oneill'),(21,'pasquerilla east'),(22,'pasquerilla west'),(23,'ryan'),(25,'siegfried'),(26,'sorin'),(24,'st edwards'),(27,'stanford'),(28,'walsh'),(29,'welsh family'),(30,'zahm');
UNLOCK TABLES;

LOCK TABLES `access_groups` WRITE;
INSERT INTO `access_groups` VALUES (1,'resident'),(2,'hall staff');
UNLOCK TABLES;

insert into users(netid, ndid, first_name, last_name, dorm, room_num, email, password, access_group) values ('rsmick', '901875767', 'Ryan', 'Smick', 13, 311, 'rsmick@nd.edu', 'pbkdf2:sha256:50000$hPJDe3DU$35874b5b78323c8c4c9419109fe4d302150e73f0da5f00f8ec82a15fca4c6172', 2);
