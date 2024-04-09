SET GLOBAL local_infile=true;
LOAD DATA LOCAL INFILE "c:/db/bojo.csv"
     INTO TABLE taxmap.subsidy_info
     FIELDS TERMINATED BY ","
     OPTIONALLY ENCLOSED BY '"'
     IGNORE 1 ROWS;