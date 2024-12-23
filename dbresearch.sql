-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 23, 2024 at 07:59 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbresearch`
--

-- --------------------------------------------------------

--
-- Table structure for table `participant`
--

CREATE TABLE `participant` (
  `id` int(11) NOT NULL,
  `id_pool` int(11) NOT NULL,
  `email_user` varchar(255) NOT NULL,
  `photo` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `participant`
--

INSERT INTO `participant` (`id`, `id_pool`, `email_user`, `photo`, `status`) VALUES
(13, 12, 'testing123@gmail.com', 'C:\\Users\\kibo\\AndroidStudioProjects\\ResearcherPool\\app\\src\\main\\res\\drawable\\f37e3989a53b946c4ab431840c6a2874b.jpg', 'APPROVED'),
(14, 14, 'testing123@gmail.com', 'C:\\Users\\kibo\\AndroidStudioProjects\\ResearcherPool\\app\\src\\main\\res\\drawable\\f503a8ff9337b4ec981beb1b1eb69073e.jpg', 'APPROVED');

-- --------------------------------------------------------

--
-- Table structure for table `researcher`
--

CREATE TABLE `researcher` (
  `Email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `researcher`
--

INSERT INTO `researcher` (`Email`, `username`, `password`) VALUES
('taijobun23@gmail.com', 'Willyam', '123456'),
('testing123467@gmail.com', 'testinglagi', '12345'),
('testing123469@gmail.com', 'testinglagi', '12345'),
('testing12346@gmail.com', 'testinglagi', '12345'),
('testing1234@gmail.com', 'testinglagi', '12345'),
('Testing1@gmail.com', 'testinglagi', '1234'),
('testing223469@gmail.com', 'testinglagi', '12345'),
('testing2536@gmail.com', 'testinglagi', '12345'),
('testing253@gmail.com', 'testinglagi', '12345'),
('testing@gmail.com', 'aku', '12345'),
('testingdoang', 'awwad', '1234');

-- --------------------------------------------------------

--
-- Table structure for table `research_pool`
--

CREATE TABLE `research_pool` (
  `id` int(11) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `researcher` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `research_pool`
--

INSERT INTO `research_pool` (`id`, `Title`, `description`, `link`, `created_at`, `researcher`, `status`) VALUES
(12, 'awdwa', 'awdadwa', 'www.canva.com', '2024-12-12 04:23:59', 'taijobun23@gmail.com', 'CLOSED'),
(13, 'ok lagi', 'awdawd', 'www.dicoding.com', '2024-12-10 05:50:07', 'taijobun23@gmail.com', 'OPEN'),
(14, 'test', 'syarat:\n1. usia\n2. laki', 'www.canva.com', '2024-12-12 04:19:11', 'taijobun23@gmail.com', 'OPEN');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `Email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`Email`, `username`, `password`) VALUES
('bakar123@gmail.com', 'kibo', '123456'),
('testing123@gmail.com', 'testinglagi', '12345');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `participant`
--
ALTER TABLE `participant`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_id_pool` (`id_pool`),
  ADD KEY `fk_email_user` (`email_user`);

--
-- Indexes for table `researcher`
--
ALTER TABLE `researcher`
  ADD PRIMARY KEY (`Email`);

--
-- Indexes for table `research_pool`
--
ALTER TABLE `research_pool`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_researcher` (`researcher`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`Email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `participant`
--
ALTER TABLE `participant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `research_pool`
--
ALTER TABLE `research_pool`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `participant`
--
ALTER TABLE `participant`
  ADD CONSTRAINT `fk_email_user` FOREIGN KEY (`email_user`) REFERENCES `user` (`Email`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_id_pool` FOREIGN KEY (`id_pool`) REFERENCES `research_pool` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `research_pool`
--
ALTER TABLE `research_pool`
  ADD CONSTRAINT `fk_researcher` FOREIGN KEY (`researcher`) REFERENCES `researcher` (`Email`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
