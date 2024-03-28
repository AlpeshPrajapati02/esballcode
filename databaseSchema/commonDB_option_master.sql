-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: commonDB
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `option_master`
--

DROP TABLE IF EXISTS `option_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `option_master` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sid` int NOT NULL,
  `option_key` varchar(255) NOT NULL,
  `option_value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`sid`,`option_key`),
  UNIQUE KEY `id` (`id`),
  CONSTRAINT `option_master_ibfk_1` FOREIGN KEY (`sid`) REFERENCES `select_master` (`sid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `option_master`
--

LOCK TABLES `option_master` WRITE;
/*!40000 ALTER TABLE `option_master` DISABLE KEYS */;
INSERT INTO `option_master` VALUES (3,1,'bachelor','bachelor'),(2,1,'hsc/deploma','hsc/deploma'),(4,1,'master','master'),(1,1,'ssc','ssc'),(6,2,'english','english'),(7,2,'gujarati','gujarati'),(5,2,'hindi','hindi'),(10,3,'laravel','laravel'),(9,3,'mysql','mysql'),(11,3,'oracle','oracle'),(8,3,'php','php'),(18,5,'ahmedabad','ahmedabad'),(20,5,'banglore','banglore'),(19,5,'surat','surat'),(22,6,'female','female'),(21,6,'male','male'),(24,7,'Assam','Assam'),(23,7,'Gujarat','Gujarat'),(26,7,'rajasthan','rajasthan'),(25,7,'Utter Pradesh','Utter Pradesh'),(27,8,'Development','Development'),(28,8,'Marketing','Marketing'),(31,9,'Divorsed','Divorsed'),(30,9,'Married','Married'),(29,9,'Single','Single'),(32,9,'Widowed','Widowed');
/*!40000 ALTER TABLE `option_master` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-28  9:44:34
