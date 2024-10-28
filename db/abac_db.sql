-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Oct 28, 2024 at 05:45 AM
-- Server version: 5.7.39
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `abac_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `00_notification`
--

CREATE TABLE `00_notification` (
  `id` bigint(20) NOT NULL,
  `type` varchar(255) NOT NULL,
  `text` varchar(255) NOT NULL,
  `cancelled` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `00_notification`
--

INSERT INTO `00_notification` (`id`, `type`, `text`, `cancelled`, `created_at`, `updated_at`) VALUES
(1, 'error', 'Passwords does not match', 0, '2024-03-11 13:28:49', '2024-03-11 13:28:49'),
(2, 'error', 'Email already exists', 0, '2024-03-11 13:28:56', '2024-03-11 13:28:56'),
(3, 'error', 'Invalid token', 0, '2024-03-11 13:30:28', '2024-03-11 13:30:28'),
(4, 'error', 'this email does not esxist', 0, '2024-03-11 13:30:28', '2024-03-11 13:30:28'),
(5, 'error', 'You have missed one of the required variables', 0, '2024-03-11 13:30:28', '2024-03-11 13:30:28'),
(6, 'error', 'The API requires user token in the header.', 0, '2024-03-11 13:30:28', '2024-03-11 13:30:28'),
(7, 'error', 'Password must be more than 6 characters. and it must contain 1 uppercase 1 lowercase and 1 number.', 0, '2024-03-11 13:30:28', '2024-03-11 13:30:28');

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `session_id` varchar(255) DEFAULT NULL,
  `session_time` int(11) DEFAULT '0',
  `admin_level_id` int(3) NOT NULL,
  `last_login_time` datetime DEFAULT NULL,
  `last_login_ip` varchar(255) DEFAULT NULL,
  `cancelled` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `fullname`, `email`, `password`, `session_id`, `session_time`, `admin_level_id`, `last_login_time`, `last_login_ip`, `cancelled`) VALUES
(1, 'admin@admin.com', 'admin admin', 'admin@admin.com', '4cb9c8a8048fd02294477fcb1a41191a', '39e495048461f58cd10ced79e6b359e2', 1730038451, 1, '2024-10-27 15:18:38', '::1', 0),
(2, 'dina@admin.com', 'Dina H', 'dina@admin.com', '4cb9c8a8048fd02294477fcb1a41191a', 'd0df1172a211555e3ca96a3de087ab5e', 1707998950, 2, '2024-02-15 13:58:24', '::1', 0);

-- --------------------------------------------------------

--
-- Table structure for table `admins_log`
--

CREATE TABLE `admins_log` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `login_time` datetime NOT NULL,
  `admin_flag` int(11) NOT NULL,
  `admin_ip` varchar(255) NOT NULL,
  `admin_port` int(11) NOT NULL,
  `admin_host` varchar(255) NOT NULL,
  `admin_browser` varchar(255) NOT NULL,
  `result` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admins_log`
--

INSERT INTO `admins_log` (`id`, `username`, `password`, `login_time`, `admin_flag`, `admin_ip`, `admin_port`, `admin_host`, `admin_browser`, `result`) VALUES
(1, 'annie@admin.com', 'changeme', '2023-12-29 16:38:59', 0, '::1', 55006, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'failed login'),
(2, 'annie@admin.com', 'changeme', '2023-12-29 16:40:23', 0, '::1', 55012, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'failed login'),
(3, 'admin@admin.com', NULL, '2023-12-29 16:40:49', 1, '::1', 55015, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'successful login'),
(4, 'annie@admin.com', 'changeme', '2023-12-29 16:47:10', 0, '::1', 55569, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'failed login'),
(5, 'admin@admin.com', NULL, '2023-12-29 16:48:43', 1, '::1', 56005, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'successful login'),
(6, 'admin@admin.com', NULL, '2023-12-29 16:55:02', 1, '::1', 57368, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'successful login'),
(7, 'admin@admin.com', NULL, '2024-01-12 12:44:08', 1, '::1', 50171, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'successful login'),
(8, 'admin@admin.com', NULL, '2024-01-15 17:49:24', 1, '::1', 50388, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'successful login'),
(9, 'admin@admin.com', NULL, '2024-01-18 19:39:56', 1, '::1', 49496, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'successful login'),
(10, 'admin@admin.com', NULL, '2024-01-21 13:53:47', 1, '::1', 51709, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'successful login'),
(11, 'admin@admin.com', NULL, '2024-01-21 14:21:57', 1, '::1', 52139, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'successful login'),
(12, 'admin@admin.com', NULL, '2024-01-21 18:50:22', 1, '::1', 50377, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'successful login'),
(13, 'admin@admin.com', NULL, '2024-02-02 13:51:19', 1, '::1', 60878, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'successful login'),
(14, 'admin@admin.com', NULL, '2024-02-02 17:16:08', 1, '::1', 62333, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'successful login'),
(15, 'dina@admin.com	', 'dina123', '2024-02-02 17:16:47', 0, '::1', 62340, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'failed login'),
(16, 'dina@admin.com', NULL, '2024-02-02 17:16:54', 2, '::1', 62341, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'successful login'),
(17, 'admin@admin.com', NULL, '2024-02-02 17:20:10', 1, '::1', 62408, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'successful login'),
(18, 'dina@admin.com', NULL, '2024-02-02 17:20:24', 2, '::1', 62408, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'successful login'),
(19, 'admin@admin.com', NULL, '2024-02-02 17:20:32', 1, '::1', 62408, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'successful login'),
(20, 'admin@admin.com', NULL, '2024-02-13 19:59:57', 1, '::1', 55818, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'successful login'),
(21, 'admin@admin.com', NULL, '2024-02-14 10:25:10', 1, '::1', 64283, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'successful login'),
(22, 'admin@admin.com', NULL, '2024-02-14 12:32:14', 1, '::1', 52333, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'successful login'),
(23, 'dina@admin.com', NULL, '2024-02-14 13:03:07', 2, '::1', 52474, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'successful login'),
(24, 'admin@admin.com', NULL, '2024-02-14 13:03:23', 1, '::1', 52475, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'successful login'),
(25, 'dina@admin.com', NULL, '2024-02-14 13:03:42', 2, '::1', 52477, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'successful login'),
(26, 'admin@admin.com', NULL, '2024-02-14 13:04:19', 1, '::1', 52479, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'successful login'),
(27, 'annie@admin.com', 'changeme', '2024-02-14 19:04:41', 0, '::1', 53705, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'failed login'),
(28, 'admin@admin.com', NULL, '2024-02-14 19:04:53', 1, '::1', 53706, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'successful login'),
(29, 'admin@admin.com', NULL, '2024-02-14 20:15:42', 1, '::1', 53862, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'successful login'),
(30, 'admin@admin.com', NULL, '2024-02-14 23:41:46', 1, '::1', 56218, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'successful login'),
(31, 'admin@admin.com', NULL, '2024-02-15 11:35:54', 1, '::1', 49703, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'successful login'),
(32, 'dina@admin.com', NULL, '2024-02-15 13:58:02', 2, '::1', 49441, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'successful login'),
(33, 'admin@admin.com', NULL, '2024-02-15 13:58:11', 1, '::1', 49443, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'successful login'),
(34, 'dina@admin.com', NULL, '2024-02-15 13:58:24', 2, '::1', 49443, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'successful login'),
(35, 'admin@admin.com', NULL, '2024-03-08 21:32:45', 1, '::1', 53734, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'successful login'),
(36, 'admin@admin.com', NULL, '2024-03-11 13:25:35', 1, '::1', 53275, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'successful login'),
(37, 'ani.keushguerian@gmail.com', 'Changeme123', '2024-03-15 12:48:25', 0, '::1', 50783, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'failed login'),
(38, 'admin@admin.com', NULL, '2024-03-15 12:48:28', 1, '::1', 50783, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'successful login'),
(39, 'admin@admin.com', NULL, '2024-03-26 16:45:44', 1, '::1', 49953, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'successful login'),
(40, 'admin@admin.com', NULL, '2024-04-08 13:32:44', 1, '::1', 51716, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'successful login'),
(41, 'admin@admin.com', NULL, '2024-04-09 10:07:10', 1, '::1', 49529, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'successful login'),
(42, 'admin@admin.com', NULL, '2024-05-15 12:34:52', 1, '::1', 53074, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36', 'successful login'),
(43, 'admin@admin.com', NULL, '2024-05-15 16:31:46', 1, '::1', 58181, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36', 'successful login'),
(44, 'admin@admin.com', NULL, '2024-05-17 11:00:18', 1, '::1', 51152, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36', 'successful login'),
(45, 'admin@admin.com', NULL, '2024-05-20 09:15:59', 1, '::1', 56031, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36', 'successful login'),
(46, 'admin@admin.com', NULL, '2024-05-20 11:15:11', 1, '::1', 52338, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36', 'successful login'),
(47, 'admin@admin.com', NULL, '2024-05-22 13:22:37', 1, '::1', 55469, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36', 'successful login'),
(48, 'admin@admin.com', NULL, '2024-05-22 16:22:56', 1, '::1', 62840, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36', 'successful login'),
(49, 'admin@admin.com', NULL, '2024-05-23 11:38:05', 1, '::1', 49387, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36', 'successful login'),
(50, 'admin@admin.com', NULL, '2024-05-24 10:34:53', 1, '::1', 50197, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36', 'successful login'),
(51, 'admin@admin.com', NULL, '2024-05-24 13:48:10', 1, '::1', 62259, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36', 'successful login'),
(52, 'admin@admin.com', NULL, '2024-05-24 15:57:33', 1, '::1', 56096, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36', 'successful login'),
(53, 'annie@admin.com', 'changeme', '2024-05-25 12:56:37', 0, '::1', 59733, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36', 'failed login'),
(54, 'annie@admin.com', 'changeme', '2024-05-25 12:56:37', 0, '::1', 59733, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36', 'failed login'),
(55, 'admin@admin.com', NULL, '2024-05-25 12:56:41', 1, '::1', 59733, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36', 'successful login'),
(56, 'admin@admin.com', NULL, '2024-05-25 17:08:26', 1, '::1', 54959, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36', 'successful login'),
(57, 'admin@admin.com', NULL, '2024-05-29 11:10:21', 1, '::1', 62510, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36', 'successful login'),
(58, 'admin@admin.com', NULL, '2024-06-03 16:12:06', 1, '::1', 54582, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36', 'successful login'),
(59, 'admin@admin.com', NULL, '2024-06-05 21:23:35', 1, '::1', 54973, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36', 'successful login'),
(60, 'admin@admin.com', NULL, '2024-06-13 14:37:27', 1, '::1', 51412, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36', 'successful login'),
(61, 'annie123', 'changeme', '2024-07-04 10:33:37', 0, '::1', 57292, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'failed login'),
(62, 'admin@admin.com', NULL, '2024-07-04 10:33:40', 1, '::1', 57292, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'successful login'),
(63, 'admin@admin.com', NULL, '2024-07-04 14:32:18', 1, '::1', 57679, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'successful login'),
(64, 'admin@admin.com', NULL, '2024-07-05 11:07:49', 1, '::1', 61093, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'successful login'),
(65, 'admin@admin.com', NULL, '2024-07-05 12:16:13', 1, '::1', 62193, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'successful login'),
(66, 'admin@admin.com', NULL, '2024-07-07 16:05:52', 1, '::1', 61007, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'successful login'),
(67, 'admin@admin.com', NULL, '2024-07-22 17:19:34', 1, '::1', 50628, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'successful login'),
(68, 'admin@admin.com', NULL, '2024-07-23 16:16:39', 1, '::1', 49941, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'successful login'),
(69, 'admin@admin.com', NULL, '2024-07-24 14:33:20', 1, '::1', 50649, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'successful login'),
(70, 'admin@admin.com', NULL, '2024-07-24 19:03:58', 1, '::1', 49660, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'successful login'),
(71, 'admin@admin.com', NULL, '2024-07-25 08:37:11', 1, '::1', 50510, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'successful login'),
(72, 'admin@admin.com', NULL, '2024-07-25 11:29:40', 1, '::1', 50929, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'successful login'),
(73, 'admin@admin.com', NULL, '2024-07-26 12:01:06', 1, '::1', 63881, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'successful login'),
(74, 'admin@admin.com', NULL, '2024-08-06 22:53:30', 1, '::1', 52333, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'successful login'),
(75, 'admin@admin.com', NULL, '2024-08-07 16:51:02', 1, '::1', 53579, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'successful login'),
(76, 'admin@admin.com', NULL, '2024-08-08 21:19:46', 1, '::1', 59050, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'successful login'),
(77, 'admin@admin.com', NULL, '2024-08-08 22:22:51', 1, '::1', 63430, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'successful login'),
(78, 'admin@admin.com', NULL, '2024-08-20 12:34:01', 1, '::1', 51256, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36', 'successful login'),
(79, 'admin@admin.com', NULL, '2024-08-20 17:33:38', 1, '::1', 56980, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36', 'successful login'),
(80, 'admin@admin.com', NULL, '2024-08-20 20:00:30', 1, '::1', 62412, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36', 'successful login'),
(81, 'admin@admin.com', NULL, '2024-08-23 16:00:42', 1, '::1', 64710, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36', 'successful login'),
(82, 'admin@admin.com', NULL, '2024-09-21 01:25:23', 1, '::1', 53857, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36', 'successful login'),
(83, 'admin@admin.com', 'changeme123', '2024-10-27 15:18:02', 0, '::1', 63423, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', 'failed login'),
(84, 'admin@admin.com', 'changeme123', '2024-10-27 15:18:08', 0, '::1', 63430, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', 'failed login'),
(85, 'annie@admin.com', 'changeme', '2024-10-27 15:18:16', 0, '::1', 63431, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', 'failed login'),
(86, 'admin@admin.com', 'changeme123', '2024-10-27 15:18:19', 0, '::1', 63431, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', 'failed login'),
(87, 'admin@admin.com', NULL, '2024-10-27 15:18:38', 1, '::1', 63437, 'localhost:8888', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', 'successful login');

-- --------------------------------------------------------

--
-- Table structure for table `admin_field_type`
--

CREATE TABLE `admin_field_type` (
  `id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `cancelled` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admin_field_type`
--

INSERT INTO `admin_field_type` (`id`, `type`, `cancelled`) VALUES
(1, 'text', 0),
(2, 'textarea', 0),
(3, 'ckeditor', 0),
(4, 'image', 0),
(5, 'multiple_images', 0),
(6, 'file', 0),
(7, 'select', 0),
(8, 'multiple_select', 0),
(9, 'date', 0),
(10, 'datetime', 0),
(11, 'checkbox', 0),
(12, 'hidden', 0),
(13, 'boolean_checkbox', 0),
(14, 'jsonbuilder', 0),
(15, 'calendar', 0),
(16, 'number', 0),
(17, 'subtable', 0);

-- --------------------------------------------------------

--
-- Table structure for table `admin_nav`
--

CREATE TABLE `admin_nav` (
  `id` int(11) NOT NULL,
  `category` varchar(255) NOT NULL,
  `icon` varchar(255) NOT NULL,
  `admin_table_id` int(11) DEFAULT NULL,
  `label` varchar(255) NOT NULL,
  `link` text,
  `reorder` double NOT NULL DEFAULT '0',
  `cancelled` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admin_nav`
--

INSERT INTO `admin_nav` (`id`, `category`, `icon`, `admin_table_id`, `label`, `link`, `reorder`, `cancelled`, `created_at`, `updated_at`) VALUES
(1, '2', '<i class=\"fas fa-users\"></i>', 2, 'Users', NULL, 0, 0, '2024-02-02 14:40:04', '2024-02-02 14:40:04'),
(2, '1', '<i class=\"fas fa-image\"></i>', 3, 'Homepage Banner', NULL, 0, 0, '2024-02-14 12:35:50', '2024-02-14 12:35:50'),
(3, '1', '<i class=\"fas fa-paragraph\"></i>', 4, 'Website Texts', NULL, 0, 0, '2024-02-14 12:47:31', '2024-02-14 12:47:31'),
(4, '1', '<i class=\"fas fa-list\"></i>', 6, 'What We Do', NULL, 0, 0, '2024-02-14 13:00:00', '2024-02-14 13:00:00'),
(5, '1', '<i class=\"fas fa-check-circle\"></i>', 7, 'Testimonials', NULL, 0, 0, '2024-02-14 13:01:00', '2024-02-14 13:01:23'),
(6, '3', '<i class=\"far fa-question-circle\"></i>', NULL, 'Quiz', 'admin_quiz.php', 0, 0, '2024-02-14 14:48:38', '2024-07-04 16:19:28'),
(7, '3', '<i class=\"fas fa-paperclip\"></i>', 8, 'Quiz Paper', '', 0, 0, '2024-02-14 21:18:33', '2024-07-04 16:19:32'),
(8, '2', '<i class=\"fas fa-users\"></i>', 9, 'Users Log', NULL, 0, 0, '2024-02-15 12:00:11', '2024-02-15 12:00:11'),
(9, '3', '<i class=\"fas fa-chess-rook\"></i>', 10, 'Competitions', NULL, 0.01, 0, '2024-02-15 12:06:43', '2024-02-15 12:06:43'),
(10, '1', '<i class=\"fas fa-bell\"></i>', 11, 'Notifications', NULL, 0, 0, '2024-03-11 13:28:26', '2024-03-11 13:28:26'),
(11, '3', '<i class=\"fas fa-cog\"></i>', 12, 'Settings', NULL, 0.02, 0, '2024-05-15 12:37:23', '2024-05-15 12:37:23'),
(12, '3', '<i class=\"far fa-question-circle\"></i>', 14, 'Quiz Rules', NULL, -0.01, 0, '2024-05-17 11:27:34', '2024-05-17 11:27:34'),
(13, '3', '<i class=\"fas fa-list\"></i>', 15, 'Topics', NULL, 0, 0, '2024-07-07 16:09:27', '2024-07-07 16:09:27'),
(14, '3', '<i class=\"fas fa-bolt\"></i>', NULL, 'Flash Anzan', 'admin_flash_anzan.php', 0, 0, '2024-07-24 19:43:30', '2024-07-24 19:43:30'),
(15, '2', '<i class=\"far fa-star\"></i>', 17, 'Student Quiz', NULL, 0, 0, '2024-08-20 20:27:51', '2024-08-20 20:27:51'),
(16, '2', '<i class=\"far fa-star\"></i>', 18, 'Student Competition Result', NULL, 0, 0, '2024-08-20 20:28:03', '2024-08-20 20:28:03');

-- --------------------------------------------------------

--
-- Table structure for table `admin_nav_category`
--

CREATE TABLE `admin_nav_category` (
  `id` int(11) NOT NULL,
  `label` varchar(255) NOT NULL,
  `reorder` double NOT NULL,
  `cancelled` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admin_nav_category`
--

INSERT INTO `admin_nav_category` (`id`, `label`, `reorder`, `cancelled`) VALUES
(1, 'Website Content', 1, 0),
(2, 'Manage Users', 3, 0),
(3, 'Quiz And Practice Section', 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `admin_permissions`
--

CREATE TABLE `admin_permissions` (
  `id` int(11) NOT NULL,
  `admins_id` int(11) NOT NULL,
  `admin_menu_id` int(11) NOT NULL,
  `permission_add` tinyint(1) NOT NULL DEFAULT '0',
  `cancelled` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admin_permissions`
--

INSERT INTO `admin_permissions` (`id`, `admins_id`, `admin_menu_id`, `permission_add`, `cancelled`) VALUES
(1, 2, 1, 1, 0),
(2, 2, 2, 1, 0),
(3, 2, 3, 1, 0),
(4, 2, 4, 1, 0),
(5, 2, 5, 1, 0),
(6, 2, 6, 1, 0),
(7, 2, 7, 1, 0),
(8, 2, 8, 1, 0),
(9, 2, 9, 1, 0),
(10, 2, 12, 1, 0),
(11, 2, 10, 1, 0),
(12, 2, 11, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `admin_tables`
--

CREATE TABLE `admin_tables` (
  `id` int(11) NOT NULL,
  `label` varchar(255) NOT NULL,
  `tbl_name` varchar(255) NOT NULL,
  `tbl_sort` tinyint(1) NOT NULL DEFAULT '0',
  `has_sub_table` tinyint(1) NOT NULL DEFAULT '0',
  `query` text,
  `other_operations` text,
  `sort_page` varchar(255) DEFAULT NULL,
  `field_sort` text,
  `cancelled` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admin_tables`
--

INSERT INTO `admin_tables` (`id`, `label`, `tbl_name`, `tbl_sort`, `has_sub_table`, `query`, `other_operations`, `sort_page`, `field_sort`, `cancelled`, `created_at`, `updated_at`) VALUES
(1, 'Teachers', 'teachers', 0, 0, '', '', '', NULL, 1, '2024-01-21 19:12:33', '2024-01-21 19:12:33'),
(2, 'Users', 'users', 0, 0, '', '', '', NULL, 0, '2024-01-21 19:12:44', '2024-02-02 14:37:43'),
(3, 'Homepage Banners', 'homepage_banners', 1, 0, '', '', '', NULL, 0, '2024-01-21 19:13:19', '2024-03-08 21:38:44'),
(4, 'Paragraphs', 'paragraphs', 0, 0, '', '', '', NULL, 0, '2024-01-21 19:13:34', '2024-01-21 19:13:34'),
(5, 'Quiz', 'quiz', 0, 0, '', '', '', NULL, 0, '2024-02-02 15:07:22', '2024-02-02 15:07:22'),
(6, 'What We Do', 'what_we_do', 0, 0, '', '', '', NULL, 0, '2024-02-14 12:48:41', '2024-02-14 12:48:41'),
(7, 'Testimonials', 'testimonials', 0, 0, '', '', '', NULL, 0, '2024-02-14 12:48:59', '2024-02-14 12:48:59'),
(8, 'Quiz Paper', 'quiz_paper', 0, 0, '', '[\r\n{\r\n    \"label\":  \"View Paper\",\r\n    \"link\": \"http://localhost:8888/Abac/cmsversion2abac/admin_quiz_paper.php?\",\r\n    \"target\":\"_blank\"\r\n  }\r\n]\r\n', '', NULL, 0, '2024-02-14 21:16:37', '2024-02-15 00:05:54'),
(9, 'Users Log', 'users_log', 0, 0, '', '', '', NULL, 0, '2024-02-15 11:49:42', '2024-02-15 11:49:42'),
(10, 'Competition', 'competition', 0, 0, '', '', '', NULL, 0, '2024-02-15 12:00:42', '2024-02-15 12:00:42'),
(11, 'Notifications', '00_notification', 0, 0, '', '', '', NULL, 0, '2024-03-11 13:25:49', '2024-03-11 13:25:49'),
(12, 'Settings', 'settings', 0, 0, '', '', '', NULL, 0, '2024-05-15 12:35:27', '2024-05-15 12:35:27'),
(13, 'Grades and Levels', 'grade_level', 0, 0, '', '', '', NULL, 0, '2024-05-17 11:05:24', '2024-05-17 11:05:24'),
(14, 'Quiz Rules', 'quiz_rules', 1, 0, '', '', '', NULL, 0, '2024-05-17 11:19:20', '2024-08-20 12:57:22'),
(15, 'Topics', 'topics', 1, 0, '', '', '', NULL, 0, '2024-07-07 16:06:02', '2024-07-07 16:06:28'),
(16, 'Flash Anzan ', 'flash_anzan', 0, 0, '', '', '', NULL, 0, '2024-07-24 14:35:19', '2024-07-24 14:35:19'),
(17, 'Student Quiz', 'student_quiz', 0, 0, '', '', '', NULL, 0, '2024-08-20 20:11:17', '2024-08-20 20:11:17'),
(18, 'Student Competition Quiz', 'student_competition_quiz', 0, 0, '', '', '', NULL, 0, '2024-08-20 20:11:46', '2024-08-20 20:11:46');

-- --------------------------------------------------------

--
-- Table structure for table `admin_table_fields`
--

CREATE TABLE `admin_table_fields` (
  `id` int(11) NOT NULL,
  `admin_table_id` int(11) NOT NULL,
  `admin_subtable` text,
  `label` varchar(255) NOT NULL,
  `col_name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `db_type` varchar(255) DEFAULT NULL,
  `db_length` varchar(255) DEFAULT NULL,
  `col_class` varchar(255) DEFAULT NULL,
  `folder_name` varchar(255) DEFAULT NULL,
  `field_value` text,
  `query_value` text,
  `reorder` double DEFAULT NULL,
  `is_hidden` tinyint(1) NOT NULL DEFAULT '0',
  `linked_to_subtable` tinyint(1) NOT NULL DEFAULT '0',
  `cancelled` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admin_table_fields`
--

INSERT INTO `admin_table_fields` (`id`, `admin_table_id`, `admin_subtable`, `label`, `col_name`, `type`, `db_type`, `db_length`, `col_class`, `folder_name`, `field_value`, `query_value`, `reorder`, `is_hidden`, `linked_to_subtable`, `cancelled`, `created_at`, `updated_at`) VALUES
(1, 2, '', 'First Name', 'first_name', 'text', 'VARCHAR', '255', 'col-lg-6 col-md-6 col-sm-12', NULL, '', '', 1, 0, 0, 0, '2024-02-02 14:15:51', '2024-02-02 14:16:29'),
(2, 2, '', 'Last Name', 'last_name', 'text', 'VARCHAR', '255', 'col-lg-6 col-md-6 col-sm-12', NULL, '', '', 2, 0, 0, 0, '2024-02-02 14:16:01', '2024-02-02 14:16:40'),
(3, 2, '', 'Username', 'username', 'text', 'VARCHAR', '255', 'col-lg-6 col-md-6 col-sm-12', NULL, '', '', 3, 0, 0, 0, '2024-02-02 14:16:52', '2024-02-02 14:16:52'),
(4, 2, '', 'Password', 'password', 'text', 'VARCHAR', '255', 'col-lg-6 col-md-6 col-sm-12', NULL, '', '', 4, 0, 0, 0, '2024-02-02 14:17:01', '2024-02-02 14:17:01'),
(5, 2, '', 'Teacher', 'teacher_id', 'select', 'INT', '', 'col-lg-6 col-md-6 col-sm-12', NULL, 'SELECT id,first_name FROM users WHERE cancelled = 0 AND is_teacher = 1 ORDER BY id ASC', 'SELECT first_name FROM users WHERE is_teacher = 1 AND id = teacher_id', 5, 0, 0, 0, '2024-02-02 14:18:44', '2024-02-02 14:48:39'),
(6, 2, '', 'Email', 'email', 'text', 'VARCHAR', '255', 'col-lg-6 col-md-6 col-sm-12', NULL, '', '', 6, 0, 0, 0, '2024-02-02 14:34:58', '2024-02-02 14:34:58'),
(7, 1, '', 'Full Name', 'full_name', 'text', 'VARCHAR', '255', 'col-lg-6 col-md-6 col-sm-12', NULL, '', '', 7, 0, 0, 1, '2024-02-02 14:35:15', '2024-02-02 14:35:15'),
(8, 1, '', 'Username', 'username', 'text', 'VARCHAR', '255', 'col-lg-6 col-md-6 col-sm-12', NULL, '', '', 8, 0, 0, 1, '2024-02-02 14:35:30', '2024-02-02 14:35:30'),
(9, 2, '', 'Is Teacher', 'is_teacher', 'boolean_checkbox', 'TINYINT', '1', 'col-lg-6 col-md-6 col-sm-12', NULL, '', '', 9, 0, 0, 0, '2024-02-02 14:38:12', '2024-02-02 14:38:12'),
(10, 2, '', 'Date of Birth', 'dob', 'date', 'DATE', '', 'col-lg-6 col-md-6 col-sm-12', NULL, '', '', 10, 0, 0, 0, '2024-02-02 14:49:15', '2024-02-02 14:49:15'),
(11, 5, '', 'Quiz Level', 'quiz_level', 'number', 'INT', '', 'col-lg-6 col-md-6 col-sm-12', NULL, '', '', 11, 0, 0, 0, '2024-02-02 15:08:07', '2024-02-02 15:08:07'),
(12, 3, '', 'Banner Image', 'image', 'image', NULL, '', 'col-lg-6 col-md-6 col-sm-12', 'Banner', '', '', 12, 0, 0, 0, '2024-02-14 12:32:56', '2024-02-14 12:32:56'),
(13, 3, '', 'Banner Image Ext', 'extension_image ', 'hidden', 'VARCHAR', '255', '', NULL, '', '', 13, 0, 0, 0, '2024-02-14 12:33:25', '2024-02-14 12:33:25'),
(14, 3, '', 'Banner Title', 'title', 'text', 'VARCHAR', '255', 'col-lg-6 col-md-6 col-sm-12', NULL, '', '', 14, 0, 0, 0, '2024-02-14 12:33:41', '2024-02-14 12:33:41'),
(15, 3, '', 'Banner Text', 'text', 'textarea', 'TEXT', '', 'col-lg-12 col-md-12 col-sm-12', NULL, '', '', 15, 0, 0, 0, '2024-02-14 12:34:01', '2024-02-14 12:34:01'),
(16, 4, '', 'Location', 'text_location', 'select', 'VARCHAR', '255', 'col-lg-6 col-md-6 col-sm-12', NULL, 'SELECT \'about\',\'about\'\r\nUNION\r\nSELECT \'testimonials\',\'testimonials\'\r\nUNION\r\nSELECT \'terms_and_conditions\',\'terms_and_conditions\'\r\nUNION\r\nSELECT \'privacy_statement\',\'privacy_statement\'', '', 16, 0, 0, 0, '2024-02-14 12:45:40', '2024-02-14 12:45:40'),
(17, 4, '', 'Title', 'title', 'text', 'VARCHAR', '255', 'col-lg-6 col-md-6 col-sm-12', NULL, '', '', 17, 0, 0, 0, '2024-02-14 12:46:02', '2024-02-14 12:46:02'),
(18, 4, '', 'Brief', 'brief', 'textarea', 'TEXT', '', 'col-lg-12 col-md-12 col-sm-12', NULL, '', '', 18, 0, 0, 0, '2024-02-14 12:46:23', '2024-02-14 12:46:23'),
(19, 4, '', 'Text', 'text', 'ckeditor', 'TEXT', '', 'col-lg-12 col-md-12 col-sm-12', NULL, '', '', 19, 0, 0, 0, '2024-02-14 12:46:36', '2024-02-14 12:46:36'),
(20, 6, '', 'Title', 'title', 'text', 'VARCHAR', '255', 'col-lg-6 col-md-6 col-sm-12', NULL, '', '', 20, 0, 0, 0, '2024-02-14 12:53:43', '2024-02-14 12:53:43'),
(21, 6, '', 'Text', 'text', 'textarea', 'TEXT', '', 'col-lg-12 col-md-12 col-sm-12', NULL, '', '', 21, 0, 0, 0, '2024-02-14 12:54:15', '2024-02-14 12:54:15'),
(22, 6, '', 'Icon', 'icon', 'image', 'TEXT', '', 'col-lg-12 col-md-12 col-sm-12', NULL, '', '', 22, 0, 0, 0, '2024-02-14 12:54:30', '2024-02-14 12:54:30'),
(23, 6, '', 'Image', 'image', 'image', NULL, '', 'col-lg-6 col-md-6 col-sm-12', 'about_icon', '', '', 23, 0, 0, 0, '2024-02-14 12:55:05', '2024-02-14 12:55:30'),
(24, 6, '', 'Image Ext', 'extension_image', 'hidden', 'VARCHAR', '255', '', NULL, '', '', 24, 0, 0, 0, '2024-02-14 12:55:56', '2024-02-14 12:55:56'),
(25, 7, '', 'Name', 'full_name', 'text', 'VARCHAR', '255', 'col-lg-6 col-md-6 col-sm-12', NULL, '', '', 25, 0, 0, 0, '2024-02-14 12:56:51', '2024-02-14 12:56:51'),
(26, 7, '', 'Review', 'text', 'textarea', 'TEXT', '', 'col-lg-12 col-md-12 col-sm-12', NULL, '', '', 26, 0, 0, 0, '2024-02-14 12:57:13', '2024-02-14 12:57:13'),
(27, 7, '', 'Stars', 'stars', 'number', 'INT', '', 'col-lg-6 col-md-6 col-sm-12', NULL, '', '', 27, 0, 0, 0, '2024-02-14 12:57:42', '2024-02-14 12:57:42'),
(28, 7, '', 'Image', 'image', 'image', NULL, '', 'col-lg-6 col-md-6 col-sm-12', 'testimonial_icon', '', '', 28, 0, 0, 0, '2024-02-14 12:58:23', '2024-02-14 12:58:23'),
(29, 7, '', 'Image Ext', 'extension_image', 'hidden', 'VARCHAR', '255', '', NULL, '', '', 29, 0, 0, 0, '2024-02-14 12:58:42', '2024-02-14 12:58:42'),
(30, 5, '', 'Quiz Data', 'quiz_data', 'textarea', 'TEXT', '', 'col-lg-12 col-md-12 col-sm-12', NULL, '', '', 30, 0, 0, 0, '2024-02-14 15:07:10', '2024-02-14 15:07:10'),
(31, 5, '', 'Quiz Type', 'quiz_type', 'select', 'TEXT', '255', 'col-lg-6 col-md-6 col-sm-12', NULL, '', '', 31, 0, 0, 0, '2024-02-14 15:21:32', '2024-02-14 15:21:32'),
(32, 5, '', 'Assigned To', 'assigned_to', 'multiple_select', 'BIGINT', '', 'col-lg-12 col-md-12 col-sm-12', NULL, '', '', 32, 0, 0, 0, '2024-02-14 19:12:25', '2024-02-14 19:12:25'),
(33, 8, '', 'Quiz Number', 'quiz_nbr', 'text', 'VARCHAR', '255', 'col-lg-6 col-md-6 col-sm-12', NULL, '', '', 33, 0, 0, 0, '2024-02-14 21:17:09', '2024-02-14 21:17:09'),
(34, 8, '', 'Quiz Title', 'title', 'text', 'VARCHAR', '255', 'col-lg-6 col-md-6 col-sm-12', NULL, '', '', 34, 0, 0, 0, '2024-02-14 21:17:19', '2024-02-14 21:17:19'),
(35, 8, '', 'Quiz Level', 'quiz_level', 'number', 'INT', '', 'col-lg-6 col-md-6 col-sm-12', NULL, '', '', 35, 0, 0, 0, '2024-02-15 00:00:16', '2024-02-15 00:00:16'),
(36, 9, '', 'User ID', 'user_id', 'select', 'BIGINT', '', 'col-lg-6 col-md-6 col-sm-12', NULL, 'SELECT id,email FROM users WHERE cancelled = 0 ORDER BY id ASC', 'SELECT email FROM users WHERE id = user_id', 36, 0, 0, 0, '2024-02-15 11:51:32', '2024-02-15 11:51:32'),
(37, 9, '', 'User IP', 'user_ip', 'text', 'VARCHAR', '255', 'col-lg-6 col-md-6 col-sm-12', NULL, '', '', 37, 0, 0, 0, '2024-02-15 11:58:06', '2024-02-15 11:58:06'),
(38, 9, '', 'Session', 'session', 'text', 'VARCHAR', '255', 'col-lg-6 col-md-6 col-sm-12', NULL, '', '', 38, 0, 0, 0, '2024-02-15 11:58:48', '2024-02-15 11:58:48'),
(39, 9, '', 'Browser', 'browser', 'text', 'TEXT', '', 'col-lg-6 col-md-6 col-sm-12', NULL, '', '', 39, 0, 0, 0, '2024-02-15 11:59:00', '2024-02-15 11:59:00'),
(40, 9, '', 'Token', 'token', 'text', 'VARCHAR', '255', 'col-lg-6 col-md-6 col-sm-12', NULL, '', '', 40, 0, 0, 0, '2024-02-15 11:59:22', '2024-02-15 11:59:22'),
(41, 10, '', 'Start Date', 'start_date', 'datetime', 'DATETIME', '', 'col-lg-6 col-md-6 col-sm-12', NULL, '', '', 41, 0, 0, 0, '2024-02-15 12:01:09', '2024-02-15 12:01:09'),
(42, 10, '', 'End Date', 'end_date', 'datetime', 'DATETIME', '', 'col-lg-6 col-md-6 col-sm-12', NULL, '', '', 42, 0, 0, 0, '2024-02-15 12:01:20', '2024-02-15 12:01:20'),
(43, 10, '', 'Quiz assigned', 'quiz_ids', 'multiple_select', 'TEXT', '', 'col-lg-12 col-md-12 col-sm-12', NULL, 'SELECT id, title FROM quiz_paper WHERE cancelled = 0 ORDER BY id ASC', 'SELECT title FROM quiz_paper WHERE id = quiz_ids', 43, 0, 0, 0, '2024-02-15 12:05:07', '2024-05-23 13:31:05'),
(44, 10, '', 'Competition Name', 'quiz_name', 'text', 'VARCHAR', '255', 'col-lg-6 col-md-6 col-sm-12', NULL, '', '', 44, 0, 0, 0, '2024-02-15 12:05:35', '2024-05-23 13:39:18'),
(45, 10, '', 'Competition Number', 'quiz_number', 'text', 'VARCHAR', '255', 'col-lg-6 col-md-6 col-sm-12', NULL, '', '', 45, 0, 0, 0, '2024-02-15 12:05:45', '2024-05-23 13:39:24'),
(46, 3, '', 'reorder', 'reorder', 'hidden', 'DOUBLE', '11', 'col-lg-6 col-md-6 col-sm-12', NULL, '', '', 46, 1, 0, 0, '2024-03-08 21:39:16', '2024-03-08 21:41:26'),
(47, 11, '', 'type', 'quiz_type', 'select', 'VARCHAR', '255', 'col-lg-6 col-md-6 col-sm-12', NULL, 'SELECT \'error\',\'error\'\r\nUNION\r\nSELECT \'info\',\'info\'\r\nUNION\r\nSELECT \'success\',\'success\'', '', 47, 0, 0, 0, '2024-03-11 13:27:05', '2024-05-17 11:51:12'),
(48, 11, '', 'Text', 'text', 'text', 'VARCHAR', '255', 'col-lg-12 col-md-12 col-sm-12', NULL, '', '', 48, 0, 0, 0, '2024-03-11 13:27:23', '2024-03-11 13:27:23'),
(49, 9, '', 'Login Date', 'login_date', 'datetime', 'DATETIME', '', 'col-lg-6 col-md-6 col-sm-12', NULL, '', '', 49, 0, 0, 0, '2024-03-15 12:49:00', '2024-03-15 12:49:00'),
(50, 2, '', 'Level', 'level', 'number', 'VARCHAR', '255', 'col-lg-6', NULL, '', '', 50, 0, 0, 0, '2024-04-09 11:00:10', '2024-04-09 11:00:10'),
(51, 12, '', 'Label', 'label', 'text', 'VARCHAR', '255', 'col-lg-6', NULL, '', '', 51, 0, 0, 0, '2024-05-15 12:36:27', '2024-05-15 12:36:27'),
(52, 12, '', 'Value', 'value', 'text', 'VARCHAR', '255', 'col-lg-6', NULL, '', '', 52, 0, 0, 0, '2024-05-15 12:36:36', '2024-05-15 12:36:36'),
(53, 2, '', 'Grade', 'grade', 'text', 'VARCHAR', '255', 'col-lg-6', NULL, '', '', 53, 0, 0, 0, '2024-05-17 11:05:59', '2024-05-17 11:05:59'),
(54, 14, '', 'Quiz Type ', 'quiz_type', 'select', 'TEXT', '', 'col-lg-6', NULL, 'SELECT \'addition\',\'addition\'\r\nUNION\r\nSELECT \'multiplication\',\'multiplication\'\r\nUNION\r\nSELECT \'division\',\'division\'', '', 54, 0, 0, 0, '2024-05-17 11:21:09', '2024-08-20 14:14:21'),
(55, 14, '', 'Quiz Level ', 'level', 'number', 'VARCHAR', '255', 'col-lg-6', NULL, '', '', 53.99, 0, 0, 0, '2024-05-17 11:22:13', '2024-05-17 11:22:13'),
(56, 14, '', 'Quiz page ', 'pages', 'multiple_select', 'TEXT', '', 'col-lg-6', NULL, 'SELECT \'page_1\',\'page_1\'\r\nUNION\r\nSELECT \'page_2\',\'page_2\'\r\nUNION\r\nSELECT \'page_3\',\'page_3\'\r\nUNION\r\nSELECT \'page_4\',\'page_4\'\r\nUNION\r\nSELECT \'page_5\',\'page_5\'\r\nUNION\r\nSELECT \'page_6\',\'page_6\'', '', 56, 0, 0, 0, '2024-05-17 11:25:15', '2024-05-23 14:12:36'),
(57, 14, '', 'Number of rows', 'row_nbr', 'number', 'VARCHAR', '255', 'col-lg-6', NULL, '', '', 57, 0, 0, 0, '2024-05-17 11:26:14', '2024-05-17 11:26:14'),
(58, 14, '', 'Number of cols', 'col_nbr', 'number', 'VARCHAR', '255', 'col-lg-6', NULL, '', '', 58, 0, 0, 0, '2024-05-17 11:26:21', '2024-05-17 11:26:21'),
(59, 14, '', 'Number From', 'nbr_from', 'number', 'VARCHAR', '255', 'col-lg-6', NULL, '', '', 59, 0, 0, 0, '2024-05-17 11:26:43', '2024-05-17 11:26:43'),
(60, 14, '', 'Number To', 'nbr_to', 'number', 'VARCHAR', '255', 'col-lg-6', NULL, '', '', 59.005, 0, 0, 0, '2024-05-17 11:26:50', '2024-05-17 11:26:50'),
(61, 14, '', 'Number of tables in page', 'nbr_tables', 'number', 'VARCHAR', '255', 'col-lg-6', NULL, '', '', 56.5, 0, 0, 0, '2024-05-17 13:32:18', '2024-05-17 13:32:18'),
(62, 8, '', 'Quizzes ', 'quizzes', 'multiple_select', 'TEXT', '', 'col-lg-12 ', NULL, 'SELECT id,quiz_level FROM quiz WHERE cancelled = 0 ORDER BY id ASC', 'SELECT id FROM quiz WHERE id = quizzes', NULL, 0, 0, 1, '2024-05-23 18:05:14', '2024-08-20 13:17:22'),
(63, 15, '', 'Label [EN]', 'label_en', 'text', 'VARCHAR', '255', 'col-lg-6', NULL, '', '', NULL, 0, 0, 0, '2024-07-07 16:07:35', '2024-07-07 16:07:35'),
(64, 15, '', 'Label [HY]', 'label_hy', 'text', 'VARCHAR', '255', 'col-lg-6', NULL, '', '', NULL, 0, 0, 0, '2024-07-07 16:07:51', '2024-07-07 16:08:02'),
(65, 15, '', 'reorder', 'reorder', 'hidden', 'DOUBLE', '', '', NULL, '', '', NULL, 0, 0, 0, '2024-07-07 16:10:25', '2024-07-07 16:10:25'),
(66, 15, '', 'Type', 'type', 'select', 'VARCHAR', '255', 'col-lg-6', NULL, 'SELECT \'1D\',\'1D\'\r\nUNION\r\nSELECT \'2D\',\'2D\'', '', NULL, 0, 0, 0, '2024-07-07 16:13:35', '2024-07-07 16:13:35'),
(67, 16, '', 'Topic', 'topic', 'select', 'INT', '', 'col-lg-6', NULL, '', '', NULL, 0, 0, 0, '2024-07-24 14:36:48', '2024-07-24 14:36:48'),
(68, 16, '', 'Number of rows', 'nbr_row', 'text', 'VARCHAR', '255', 'col-lg-6', NULL, '', '', NULL, 0, 0, 0, '2024-07-24 14:37:45', '2024-07-24 14:37:45'),
(69, 16, '', 'Examples', 'nbr_examples', 'text', 'TEXT', '', '', NULL, '', '', NULL, 0, 0, 0, '2024-07-24 14:38:55', '2024-07-24 14:38:55'),
(70, 14, '', 'reorder', 'reorder', 'hidden', 'DOUBLE', '', '', NULL, '', '', NULL, 0, 0, 0, '2024-08-20 12:57:56', '2024-08-20 12:57:56'),
(71, 14, '', '1st row digit number (Multiplication/division)', 'digit_nbr_1', 'number', 'INT', '', 'col-lg-6', NULL, '', '', 59.01, 0, 0, 0, '2024-08-20 12:59:20', '2024-08-20 12:59:20'),
(72, 14, '', '2nd row digit number (Multiplication/division)', 'digit_nbr_2', 'number', 'INT', '', 'col-lg-6', NULL, '', '', 59.02, 0, 0, 0, '2024-08-20 12:59:28', '2024-08-20 12:59:28'),
(73, 17, '', 'User ID', 'user_id', 'select', 'BIGINT', '', 'col-lg-6', NULL, 'SELECT id,email FROM users WHERE cancelled = 0 ORDER BY id ASC', 'SELECT email FROM users WHERE id = user_id', NULL, 0, 0, 0, '2024-08-20 20:13:23', '2024-08-20 20:13:23'),
(74, 18, '', 'User ID', 'user_id', 'select', 'BIGINT', '', 'col-lg-6', NULL, 'SELECT id,email FROM users WHERE cancelled = 0 ORDER BY id ASC', 'SELECT email FROM users WHERE id = user_id', NULL, 0, 0, 0, '2024-08-20 20:13:41', '2024-08-20 20:13:41'),
(75, 17, '', 'Answers', 'answers', 'textarea', 'TEXT', '', 'col-lg-12', NULL, '', '', NULL, 0, 0, 0, '2024-08-20 20:14:48', '2024-08-20 20:14:48'),
(76, 18, '', 'Answers', 'answers', 'textarea', 'TEXT', '', 'col-lg-12', NULL, '', '', NULL, 0, 0, 0, '2024-08-20 20:15:05', '2024-08-20 20:15:05'),
(77, 17, '', 'Result', 'result', 'text', 'VARCHAR', '255', 'col-lg-6', NULL, '', '', NULL, 0, 0, 0, '2024-08-20 20:15:59', '2024-08-20 20:15:59'),
(78, 18, '', 'Result', 'result', 'text', 'VARCHAR', '255', 'col-lg-6', NULL, '', '', NULL, 0, 0, 0, '2024-08-20 20:16:14', '2024-08-20 20:16:14'),
(79, 17, '', 'Score', 'score', 'text', 'VARCHAR', '255', 'col-lg-6', NULL, '', '', NULL, 0, 0, 0, '2024-08-20 20:16:45', '2024-08-20 20:16:45'),
(80, 18, '', 'Score', 'score', 'text', 'VARCHAR', '255', 'col-lg-6', NULL, '', '', NULL, 0, 0, 0, '2024-08-20 20:17:02', '2024-08-20 20:17:02'),
(81, 17, '', 'Over', 'over', 'text', 'VARCHAR', '255', 'col-lg-6', NULL, '', '', NULL, 0, 0, 0, '2024-08-20 20:17:26', '2024-08-20 20:17:26'),
(82, 18, '', 'Over', 'over', 'text', 'VARCHAR', '255', 'col-lg-6', NULL, '', '', NULL, 0, 0, 0, '2024-08-20 20:17:40', '2024-08-20 20:17:40'),
(83, 8, '', 'Is Competition', 'is_competition', 'boolean_checkbox', 'TINYINT', '1', 'col-lg-6', NULL, '', '', NULL, 0, 0, 0, '2024-08-23 17:04:54', '2024-08-23 17:04:54'),
(84, 2, '', 'Is Verified', 'is_verified', 'boolean_checkbox', 'TINYINT', '1', 'col-lg-6 col-md-6 col-sm-12', NULL, '', '', NULL, 0, 0, 0, '2024-10-27 15:19:55', '2024-10-27 15:19:55');

-- --------------------------------------------------------

--
-- Table structure for table `competition`
--

CREATE TABLE `competition` (
  `id` bigint(20) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `quiz_ids` text NOT NULL,
  `quiz_name` varchar(255) NOT NULL,
  `quiz_number` varchar(255) NOT NULL,
  `cancelled` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `competition`
--

INSERT INTO `competition` (`id`, `start_date`, `end_date`, `quiz_ids`, `quiz_name`, `quiz_number`, `cancelled`, `created_at`, `updated_at`) VALUES
(1, '2024-08-22 00:00:00', '2024-08-31 00:00:00', '[\"1\"]', 'Level 1', '', 0, '2024-08-20 20:44:13', '2024-05-23 20:44:13'),
(2, '2024-08-23 16:15:00', '2024-08-25 16:15:00', '[\"2\"]', 'Competition level 5 ', '1', 0, '2024-08-23 16:16:07', '2024-08-23 16:16:07');

-- --------------------------------------------------------

--
-- Table structure for table `flash_anzan`
--

CREATE TABLE `flash_anzan` (
  `id` bigint(20) NOT NULL,
  `topic` int(11) NOT NULL,
  `nbr_row` varchar(255) NOT NULL,
  `nbr_examples` text NOT NULL,
  `cancelled` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `flash_anzan`
--

INSERT INTO `flash_anzan` (`id`, `topic`, `nbr_row`, `nbr_examples`, `cancelled`, `created_at`, `updated_at`) VALUES
(1, 1, '2', '[[\"1\",\"2\"],[\"3\",\"4\"],[\"1\",\"1\"]]', 0, '2024-07-25 13:52:59', '2024-07-25 13:52:59'),
(2, 2, '3', '[[\"1\",\"2\",\"3\"],[\"1\",\"2\",\"1\"],[\"1\",\"-1\",\"2\"],[\"1\",\"2\",\"4\"],[\"1\",\"1\",\"1\"],[\"1\",\"-5\",\"9\"],[\"-2\",\"1\",\"3\"],[\"3\",\"4\",\"6\"]]', 0, '2024-07-25 13:59:41', '2024-07-25 13:59:41'),
(3, 3, '3', '[[\"\",\"\",\"\"],[\"\",\"\",\"\"]]', 1, '2024-07-25 14:29:13', '2024-07-25 14:29:13'),
(4, 4, '3', '[[\"\",\"\",\"\"],[\"\",\"\",\"\"],[\"\",\"\",\"\"],[\"\",\"\",\"\"],[\"\",\"\",\"\"],[\"\",\"\",\"\"],[\"\",\"\",\"\"],[\"\",\"\",\"\"],[\"\",\"\",\"\"],[\"\",\"\",\"\"],[\"\",\"\",\"\"],[\"\",\"\",\"\"]]', 1, '2024-07-25 14:31:18', '2024-07-25 14:31:18'),
(5, 1, '3', '[[\"\",\"\",\"\"]]', 1, '2024-07-25 14:31:51', '2024-07-25 14:31:51'),
(6, 1, '3', '[[\"\",\"\",\"\"]]', 1, '2024-07-25 14:32:18', '2024-07-25 14:32:18'),
(7, 1, '2', '[[\"1\",\"2\"],[\"3\",\"4\"],[\"5\",\"6\"],[\"1\",\"3\"],[\"7\",\"8\"]]', 0, '2024-07-25 14:42:34', '2024-07-25 14:42:34'),
(8, 1, '3', '[[\"1\",\"2\",\"3\"],[\"1\",\"3\",\"5\"],[\"2\",\"4\",\"5\"],[\"5\",\"5\",\"5\"]]', 0, '2024-07-25 15:58:56', '2024-07-25 15:58:56'),
(9, 1, '2', '[[\"1\",\"2\"],[\"2\",\"3\"],[\"3\",\"3\"],[\"4\",\"4\"],[\"5\",\"6\"]]', 0, '2024-07-25 15:59:57', '2024-07-25 15:59:57'),
(10, 2, '2', '[[\"2\",\"3\"],[\"4\",\"7\"],[\"3\",\"6\"],[\"2\",\"4\"],[\"6\",\"8\"]]', 0, '2024-09-21 01:25:38', '2024-09-21 01:25:38'),
(11, 2, '2', '[[\"1\",\"3\"]]', 0, '2024-09-21 01:25:55', '2024-09-21 01:25:55'),
(12, 7, '3', '[[\"1\",\"3\",\"5\"]]', 0, '2024-09-21 01:28:04', '2024-09-21 01:28:04'),
(13, 8, '3', '[[\"1\",\"4\",\"6\"]]', 0, '2024-09-21 01:35:55', '2024-09-21 01:35:55');

-- --------------------------------------------------------

--
-- Table structure for table `homepage_banners`
--

CREATE TABLE `homepage_banners` (
  `id` bigint(20) NOT NULL,
  `extension_image` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `text` text NOT NULL,
  `reorder` double DEFAULT NULL,
  `cancelled` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `homepage_banners`
--

INSERT INTO `homepage_banners` (`id`, `extension_image`, `title`, `text`, `reorder`, `cancelled`, `created_at`, `updated_at`) VALUES
(1, 'jpg', 'lorem', 'lorem ipsum', 1.99, 0, '2024-03-08 21:37:04', '2024-03-08 21:37:04'),
(2, 'jpg', 'lorem', 'lorem ipsum', 2, 0, '2024-03-08 21:37:18', '2024-03-08 21:37:18'),
(3, 'jpg', 'lorem', 'lorem ipsum', 1.98, 0, '2024-03-08 21:37:26', '2024-03-08 21:37:26');

-- --------------------------------------------------------

--
-- Table structure for table `paragraphs`
--

CREATE TABLE `paragraphs` (
  `id` bigint(20) NOT NULL,
  `text_location` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `brief` text NOT NULL,
  `text` text NOT NULL,
  `cancelled` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `quiz`
--

CREATE TABLE `quiz` (
  `id` bigint(20) NOT NULL,
  `quiz_level` int(11) NOT NULL,
  `quiz_data` text NOT NULL,
  `cancelled` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `quiz_type` text NOT NULL,
  `assigned_to` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `quiz`
--

INSERT INTO `quiz` (`id`, `quiz_level`, `quiz_data`, `cancelled`, `created_at`, `updated_at`, `quiz_type`, `assigned_to`) VALUES
(1, 10, '{\"quiz_data\":[[\"2\",\"3\",\"1\",\"4\",\"2\",\"2\",\"4\",\"4\",\"2\",\"2\",\"4\",\"2\",\"4\",\"3\",\"2\"],[\"1\",\"-1\",\"3\",\"-3\",\"-1\",\"2\",\"-2\",\"-1\",\"2\",\"2\",\"-3\",\"-1\",\"-2\",\"-2\",\"2\"],[\"-2\",\"2\",\"-2\",\"1\",\"2\",\"-1\",\"1\",\"-2\",\"-3\",\"-1\",\"2\",\"1\",\"1\",\"1\",\"-3\"],[\"1\",\"-3\",\"-1\",\"1\",\"1\",\"-1\",\"-3\",\"1\",\"1\",\"-1\",\"-1\",\"1\",\"0\",\"2\",\"1\"]],\"quiz_answers\":[\"2\",\"1\",\"1\",\"3\",\"4\",\"2\",\"0\",\"2\",\"2\",\"2\",\"2\",\"3\",\"3\",\"4\",\"2\"]}', 0, '2024-07-05 13:04:59', '2024-07-05 13:04:59', 'addition', '[\"1\"]'),
(2, 10, '{\"quiz_data\":[[\"4\",\"4\",\"2\",\"3\",\"2\",\"3\",\"1\",\"4\",\"2\",\"2\",\"3\",\"2\",\"1\",\"3\",\"2\"],[\"-2\",\"-3\",\"1\",\"-1\",\"-2\",\"-1\",\"-1\",\"-3\",\"2\",\"-1\",\"-2\",\"-2\",\"2\",\"1\",\"2\"],[\"1\",\"2\",\"-1\",\"2\",\"3\",\"-2\",\"1\",\"1\",\"-1\",\"-1\",\"-1\",\"2\",\"1\",\"-2\",\"-4\"],[\"-3\",\"1\",\"-2\",\"-1\",\"-2\",\"2\",\"3\",\"2\",\"-3\",\"2\",\"3\",\"5\",\"-4\",\"-1\",\"3\"]],\"quiz_answers\":[\"0\",\"4\",\"0\",\"3\",\"1\",\"2\",\"4\",\"4\",\"0\",\"2\",\"3\",\"7\",\"0\",\"1\",\"3\"]}', 0, '2024-07-05 13:11:16', '2024-07-05 13:11:16', 'addition', '[\"1\"]'),
(3, 10, '{\"quiz_data\":[[\"4\",\"3\",\"0\",\"5\",\"-1\",\"4\",\"0\",\"4\",\"2\",\"-1\",\"-1\",\"1\",\"1\",\"1\",\"3\"],[\"3\",\"0\",\"1\",\"4\",\"5\",\"3\",\"5\",\"5\",\"0\",\"4\",\"-1\",\"2\",\"-1\",\"0\",\"4\"],[\"5\",\"-1\",\"0\",\"4\",\"3\",\"0\",\"4\",\"3\",\"5\",\"5\",\"3\",\"-1\",\"0\",\"2\",\"-1\"],[\"3\",\"-1\",\"5\",\"4\",\"4\",\"2\",\"2\",\"0\",\"4\",\"0\",\"0\",\"0\",\"2\",\"4\",\"3\"]],\"quiz_answers\":[\"15\",\"1\",\"6\",\"17\",\"11\",\"9\",\"11\",\"12\",\"11\",\"8\",\"1\",\"2\",\"2\",\"7\",\"9\"]}', 0, '2024-07-05 15:16:22', '2024-07-05 15:16:22', 'addition', '[\"1\"]'),
(4, 6, '{\"quiz_data\":[[\"32\",\"2\"],[\"23\",\"3\"],[\"12\",\"5\"],[\"65\",\"6\"],[\"35\",\"8\"],[\"37\",\"9\"],[\"41\",\"9\"],[\"18\",\"6\"],[\"20\",\"2\"]],\"quiz_answers\":[64,69,60,390,280,333,369,108,40]}', 0, '2024-08-20 13:08:53', '2024-08-20 13:08:53', 'multiplication', '[\"2\"]'),
(5, 6, '{\"quiz_data\":[[\"83\",\"32\"],[\"73\",\"56\"],[\"65\",\"58\"],[\"78\",\"55\"],[\"70\",\"74\"],[\"52\",\"48\"],[\"43\",\"25\"],[\"100\",\"77\"],[\"96\",\"72\"]],\"quiz_answers\":[2.59375,1.3035714285714286,1.1206896551724137,1.4181818181818182,0.9459459459459459,1.0833333333333333,1.72,1.2987012987012987,1.3333333333333333]}', 0, '2024-08-23 16:01:40', '2024-08-23 16:01:40', 'division', '[\"2\"]');

-- --------------------------------------------------------

--
-- Table structure for table `quiz_paper`
--

CREATE TABLE `quiz_paper` (
  `id` bigint(20) NOT NULL,
  `quiz_nbr` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `cancelled` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `quiz_level` int(11) NOT NULL,
  `quizzes` text NOT NULL,
  `is_competition` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `quiz_paper`
--

INSERT INTO `quiz_paper` (`id`, `quiz_nbr`, `title`, `cancelled`, `created_at`, `updated_at`, `quiz_level`, `quizzes`, `is_competition`) VALUES
(1, '1', 'Quiz 10 - 1', 0, '2024-07-05 13:05:23', '2024-07-05 13:05:23', 10, '[\"1\",\"2\",\"3\"]', 0),
(2, '3', 'level 6', 0, '2024-08-20 13:25:11', '2024-08-20 13:25:11', 6, '[\"4\",\"5\"]', 0);

-- --------------------------------------------------------

--
-- Table structure for table `quiz_rules`
--

CREATE TABLE `quiz_rules` (
  `id` bigint(20) NOT NULL,
  `quiz_type` text NOT NULL,
  `row_nbr` varchar(255) NOT NULL,
  `col_nbr` varchar(255) NOT NULL,
  `nbr_from` varchar(255) NOT NULL,
  `nbr_to` varchar(255) NOT NULL,
  `level` varchar(255) NOT NULL,
  `pages` text NOT NULL,
  `cancelled` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `nbr_tables` varchar(255) NOT NULL,
  `reorder` double DEFAULT NULL,
  `digit_nbr_1` int(11) NOT NULL,
  `digit_nbr_2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `quiz_rules`
--

INSERT INTO `quiz_rules` (`id`, `quiz_type`, `row_nbr`, `col_nbr`, `nbr_from`, `nbr_to`, `level`, `pages`, `cancelled`, `created_at`, `updated_at`, `nbr_tables`, `reorder`, `digit_nbr_1`, `digit_nbr_2`) VALUES
(1, 'addition', '4', '15', '-5', '5', '10', '[\"page_1\"]', 1, '2024-05-17 11:41:58', '2024-05-17 11:41:58', '4', 0, 0, 0),
(2, '[\"addition\"]', '3', '15', '-100', '100', '10', '[\"page_2\",\"page_3\",\"page_4\"]', 1, '2024-05-17 13:24:17', '2024-05-17 13:24:17', '4', 0, 0, 0),
(3, '[\"addition\",\"multiplication\"]', '4', '15', '1', '99', '9', '[\"page_1\",\"page_2\",\"page_3\"]', 1, '2024-06-13 14:38:31', '2024-06-13 14:38:31', '3', 0, 0, 0),
(4, 'addition', '5', '8', '10', '100', '5', '[\"page_1\"]', 0, '2024-08-20 12:35:18', '2024-08-20 12:35:18', '3', 0, 0, 0),
(5, 'multiplication', '10', '2', '1', '100', '5', '[\"page_1\"]', 0, '2024-08-20 12:56:59', '2024-08-20 12:56:59', '2', -0.01, 2, 1),
(6, 'division', '10', '2', '10', '100', '5', '[\"page_1\"]', 0, '2024-08-23 16:05:22', '2024-08-23 16:05:22', '1', -0.005, 3, 2);

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` bigint(20) NOT NULL,
  `label` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  `cancelled` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `label`, `value`, `cancelled`, `created_at`, `updated_at`) VALUES
(1, 'quiz time (minutes)', '6', 0, '2024-05-15 12:37:54', '2024-05-15 12:37:54'),
(2, 'competition quiz time (minutes)', '6', 0, '2024-05-15 12:38:07', '2024-05-15 12:38:07'),
(3, 'number of Quiz per day', '3', 0, '2024-05-22 13:22:53', '2024-05-22 13:22:53');

-- --------------------------------------------------------

--
-- Table structure for table `student_competition_quiz`
--

CREATE TABLE `student_competition_quiz` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `answers` text NOT NULL,
  `result` varchar(255) NOT NULL,
  `score` varchar(255) NOT NULL,
  `over` varchar(255) NOT NULL,
  `cancelled` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `student_quiz`
--

CREATE TABLE `student_quiz` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `answers` text NOT NULL,
  `result` varchar(255) NOT NULL,
  `score` varchar(255) NOT NULL,
  `over` varchar(255) NOT NULL,
  `cancelled` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `student_quiz`
--

INSERT INTO `student_quiz` (`id`, `user_id`, `answers`, `result`, `score`, `over`, `cancelled`, `created_at`, `updated_at`) VALUES
(1, 1, '', '', '', '', 0, '2024-10-21 19:58:49', '2024-10-21 19:58:49');

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` bigint(20) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `text` text NOT NULL,
  `stars` int(11) NOT NULL,
  `extension_image` varchar(255) DEFAULT NULL,
  `cancelled` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `testimonials`
--

INSERT INTO `testimonials` (`id`, `full_name`, `text`, `stars`, `extension_image`, `cancelled`, `created_at`, `updated_at`) VALUES
(1, 'Parent 1', 'Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.', 5, 'jpeg', 0, '2024-04-09 10:22:08', '2024-04-09 10:22:08'),
(2, 'Parent 2', 'Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.', 5, 'jpeg', 0, '2024-04-09 10:22:22', '2024-04-09 10:22:22'),
(3, 'Parent 3', 'Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.', 5, 'jpeg', 0, '2024-04-09 10:22:30', '2024-04-09 10:22:30'),
(4, 'Parent 4', 'Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.', 5, 'jpeg', 0, '2024-04-09 10:22:44', '2024-04-09 10:22:44');

-- --------------------------------------------------------

--
-- Table structure for table `topics`
--

CREATE TABLE `topics` (
  `id` bigint(20) NOT NULL,
  `label_en` varchar(255) NOT NULL,
  `label_hy` varchar(255) NOT NULL,
  `cancelled` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `reorder` double NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `topics`
--

INSERT INTO `topics` (`id`, `label_en`, `label_hy`, `cancelled`, `created_at`, `updated_at`, `reorder`, `type`) VALUES
(1, '', 'Առանց բանաձեւերի +1…4', 0, '2024-07-07 15:16:32', '2024-07-07 15:16:32', 1, '1D'),
(2, '', 'Առանց բանաձեւերի -1…4', 0, '2024-07-07 15:16:42', '2024-07-07 15:16:42', 2, '1D'),
(3, '', 'Առանց բանաձեւերի +/-1…4', 0, '2024-07-07 15:16:48', '2024-07-07 15:16:48', 3, '1D'),
(4, '', 'Առանց բանաձեւերի +5', 0, '2024-07-07 15:16:54', '2024-07-07 15:16:54', 4, '1D'),
(5, '', 'Առանց բանաձեւերի -5', 0, '2024-07-07 15:17:29', '2024-07-07 15:17:29', 5, '1D'),
(6, '', 'Առանց բանաձեւերի +6', 0, '2024-07-07 15:17:29', '2024-07-07 15:17:29', 6, '1D'),
(7, '', 'Առանց բանաձեւերի +/-6', 0, '2024-07-07 15:17:29', '2024-07-07 15:17:29', 7, '1D'),
(8, '', 'Առանց բանաձեւերի +/-5', 0, '2024-07-07 15:17:29', '2024-07-07 15:17:29', 8, '1D'),
(9, '', 'Առանց բանաձեւերի -6', 0, '2024-07-07 15:17:29', '2024-07-07 15:17:29', 9, '1D'),
(10, '', 'Առանց բանաձեւերի -5', 0, '2024-07-07 15:17:30', '2024-07-07 15:17:30', 10, '1D'),
(11, '', 'Առանց բանաձեւերի +7', 0, '2024-07-07 15:17:33', '2024-07-07 15:17:33', 11, '1D'),
(12, '', 'Առանց բանաձեւերի -7', 0, '2024-07-07 15:17:38', '2024-07-07 15:17:38', 12, '1D'),
(13, '', 'Առանց բանաձեւերի +/-7', 0, '2024-07-07 15:17:44', '2024-07-07 15:17:44', 13, '1D'),
(14, '', 'Առանց բանաձեւերի +/- 8 ու 9', 0, '2024-07-07 15:17:49', '2024-07-07 15:17:49', 14, '1D'),
(15, '', 'Փոքր ընկեր +4', 0, '2024-07-07 15:20:26', '2024-07-07 15:20:26', 15, '1D'),
(16, '', 'Փոքր ընկեր -4', 0, '2024-07-07 15:20:33', '2024-07-07 15:20:33', 16, '1D'),
(17, '', 'Փոքր ընկեր +3', 0, '2024-07-07 15:21:00', '2024-07-07 15:21:00', 17, '1D'),
(18, '', 'Փոքր ընկեր -3', 0, '2024-07-07 15:22:21', '2024-07-07 15:22:21', 18, '1D'),
(19, '', 'Փոքր ընկեր +2', 0, '2024-07-07 15:22:31', '2024-07-07 15:22:31', 19, '1D'),
(20, '', 'Փոքր ընկեր -2', 0, '2024-07-07 15:22:37', '2024-07-07 15:22:37', 20, '1D'),
(21, '', 'Փոքր ընկեր +1', 0, '2024-07-07 15:22:46', '2024-07-07 15:22:46', 21, '1D'),
(22, '', 'Փոքր ընկեր -1', 0, '2024-07-07 15:22:54', '2024-07-07 15:22:54', 22, '1D'),
(23, '', 'Փոքր ընկեր բոլոր բանաձերեւով', 0, '2024-07-07 15:23:01', '2024-07-07 15:23:01', 23, '1D'),
(24, '', 'Մեծ ընկեր +9', 0, '2024-07-07 15:23:09', '2024-07-07 15:23:09', 24, '1D'),
(25, '', 'Մեծ ընկեր +8', 0, '2024-07-07 15:23:21', '2024-07-07 15:23:21', 25, '1D'),
(26, '', 'Մեծ ընկեր +7', 0, '2024-07-07 15:23:27', '2024-07-07 15:23:27', 26, '1D'),
(27, '', 'Մեծ ընկեր +6', 0, '2024-07-07 15:23:32', '2024-07-07 15:23:32', 27, '1D'),
(28, '', 'Մեծ ընկեր +5', 0, '2024-07-07 15:23:38', '2024-07-07 15:23:38', 28, '1D'),
(29, '', 'Մեծ ընկեր +4', 0, '2024-07-07 15:23:48', '2024-07-07 15:23:48', 29, '1D'),
(30, '', 'Մեծ ընկեր +3', 0, '2024-07-07 15:23:54', '2024-07-07 15:23:54', 30, '1D'),
(31, '', 'Մեծ ընկեր +2', 0, '2024-07-07 15:24:00', '2024-07-07 15:24:00', 31, '1D'),
(32, '', 'Մեծ ընկեր +1', 0, '2024-07-07 15:24:05', '2024-07-07 15:24:05', 32, '1D'),
(33, '', 'Մեծ ընկեր գումարման բոլոր բանաձեւերով', 0, '2024-07-07 15:24:39', '2024-07-07 15:24:39', 33, '1D'),
(34, '', 'Միացված ձեւ +6', 0, '2024-07-07 15:24:45', '2024-07-07 15:24:45', 34, '1D'),
(35, '', 'Միացված ձեւ +7', 0, '2024-07-07 15:24:50', '2024-07-07 15:24:50', 35, '1D'),
(36, '', 'Միացված ձեւ +8', 0, '2024-07-07 15:24:55', '2024-07-07 15:24:55', 36, '1D'),
(37, '', 'Միացված ձեւ +9', 0, '2024-07-07 15:25:08', '2024-07-07 15:25:08', 37, '1D'),
(38, '', 'Միացված ձեւ գումարման բոլոր բանաձեւերով', 0, '2024-07-07 15:26:07', '2024-07-07 15:26:07', 38, '1D'),
(39, '', 'Մեծ ընկեր -9', 0, '2024-07-07 15:26:12', '2024-07-07 15:26:12', 39, '1D'),
(40, '', 'Մեծ ընկեր -8', 0, '2024-07-07 15:26:17', '2024-07-07 15:26:17', 40, '1D'),
(41, '', 'Մեծ ընկեր -7', 0, '2024-07-07 15:26:24', '2024-07-07 15:26:24', 41, '1D'),
(42, '', 'Մեծ ընկեր -6', 0, '2024-07-07 15:26:31', '2024-07-07 15:26:31', 42, '1D'),
(43, '', 'Մեծ ընկեր -5', 0, '2024-07-07 15:26:36', '2024-07-07 15:26:36', 43, '1D'),
(44, '', 'Մեծ ընկեր -4', 0, '2024-07-07 15:26:41', '2024-07-07 15:26:41', 44, '1D'),
(45, '', 'Մեծ ընկեր -3', 0, '2024-07-07 15:26:51', '2024-07-07 15:26:51', 45, '1D'),
(46, '', 'Մեծ ընկեր -2', 0, '2024-07-07 15:26:56', '2024-07-07 15:26:56', 46, '1D'),
(47, '', 'Մեծ ընկեր -1', 0, '2024-07-07 15:27:04', '2024-07-07 15:27:04', 47, '1D'),
(48, '', 'Մեծ ընկեր հանման բոլոր բանաձեւերով', 0, '2024-07-07 15:27:09', '2024-07-07 15:27:09', 48, '1D'),
(49, '', 'Միացված ձեւ -6', 0, '2024-07-07 15:27:14', '2024-07-07 15:27:14', 49, '1D'),
(50, '', 'Միացված ձեւ -7', 0, '2024-07-07 15:27:18', '2024-07-07 15:27:18', 50, '1D'),
(51, '', 'Միացված ձեւ -8', 0, '2024-07-07 15:27:23', '2024-07-07 15:27:23', 51, '1D'),
(52, '', 'Միացված ձեւ -9', 0, '2024-07-07 15:27:31', '2024-07-07 15:27:31', 52, '1D'),
(53, '', 'Միացված ձեւ հանման բոլոր բանաձեւերով', 0, '2024-07-07 15:27:36', '2024-07-07 15:27:36', 53, '1D'),
(54, '', 'Առանց բանաձեւերի', 0, '2024-07-07 15:27:52', '2024-07-07 15:27:52', 54, '2D'),
(55, '', 'Փոքր ընկերոջ բանաձեւերով', 0, '2024-07-07 15:28:07', '2024-07-07 15:28:07', 55, '2D'),
(56, '', 'Մեծ ընկեր +9', 0, '2024-07-07 15:31:02', '2024-07-07 15:31:02', 56, '2D'),
(57, '', 'Մեծ ընկեր +8', 0, '2024-07-07 15:31:07', '2024-07-07 15:31:07', 57, '2D'),
(58, '', 'Մեծ ընկեր +7', 0, '2024-07-07 15:31:12', '2024-07-07 15:31:12', 58, '2D'),
(59, '', 'Մեծ ընկեր +6', 0, '2024-07-07 15:31:17', '2024-07-07 15:31:17', 59, '2D'),
(60, '', 'Մեծ ընկեր +5', 0, '2024-07-07 15:31:22', '2024-07-07 15:31:22', 60, '2D'),
(61, '', 'Մեծ ընկեր +4', 0, '2024-07-07 15:31:27', '2024-07-07 15:31:27', 61, '2D'),
(62, '', 'Մեծ ընկեր +3', 0, '2024-07-07 15:31:33', '2024-07-07 15:31:33', 62, '2D'),
(63, '', 'Մեծ ընկեր +2', 0, '2024-07-07 15:31:37', '2024-07-07 15:31:37', 63, '2D'),
(64, '', 'Մեծ ընկեր +1', 0, '2024-07-07 15:31:43', '2024-07-07 15:31:43', 64, '2D'),
(65, '', 'Մեծ ընկեր գումարման բոլոր բանաձեւերով', 0, '2024-07-07 15:32:08', '2024-07-07 15:32:08', 65, '2D'),
(66, '', 'Միացված ձեւ +6', 0, '2024-07-07 15:32:12', '2024-07-07 15:32:12', 66, '2D'),
(67, '', 'Միացված ձեւ +7', 0, '2024-07-07 15:32:17', '2024-07-07 15:32:17', 67, '2D'),
(68, '', 'Միացված ձեւ +8', 0, '2024-07-07 15:32:22', '2024-07-07 15:32:22', 68, '2D'),
(69, '', 'Միացված ձեւ +9', 0, '2024-07-07 15:32:27', '2024-07-07 15:32:27', 69, '2D'),
(70, '', 'Միացված ձեւ գումարման բոլոր բանաձեւերով', 0, '2024-07-07 15:32:32', '2024-07-07 15:32:32', 70, '2D'),
(71, '', 'Մեծ ընկեր -9', 0, '2024-07-07 15:32:38', '2024-07-07 15:32:38', 71, '2D'),
(72, '', 'Մեծ ընկեր -8', 0, '2024-07-07 15:32:42', '2024-07-07 15:32:42', 72, '2D'),
(73, '', 'Մեծ ընկեր -7', 0, '2024-07-07 15:32:47', '2024-07-07 15:32:47', 73, '2D'),
(74, '', 'Մեծ ընկեր -6', 0, '2024-07-07 15:32:52', '2024-07-07 15:32:52', 74, '2D'),
(75, '', 'Մեծ ընկեր -5', 0, '2024-07-07 15:33:07', '2024-07-07 15:33:07', 75, '2D'),
(76, '', 'Մեծ ընկեր -4', 0, '2024-07-07 15:33:12', '2024-07-07 15:33:12', 76, '2D'),
(77, '', 'Մեծ ընկեր -3', 0, '2024-07-07 15:33:17', '2024-07-07 15:33:17', 77, '2D'),
(78, '', 'Մեծ ընկեր -2', 0, '2024-07-07 15:33:23', '2024-07-07 15:33:23', 78, '2D'),
(79, '', 'Մեծ ընկեր -1', 0, '2024-07-07 15:33:28', '2024-07-07 15:33:28', 79, '2D'),
(80, '', 'Մեծ ընկեր հանման բոլոր բանաձեւերով', 0, '2024-07-07 15:33:34', '2024-07-07 15:33:34', 80, '2D'),
(81, '', 'Միացված ձեւ -6', 0, '2024-07-07 15:33:39', '2024-07-07 15:33:39', 81, '2D'),
(82, '', 'Միացված ձեւ -7', 0, '2024-07-07 15:33:43', '2024-07-07 15:33:43', 82, '2D'),
(83, '', 'Միացված ձեւ -8', 0, '2024-07-07 15:33:49', '2024-07-07 15:33:49', 83, '2D'),
(84, '', 'Միացված ձեւ -9', 0, '2024-07-07 15:33:54', '2024-07-07 15:33:54', 84, '2D'),
(85, '', 'Միացված ձեւ հանման բոլոր բանաձեւերով', 0, '2024-07-07 15:34:00', '2024-07-07 15:34:00', 85, '2D'),
(86, '', '50-ի անցում (+9)', 0, '2024-07-07 15:34:14', '2024-07-07 15:34:14', 86, '2D'),
(87, '', '50-ի անցում (+8)', 0, '2024-07-07 15:34:46', '2024-07-07 15:34:46', 87, '2D'),
(88, '', '50-ի անցում (+7)', 0, '2024-07-07 15:35:08', '2024-07-07 15:35:08', 88, '2D'),
(89, '', '50-ի անցում (+6)', 0, '2024-07-07 15:35:13', '2024-07-07 15:35:13', 89, '2D'),
(90, '', '50-ի անցում (+5)', 0, '2024-07-07 15:35:18', '2024-07-07 15:35:18', 90, '2D'),
(91, '', '50-ի անցում (+4)', 0, '2024-07-07 15:35:23', '2024-07-07 15:35:23', 91, '2D'),
(92, '', '50-ի անցում (+3)', 0, '2024-07-07 15:35:28', '2024-07-07 15:35:28', 92, '2D'),
(93, '', '50-ի անցում (+2)', 0, '2024-07-07 15:35:34', '2024-07-07 15:35:34', 93, '2D'),
(94, '', '50-ի անցում (+1)', 0, '2024-07-07 15:35:52', '2024-07-07 15:35:52', 94, '2D'),
(95, '', '50-ի անցում (ՄՁ +6)', 0, '2024-07-07 15:36:03', '2024-07-07 15:36:03', 95, '2D'),
(96, '', '50-ի անցում (ՄՁ +7)', 0, '2024-07-07 15:36:08', '2024-07-07 15:36:08', 96, '2D'),
(97, '', '50-ի անցում (ՄՁ +8)', 0, '2024-07-07 15:36:12', '2024-07-07 15:36:12', 97, '2D'),
(98, '', '50-ի անցում (ՄՁ +9)', 0, '2024-07-07 15:36:17', '2024-07-07 15:36:17', 98, '2D'),
(99, '', '50-ից անցում (-9)', 0, '2024-07-07 15:36:23', '2024-07-07 15:36:23', 99, '2D'),
(100, '', '50-ից անցում (-8)', 0, '2024-07-07 15:36:28', '2024-07-07 15:36:28', 100, '2D'),
(101, '', '50-ից անցում (-7)', 0, '2024-07-07 15:36:32', '2024-07-07 15:36:32', 101, '2D'),
(102, '', '50-ից անցում (-6)', 0, '2024-07-07 15:36:52', '2024-07-07 15:36:52', 102, '2D'),
(103, '', '50-ից անցում (-5)', 0, '2024-07-07 15:36:59', '2024-07-07 15:36:59', 103, '2D'),
(104, '', '50-ից անցում (-4)', 0, '2024-07-07 15:37:04', '2024-07-07 15:37:04', 104, '2D'),
(105, '', '50-ից անցում (-3)', 0, '2024-07-07 15:37:09', '2024-07-07 15:37:09', 105, '2D'),
(106, '', '50-ից անցում (-2)', 0, '2024-07-07 15:37:15', '2024-07-07 15:37:15', 106, '2D'),
(107, '', '50-ից անցում (-1)', 0, '2024-07-07 15:37:21', '2024-07-07 15:37:21', 107, '2D'),
(108, '', '50-ից անցում (ՄՁ -6)', 0, '2024-07-07 15:37:33', '2024-07-07 15:37:33', 108, '2D'),
(109, '', '50-ից անցում (ՄՁ -7)', 0, '2024-07-07 15:37:42', '2024-07-07 15:37:42', 109, '2D'),
(110, '', '50-ից անցում (ՄՁ -8)', 0, '2024-07-07 15:37:46', '2024-07-07 15:37:46', 110, '2D'),
(111, '', '50-ից անցում (ՄՁ -9)', 0, '2024-07-07 15:37:51', '2024-07-07 15:37:51', 111, '2D'),
(112, '', '100-ի անցում (+9…+1)', 0, '2024-07-07 15:37:56', '2024-07-07 15:37:56', 112, '2D'),
(113, '', '100-ի անցում (ՄՁ +6..+9)', 0, '2024-07-07 15:38:00', '2024-07-07 15:38:00', 113, '2D'),
(114, '', '100-ից անցում (-9…-1)', 0, '2024-07-07 15:38:05', '2024-07-07 15:38:05', 114, '2D'),
(115, '', '100-ից անցում (ՄՁ -6..-9)', 0, '2024-07-07 15:38:09', '2024-07-07 15:38:09', 115, '2D');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `is_teacher` tinyint(1) NOT NULL DEFAULT '0',
  `dob` date DEFAULT NULL,
  `level` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `cancelled` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `grade` varchar(255) DEFAULT NULL,
  `is_verified` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `username`, `password`, `teacher_id`, `email`, `is_teacher`, `dob`, `level`, `token`, `cancelled`, `created_at`, `updated_at`, `grade`, `is_verified`) VALUES
(1, 'annie', 'yan', 'annie@gmail.com', '4cb9c8a8048fd02294477fcb1a41191a', 2, 'annie@gmail.com', 0, NULL, '10', '1671e03b922eb8671e03b922ebc', 0, '2024-03-11 13:14:42', '2024-03-11 13:14:42', '', 0),
(2, 'ani', 'teacher', 'ani.teacher', '4cb9c8a8048fd02294477fcb1a41191a', 0, 'ani.teacher', 1, '1992-02-16', '10', '2671f1d446b128671f1d446b12a', 0, '2024-05-23 14:15:52', '2024-05-23 14:15:52', '1', 0),
(3, 'annie', 'yan', 'annie2@gmail.com', '4cb9c8a8048fd02294477fcb1a41191a', 2, 'annie2@gmail.com', 0, NULL, '9', '366d08480c3da266d08480c3da5', 0, '2024-03-11 13:14:42', '2024-03-11 13:14:42', '', 0),
(4, 'Bb', 'Oo', 'anne.shtudent', '940d025e1edb463bcb7edb3e44f8fb5d', 2, 'ok', 0, NULL, '1', NULL, 0, '2024-08-29 17:15:12', '2024-08-29 17:15:12', NULL, 0),
(5, 'Bb', 'Oo', 'anne.shtudent2', '940d025e1edb463bcb7edb3e44f8fb5d', 2, 'ok2', 0, NULL, '1', NULL, 0, '2024-08-29 17:16:51', '2024-08-29 17:16:51', NULL, 0),
(6, 'Annie', 'Keushguerian', 'annie.test@gmail.com', '64e39c60d69afe351b48472307add2c5', 2, 'annie.test@gmail.com', 0, NULL, '3', '6671e55eb31756671e55eb3175b', 0, '2024-10-27 14:10:33', '2024-10-27 14:10:33', NULL, 0),
(7, 'Annie', 'Keushguerian', 'annatest@gmail.com', '64e39c60d69afe351b48472307add2c5', 2, 'annatest@gmail.com', 0, NULL, '3', '7671e650cc1901671e650cc1905', 0, '2024-10-27 15:10:14', '2024-10-27 15:10:14', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users_log`
--

CREATE TABLE `users_log` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `user_ip` varchar(255) NOT NULL,
  `session` varchar(255) DEFAULT NULL,
  `browser` text,
  `token` varchar(255) NOT NULL,
  `cancelled` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `login_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users_log`
--

INSERT INTO `users_log` (`id`, `user_id`, `user_ip`, `session`, `browser`, `token`, `cancelled`, `created_at`, `updated_at`, `login_date`) VALUES
(1, 1, '::1', NULL, NULL, '165f40c360560465f40c3605608', 0, '2024-03-15 12:52:06', '2024-03-15 12:52:06', '2024-03-15 12:52:06'),
(2, 1, '::1', NULL, NULL, '165f41cefa3f2565f41cefa3f2f', 0, '2024-03-15 14:03:27', '2024-03-15 14:03:27', '2024-03-15 14:03:27'),
(3, 1, '::1', NULL, NULL, '165f41d43ebb0865f41d43ebb0d', 0, '2024-03-15 14:04:51', '2024-03-15 14:04:51', '2024-03-15 14:04:51'),
(4, 1, '::1', NULL, NULL, '165f43eb890ed565f43eb890edb', 0, '2024-03-15 16:27:36', '2024-03-15 16:27:36', '2024-03-15 16:27:36'),
(5, 1, '::1', NULL, NULL, '165f45ba0bb94e65f45ba0bb95d', 0, '2024-03-15 18:30:56', '2024-03-15 18:30:56', '2024-03-15 18:30:56'),
(6, 1, '::1', NULL, NULL, '165f45bfc45bf565f45bfc45bfd', 0, '2024-03-15 18:32:28', '2024-03-15 18:32:28', '2024-03-15 18:32:28'),
(7, 1, '::1', NULL, NULL, '165f5a158593b165f5a158594bf', 0, '2024-03-16 17:40:40', '2024-03-16 17:40:40', '2024-03-16 17:40:40'),
(8, 1, '::1', NULL, NULL, '165f5a1642e35165f5a1642e359', 0, '2024-03-16 17:40:52', '2024-03-16 17:40:52', '2024-03-16 17:40:52'),
(9, 1, '::1', NULL, NULL, '165f5a1b0d48a465f5a1b0d48b4', 0, '2024-03-16 17:42:08', '2024-03-16 17:42:08', '2024-03-16 17:42:08'),
(10, 1, '::1', NULL, NULL, '165f5a37eb0b2865f5a37eb0b38', 0, '2024-03-16 17:49:50', '2024-03-16 17:49:50', '2024-03-16 17:49:50'),
(11, 1, '::1', NULL, NULL, '165f5a46169f4265f5a46169f53', 0, '2024-03-16 17:53:37', '2024-03-16 17:53:37', '2024-03-16 17:53:37'),
(12, 1, '::1', NULL, NULL, '165f5a54ba493c65f5a54ba4950', 0, '2024-03-16 17:57:31', '2024-03-16 17:57:31', '2024-03-16 17:57:31'),
(13, 1, '::1', NULL, NULL, '165f5a5576c5de65f5a5576c5ec', 0, '2024-03-16 17:57:43', '2024-03-16 17:57:43', '2024-03-16 17:57:43'),
(14, 1, '::1', NULL, NULL, '165f5a90f2bbb665f5a90f2bbc5', 0, '2024-03-16 18:13:35', '2024-03-16 18:13:35', '2024-03-16 18:13:35'),
(15, 1, '::1', NULL, NULL, '165f5aabcc041965f5aabcc042a', 0, '2024-03-16 18:20:44', '2024-03-16 18:20:44', '2024-03-16 18:20:44'),
(16, 1, '::1', NULL, NULL, '165f5aaca1630665f5aaca1630a', 0, '2024-03-16 18:20:58', '2024-03-16 18:20:58', '2024-03-16 18:20:58'),
(17, 1, '::1', NULL, NULL, '165f5add8a2b0f65f5add8a2b16', 0, '2024-03-16 18:34:00', '2024-03-16 18:34:00', '2024-03-16 18:34:00'),
(18, 1, '::1', NULL, NULL, '165f5ae09b5df665f5ae09b5dfc', 0, '2024-03-16 18:34:49', '2024-03-16 18:34:49', '2024-03-16 18:34:49'),
(19, 1, '::1', NULL, NULL, '165f5ae33d731765f5ae33d731b', 0, '2024-03-16 18:35:31', '2024-03-16 18:35:31', '2024-03-16 18:35:31'),
(20, 1, '::1', NULL, NULL, '165f5ae3becf8565f5ae3becf89', 0, '2024-03-16 18:35:40', '2024-03-16 18:35:40', '2024-03-16 18:35:40'),
(21, 1, '::1', NULL, NULL, '165f5ae51d784865f5ae51d784d', 0, '2024-03-16 18:36:01', '2024-03-16 18:36:01', '2024-03-16 18:36:01'),
(22, 1, '::1', NULL, NULL, '165f5aecee569365f5aecee5699', 0, '2024-03-16 18:38:06', '2024-03-16 18:38:06', '2024-03-16 18:38:06'),
(23, 1, '::1', NULL, NULL, '165f5dc76b75e865f5dc76b75ee', 0, '2024-03-16 21:52:54', '2024-03-16 21:52:54', '2024-03-16 21:52:54'),
(24, 1, '::1', NULL, NULL, '165f5ded8df68765f5ded8df68c', 0, '2024-03-16 22:03:04', '2024-03-16 22:03:04', '2024-03-16 22:03:04'),
(25, 1, '::1', NULL, NULL, '165f5e6fd2d9d665f5e6fd2daf5', 0, '2024-03-16 22:37:49', '2024-03-16 22:37:49', '2024-03-16 22:37:49'),
(26, 1, '::1', NULL, NULL, '165f6da05983a465f6da059847a', 0, '2024-03-17 15:54:45', '2024-03-17 15:54:45', '2024-03-17 15:54:45'),
(27, 1, '::1', NULL, NULL, '165f6ea60f279a65f6ea60f27aa', 0, '2024-03-17 17:04:32', '2024-03-17 17:04:32', '2024-03-17 17:04:32'),
(28, 1, '::1', NULL, NULL, '165f6ea9b1c98c65f6ea9b1c99a', 0, '2024-03-17 17:05:31', '2024-03-17 17:05:31', '2024-03-17 17:05:31'),
(29, 1, '::1', NULL, NULL, '165f6eaa7e6fac65f6eaa7e6fb9', 0, '2024-03-17 17:05:43', '2024-03-17 17:05:43', '2024-03-17 17:05:43'),
(30, 1, '::1', NULL, NULL, '165f6eaae1711265f6eaae17123', 0, '2024-03-17 17:05:50', '2024-03-17 17:05:50', '2024-03-17 17:05:50'),
(31, 1, '::1', NULL, NULL, '165f6eac8200b765f6eac8200c9', 0, '2024-03-17 17:06:16', '2024-03-17 17:06:16', '2024-03-17 17:06:16'),
(32, 1, '::1', NULL, NULL, '165f6eb13d00a665f6eb13d00ba', 0, '2024-03-17 17:07:31', '2024-03-17 17:07:31', '2024-03-17 17:07:31'),
(33, 1, '::1', NULL, NULL, '165f6eb17dbad165f6eb17dbad8', 0, '2024-03-17 17:07:35', '2024-03-17 17:07:35', '2024-03-17 17:07:35'),
(34, 1, '::1', NULL, NULL, '165f6eb57ab0ba65f6eb57ab0dc', 0, '2024-03-17 17:08:39', '2024-03-17 17:08:39', '2024-03-17 17:08:39'),
(35, 1, '::1', NULL, NULL, '165f6edb920a5665f6edb920a5d', 0, '2024-03-17 17:18:49', '2024-03-17 17:18:49', '2024-03-17 17:18:49'),
(36, 1, '::1', NULL, NULL, '165f6ee0f6494565f6ee0f64949', 0, '2024-03-17 17:20:15', '2024-03-17 17:20:15', '2024-03-17 17:20:15'),
(37, 1, '::1', NULL, NULL, '165f6f1243c90a65f6f1243c90e', 0, '2024-03-17 17:33:24', '2024-03-17 17:33:24', '2024-03-17 17:33:24'),
(38, 1, '::1', NULL, NULL, '16600745770cc966007457714a2', 0, '2024-03-24 22:43:35', '2024-03-24 22:43:35', '2024-03-24 22:43:35'),
(39, 1, '::1', NULL, NULL, '16600774136321660077413632d', 0, '2024-03-24 22:56:01', '2024-03-24 22:56:01', '2024-03-24 22:56:01'),
(40, 1, '::1', NULL, NULL, '1660089c44983b660089c44983f', 0, '2024-03-25 00:15:00', '2024-03-25 00:15:00', '2024-03-25 00:15:00'),
(41, 1, '::1', NULL, NULL, '166008cfd7870566008cfd7870a', 0, '2024-03-25 00:28:45', '2024-03-25 00:28:45', '2024-03-25 00:28:45'),
(42, 1, '::1', NULL, NULL, '16600911773d716600911773d7c', 0, '2024-03-25 00:46:15', '2024-03-25 00:46:15', '2024-03-25 00:46:15'),
(43, 1, '::1', NULL, NULL, '166015bec9b47466015bec9b6c2', 0, '2024-03-25 15:11:40', '2024-03-25 15:11:40', '2024-03-25 15:11:40'),
(44, 1, '::1', NULL, NULL, '16601c67171dc16601c67171dd0', 0, '2024-03-25 22:46:09', '2024-03-25 22:46:09', '2024-03-25 22:46:09'),
(45, 1, '::1', NULL, NULL, '16603145214f826603145214f8d', 0, '2024-03-26 22:30:42', '2024-03-26 22:30:42', '2024-03-26 22:30:42'),
(46, 1, '::1', NULL, NULL, '1660314fe2c734660314fe2c739', 0, '2024-03-26 22:33:34', '2024-03-26 22:33:34', '2024-03-26 22:33:34'),
(47, 1, '::1', NULL, NULL, '166096bee7723e66096bee77259', 0, '2024-03-31 17:58:06', '2024-03-31 17:58:06', '2024-03-31 17:58:06'),
(48, 1, '::1', NULL, NULL, '16609957038be36609957038cd0', 0, '2024-03-31 20:55:12', '2024-03-31 20:55:12', '2024-03-31 20:55:12'),
(49, 1, '::1', NULL, NULL, '1660d16980da7f660d16980da83', 0, '2024-04-03 12:43:04', '2024-04-03 12:43:04', '2024-04-03 12:43:04'),
(50, 1, '::1', NULL, NULL, '1660d88eaae5e4660d88eaae87b', 0, '2024-04-03 20:50:50', '2024-04-03 20:50:50', '2024-04-03 20:50:50'),
(51, 1, '::1', NULL, NULL, '1660e6b8b75d8b660e6b8b75e80', 0, '2024-04-04 12:57:47', '2024-04-04 12:57:47', '2024-04-04 12:57:47'),
(52, 1, '::1', NULL, NULL, '16613b5381fdca6613b5381fea2', 0, '2024-04-08 13:13:28', '2024-04-08 13:13:28', '2024-04-08 13:13:28'),
(53, 1, '::1', NULL, NULL, '16614496385e466614496386010', 0, '2024-04-08 23:45:39', '2024-04-08 23:45:39', '2024-04-08 23:45:39'),
(54, 1, '::1', NULL, NULL, '166144968a926266144968a9272', 0, '2024-04-08 23:45:44', '2024-04-08 23:45:44', '2024-04-08 23:45:44'),
(55, 1, '::1', NULL, NULL, '16614496b3e1066614496b3e112', 0, '2024-04-08 23:45:47', '2024-04-08 23:45:47', '2024-04-08 23:45:47'),
(56, 1, '::1', NULL, NULL, '166144a303086366144a3030871', 0, '2024-04-08 23:49:04', '2024-04-08 23:49:04', '2024-04-08 23:49:04'),
(57, 1, '::1', NULL, NULL, '166144b0888ce566144b0888cf6', 0, '2024-04-08 23:52:40', '2024-04-08 23:52:40', '2024-04-08 23:52:40'),
(58, 1, '::1', NULL, NULL, '1661453a3ef146661453a3ef157', 0, '2024-04-09 00:29:23', '2024-04-09 00:29:23', '2024-04-09 00:29:23'),
(59, 1, '::1', NULL, NULL, '1661453c9ae36d661453c9ae371', 0, '2024-04-09 00:30:01', '2024-04-09 00:30:01', '2024-04-09 00:30:01'),
(60, 1, '::1', NULL, NULL, '1661455cd64a3f661455cd64a48', 0, '2024-04-09 00:38:37', '2024-04-09 00:38:37', '2024-04-09 00:38:37'),
(61, 1, '::1', NULL, NULL, '1661456e2bb461661456e2bb46e', 0, '2024-04-09 00:43:14', '2024-04-09 00:43:14', '2024-04-09 00:43:14'),
(62, 1, '::1', NULL, NULL, '16614e01346cc56614e01346ccc', 0, '2024-04-09 10:28:35', '2024-04-09 10:28:35', '2024-04-09 10:28:35'),
(63, 1, '::1', NULL, NULL, '16614e5eb159736614e5eb1597c', 0, '2024-04-09 10:53:31', '2024-04-09 10:53:31', '2024-04-09 10:53:31'),
(64, 1, '::1', NULL, NULL, '16614e60848e686614e60848e6c', 0, '2024-04-09 10:54:00', '2024-04-09 10:54:00', '2024-04-09 10:54:00'),
(65, 1, '::1', NULL, NULL, '16614f6be5eb996614f6be5ebab', 0, '2024-04-09 12:05:18', '2024-04-09 12:05:18', '2024-04-09 12:05:18'),
(66, 1, '::1', NULL, NULL, '1661509f8b4865661509f8b4875', 0, '2024-04-09 13:27:20', '2024-04-09 13:27:20', '2024-04-09 13:27:20'),
(67, 1, '::1', NULL, NULL, '16627be7331af26627be7331bba', 0, '2024-04-23 17:58:11', '2024-04-23 17:58:11', '2024-04-23 17:58:11'),
(68, 1, '::1', NULL, NULL, '16628c5e33ef6a6628c5e33f2a0', 0, '2024-04-24 12:42:11', '2024-04-24 12:42:11', '2024-04-24 12:42:11'),
(69, 1, '::1', NULL, NULL, '16628e6bc4d4bd6628e6bc4d4c3', 0, '2024-04-24 15:02:20', '2024-04-24 15:02:20', '2024-04-24 15:02:20'),
(70, 1, '::1', NULL, NULL, '16628e6c2343b16628e6c2343b5', 0, '2024-04-24 15:02:26', '2024-04-24 15:02:26', '2024-04-24 15:02:26'),
(71, 1, '::1', NULL, NULL, '16628e6c7d0b866628e6c7d0b91', 0, '2024-04-24 15:02:31', '2024-04-24 15:02:31', '2024-04-24 15:02:31'),
(72, 1, '::1', NULL, NULL, '16628e971b8d6d6628e971b8d79', 0, '2024-04-24 15:13:53', '2024-04-24 15:13:53', '2024-04-24 15:13:53'),
(73, 1, '::1', NULL, NULL, '16629001aa28196629001aa2825', 0, '2024-04-24 16:50:34', '2024-04-24 16:50:34', '2024-04-24 16:50:34'),
(74, 1, '::1', NULL, NULL, '166290177a380766290177a3817', 0, '2024-04-24 16:56:23', '2024-04-24 16:56:23', '2024-04-24 16:56:23'),
(75, 1, '::1', NULL, NULL, '166290350d3ae566290350d3af6', 0, '2024-04-24 17:04:16', '2024-04-24 17:04:16', '2024-04-24 17:04:16'),
(76, 1, '::1', NULL, NULL, '1662904601b7d4662904601b7e9', 0, '2024-04-24 17:08:48', '2024-04-24 17:08:48', '2024-04-24 17:08:48'),
(77, 1, '::1', NULL, NULL, '16629505b994b16629505b994bd', 0, '2024-04-24 22:32:59', '2024-04-24 22:32:59', '2024-04-24 22:32:59'),
(78, 1, '::1', NULL, NULL, '16629506e763b26629506e763c2', 0, '2024-04-24 22:33:18', '2024-04-24 22:33:18', '2024-04-24 22:33:18'),
(79, 1, '::1', NULL, NULL, '16629507de8a906629507de8a9f', 0, '2024-04-24 22:33:33', '2024-04-24 22:33:33', '2024-04-24 22:33:33'),
(80, 1, '::1', NULL, NULL, '1662953c803c90662953c803ca0', 0, '2024-04-24 22:47:36', '2024-04-24 22:47:36', '2024-04-24 22:47:36'),
(81, 1, '::1', NULL, NULL, '1662953d2d3c1f662953d2d3c26', 0, '2024-04-24 22:47:46', '2024-04-24 22:47:46', '2024-04-24 22:47:46'),
(82, 1, '::1', NULL, NULL, '1662955e311835662955e311846', 0, '2024-04-24 22:56:35', '2024-04-24 22:56:35', '2024-04-24 22:56:35'),
(83, 1, '::1', NULL, NULL, '1662956b32319f662956b3231ac', 0, '2024-04-24 23:00:03', '2024-04-24 23:00:03', '2024-04-24 23:00:03'),
(84, 1, '::1', NULL, NULL, '1662956b9bfb2b662956b9bfb43', 0, '2024-04-24 23:00:09', '2024-04-24 23:00:09', '2024-04-24 23:00:09'),
(85, 1, '::1', NULL, NULL, '1662957dfd4014662957dfd4029', 0, '2024-04-24 23:05:03', '2024-04-24 23:05:03', '2024-04-24 23:05:03'),
(86, 1, '::1', NULL, NULL, '1662959587f8a2662959587f8a6', 0, '2024-04-24 23:11:20', '2024-04-24 23:11:20', '2024-04-24 23:11:20'),
(87, 1, '::1', NULL, NULL, '166295ac73944066295ac73944d', 0, '2024-04-24 23:17:27', '2024-04-24 23:17:27', '2024-04-24 23:17:27'),
(88, 1, '::1', NULL, NULL, '166295ae59db8b66295ae59db9c', 0, '2024-04-24 23:17:57', '2024-04-24 23:17:57', '2024-04-24 23:17:57'),
(89, 1, '::1', NULL, NULL, '1663bbd7e31293663bbd7e31298', 0, '2024-05-08 21:59:26', '2024-05-08 21:59:26', '2024-05-08 21:59:26'),
(90, 1, '::1', NULL, NULL, '16641fc4c1ca5b6641fc4c1ca62', 0, '2024-05-13 15:41:00', '2024-05-13 15:41:00', '2024-05-13 15:41:00'),
(91, 1, '::1', NULL, NULL, '16641fc517ce5a6641fc517ce63', 0, '2024-05-13 15:41:05', '2024-05-13 15:41:05', '2024-05-13 15:41:05'),
(92, 1, '::1', NULL, NULL, '16643122aaab0c6643122aaab15', 0, '2024-05-14 11:26:34', '2024-05-14 11:26:34', '2024-05-14 11:26:34'),
(93, 1, '::1', NULL, NULL, '1664604546378e66460454637ae', 0, '2024-05-16 17:04:20', '2024-05-16 17:04:20', '2024-05-16 17:04:20'),
(94, 1, '::1', NULL, NULL, '16646046e06ab76646046e06abe', 0, '2024-05-16 17:04:46', '2024-05-16 17:04:46', '2024-05-16 17:04:46'),
(95, 1, '::1', NULL, NULL, '16646047297e816646047297e8a', 0, '2024-05-16 17:04:50', '2024-05-16 17:04:50', '2024-05-16 17:04:50'),
(96, 1, '::1', NULL, NULL, '1664700532623e6647005326247', 0, '2024-05-17 10:59:31', '2024-05-17 10:59:31', '2024-05-17 10:59:31'),
(97, 1, '::1', NULL, NULL, '1664adf953a860664adf953a875', 0, '2024-05-20 09:28:53', '2024-05-20 09:28:53', '2024-05-20 09:28:53'),
(98, 1, '::1', NULL, NULL, '1664ae11faff2f664ae11faff3f', 0, '2024-05-20 09:35:27', '2024-05-20 09:35:27', '2024-05-20 09:35:27'),
(99, 1, '::1', NULL, NULL, '1664ae56b87824664ae56b87835', 0, '2024-05-20 09:53:47', '2024-05-20 09:53:47', '2024-05-20 09:53:47'),
(100, 1, '::1', NULL, NULL, '1664b70ab9b70a664b70ab9b71a', 0, '2024-05-20 19:47:55', '2024-05-20 19:47:55', '2024-05-20 19:47:55'),
(101, 1, '::1', NULL, NULL, '1664dbe1d935e9664dbe1d935ee', 0, '2024-05-22 13:42:53', '2024-05-22 13:42:53', '2024-05-22 13:42:53'),
(102, 1, '::1', NULL, NULL, '1664f28cca581b664f28cca5826', 0, '2024-05-23 15:30:20', '2024-05-23 15:30:20', '2024-05-23 15:30:20'),
(103, 1, '::1', NULL, NULL, '1665069d3246c2665069d3246c9', 0, '2024-05-24 14:20:03', '2024-05-24 14:20:03', '2024-05-24 14:20:03'),
(104, 1, '::1', NULL, NULL, '1665069dcf22e6665069dcf22ea', 0, '2024-05-24 14:20:12', '2024-05-24 14:20:12', '2024-05-24 14:20:12'),
(105, 1, '::1', NULL, NULL, '166506f44b078366506f44b078d', 0, '2024-05-24 14:43:16', '2024-05-24 14:43:16', '2024-05-24 14:43:16'),
(106, 1, '::1', NULL, NULL, '16650746e4fa956650746e4faaf', 0, '2024-05-24 15:05:18', '2024-05-24 15:05:18', '2024-05-24 15:05:18'),
(107, 1, '::1', NULL, NULL, '16651a6a8e58506651a6a8e5861', 0, '2024-05-25 12:51:52', '2024-05-25 12:51:52', '2024-05-25 12:51:52'),
(108, 1, '::1', NULL, NULL, '16651a7514c1d96651a7514c1e8', 0, '2024-05-25 12:54:41', '2024-05-25 12:54:41', '2024-05-25 12:54:41'),
(109, 1, '::1', NULL, NULL, '166558bb1640d466558bb1640e7', 0, '2024-05-28 11:45:53', '2024-05-28 11:45:53', '2024-05-28 11:45:53'),
(110, 1, '::1', NULL, NULL, '16655a48c177196655a48c17721', 0, '2024-05-28 13:31:56', '2024-05-28 13:31:56', '2024-05-28 13:31:56'),
(111, 1, '::1', NULL, NULL, '16655a7d57188e6655a7d5718a1', 0, '2024-05-28 13:45:57', '2024-05-28 13:45:57', '2024-05-28 13:45:57'),
(112, 1, '::1', NULL, NULL, '16655ca19516b56655ca19516bd', 0, '2024-05-28 16:12:09', '2024-05-28 16:12:09', '2024-05-28 16:12:09'),
(113, 1, '::1', NULL, NULL, '166570955e9bf066570955e9bf7', 0, '2024-05-29 14:54:13', '2024-05-29 14:54:13', '2024-05-29 14:54:13'),
(114, 1, '::1', NULL, NULL, '1665717658bca6665717658bcb0', 0, '2024-05-29 15:54:13', '2024-05-29 15:54:13', '2024-05-29 15:54:13'),
(115, 1, '::1', NULL, NULL, '166573faf7174966573faf71753', 0, '2024-05-29 18:46:07', '2024-05-29 18:46:07', '2024-05-29 18:46:07'),
(116, 1, '::1', NULL, NULL, '166574ecd696b066574ecd696b5', 0, '2024-05-29 19:50:37', '2024-05-29 19:50:37', '2024-05-29 19:50:37'),
(117, 1, '::1', NULL, NULL, '166575643055b466575643055c3', 0, '2024-05-29 20:22:27', '2024-05-29 20:22:27', '2024-05-29 20:22:27'),
(118, 1, '::1', NULL, NULL, '16657717e243426657717e24349', 0, '2024-05-29 22:18:38', '2024-05-29 22:18:38', '2024-05-29 22:18:38'),
(119, 1, '::1', NULL, NULL, '1665771837403b6657718374045', 0, '2024-05-29 22:18:43', '2024-05-29 22:18:43', '2024-05-29 22:18:43'),
(120, 1, '::1', NULL, NULL, '16657722a7cdc56657722a7cdcf', 0, '2024-05-29 22:21:30', '2024-05-29 22:21:30', '2024-05-29 22:21:30'),
(121, 1, '::1', NULL, NULL, '1665775d7759d7665775d7759e1', 0, '2024-05-29 22:37:11', '2024-05-29 22:37:11', '2024-05-29 22:37:11'),
(122, 1, '::1', NULL, NULL, '1665775de97d08665775de97d12', 0, '2024-05-29 22:37:18', '2024-05-29 22:37:18', '2024-05-29 22:37:18'),
(123, 1, '::1', NULL, NULL, '16657762d84c666657762d84c70', 0, '2024-05-29 22:38:37', '2024-05-29 22:38:37', '2024-05-29 22:38:37'),
(124, 1, '::1', NULL, NULL, '1665845221a2f3665845221a2fd', 0, '2024-05-30 13:21:38', '2024-05-30 13:21:38', '2024-05-30 13:21:38'),
(125, 1, '::1', NULL, NULL, '16658b35c7fa1e6658b35c7fa27', 0, '2024-05-30 21:11:56', '2024-05-30 21:11:56', '2024-05-30 21:11:56'),
(126, 1, '::1', NULL, NULL, '16658b5c5201f16658b5c520208', 0, '2024-05-30 21:22:13', '2024-05-30 21:22:13', '2024-05-30 21:22:13'),
(127, 1, '::1', NULL, NULL, '16658b5c9aab606658b5c9aab7c', 0, '2024-05-30 21:22:17', '2024-05-30 21:22:17', '2024-05-30 21:22:17'),
(128, 1, '::1', NULL, NULL, '16658b5e2839056658b5e283910', 0, '2024-05-30 21:22:42', '2024-05-30 21:22:42', '2024-05-30 21:22:42'),
(129, 1, '::1', NULL, NULL, '16658b6ef1fc3b6658b6ef1fc41', 0, '2024-05-30 21:27:11', '2024-05-30 21:27:11', '2024-05-30 21:27:11'),
(130, 1, '::1', NULL, NULL, '16658b6faa1f096658b6faa1f0f', 0, '2024-05-30 21:27:22', '2024-05-30 21:27:22', '2024-05-30 21:27:22'),
(131, 1, '::1', NULL, NULL, '16658b73f6c0d96658b73f6c0dc', 0, '2024-05-30 21:28:31', '2024-05-30 21:28:31', '2024-05-30 21:28:31'),
(132, 1, '::1', NULL, NULL, '16658b748975366658b7489753d', 0, '2024-05-30 21:28:40', '2024-05-30 21:28:40', '2024-05-30 21:28:40'),
(133, 1, '::1', NULL, NULL, '16658b7c88b6b66658b7c88b6c4', 0, '2024-05-30 21:30:48', '2024-05-30 21:30:48', '2024-05-30 21:30:48'),
(134, 1, '::1', NULL, NULL, '16658b8912ee8f6658b8912ee94', 0, '2024-05-30 21:34:09', '2024-05-30 21:34:09', '2024-05-30 21:34:09'),
(135, 1, '::1', NULL, NULL, '16658b894374466658b8943744b', 0, '2024-05-30 21:34:12', '2024-05-30 21:34:12', '2024-05-30 21:34:12'),
(136, 1, '::1', NULL, NULL, '16658b89e9f7bb6658b89e9f7c8', 0, '2024-05-30 21:34:22', '2024-05-30 21:34:22', '2024-05-30 21:34:22'),
(137, 1, '::1', NULL, NULL, '16658b8cacc0686658b8cacc06d', 0, '2024-05-30 21:35:06', '2024-05-30 21:35:06', '2024-05-30 21:35:06'),
(138, 1, '::1', NULL, NULL, '16658ba904cb5c6658ba904cb67', 0, '2024-05-30 21:42:40', '2024-05-30 21:42:40', '2024-05-30 21:42:40'),
(139, 1, '::1', NULL, NULL, '16658ba95b4af26658ba95b4afa', 0, '2024-05-30 21:42:45', '2024-05-30 21:42:45', '2024-05-30 21:42:45'),
(140, 1, '::1', NULL, NULL, '16658bab14726f6658bab147279', 0, '2024-05-30 21:43:13', '2024-05-30 21:43:13', '2024-05-30 21:43:13'),
(141, 1, '::1', NULL, NULL, '16658bae5c5b7f6658bae5c5b89', 0, '2024-05-30 21:44:05', '2024-05-30 21:44:05', '2024-05-30 21:44:05'),
(142, 1, '::1', NULL, NULL, '16658baf9010b96658baf9010ca', 0, '2024-05-30 21:44:25', '2024-05-30 21:44:25', '2024-05-30 21:44:25'),
(143, 1, '::1', NULL, NULL, '16658baf983c5b6658baf983c65', 0, '2024-05-30 21:44:25', '2024-05-30 21:44:25', '2024-05-30 21:44:25'),
(144, 1, '::1', NULL, NULL, '16658baf9b196e6658baf9b1978', 0, '2024-05-30 21:44:25', '2024-05-30 21:44:25', '2024-05-30 21:44:25'),
(145, 1, '::1', NULL, NULL, '16658baf9d8e7a6658baf9d8e81', 0, '2024-05-30 21:44:25', '2024-05-30 21:44:25', '2024-05-30 21:44:25'),
(146, 1, '::1', NULL, NULL, '16658bafa0a6356658bafa0a63f', 0, '2024-05-30 21:44:26', '2024-05-30 21:44:26', '2024-05-30 21:44:26'),
(147, 1, '::1', NULL, NULL, '16658bafd88e436658bafd88e4d', 0, '2024-05-30 21:44:29', '2024-05-30 21:44:29', '2024-05-30 21:44:29'),
(148, 1, '::1', NULL, NULL, '16658bb0ee4c3c6658bb0ee4c43', 0, '2024-05-30 21:44:46', '2024-05-30 21:44:46', '2024-05-30 21:44:46'),
(149, 1, '::1', NULL, NULL, '16658bbd01b2a56658bbd01b2ae', 0, '2024-05-30 21:48:00', '2024-05-30 21:48:00', '2024-05-30 21:48:00'),
(150, 1, '::1', NULL, NULL, '16658bd79ebf146658bd79ebf1c', 0, '2024-05-30 21:55:05', '2024-05-30 21:55:05', '2024-05-30 21:55:05'),
(151, 1, '::1', NULL, NULL, '16658bd8f355346658bd8f3553b', 0, '2024-05-30 21:55:27', '2024-05-30 21:55:27', '2024-05-30 21:55:27'),
(152, 1, '::1', NULL, NULL, '16658bdae57a926658bdae57a9b', 0, '2024-05-30 21:55:58', '2024-05-30 21:55:58', '2024-05-30 21:55:58'),
(153, 1, '::1', NULL, NULL, '16658bde789de26658bde789dec', 0, '2024-05-30 21:56:55', '2024-05-30 21:56:55', '2024-05-30 21:56:55'),
(154, 1, '::1', NULL, NULL, '16658be79b4e856658be79b4ea6', 0, '2024-05-30 21:59:21', '2024-05-30 21:59:21', '2024-05-30 21:59:21'),
(155, 1, '::1', NULL, NULL, '16658be9ce2ebe6658be9ce2ec9', 0, '2024-05-30 21:59:56', '2024-05-30 21:59:56', '2024-05-30 21:59:56'),
(156, 1, '::1', NULL, NULL, '16658bec2615416658bec261549', 0, '2024-05-30 22:00:34', '2024-05-30 22:00:34', '2024-05-30 22:00:34'),
(157, 1, '::1', NULL, NULL, '16658bf4a0df556658bf4a0df5c', 0, '2024-05-30 22:02:50', '2024-05-30 22:02:50', '2024-05-30 22:02:50'),
(158, 1, '::1', NULL, NULL, '16658bf75172616658bf7517268', 0, '2024-05-30 22:03:33', '2024-05-30 22:03:33', '2024-05-30 22:03:33'),
(159, 1, '::1', NULL, NULL, '16658c036785186658c0367851f', 0, '2024-05-30 22:06:46', '2024-05-30 22:06:46', '2024-05-30 22:06:46'),
(160, 1, '::1', NULL, NULL, '16658c07346a806658c07346a86', 0, '2024-05-30 22:07:47', '2024-05-30 22:07:47', '2024-05-30 22:07:47'),
(161, 1, '::1', NULL, NULL, '16658c0d66f6f26658c0d66f6fa', 0, '2024-05-30 22:09:26', '2024-05-30 22:09:26', '2024-05-30 22:09:26'),
(162, 1, '::1', NULL, NULL, '16658c12bd85d16658c12bd85d4', 0, '2024-05-30 22:10:51', '2024-05-30 22:10:51', '2024-05-30 22:10:51'),
(163, 1, '::1', NULL, NULL, '16658c1661e3336658c1661e33b', 0, '2024-05-30 22:11:50', '2024-05-30 22:11:50', '2024-05-30 22:11:50'),
(164, 1, '::1', NULL, NULL, '16658c1886b8656658c1886b87a', 0, '2024-05-30 22:12:24', '2024-05-30 22:12:24', '2024-05-30 22:12:24'),
(165, 1, '::1', NULL, NULL, '16658c1d8ccc7a6658c1d8ccc8f', 0, '2024-05-30 22:13:44', '2024-05-30 22:13:44', '2024-05-30 22:13:44'),
(166, 1, '::1', NULL, NULL, '16659ed59bd8c66659ed59bd8d0', 0, '2024-05-31 19:31:37', '2024-05-31 19:31:37', '2024-05-31 19:31:37'),
(167, 1, '::1', NULL, NULL, '16659f0778cf846659f0778cf94', 0, '2024-05-31 19:44:55', '2024-05-31 19:44:55', '2024-05-31 19:44:55'),
(168, 1, '::1', NULL, NULL, '16659f08f09f4d6659f08f09f60', 0, '2024-05-31 19:45:19', '2024-05-31 19:45:19', '2024-05-31 19:45:19'),
(169, 1, '::1', NULL, NULL, '16659f125aa67f6659f125aa684', 0, '2024-05-31 19:47:49', '2024-05-31 19:47:49', '2024-05-31 19:47:49'),
(170, 1, '::1', NULL, NULL, '16659f126e0e3c6659f126e0e46', 0, '2024-05-31 19:47:50', '2024-05-31 19:47:50', '2024-05-31 19:47:50'),
(171, 1, '::1', NULL, NULL, '16659f2770265a6659f27702666', 0, '2024-05-31 19:53:27', '2024-05-31 19:53:27', '2024-05-31 19:53:27'),
(172, 1, '::1', NULL, NULL, '16659f2af1516d6659f2af15171', 0, '2024-05-31 19:54:23', '2024-05-31 19:54:23', '2024-05-31 19:54:23'),
(173, 1, '::1', NULL, NULL, '16659f2afb04bb6659f2afb04c5', 0, '2024-05-31 19:54:23', '2024-05-31 19:54:23', '2024-05-31 19:54:23'),
(174, 1, '::1', NULL, NULL, '16659f2daa0d8b6659f2daa0d94', 0, '2024-05-31 19:55:06', '2024-05-31 19:55:06', '2024-05-31 19:55:06'),
(175, 1, '::1', NULL, NULL, '16659f2dc023e06659f2dc023ea', 0, '2024-05-31 19:55:08', '2024-05-31 19:55:08', '2024-05-31 19:55:08'),
(176, 1, '::1', NULL, NULL, '16659f2dcab0a26659f2dcab0a9', 0, '2024-05-31 19:55:08', '2024-05-31 19:55:08', '2024-05-31 19:55:08'),
(177, 1, '::1', NULL, NULL, '16659f43c251a96659f43c251b2', 0, '2024-05-31 20:01:00', '2024-05-31 20:01:00', '2024-05-31 20:01:00'),
(178, 1, '::1', NULL, NULL, '16659f44e63e096659f44e63e14', 0, '2024-05-31 20:01:18', '2024-05-31 20:01:18', '2024-05-31 20:01:18'),
(179, 1, '::1', NULL, NULL, '16659f45f1f2a16659f45f1f2ae', 0, '2024-05-31 20:01:35', '2024-05-31 20:01:35', '2024-05-31 20:01:35'),
(180, 1, '::1', NULL, NULL, '16659f5a973b9e6659f5a973bac', 0, '2024-05-31 20:07:05', '2024-05-31 20:07:05', '2024-05-31 20:07:05'),
(181, 1, '::1', NULL, NULL, '1665a0b9e97da6665a0b9e97db0', 0, '2024-05-31 21:40:46', '2024-05-31 21:40:46', '2024-05-31 21:40:46'),
(182, 1, '::1', NULL, NULL, '1665a0ba6b36cd665a0ba6b36da', 0, '2024-05-31 21:40:54', '2024-05-31 21:40:54', '2024-05-31 21:40:54'),
(183, 1, '::1', NULL, NULL, '1665db32ee8cb5665db32ee8cbc', 0, '2024-06-03 16:12:30', '2024-06-03 16:12:30', '2024-06-03 16:12:30'),
(184, 1, '::1', NULL, NULL, '166602c3421d7766602c3421d81', 0, '2024-06-05 13:13:24', '2024-06-05 13:13:24', '2024-06-05 13:13:24'),
(185, 1, '::1', NULL, NULL, '166607c9c4bc8466607c9c4bc9e', 0, '2024-06-05 18:56:28', '2024-06-05 18:56:28', '2024-06-05 18:56:28'),
(186, 1, '::1', NULL, NULL, '16660a7be51f836660a7be51f8e', 0, '2024-06-05 22:00:30', '2024-06-05 22:00:30', '2024-06-05 22:00:30'),
(187, 1, '::1', NULL, NULL, '16661898a588c86661898a588d3', 0, '2024-06-06 14:03:54', '2024-06-06 14:03:54', '2024-06-06 14:03:54'),
(188, 2, '::1', NULL, NULL, '266619fda3beb066619fda3beb8', 0, '2024-06-06 15:39:06', '2024-06-06 15:39:06', '2024-06-06 15:39:06'),
(189, 1, '::1', NULL, NULL, '16661acdb2817c6661acdb2818c', 0, '2024-06-06 16:34:35', '2024-06-06 16:34:35', '2024-06-06 16:34:35'),
(190, 2, '::1', NULL, NULL, '26661ad24402616661ad2440268', 0, '2024-06-06 16:35:48', '2024-06-06 16:35:48', '2024-06-06 16:35:48'),
(191, 1, '::1', NULL, NULL, '16661ad2c44e9e6661ad2c44ea7', 0, '2024-06-06 16:35:56', '2024-06-06 16:35:56', '2024-06-06 16:35:56'),
(192, 1, '::1', NULL, NULL, '16661adf5976276661adf597642', 0, '2024-06-06 16:39:17', '2024-06-06 16:39:17', '2024-06-06 16:39:17'),
(193, 2, '::1', NULL, NULL, '26661ae00b84416661ae00b844a', 0, '2024-06-06 16:39:28', '2024-06-06 16:39:28', '2024-06-06 16:39:28'),
(194, 2, '::1', NULL, NULL, '26661f6f506e1f6661f6f506e26', 0, '2024-06-06 21:50:45', '2024-06-06 21:50:45', '2024-06-06 21:50:45'),
(195, 1, '::1', NULL, NULL, '166620eea04b1266620eea04b1a', 0, '2024-06-06 23:32:58', '2024-06-06 23:32:58', '2024-06-06 23:32:58'),
(196, 1, '::1', NULL, NULL, '166620efaebc4566620efaebc50', 0, '2024-06-06 23:33:14', '2024-06-06 23:33:14', '2024-06-06 23:33:14'),
(197, 2, '::1', NULL, NULL, '266620f026bcc366620f026bccc', 0, '2024-06-06 23:33:22', '2024-06-06 23:33:22', '2024-06-06 23:33:22'),
(198, 1, '::1', NULL, NULL, '16662bbf1ec9636662bbf1ec96b', 0, '2024-06-07 11:51:13', '2024-06-07 11:51:13', '2024-06-07 11:51:13'),
(199, 2, '::1', NULL, NULL, '26662beca0da716662beca0da7b', 0, '2024-06-07 12:03:22', '2024-06-07 12:03:22', '2024-06-07 12:03:22'),
(200, 1, '::1', NULL, NULL, '16666c09e0ccde6666c09e0cce6', 0, '2024-06-10 13:00:14', '2024-06-10 13:00:14', '2024-06-10 13:00:14'),
(201, 1, '::1', NULL, NULL, '16666c1b1da0656666c1b1da070', 0, '2024-06-10 13:04:49', '2024-06-10 13:04:49', '2024-06-10 13:04:49'),
(202, 2, '::1', NULL, NULL, '26666c1f56a5fa6666c1f56a603', 0, '2024-06-10 13:05:57', '2024-06-10 13:05:57', '2024-06-10 13:05:57'),
(203, 2, '::1', NULL, NULL, '266673187efec466673187efece', 0, '2024-06-10 21:01:59', '2024-06-10 21:01:59', '2024-06-10 21:01:59'),
(204, 2, '::1', NULL, NULL, '26667319389866666731938987b', 0, '2024-06-10 21:02:11', '2024-06-10 21:02:11', '2024-06-10 21:02:11'),
(205, 2, '::1', NULL, NULL, '2666731951a67a666731951a681', 0, '2024-06-10 21:02:13', '2024-06-10 21:02:13', '2024-06-10 21:02:13'),
(206, 1, '::1', NULL, NULL, '1666731d906934666731d906949', 0, '2024-06-10 21:03:21', '2024-06-10 21:03:21', '2024-06-10 21:03:21'),
(207, 1, '::1', NULL, NULL, '1666731e1ebaf1666731e1ebafb', 0, '2024-06-10 21:03:29', '2024-06-10 21:03:29', '2024-06-10 21:03:29'),
(208, 2, '::1', NULL, NULL, '2666731e8c1ca6666731e8c1cb2', 0, '2024-06-10 21:03:36', '2024-06-10 21:03:36', '2024-06-10 21:03:36'),
(209, 2, '::1', NULL, NULL, '2666737cacd942666737cacd94b', 0, '2024-06-10 21:28:42', '2024-06-10 21:28:42', '2024-06-10 21:28:42'),
(210, 2, '::1', NULL, NULL, '2666738ea846f3666738ea846fd', 0, '2024-06-10 21:33:30', '2024-06-10 21:33:30', '2024-06-10 21:33:30'),
(211, 2, '::1', NULL, NULL, '26667610e001f46667610e001fe', 0, '2024-06-11 00:24:46', '2024-06-11 00:24:46', '2024-06-11 00:24:46'),
(212, 2, '::1', NULL, NULL, '26667621a3b4046667621a3b408', 0, '2024-06-11 00:29:14', '2024-06-11 00:29:14', '2024-06-11 00:29:14'),
(213, 2, '::1', NULL, NULL, '26667e34ed40eb6667e34ed40f5', 0, '2024-06-11 09:40:30', '2024-06-11 09:40:30', '2024-06-11 09:40:30'),
(214, 2, '::1', NULL, NULL, '26667e679addf96667e679addfd', 0, '2024-06-11 09:54:01', '2024-06-11 09:54:01', '2024-06-11 09:54:01'),
(215, 2, '::1', NULL, NULL, '26667e683a586e6667e683a587c', 0, '2024-06-11 09:54:11', '2024-06-11 09:54:11', '2024-06-11 09:54:11'),
(216, 2, '::1', NULL, NULL, '26667e6a077b266667e6a077b31', 0, '2024-06-11 09:54:40', '2024-06-11 09:54:40', '2024-06-11 09:54:40'),
(217, 1, '::1', NULL, NULL, '16667f69152c6c6667f69152c75', 0, '2024-06-11 11:02:41', '2024-06-11 11:02:41', '2024-06-11 11:02:41'),
(218, 2, '::1', NULL, NULL, '26667f6c0b47656667f6c0b4770', 0, '2024-06-11 11:03:28', '2024-06-11 11:03:28', '2024-06-11 11:03:28'),
(219, 2, '::1', NULL, NULL, '26667f6dd3fcd46667f6dd3fcdc', 0, '2024-06-11 11:03:57', '2024-06-11 11:03:57', '2024-06-11 11:03:57'),
(220, 2, '::1', NULL, NULL, '26667fa02b95d46667fa02b95e4', 0, '2024-06-11 11:17:22', '2024-06-11 11:17:22', '2024-06-11 11:17:22'),
(221, 2, '::1', NULL, NULL, '26667fa294cb696667fa294cb73', 0, '2024-06-11 11:18:01', '2024-06-11 11:18:01', '2024-06-11 11:18:01'),
(222, 1, '::1', NULL, NULL, '16667fa32a1dc16667fa32a1dd0', 0, '2024-06-11 11:18:10', '2024-06-11 11:18:10', '2024-06-11 11:18:10'),
(223, 2, '::1', NULL, NULL, '26667fa39ce54f6667fa39ce55a', 0, '2024-06-11 11:18:17', '2024-06-11 11:18:17', '2024-06-11 11:18:17'),
(224, 1, '::1', NULL, NULL, '16668293335c4c6668293335c53', 0, '2024-06-11 14:38:43', '2024-06-11 14:38:43', '2024-06-11 14:38:43'),
(225, 1, '::1', NULL, NULL, '166687bb8a38c866687bb8a38cf', 0, '2024-06-11 20:30:48', '2024-06-11 20:30:48', '2024-06-11 20:30:48'),
(226, 1, '::1', NULL, NULL, '166687bbdf213866687bbdf213f', 0, '2024-06-11 20:30:53', '2024-06-11 20:30:53', '2024-06-11 20:30:53'),
(227, 1, '::1', NULL, NULL, '166687bc1123cc66687bc1123d3', 0, '2024-06-11 20:30:57', '2024-06-11 20:30:57', '2024-06-11 20:30:57'),
(228, 2, '::1', NULL, NULL, '266687be20266a66687be202678', 0, '2024-06-11 20:31:30', '2024-06-11 20:31:30', '2024-06-11 20:31:30'),
(229, 2, '::1', NULL, NULL, '266687be2c866666687be2c8670', 0, '2024-06-11 20:31:30', '2024-06-11 20:31:30', '2024-06-11 20:31:30'),
(230, 1, '::1', NULL, NULL, '166687c29779ba66687c29779c8', 0, '2024-06-11 20:32:41', '2024-06-11 20:32:41', '2024-06-11 20:32:41'),
(231, 1, '::1', NULL, NULL, '166687c2a0945266687c2a09459', 0, '2024-06-11 20:32:42', '2024-06-11 20:32:42', '2024-06-11 20:32:42'),
(232, 1, '::1', NULL, NULL, '166687c2a3140866687c2a31412', 0, '2024-06-11 20:32:42', '2024-06-11 20:32:42', '2024-06-11 20:32:42'),
(233, 1, '::1', NULL, NULL, '166687d45c673666687d45c6749', 0, '2024-06-11 20:37:25', '2024-06-11 20:37:25', '2024-06-11 20:37:25'),
(234, 1, '::1', NULL, NULL, '166687d7338b7d66687d7338b85', 0, '2024-06-11 20:38:11', '2024-06-11 20:38:11', '2024-06-11 20:38:11'),
(235, 1, '::1', NULL, NULL, '166687fd9dc5cd66687fd9dc5d6', 0, '2024-06-11 20:48:25', '2024-06-11 20:48:25', '2024-06-11 20:48:25'),
(236, 1, '::1', NULL, NULL, '166687fe3d8c8e66687fe3d8c97', 0, '2024-06-11 20:48:35', '2024-06-11 20:48:35', '2024-06-11 20:48:35'),
(237, 1, '::1', NULL, NULL, '1666880534ab44666880534ab48', 0, '2024-06-11 20:50:27', '2024-06-11 20:50:27', '2024-06-11 20:50:27'),
(238, 1, '::1', NULL, NULL, '166688ae7dd57d66688ae7dd586', 0, '2024-06-11 21:35:35', '2024-06-11 21:35:35', '2024-06-11 21:35:35'),
(239, 2, '::1', NULL, NULL, '266688baa7945a66688baa7945f', 0, '2024-06-11 21:38:50', '2024-06-11 21:38:50', '2024-06-11 21:38:50'),
(240, 1, '::1', NULL, NULL, '166688bb87fdbb66688bb87fdc8', 0, '2024-06-11 21:39:04', '2024-06-11 21:39:04', '2024-06-11 21:39:04'),
(241, 2, '::1', NULL, NULL, '26668b83befa386668b83befa42', 0, '2024-06-12 00:48:59', '2024-06-12 00:48:59', '2024-06-12 00:48:59'),
(242, 2, '::1', NULL, NULL, '26668ba89943816668ba8994388', 0, '2024-06-12 00:58:49', '2024-06-12 00:58:49', '2024-06-12 00:58:49'),
(243, 2, '::1', NULL, NULL, '26668bab5927e66668bab5927e9', 0, '2024-06-12 00:59:33', '2024-06-12 00:59:33', '2024-06-12 00:59:33'),
(244, 2, '::1', NULL, NULL, '26668bafad5d346668bafad5d3e', 0, '2024-06-12 01:00:42', '2024-06-12 01:00:42', '2024-06-12 01:00:42'),
(245, 2, '::1', NULL, NULL, '26668bb3f3c2f36668bb3f3c2fd', 0, '2024-06-12 01:01:51', '2024-06-12 01:01:51', '2024-06-12 01:01:51'),
(246, 1, '::1', NULL, NULL, '16668bb4329e446668bb4329e4e', 0, '2024-06-12 01:01:55', '2024-06-12 01:01:55', '2024-06-12 01:01:55'),
(247, 1, '::1', NULL, NULL, '166693226e4c8266693226e4c8a', 0, '2024-06-12 09:29:10', '2024-06-12 09:29:10', '2024-06-12 09:29:10'),
(248, 2, '::1', NULL, NULL, '266694b2144fc666694b2144fcd', 0, '2024-06-12 11:15:45', '2024-06-12 11:15:45', '2024-06-12 11:15:45'),
(249, 1, '::1', NULL, NULL, '166694c402030466694c402030f', 0, '2024-06-12 11:20:32', '2024-06-12 11:20:32', '2024-06-12 11:20:32'),
(250, 1, '::1', NULL, NULL, '166694d9e7546e66694d9e75471', 0, '2024-06-12 11:26:22', '2024-06-12 11:26:22', '2024-06-12 11:26:22'),
(251, 1, '::1', NULL, NULL, '166694fe69ceb366694fe69ceb7', 0, '2024-06-12 11:36:06', '2024-06-12 11:36:06', '2024-06-12 11:36:06'),
(252, 2, '::1', NULL, NULL, '2666951fe15fe9666951fe15ff3', 0, '2024-06-12 11:45:02', '2024-06-12 11:45:02', '2024-06-12 11:45:02'),
(253, 2, '::1', NULL, NULL, '26669527d3ff326669527d3ff36', 0, '2024-06-12 11:47:09', '2024-06-12 11:47:09', '2024-06-12 11:47:09'),
(254, 2, '::1', NULL, NULL, '26669528b987176669528b98722', 0, '2024-06-12 11:47:23', '2024-06-12 11:47:23', '2024-06-12 11:47:23'),
(255, 1, '::1', NULL, NULL, '1666952934cc00666952934cc08', 0, '2024-06-12 11:47:31', '2024-06-12 11:47:31', '2024-06-12 11:47:31'),
(256, 2, '::1', NULL, NULL, '26669544ed3d086669544ed3d0f', 0, '2024-06-12 11:54:54', '2024-06-12 11:54:54', '2024-06-12 11:54:54'),
(257, 2, '::1', NULL, NULL, '2666954555288f6669545552895', 0, '2024-06-12 11:55:01', '2024-06-12 11:55:01', '2024-06-12 11:55:01'),
(258, 2, '::1', NULL, NULL, '26669545a66ac26669545a66acc', 0, '2024-06-12 11:55:06', '2024-06-12 11:55:06', '2024-06-12 11:55:06'),
(259, 1, '::1', NULL, NULL, '166695478c7cf066695478c7cf8', 0, '2024-06-12 11:55:36', '2024-06-12 11:55:36', '2024-06-12 11:55:36'),
(260, 1, '::1', NULL, NULL, '1666990ce2cc1b666990ce2cc22', 0, '2024-06-12 16:13:02', '2024-06-12 16:13:02', '2024-06-12 16:13:02'),
(261, 2, '::1', NULL, NULL, '26669e7eb7ffa46669e7eb7ffac', 0, '2024-06-12 22:24:43', '2024-06-12 22:24:43', '2024-06-12 22:24:43'),
(262, 1, '::1', NULL, NULL, '16669e80142a9a6669e80142aa4', 0, '2024-06-12 22:25:05', '2024-06-12 22:25:05', '2024-06-12 22:25:05'),
(263, 2, '::1', NULL, NULL, '2666a8c2e7245f666a8c2e72466', 0, '2024-06-13 10:05:34', '2024-06-13 10:05:34', '2024-06-13 10:05:34'),
(264, 1, '::1', NULL, NULL, '1666a8cc165849666a8cc16584f', 0, '2024-06-13 10:08:01', '2024-06-13 10:08:01', '2024-06-13 10:08:01'),
(265, 1, '::1', NULL, NULL, '1666a8d82a903b666a8d82a9050', 0, '2024-06-13 10:11:14', '2024-06-13 10:11:14', '2024-06-13 10:11:14'),
(266, 1, '::1', NULL, NULL, '1666a99a4a1d82666a99a4a1d88', 0, '2024-06-13 11:03:00', '2024-06-13 11:03:00', '2024-06-13 11:03:00'),
(267, 2, '::1', NULL, NULL, '2666ab01be3d44666ab01be3d4b', 0, '2024-06-13 12:38:51', '2024-06-13 12:38:51', '2024-06-13 12:38:51'),
(268, 1, '::1', NULL, NULL, '1666ab02bef998666ab02bef9a0', 0, '2024-06-13 12:39:07', '2024-06-13 12:39:07', '2024-06-13 12:39:07'),
(269, 2, '::1', NULL, NULL, '2666ab1a0900cb666ab1a0900d4', 0, '2024-06-13 12:45:20', '2024-06-13 12:45:20', '2024-06-13 12:45:20'),
(270, 1, '::1', NULL, NULL, '1666ab34eedc6a666ab34eedc74', 0, '2024-06-13 12:52:30', '2024-06-13 12:52:30', '2024-06-13 12:52:30'),
(271, 2, '::1', NULL, NULL, '2666ab35deeb61666ab35deeb67', 0, '2024-06-13 12:52:45', '2024-06-13 12:52:45', '2024-06-13 12:52:45'),
(272, 2, '::1', NULL, NULL, '2666acaf59affa666acaf59b00a', 0, '2024-06-13 14:33:25', '2024-06-13 14:33:25', '2024-06-13 14:33:25'),
(273, 1, '::1', NULL, NULL, '1666acba7d5205666acba7d5215', 0, '2024-06-13 14:36:23', '2024-06-13 14:36:23', '2024-06-13 14:36:23'),
(274, 3, '::1', NULL, NULL, '3666acc76a5822666acc76a582a', 0, '2024-06-13 14:39:50', '2024-06-13 14:39:50', '2024-06-13 14:39:50'),
(275, 1, '::1', NULL, NULL, '1666aceceb739b666aceceb73a0', 0, '2024-06-13 14:49:50', '2024-06-13 14:49:50', '2024-06-13 14:49:50'),
(276, 1, '::1', NULL, NULL, '1666ad102c08b2666ad102c08bd', 0, '2024-06-13 14:59:14', '2024-06-13 14:59:14', '2024-06-13 14:59:14'),
(277, 1, '::1', NULL, NULL, '1666ad7a4d56f6666ad7a4d56ff', 0, '2024-06-13 15:27:32', '2024-06-13 15:27:32', '2024-06-13 15:27:32'),
(278, 1, '::1', NULL, NULL, '16686423554374668642355437b', 0, '2024-07-04 10:33:25', '2024-07-04 10:33:25', '2024-07-04 10:33:25'),
(279, 1, '::1', NULL, NULL, '1668643beba424668643beba42b', 0, '2024-07-04 10:39:58', '2024-07-04 10:39:58', '2024-07-04 10:39:58'),
(280, 1, '::1', NULL, NULL, '166864472d056566864472d056e', 0, '2024-07-04 10:42:58', '2024-07-04 10:42:58', '2024-07-04 10:42:58'),
(281, 1, '::1', NULL, NULL, '166867a26b034666867a26b034d', 0, '2024-07-04 14:32:06', '2024-07-04 14:32:06', '2024-07-04 14:32:06'),
(282, 1, '::1', NULL, NULL, '166867c35afccb66867c35afcd5', 0, '2024-07-04 14:40:53', '2024-07-04 14:40:53', '2024-07-04 14:40:53'),
(283, 1, '::1', NULL, NULL, '16687c8d69e81e6687c8d69e829', 0, '2024-07-05 14:20:06', '2024-07-05 14:20:06', '2024-07-05 14:20:06'),
(284, 1, '::1', NULL, NULL, '16687d67bb505f6687d67bb506f', 0, '2024-07-05 15:18:19', '2024-07-05 15:18:19', '2024-07-05 15:18:19'),
(285, 1, '::1', NULL, NULL, '16687d91a4545f6687d91a4547a', 0, '2024-07-05 15:29:30', '2024-07-05 15:29:30', '2024-07-05 15:29:30'),
(286, 1, '::1', NULL, NULL, '16687d91ce11836687d91ce118c', 0, '2024-07-05 15:29:32', '2024-07-05 15:29:32', '2024-07-05 15:29:32'),
(287, 1, '::1', NULL, NULL, '16687d91ee2f4d6687d91ee2f57', 0, '2024-07-05 15:29:34', '2024-07-05 15:29:34', '2024-07-05 15:29:34'),
(288, 1, '::1', NULL, NULL, '16687d92271b946687d92271b98', 0, '2024-07-05 15:29:38', '2024-07-05 15:29:38', '2024-07-05 15:29:38'),
(289, 1, '::1', NULL, NULL, '16687d92ccedd36687d92ccede7', 0, '2024-07-05 15:29:48', '2024-07-05 15:29:48', '2024-07-05 15:29:48'),
(290, 2, '::1', NULL, NULL, '26687defa86c566687defa86c5d', 0, '2024-07-05 15:54:34', '2024-07-05 15:54:34', '2024-07-05 15:54:34'),
(291, 1, '::1', NULL, NULL, '16687e0029723f6687e00297242', 0, '2024-07-05 15:58:58', '2024-07-05 15:58:58', '2024-07-05 15:58:58'),
(292, 1, '::1', NULL, NULL, '1668a837d9071d668a837d90727', 0, '2024-07-07 16:01:01', '2024-07-07 16:01:01', '2024-07-07 16:01:01'),
(293, 1, '::1', NULL, NULL, '1669e5d995ff80669e5d995ff88', 0, '2024-07-22 17:24:41', '2024-07-22 17:24:41', '2024-07-22 17:24:41'),
(294, 1, '::1', NULL, NULL, '1669e5e19ba62e669e5e19ba635', 0, '2024-07-22 17:26:49', '2024-07-22 17:26:49', '2024-07-22 17:26:49'),
(295, 1, '::1', NULL, NULL, '1669e5e1aa570f669e5e1aa5718', 0, '2024-07-22 17:26:50', '2024-07-22 17:26:50', '2024-07-22 17:26:50'),
(296, 1, '::1', NULL, NULL, '1669e5e3a9be4f669e5e3a9be58', 0, '2024-07-22 17:27:22', '2024-07-22 17:27:22', '2024-07-22 17:27:22'),
(297, 1, '::1', NULL, NULL, '1669f9c48af0ae669f9c48af0bd', 0, '2024-07-23 16:04:24', '2024-07-23 16:04:24', '2024-07-23 16:04:24'),
(298, 1, '::1', NULL, NULL, '166b1d87b4c0ae66b1d87b4c0be', 0, '2024-08-06 12:02:03', '2024-08-06 12:02:03', '2024-08-06 12:02:03'),
(299, 2, '::1', NULL, NULL, '266b5f2c3231e966b5f2c3231ed', 0, '2024-08-09 14:43:15', '2024-08-09 14:43:15', '2024-08-09 14:43:15'),
(300, 2, '::1', NULL, NULL, '266b5f2d2ca30b66b5f2d2ca30e', 0, '2024-08-09 14:43:30', '2024-08-09 14:43:30', '2024-08-09 14:43:30'),
(301, 2, '::1', NULL, NULL, '266ba3c864bb8566ba3c864bb9b', 0, '2024-08-12 20:47:02', '2024-08-12 20:47:02', '2024-08-12 20:47:02'),
(302, 2, '::1', NULL, NULL, '266be5279e18c166be5279e18c4', 0, '2024-08-15 23:09:45', '2024-08-15 23:09:45', '2024-08-15 23:09:45'),
(303, 2, '::1', NULL, NULL, '266bf13e6174c266bf13e617571', 0, '2024-08-16 12:55:02', '2024-08-16 12:55:02', '2024-08-16 12:55:02'),
(304, 2, '::1', NULL, NULL, '266bf14caa79da66bf14caa79e1', 0, '2024-08-16 12:58:50', '2024-08-16 12:58:50', '2024-08-16 12:58:50'),
(305, 2, '::1', NULL, NULL, '266bf14decdc2166bf14decdc28', 0, '2024-08-16 12:59:10', '2024-08-16 12:59:10', '2024-08-16 12:59:10'),
(306, 2, '::1', NULL, NULL, '266bf1c07d1e4b66bf1c07d1e50', 0, '2024-08-16 13:29:43', '2024-08-16 13:29:43', '2024-08-16 13:29:43'),
(307, 1, '::1', NULL, NULL, '166bf1cd7be39a66bf1cd7be39d', 0, '2024-08-16 13:33:11', '2024-08-16 13:33:11', '2024-08-16 13:33:11'),
(308, 2, '::1', NULL, NULL, '266bf1da33750966bf1da33750c', 0, '2024-08-16 13:36:35', '2024-08-16 13:36:35', '2024-08-16 13:36:35'),
(309, 2, '::1', NULL, NULL, '266bf1dd00060e66bf1dd000614', 0, '2024-08-16 13:37:20', '2024-08-16 13:37:20', '2024-08-16 13:37:20'),
(310, 2, '::1', NULL, NULL, '266bf1dd67286066bf1dd672865', 0, '2024-08-16 13:37:26', '2024-08-16 13:37:26', '2024-08-16 13:37:26'),
(311, 1, '::1', NULL, NULL, '166bf1e5a5c76a66bf1e5a5c76d', 0, '2024-08-16 13:39:38', '2024-08-16 13:39:38', '2024-08-16 13:39:38'),
(312, 2, '::1', NULL, NULL, '266bf1e67a8bb166bf1e67a8bb9', 0, '2024-08-16 13:39:51', '2024-08-16 13:39:51', '2024-08-16 13:39:51'),
(313, 2, '::1', NULL, NULL, '266c3a02411d5d66c3a02411d61', 0, '2024-08-19 23:42:28', '2024-08-19 23:42:28', '2024-08-19 23:42:28'),
(314, 1, '::1', NULL, NULL, '166c44dfa844c566c44dfa844c9', 0, '2024-08-20 12:04:10', '2024-08-20 12:04:10', '2024-08-20 12:04:10'),
(315, 1, '::1', NULL, NULL, '166c77b8572eb666c77b8572eb9', 0, '2024-08-22 21:55:17', '2024-08-22 21:55:17', '2024-08-22 21:55:17'),
(316, 1, '::1', NULL, NULL, '166c8402f9d2c866c8402f9d2ca', 0, '2024-08-23 11:54:23', '2024-08-23 11:54:23', '2024-08-23 11:54:23'),
(317, 1, '::1', NULL, NULL, '166c8781d4247866c8781d4247c', 0, '2024-08-23 15:53:01', '2024-08-23 15:53:01', '2024-08-23 15:53:01'),
(318, 1, '::1', NULL, NULL, '166c879b0285b266c879b0285b7', 0, '2024-08-23 15:59:44', '2024-08-23 15:59:44', '2024-08-23 15:59:44'),
(319, 2, '::1', NULL, NULL, '266c88b381267366c88b381267f', 0, '2024-08-23 17:14:32', '2024-08-23 17:14:32', '2024-08-23 17:14:32'),
(320, 2, '::1', NULL, NULL, '266c88cae66ccf66c88cae66cd3', 0, '2024-08-23 17:20:46', '2024-08-23 17:20:46', '2024-08-23 17:20:46'),
(321, 2, '::1', NULL, NULL, '266c897371a8d166c897371a8d6', 0, '2024-08-23 18:05:43', '2024-08-23 18:05:43', '2024-08-23 18:05:43'),
(322, 3, '::1', NULL, NULL, '366d08480c3da266d08480c3da5', 0, '2024-08-29 18:24:00', '2024-08-29 18:24:00', '2024-08-29 18:24:00'),
(323, 2, '::1', NULL, NULL, '266d084877d6f466d084877d6f8', 0, '2024-08-29 18:24:07', '2024-08-29 18:24:07', '2024-08-29 18:24:07'),
(324, 2, '::1', NULL, NULL, '266d08faa52f1966d08faa52f2e', 0, '2024-08-29 19:11:38', '2024-08-29 19:11:38', '2024-08-29 19:11:38'),
(325, 2, '::1', NULL, NULL, '266d08fafb1f4066d08fafb1f43', 0, '2024-08-29 19:11:43', '2024-08-29 19:11:43', '2024-08-29 19:11:43'),
(326, 2, '::1', NULL, NULL, '266d0adbc22f1f66d0adbc22f24', 0, '2024-08-29 21:19:56', '2024-08-29 21:19:56', '2024-08-29 21:19:56'),
(327, 2, '::1', NULL, NULL, '266d171a6d81b366d171a6d81ba', 0, '2024-08-30 11:15:50', '2024-08-30 11:15:50', '2024-08-30 11:15:50'),
(328, 2, '::1', NULL, NULL, '266d171bfb79e966d171bfb7a02', 0, '2024-08-30 11:16:15', '2024-08-30 11:16:15', '2024-08-30 11:16:15'),
(329, 2, '::1', NULL, NULL, '266d171d6ec79d66d171d6ec7a4', 0, '2024-08-30 11:16:38', '2024-08-30 11:16:38', '2024-08-30 11:16:38'),
(330, 2, '::1', NULL, NULL, '266d1720dc688e66d1720dc6892', 0, '2024-08-30 11:17:33', '2024-08-30 11:17:33', '2024-08-30 11:17:33'),
(331, 2, '::1', NULL, NULL, '266d176835ffee66d176835fff9', 0, '2024-08-30 11:36:35', '2024-08-30 11:36:35', '2024-08-30 11:36:35'),
(332, 2, '::1', NULL, NULL, '266d1769d79a7266d1769d79a7c', 0, '2024-08-30 11:37:01', '2024-08-30 11:37:01', '2024-08-30 11:37:01'),
(333, 2, '::1', NULL, NULL, '266d17aaf5b6a366d17aaf5b6a6', 0, '2024-08-30 11:54:23', '2024-08-30 11:54:23', '2024-08-30 11:54:23'),
(334, 2, '::1', NULL, NULL, '266d183778067466d183778067e', 0, '2024-08-30 12:31:51', '2024-08-30 12:31:51', '2024-08-30 12:31:51'),
(335, 2, '::1', NULL, NULL, '266d20e3f92f3966d20e3f92f40', 0, '2024-08-30 22:23:59', '2024-08-30 22:23:59', '2024-08-30 22:23:59'),
(336, 2, '::1', NULL, NULL, '266e819380debe66e819380dec3', 0, '2024-09-16 15:40:40', '2024-09-16 15:40:40', '2024-09-16 15:40:40'),
(337, 2, '::1', NULL, NULL, '266e8614793d1f66e8614793d3f', 0, '2024-09-16 20:48:07', '2024-09-16 20:48:07', '2024-09-16 20:48:07'),
(338, 1, '::1', NULL, NULL, '166e98a948b80266e98a948b807', 0, '2024-09-17 17:56:36', '2024-09-17 17:56:36', '2024-09-17 17:56:36'),
(339, 1, '::1', NULL, NULL, '166e98dea7fd8266e98dea7fd86', 0, '2024-09-17 18:10:50', '2024-09-17 18:10:50', '2024-09-17 18:10:50'),
(340, 2, '::1', NULL, NULL, '266e99be75c05a66e99be75c062', 0, '2024-09-17 19:10:31', '2024-09-17 19:10:31', '2024-09-17 19:10:31'),
(341, 2, '::1', NULL, NULL, '266e99c702e8a066e99c702e8b3', 0, '2024-09-17 19:12:48', '2024-09-17 19:12:48', '2024-09-17 19:12:48'),
(342, 2, '::1', NULL, NULL, '266e99c7aecdab66e99c7aecdad', 0, '2024-09-17 19:12:58', '2024-09-17 19:12:58', '2024-09-17 19:12:58'),
(343, 2, '::1', NULL, NULL, '266e99c9992aff66e99c9992b02', 0, '2024-09-17 19:13:29', '2024-09-17 19:13:29', '2024-09-17 19:13:29'),
(344, 1, '::1', NULL, NULL, '1671646411288c6716464112890', 0, '2024-10-21 16:17:05', '2024-10-21 16:17:05', '2024-10-21 16:17:05'),
(345, 2, '::1', NULL, NULL, '267164ad03bc3667164ad03bc46', 0, '2024-10-21 16:36:32', '2024-10-21 16:36:32', '2024-10-21 16:36:32'),
(346, 2, '::1', NULL, NULL, '2671668a9c6aee671668a9c6af3', 0, '2024-10-21 18:43:53', '2024-10-21 18:43:53', '2024-10-21 18:43:53'),
(347, 1, '::1', NULL, NULL, '167166c558e69867166c558e69c', 0, '2024-10-21 18:59:33', '2024-10-21 18:59:33', '2024-10-21 18:59:33'),
(348, 1, '::1', NULL, NULL, '1671e03b922eb8671e03b922ebc', 0, '2024-10-27 13:11:21', '2024-10-27 13:11:21', '2024-10-27 13:11:21'),
(349, 6, '::1', NULL, NULL, '6671e119d55ece671e119d55ed2', 0, '2024-10-27 14:10:37', '2024-10-27 14:10:37', '2024-10-27 14:10:37'),
(350, 7, '::1', NULL, NULL, '7671e1fce439f8671e1fce439fc', 0, '2024-10-27 15:11:10', '2024-10-27 15:11:10', '2024-10-27 15:11:10'),
(351, 7, '::1', NULL, NULL, '7671e3b3861996671e3b386199a', 0, '2024-10-27 17:08:08', '2024-10-27 17:08:08', '2024-10-27 17:08:08'),
(352, 7, '::1', NULL, NULL, '7671e46d27a911671e46d27a914', 0, '2024-10-27 17:57:38', '2024-10-27 17:57:38', '2024-10-27 17:57:38'),
(353, 7, '::1', NULL, NULL, '7671e46d4efc76671e46d4efc7b', 0, '2024-10-27 17:57:40', '2024-10-27 17:57:40', '2024-10-27 17:57:40'),
(354, 7, '::1', NULL, NULL, '7671e46f7a8565671e46f7a856b', 0, '2024-10-27 17:58:15', '2024-10-27 17:58:15', '2024-10-27 17:58:15'),
(355, 7, '::1', NULL, NULL, '7671e4f041b107671e4f041b10d', 0, '2024-10-27 18:32:36', '2024-10-27 18:32:36', '2024-10-27 18:32:36'),
(356, 2, '::1', NULL, NULL, '2671e4f099166d671e4f0991671', 0, '2024-10-27 18:32:41', '2024-10-27 18:32:41', '2024-10-27 18:32:41'),
(357, 2, '::1', NULL, NULL, '2671e4f18678d5671e4f18678d9', 0, '2024-10-27 18:32:56', '2024-10-27 18:32:56', '2024-10-27 18:32:56'),
(358, 7, '::1', NULL, NULL, '7671e4f2093e39671e4f2093e44', 0, '2024-10-27 18:33:04', '2024-10-27 18:33:04', '2024-10-27 18:33:04'),
(359, 7, '::1', NULL, NULL, '7671e4f3354368671e4f3354370', 0, '2024-10-27 18:33:23', '2024-10-27 18:33:23', '2024-10-27 18:33:23'),
(360, 7, '::1', NULL, NULL, '7671e4f4be102c671e4f4be1030', 0, '2024-10-27 18:33:47', '2024-10-27 18:33:47', '2024-10-27 18:33:47'),
(361, 7, '::1', NULL, NULL, '7671e4fe95f220671e4fe95f225', 0, '2024-10-27 18:36:25', '2024-10-27 18:36:25', '2024-10-27 18:36:25'),
(362, 2, '::1', NULL, NULL, '2671e4fec35b85671e4fec35b8a', 0, '2024-10-27 18:36:28', '2024-10-27 18:36:28', '2024-10-27 18:36:28'),
(363, 7, '::1', NULL, NULL, '7671e4ff69de58671e4ff69de5e', 0, '2024-10-27 18:36:38', '2024-10-27 18:36:38', '2024-10-27 18:36:38'),
(364, 2, '::1', NULL, NULL, '2671e5034af2ed671e5034af2f9', 0, '2024-10-27 18:37:40', '2024-10-27 18:37:40', '2024-10-27 18:37:40'),
(365, 2, '::1', NULL, NULL, '2671e52969cdb6671e52969cdbc', 0, '2024-10-27 18:47:50', '2024-10-27 18:47:50', '2024-10-27 18:47:50'),
(366, 2, '::1', NULL, NULL, '2671e534c377a0671e534c377a5', 0, '2024-10-27 18:50:52', '2024-10-27 18:50:52', '2024-10-27 18:50:52'),
(367, 2, '::1', NULL, NULL, '2671e534d2d6dd671e534d2d6e3', 0, '2024-10-27 18:50:53', '2024-10-27 18:50:53', '2024-10-27 18:50:53'),
(368, 2, '::1', NULL, NULL, '2671e534d54a02671e534d54a0d', 0, '2024-10-27 18:50:53', '2024-10-27 18:50:53', '2024-10-27 18:50:53'),
(369, 2, '::1', NULL, NULL, '2671e534d7e8d7671e534d7e8de', 0, '2024-10-27 18:50:53', '2024-10-27 18:50:53', '2024-10-27 18:50:53'),
(370, 2, '::1', NULL, NULL, '2671e534da1c38671e534da1c3c', 0, '2024-10-27 18:50:53', '2024-10-27 18:50:53', '2024-10-27 18:50:53'),
(371, 2, '::1', NULL, NULL, '2671e534dc4fd9671e534dc4fe0', 0, '2024-10-27 18:50:53', '2024-10-27 18:50:53', '2024-10-27 18:50:53'),
(372, 2, '::1', NULL, NULL, '2671e534deb2fa671e534deb2fc', 0, '2024-10-27 18:50:53', '2024-10-27 18:50:53', '2024-10-27 18:50:53'),
(373, 2, '::1', NULL, NULL, '2671e537d7e586671e537d7e59c', 0, '2024-10-27 18:51:41', '2024-10-27 18:51:41', '2024-10-27 18:51:41'),
(374, 2, '::1', NULL, NULL, '2671e537e0f3ec671e537e0f3f0', 0, '2024-10-27 18:51:42', '2024-10-27 18:51:42', '2024-10-27 18:51:42'),
(375, 2, '::1', NULL, NULL, '2671e537e338f0671e537e338f4', 0, '2024-10-27 18:51:42', '2024-10-27 18:51:42', '2024-10-27 18:51:42'),
(376, 2, '::1', NULL, NULL, '2671e53880fc2a671e53880fc33', 0, '2024-10-27 18:51:52', '2024-10-27 18:51:52', '2024-10-27 18:51:52'),
(377, 2, '::1', NULL, NULL, '2671e538886db0671e538886db4', 0, '2024-10-27 18:51:52', '2024-10-27 18:51:52', '2024-10-27 18:51:52'),
(378, 2, '::1', NULL, NULL, '2671e5388b5982671e5388b5986', 0, '2024-10-27 18:51:52', '2024-10-27 18:51:52', '2024-10-27 18:51:52'),
(379, 2, '::1', NULL, NULL, '2671e53890e855671e53890e85b', 0, '2024-10-27 18:51:53', '2024-10-27 18:51:53', '2024-10-27 18:51:53'),
(380, 2, '::1', NULL, NULL, '2671e5389393ac671e5389393b1', 0, '2024-10-27 18:51:53', '2024-10-27 18:51:53', '2024-10-27 18:51:53'),
(381, 7, '::1', NULL, NULL, '7671e5397eff84671e5397eff87', 0, '2024-10-27 18:52:07', '2024-10-27 18:52:07', '2024-10-27 18:52:07'),
(382, 7, '::1', NULL, NULL, '7671e53baab4e6671e53baab4ea', 0, '2024-10-27 18:52:42', '2024-10-27 18:52:42', '2024-10-27 18:52:42'),
(383, 7, '::1', NULL, NULL, '7671e54cbc560a671e54cbc5611', 0, '2024-10-27 18:57:15', '2024-10-27 18:57:15', '2024-10-27 18:57:15'),
(384, 2, '::1', NULL, NULL, '2671e5514d0f6e671e5514d0f72', 0, '2024-10-27 18:58:28', '2024-10-27 18:58:28', '2024-10-27 18:58:28');
INSERT INTO `users_log` (`id`, `user_id`, `user_ip`, `session`, `browser`, `token`, `cancelled`, `created_at`, `updated_at`, `login_date`) VALUES
(385, 2, '::1', NULL, NULL, '2671e5515980a0671e5515980a4', 0, '2024-10-27 18:58:29', '2024-10-27 18:58:29', '2024-10-27 18:58:29'),
(386, 2, '::1', NULL, NULL, '2671e5515bfcc0671e5515bfcc5', 0, '2024-10-27 18:58:29', '2024-10-27 18:58:29', '2024-10-27 18:58:29'),
(387, 2, '::1', NULL, NULL, '2671e5515e8ec6671e5515e8eca', 0, '2024-10-27 18:58:29', '2024-10-27 18:58:29', '2024-10-27 18:58:29'),
(388, 2, '::1', NULL, NULL, '2671e551619c9b671e551619c9f', 0, '2024-10-27 18:58:30', '2024-10-27 18:58:30', '2024-10-27 18:58:30'),
(389, 2, '::1', NULL, NULL, '2671e55163b528671e55163b52c', 0, '2024-10-27 18:58:30', '2024-10-27 18:58:30', '2024-10-27 18:58:30'),
(390, 2, '::1', NULL, NULL, '2671e552c5dc13671e552c5dc23', 0, '2024-10-27 18:58:52', '2024-10-27 18:58:52', '2024-10-27 18:58:52'),
(391, 2, '::1', NULL, NULL, '2671e554f5274d671e554f52753', 0, '2024-10-27 18:59:27', '2024-10-27 18:59:27', '2024-10-27 18:59:27'),
(392, 2, '::1', NULL, NULL, '2671e555858526671e55585852a', 0, '2024-10-27 18:59:36', '2024-10-27 18:59:36', '2024-10-27 18:59:36'),
(393, 2, '::1', NULL, NULL, '2671e55cbdd192671e55cbdd1a3', 0, '2024-10-27 19:01:31', '2024-10-27 19:01:31', '2024-10-27 19:01:31'),
(394, 7, '::1', NULL, NULL, '7671e55d1a52dd671e55d1a52e4', 0, '2024-10-27 19:01:37', '2024-10-27 19:01:37', '2024-10-27 19:01:37'),
(395, 2, '::1', NULL, NULL, '2671e55da646f2671e55da646f9', 0, '2024-10-27 19:01:46', '2024-10-27 19:01:46', '2024-10-27 19:01:46'),
(396, 6, '::1', NULL, NULL, '6671e55de42cf5671e55de42cf8', 0, '2024-10-27 19:01:50', '2024-10-27 19:01:50', '2024-10-27 19:01:50'),
(397, 6, '::1', NULL, NULL, '6671e55deaeb69671e55deaeb6e', 0, '2024-10-27 19:01:50', '2024-10-27 19:01:50', '2024-10-27 19:01:50'),
(398, 6, '::1', NULL, NULL, '6671e55decee68671e55decee6c', 0, '2024-10-27 19:01:50', '2024-10-27 19:01:50', '2024-10-27 19:01:50'),
(399, 6, '::1', NULL, NULL, '6671e55eab15fb671e55eab1604', 0, '2024-10-27 19:02:02', '2024-10-27 19:02:02', '2024-10-27 19:02:02'),
(400, 6, '::1', NULL, NULL, '6671e55eb31756671e55eb3175b', 0, '2024-10-27 19:02:03', '2024-10-27 19:02:03', '2024-10-27 19:02:03'),
(401, 2, '::1', NULL, NULL, '2671e56100d182671e56100d188', 0, '2024-10-27 19:02:40', '2024-10-27 19:02:40', '2024-10-27 19:02:40'),
(402, 2, '::1', NULL, NULL, '2671e5c864b612671e5c864b615', 0, '2024-10-27 19:30:14', '2024-10-27 19:30:14', '2024-10-27 19:30:14'),
(403, 2, '::1', NULL, NULL, '2671e64d5a8288671e64d5a828c', 0, '2024-10-27 20:05:41', '2024-10-27 20:05:41', '2024-10-27 20:05:41'),
(404, 2, '::1', NULL, NULL, '2671e650657699671e65065769e', 0, '2024-10-27 20:06:30', '2024-10-27 20:06:30', '2024-10-27 20:06:30'),
(405, 2, '::1', NULL, NULL, '2671e6509aa65c671e6509aa65f', 0, '2024-10-27 20:06:33', '2024-10-27 20:06:33', '2024-10-27 20:06:33'),
(406, 7, '::1', NULL, NULL, '7671e650cc1901671e650cc1905', 0, '2024-10-27 20:06:36', '2024-10-27 20:06:36', '2024-10-27 20:06:36'),
(407, 2, '::1', NULL, NULL, '2671e65222d9d0671e65222d9d4', 0, '2024-10-27 20:06:58', '2024-10-27 20:06:58', '2024-10-27 20:06:58'),
(408, 2, '::1', NULL, NULL, '2671e67bc0d693671e67bc0d69d', 0, '2024-10-27 20:18:04', '2024-10-27 20:18:04', '2024-10-27 20:18:04'),
(409, 2, '::1', NULL, NULL, '2671e67d76b829671e67d76b839', 0, '2024-10-27 20:18:31', '2024-10-27 20:18:31', '2024-10-27 20:18:31'),
(410, 2, '::1', NULL, NULL, '2671e67e658c2d671e67e658c43', 0, '2024-10-27 20:18:46', '2024-10-27 20:18:46', '2024-10-27 20:18:46'),
(411, 2, '::1', NULL, NULL, '2671e67e707e09671e67e707e0d', 0, '2024-10-27 20:18:47', '2024-10-27 20:18:47', '2024-10-27 20:18:47'),
(412, 2, '::1', NULL, NULL, '2671e67e75b10a671e67e75b10e', 0, '2024-10-27 20:18:47', '2024-10-27 20:18:47', '2024-10-27 20:18:47'),
(413, 2, '::1', NULL, NULL, '2671e683b72fe9671e683b72fec', 0, '2024-10-27 20:20:11', '2024-10-27 20:20:11', '2024-10-27 20:20:11'),
(414, 2, '::1', NULL, NULL, '2671e6a0cf0a56671e6a0cf0a5c', 0, '2024-10-27 20:27:56', '2024-10-27 20:27:56', '2024-10-27 20:27:56'),
(415, 2, '::1', NULL, NULL, '2671e6ca2c4a4b671e6ca2c4a50', 0, '2024-10-27 20:38:58', '2024-10-27 20:38:58', '2024-10-27 20:38:58'),
(416, 2, '::1', NULL, NULL, '2671e6cb28c00a671e6cb28c010', 0, '2024-10-27 20:39:14', '2024-10-27 20:39:14', '2024-10-27 20:39:14'),
(417, 2, '::1', NULL, NULL, '2671e6cc2d0b0c671e6cc2d0b27', 0, '2024-10-27 20:39:30', '2024-10-27 20:39:30', '2024-10-27 20:39:30'),
(418, 2, '::1', NULL, NULL, '2671e6d05e145b671e6d05e1461', 0, '2024-10-27 20:40:37', '2024-10-27 20:40:37', '2024-10-27 20:40:37'),
(419, 2, '::1', NULL, NULL, '2671e6f2ae62bc671e6f2ae62be', 0, '2024-10-27 20:49:46', '2024-10-27 20:49:46', '2024-10-27 20:49:46'),
(420, 2, '::1', NULL, NULL, '2671e728449793671e728449798', 0, '2024-10-27 21:04:04', '2024-10-27 21:04:04', '2024-10-27 21:04:04'),
(421, 2, '::1', NULL, NULL, '2671e72e9df744671e72e9df746', 0, '2024-10-27 21:05:45', '2024-10-27 21:05:45', '2024-10-27 21:05:45'),
(422, 2, '::1', NULL, NULL, '2671e7a76e04e4671e7a76e04e7', 0, '2024-10-27 21:37:58', '2024-10-27 21:37:58', '2024-10-27 21:37:58'),
(423, 2, '::1', NULL, NULL, '2671e7a77ec4a1671e7a77ec4a6', 0, '2024-10-27 21:37:59', '2024-10-27 21:37:59', '2024-10-27 21:37:59'),
(424, 2, '::1', NULL, NULL, '2671e7a78aa51b671e7a78aa51f', 0, '2024-10-27 21:38:00', '2024-10-27 21:38:00', '2024-10-27 21:38:00'),
(425, 2, '::1', NULL, NULL, '2671e7a7ec4b47671e7a7ec4b49', 0, '2024-10-27 21:38:06', '2024-10-27 21:38:06', '2024-10-27 21:38:06'),
(426, 2, '::1', NULL, NULL, '2671e7a8a01458671e7a8a0145e', 0, '2024-10-27 21:38:18', '2024-10-27 21:38:18', '2024-10-27 21:38:18'),
(427, 2, '::1', NULL, NULL, '2671e7a8ab475b671e7a8ab4762', 0, '2024-10-27 21:38:18', '2024-10-27 21:38:18', '2024-10-27 21:38:18'),
(428, 2, '::1', NULL, NULL, '2671e7bd09b93e671e7bd09b941', 0, '2024-10-27 21:43:44', '2024-10-27 21:43:44', '2024-10-27 21:43:44'),
(429, 2, '::1', NULL, NULL, '2671f1d446b128671f1d446b12a', 0, '2024-10-28 09:12:36', '2024-10-28 09:12:36', '2024-10-28 09:12:36');

-- --------------------------------------------------------

--
-- Table structure for table `what_we_do`
--

CREATE TABLE `what_we_do` (
  `id` bigint(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `text` text NOT NULL,
  `icon` text NOT NULL,
  `extension_image` varchar(255) NOT NULL,
  `cancelled` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `00_notification`
--
ALTER TABLE `00_notification`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admins_log`
--
ALTER TABLE `admins_log`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin_field_type`
--
ALTER TABLE `admin_field_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin_nav`
--
ALTER TABLE `admin_nav`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin_nav_category`
--
ALTER TABLE `admin_nav_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin_permissions`
--
ALTER TABLE `admin_permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin_tables`
--
ALTER TABLE `admin_tables`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin_table_fields`
--
ALTER TABLE `admin_table_fields`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `competition`
--
ALTER TABLE `competition`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `flash_anzan`
--
ALTER TABLE `flash_anzan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `homepage_banners`
--
ALTER TABLE `homepage_banners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `paragraphs`
--
ALTER TABLE `paragraphs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `quiz`
--
ALTER TABLE `quiz`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `quiz_paper`
--
ALTER TABLE `quiz_paper`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `quiz_rules`
--
ALTER TABLE `quiz_rules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student_competition_quiz`
--
ALTER TABLE `student_competition_quiz`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student_quiz`
--
ALTER TABLE `student_quiz`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `topics`
--
ALTER TABLE `topics`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_log`
--
ALTER TABLE `users_log`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `what_we_do`
--
ALTER TABLE `what_we_do`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `00_notification`
--
ALTER TABLE `00_notification`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `admins_log`
--
ALTER TABLE `admins_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT for table `admin_field_type`
--
ALTER TABLE `admin_field_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `admin_nav`
--
ALTER TABLE `admin_nav`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `admin_nav_category`
--
ALTER TABLE `admin_nav_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `admin_permissions`
--
ALTER TABLE `admin_permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `admin_tables`
--
ALTER TABLE `admin_tables`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `admin_table_fields`
--
ALTER TABLE `admin_table_fields`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT for table `competition`
--
ALTER TABLE `competition`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `flash_anzan`
--
ALTER TABLE `flash_anzan`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `homepage_banners`
--
ALTER TABLE `homepage_banners`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `paragraphs`
--
ALTER TABLE `paragraphs`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quiz`
--
ALTER TABLE `quiz`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `quiz_paper`
--
ALTER TABLE `quiz_paper`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `quiz_rules`
--
ALTER TABLE `quiz_rules`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `student_competition_quiz`
--
ALTER TABLE `student_competition_quiz`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `student_quiz`
--
ALTER TABLE `student_quiz`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `topics`
--
ALTER TABLE `topics`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users_log`
--
ALTER TABLE `users_log`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=430;

--
-- AUTO_INCREMENT for table `what_we_do`
--
ALTER TABLE `what_we_do`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
