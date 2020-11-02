SET FOREIGN_KEY_CHECKS=0;
alter table `northwind`.`products` add `barcode` VARCHAR(25) NULL UNIQUE;
alter table `northwind`.`products` add `brand` VARCHAR(25) NULL DEFAULT NULL;
alter table `northwind`.`products` add `image_urlo` VARCHAR(25) NULL DEFAULT NULL;
alter table `northwind`.`products` add `image_urlt` VARCHAR(25) NULL DEFAULT NULL;
alter table `northwind`.`products` add `type` VARCHAR(25) NULL DEFAULT NULL;

alter table `northwind`.`products` add `inventory` SMALLINT  NULL  UNIQUE;
alter table `northwind`.`products` add `sales` SMALLINT NULL DEFAULT NULL;
alter table `northwind`.`products` add `cost` SMALLINT  NULL ;
alter table `northwind`.`products` add `color` VARCHAR(25) NULL DEFAULT NULL;
alter table `northwind`.`products` add `size` CHAR(5)  NULL ;
CREATE TABLE IF NOT EXISTS `northwind`.`products` (
`supplier_ids` LONGTEXT NULL DEFAULT NULL,
`id` SMALLINT NOT NULL AUTO_INCREMENT,
  `id` SMALLINT NOT NULL AUTO_INCREMENT ,
  `product_code` VARCHAR(25) NULL UNIQUE,
  `barcode` SMALLINT  NULL  UNIQUE,
  `name` VARCHAR(50)  NULL  UNIQUE,
  `brand` VARCHAR(25) NULL DEFAULT NULL,
  `image_urlo` VARCHAR(25) NULL DEFAULT NULL,
  `image_urlt` VARCHAR(25) NULL DEFAULT NULL,
  `description` VARCHAR(50) NULL DEFAULT NULL,
  `category` VARCHAR(25) NULL DEFAULT NULL,
  `type` VARCHAR(25) NULL DEFAULT NULL,
  `inventory` SMALLINT  NULL  UNIQUE,
  `sales` SMALLINT NULL DEFAULT NULL,
  `cost` SMALLINT  NULL ,
  `color` VARCHAR(25) NULL DEFAULT NULL,
  `size` CHAR(5)  NULL ,
  `MFD` DATE  NULL ,
  PRIMARY KEY (`id`),
INDEX `product_code` (`product_code` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

SET FOREIGN_KEY_CHECKS=1;
