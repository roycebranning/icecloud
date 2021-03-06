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
  PRIMARY KEY (`netid`)
);

CREATE TABLE `head_staff` (
  `netid` varchar(10) NOT NULL,
  `position` varchar(20) NOT NULL,
  PRIMARY KEY (`netid`)
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
  PRIMARY KEY (`netid`)
);

CREATE TABLE `education` (
  `major` varchar (30) NOT NULL,
  `college` varchar (50) NOT NULL,
  PRIMARY KEY (`major`)
);

CREATE TABLE `enrolled_in` (
  `ndid` char(9) NOT NULL,
  `major` varchar(50) NOT NULL,
  PRIMARY KEY (`ndid`, `major`)
);

CREATE TABLE `parents` (
  `email` varchar(50) NOT NULL,
  `employer` varchar(100),
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`email`)
);

CREATE TABLE `guarded_by` (
  `ndid` char(9) NOT NULL,
  `parent_email` varchar(100) NOT NULL,
  PRIMARY KEY (`ndid`, `parent_email`)
);

CREATE TABLE `siblings` (
  `name` varchar(50) NOT NULL,
  `age` int NOT NULL,
  `type` varchar(20) NOT NULL,
  PRIMARY KEY (`name`)
);

CREATE TABLE `parented_by` (
  `parent_email` varchar(100) NOT NULL,
  `sibling_name` varchar(50) NOT NULL,
  PRIMARY KEY (`parent_email`, `sibling_name`)
);

CREATE TABLE `sibling_of` (
  `ndid` char(9) NOT NULL,
  `sibling_name` varchar(50) NOT NULL,
  PRIMARY KEY (`ndid`, `sibling_name`)
);

CREATE TABLE `emergency_contact` (
  `phone_number` varchar(20) NOT NULL,
  `relation` varchar(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`phone_number`)
);

CREATE TABLE `ec_of` (
  `ndid` char(9) NOT NULL,
  `ec_phone` varchar(20) NOT NULL,
  PRIMARY KEY (`ndid`, `ec_phone`)
);

CREATE TABLE `medication` (
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`name`)
);

CREATE TABLE `takes` (
  `ndid` char(9) NOT NULL,
  `med_name` varchar(50) NOT NULL,
  PRIMARY KEY (`ndid`, `med_name`)
);

CREATE TABLE `present_conditions` (
  `name` varchar(50) NOT NULL,
  `description` varchar(200) NOT NULL,
  PRIMARY KEY (`name`)
);

CREATE TABLE `treated_with` (
  `med_name` varchar(50) NOT NULL,
  `condition_name` varchar(50) NOT NULL,
  PRIMARY KEY (`med_name`, `condition_name`)
);

CREATE TABLE `has_condition` (
  `ndid` varchar(9) NOT NULL,
  `condition_name` varchar(50) NOT NULL,
  PRIMARY KEY (`ndid`, `condition_name`)
);

CREATE TABLE `allergies` (
  `name` varchar(50) NOT NULL,
  `severity` INTEGER NOT NULL,
  PRIMARY KEY (`name`)
);

CREATE TABLE `is_allergic_to` (
  `ndid` varchar(9) NOT NULL,
  `allergy_name` varchar(50) NOT NULL,
  PRIMARY KEY (`ndid`, `allergy_name`)
);

CREATE TABLE `common_conditions` (
  `ndid` varchar(9) NOT NULL,
  `asthma` BIT,
  `heart_disorder` BIT,
  `seizures` BIT,
  `diabetes` BIT,
  `hypoglycemia` BIT,
  `bleeding_tendencies` BIT,
  PRIMARY KEY (`ndID`)
);
