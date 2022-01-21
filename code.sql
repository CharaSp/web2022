  CREATE TABLE 'user' (
    `username` varchar(100) NOT NULL unique,
    `password` varchar(100) NOT NULL,
    'firstname' varchar(100) NOT NULL,
    'lastname' varchar(100) NOT NULL,
    `userId` INT(10) AUTO_INCREMENT ,
    `email` varchar(100) NOT NULL,
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
  )ENGINE=InnoDB DEFAULT CHARSET=utf8