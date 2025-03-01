
//sign-in
CREATE TABLE IF NOT EXISTS `signin` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `email` varchar(64) UNIQUE NOT NULL,
  `user_name` varchar(20) NOT NULL UNIQUE,
  `password` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

//Athletes:
CREATE TABLE IF NOT EXISTS `athletes` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `first_name` text NOT NULL,
  `last_name` text NOT NULL,
  `mob_no` int(11) NOT NULL,
  `gender` varchar (10) NOT NULL,
  `country` varchar(64) NOT NULL,
  `sport` varchar(45) NOT NULL,
  `education` varchar(255) NOT NULL,
  `age` int(3) NOT NULL,
  `login_id` int(5),
  `profile_image` varchar(100),
  `profile_video` varchar(100),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`login_id`) REFERENCES signin(`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

//Coaches:
CREATE TABLE IF NOT EXISTS `coaches` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `first_name` text NOT NULL,
  `last_name` text NOT NULL,
  `mob_no` int(11) NOT NULL,
  `sport_club` varchar(45) NOT NULL,
  `login_id` int(5),
  `profile_image` varchar(100),
  `profile_video` varchar(100),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`login_id`) REFERENCES signin(`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

