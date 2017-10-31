use keenanknights;

CREATE TABLE `dorms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
);

CREATE TABLE `access_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
  `netid` varchar(10) NOT NULL,
  `ndid` char(9) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `dorm` int(11) NOT NULL,
  `room_num` varchar(5) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `access_group` int(11) NOT NULL,
  PRIMARY KEY (`netid`),
  KEY `dorm` (`dorm`),
  KEY `fk_access_group` (`access_group`),
  CONSTRAINT `fk_access_group` FOREIGN KEY (`access_group`) REFERENCES `access_groups` (`id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`dorm`) REFERENCES `dorms` (`id`)
);

CREATE TABLE `head_staff` (
  `netid` varchar(10) NOT NULL,
  `position` varchar(20) NOT NULL,
  PRIMARY KEY (`netid`),
  CONSTRAINT `head_staff_ibfk_1` FOREIGN KEY (`netid`) REFERENCES `users` (`netid`)
);

CREATE TABLE `residents` (
  `netid` varchar(10) NOT NULL,
  `street_address` varchar(50) NOT NULL,
  `city` varchar(20) NOT NULL,
  `state` varchar(20) DEFAULT NULL,
  `country` varchar(20) NOT NULL,
  `zip_code` char(5) DEFAULT NULL,
  `birthday` date NOT NULL,
  `class_level` varchar(20) NOT NULL,
  `religion` varchar(30) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `insurance` varchar(50) NOT NULL,
  PRIMARY KEY (`netid`),
  CONSTRAINT `residents_ibfk_1` FOREIGN KEY (`netid`) REFERENCES `users` (`netid`)
);
