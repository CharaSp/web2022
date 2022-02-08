  DROP DATABASE IF EXISTS web_project;
  CREATE DATABASE web_project;
  USE web_project;
 
 CREATE TABLE 'user' (
    `username` varchar(100) NOT NULL unique,
    `passwordHash` TEXT(200) NOT NULL,
    'firstname' varchar(100) NOT NULL,
    'lastname' varchar(100) NOT NULL,
    `userId` INT(10) AUTO_INCREMENT ,
    `email` varchar(100) NOT NULL unique,
    'dateofbirth' DATE ,
    `admin` TINYINT(1) NOT NULL,
    PRIMARY KEY (`userId`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

  CREATE table 'place' (
    `placeId` INT(10) AUTO_INCREMENT ,
    `name` varchar(100) NOT NULL unique,
    `coordinates` Point NOT NULL,
    -- prepei na mpoun ta popularTimes
    
    --  mia proseggisi gia to types kai to populartimes
    `populartimes` JSON NOT NULL,
    `types` JSON NOT NULL,
      PRIMARY KEY (`placeId`)
  )ENGINE=InnoDB DEFAULT CHARSET=utf8;

  CREATE TABLE `userhistory` (
    `userId` INT(10),
    `userpositive` varchar(10),
    `usernegative` varchar(10),
    `dateofcovid` DATE,
    `placevisitedday` DATE,
    FOREIGN KEY (`userId`) REFERENCES user(userId) ON DELETE RESTRICT ON UPDATE CASCADE,
    PRIMARY KEY (`userId`,`placevisitedday`)

  )ENGINE=InnoDB DEFAULT CHARSET=utf8;
  
  
  CREATE TABLE `visits` (
   `userId` INT(10),
   `placeId` INT(10),
   `dateofvisit` DATE,
   FOREIGN KEY (`userId`) REFERENCES `USER`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE,
   FOREIGN KEY (`placeId`) REFERENCES `place`(`placeId`) ON DELETE RESTRICT ON UPDATE CASCADE,
    PRIMARY KEY (`userId`,`placeId`)
  )ENGINE=InnoDB DEFAULT CHARSET=utf8;
  
    CREATE TABLE `admin` (
    `adminame` varchar(100) NOT NULL unique,
    `password` varchar(100) NOT NULL,
    `adminId` INT(10) AUTO_INCREMENT ,
     `admin` TINYINT(1) NOT NULL,
     PRIMARY KEY (`userId`)
     ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
