-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 19, 2025 at 02:17 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `888`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `ID` int(11) NOT NULL,
  `MOBILE` varchar(123) NOT NULL,
  `paymode` varchar(123) NOT NULL,
  `point` varchar(123) NOT NULL,
  `closing` varchar(123) NOT NULL,
  `DATE` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` varchar(123) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`ID`, `MOBILE`, `paymode`, `point`, `closing`, `DATE`, `status`) VALUES
(5, '5354564356', 'Online', '105', '361.00', '2025-09-08 15:49:13', 'Success'),
(6, '5354564356', 'Online', '100', '461.00', '2025-09-08 15:49:13', 'Success'),
(7, '9859609348', 'Online', '102', '510.00', '2025-09-08 15:49:13', 'Success'),
(8, '9859609348', 'Online', '100', '610.00', '2025-09-08 15:49:13', 'Success'),
(9, '5354564356', 'Online', '105', '461.00', '2025-09-08 15:52:31', 'Success'),
(10, '5354564356', 'Online', '100', '554.00', '2025-09-08 16:06:44', 'Success'),
(11, '5354564356', 'Online', '100', '454.00', '2025-09-08 16:07:03', 'Cancelled'),
(12, '5354564356', 'Online', '105', '349.00', '2025-09-08 16:15:17', 'Cancelled'),
(13, '5354564356', 'Online', '100', '449.00', '2025-09-08 16:15:46', 'Success'),
(14, '5354564356', 'Online', '2000', '2449.00', '2025-09-08 16:28:43', 'Success'),
(15, '9859609348', 'Online', '2000', '2610.00', '2025-09-08 16:30:09', 'Success'),
(16, '9859609348', 'Withdraw', '1000', '2610.00', '2025-09-08 16:35:34', 'Cancelled'),
(17, '9859609348', 'Withdraw', '1000', '1610.00', '2025-09-08 17:05:51', 'Success'),
(18, '9859609348', 'Withdraw', '1000', '2610.00', '2025-09-08 17:06:10', 'Cancelled'),
(19, '9859609348', 'SRIDEVI', '1', '2608', '2025-09-08 17:32:39', 'Success'),
(20, '09001310480', 'Online', '4', '924.00', '2025-09-09 11:02:56', 'Success'),
(21, '09001310480', 'Online', '1', '925.00', '2025-09-09 11:03:22', 'Success'),
(22, '9859609348', 'Online', '1', '2609.00', '2025-09-09 11:03:36', 'Success'),
(23, '9859609348', 'Online', '9', '2600.00', '2025-09-09 11:03:50', 'Success'),
(24, '9859609348', 'Bet Win', '0.6000000000000001', '2603', '2025-09-09 11:38:50', 'Success'),
(25, '9859609348', 'Bet Win', '0.60', '2603.6', '2025-09-09 11:39:28', 'Success'),
(26, '9859609348', 'Bet Win', '0.60', '2604.2', '2025-09-09 11:40:04', 'Win'),
(27, '9859609348', 'MILAN MORNING', '0.60', '2605.4', '2025-09-09 11:45:02', 'Win'),
(28, '9859609348', 'MILAN MORNING', '0.60', '2604.8', '2025-09-09 11:56:15', 'Loss'),
(29, '5354564356', 'Commission', '0.15', '2449.6', '2025-09-09 12:26:43', 'Success'),
(30, '5354564356', 'Online', '10', '2459.60', '2025-09-09 12:47:58', 'Success'),
(31, '9859609348', 'KALYANft', '1', '2603.8', '2025-09-13 15:14:21', 'Success'),
(32, '9859609348', 'MAIN BAJAR DAY', '3', '2600.8', '2025-09-13 15:15:27', 'Success'),
(33, '9859609348', 'MAIN BAJAR DAY', '0', '2600.8', '2025-09-13 15:19:11', 'Success'),
(34, '9859609348', 'MAIN BAJAR DAY', '0', '2600.8', '2025-09-13 15:19:22', 'Success'),
(35, '9859609348', 'KALYANft', '1', '2599.8', '2025-09-13 15:23:11', 'Success'),
(36, '9859609348', 'Withdraw', '1000', '1599.80', '2025-09-13 15:25:46', 'Success'),
(37, '9859609348', 'Withdraw', '1000', '599.80', '2025-09-13 15:39:50', 'Success'),
(38, '9859609348', 'Withdraw', '1000', '1599.80', '2025-09-13 15:40:10', 'Cancelled'),
(39, '5354564356', 'DISAWAR', '4', '2455.6', '2025-10-06 17:22:03', 'Success'),
(40, '5354564356', 'DISAWAR', '4', '2451.6', '2025-10-06 17:22:31', 'Success'),
(41, '5354564356', 'DISAWAR', '4', '2447.6', '2025-10-06 17:23:51', 'Success'),
(42, '5354564356', 'DISAWAR', '1', '2446.6', '2025-10-06 17:38:28', 'Success'),
(43, '5354564356', 'DISAWAR', '2', '2444.6', '2025-10-06 17:46:04', 'Success'),
(44, '5354564356', 'DISAWAR', '2', '2442.6', '2025-10-06 17:48:32', 'Success'),
(45, '5354564356', 'DISAWAR', '1', '2441.6', '2025-10-08 15:11:54', 'Success'),
(46, '5354564356', 'DISAWAR', '1', '2440.6', '2025-10-08 22:34:53', 'Success'),
(47, '5354564356', 'DISAWAR', '1', '2439.6', '2025-10-08 22:38:31', 'Success'),
(48, '5354564356', 'DISAWAR', '1', '2438.6', '2025-10-08 22:43:42', 'Success'),
(49, '5354564356', 'DISAWAR', '1', '2437.6', '2025-10-08 22:45:27', 'Success'),
(50, '5354564356', 'DISAWAR', '2', '2435.6', '2025-10-08 22:46:53', 'Success'),
(51, '5354564356', 'DISAWAR', '1', '2434.6', '2025-10-08 22:54:38', 'Success'),
(52, '5354564356', 'DISAWAR', '1', '2433.6', '2025-10-08 22:55:22', 'Success'),
(53, '5354564356', 'DISAWAR', '2', '2431.6', '2025-10-08 22:58:57', 'Success'),
(54, '5354564356', 'DISAWAR', '4', '2427.6', '2025-10-08 22:59:06', 'Success'),
(55, '5354564356', 'DISAWAR', '2', '2425.6', '2025-10-08 22:59:16', 'Success'),
(56, '5354564356', 'DISAWAR', '2', '2423.6', '2025-10-08 22:59:32', 'Success'),
(57, '5354564356', 'DISAWAR', '7', '2416.6', '2025-10-08 23:27:34', 'Success'),
(58, '5354564356', 'DISAWAR', '7', '2409.6', '2025-10-09 05:56:19', 'Success'),
(59, '5354564356', 'DISAWAR', '1', '2408.6', '2025-10-09 06:09:16', 'Success'),
(60, '5354564356', 'DISAWAR', '1', '2407.6', '2025-10-09 06:19:18', 'Success'),
(61, '5354564356', 'DISAWAR', '6', '2401.6', '2025-10-09 06:27:24', 'Success'),
(62, '5354564356', 'DISAWAR', '6', '2395.6', '2025-10-09 06:27:57', 'Success'),
(63, '5354564356', 'DISAWAR', '7', '2388.6', '2025-10-09 06:29:38', 'Success'),
(64, '5354564356', 'DISAWAR', '1', '2387.6', '2025-10-09 06:32:20', 'Success'),
(65, '5354564356', 'DISAWAR', '5', '2382.6', '2025-10-09 06:33:30', 'Success'),
(66, '5354564356', 'DISAWAR', '9', '2373.6', '2025-10-09 06:35:38', 'Success');

-- --------------------------------------------------------

--
-- Table structure for table `BANK`
--

CREATE TABLE `BANK` (
  `Id` int(11) NOT NULL,
  `bankname` varchar(20) NOT NULL,
  `holder` varchar(20) NOT NULL,
  `acnumber` varchar(20) NOT NULL,
  `ifsc` varchar(20) NOT NULL,
  `upi` varchar(20) NOT NULL,
  `mobile` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `BANK`
--

INSERT INTO `BANK` (`Id`, `bankname`, `holder`, `acnumber`, `ifsc`, `upi`, `mobile`) VALUES
(5, '', '', '', '', 'Test@3fjl', '9859609348'),
(6, '', '', '', '', 'sg45', '5354564356');

-- --------------------------------------------------------

--
-- Table structure for table `bets`
--

CREATE TABLE `bets` (
  `ID` int(11) NOT NULL,
  `USER_ID` varchar(255) DEFAULT NULL,
  `DATE_TIME` datetime NOT NULL DEFAULT current_timestamp(),
  `phone` varchar(123) DEFAULT NULL,
  `point` int(10) DEFAULT NULL,
  `GAME_ID` int(10) DEFAULT NULL,
  `GAME` varchar(100) DEFAULT NULL,
  `number` varchar(100) DEFAULT NULL,
  `STATUS` varchar(100) DEFAULT NULL,
  `RESULT` varchar(100) DEFAULT NULL,
  `RAND` varchar(200) DEFAULT NULL,
  `DATE` date DEFAULT NULL,
  `TYPE` varchar(100) DEFAULT NULL,
  `WIN_AMOUNT` int(10) DEFAULT NULL,
  `NUMBER1` int(10) DEFAULT NULL,
  `TIME` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `bets`
--

INSERT INTO `bets` (`ID`, `USER_ID`, `DATE_TIME`, `phone`, `point`, `GAME_ID`, `GAME`, `number`, `STATUS`, `RESULT`, `RAND`, `DATE`, `TYPE`, `WIN_AMOUNT`, `NUMBER1`, `TIME`) VALUES
(352, NULL, '2025-10-08 22:38:31', '5354564356', 1, 5, 'DISAWAR', '99', 'Loss', '35', NULL, NULL, 'Jodi', NULL, NULL, NULL),
(353, NULL, '2025-10-08 22:43:42', '5354564356', 1, 5, 'DISAWAR', '14', 'Loss', '35', NULL, NULL, 'Jodi', NULL, NULL, NULL),
(354, NULL, '2025-10-08 22:45:27', '5354564356', 1, 5, 'DISAWAR', '78', 'Loss', '35', NULL, NULL, 'Jodi', NULL, NULL, NULL),
(355, NULL, '2025-10-08 22:46:53', '5354564356', 2, 5, 'DISAWAR', '82', 'Loss', '35', NULL, NULL, 'Jodi', NULL, NULL, NULL),
(356, NULL, '2025-10-08 22:54:38', '5354564356', 1, 5, 'DISAWAR', '90', 'Loss', '35', NULL, NULL, 'Jodi', NULL, NULL, NULL),
(357, NULL, '2025-10-08 22:55:22', '5354564356', 1, 5, 'DISAWAR', '99', 'Loss', '35', NULL, NULL, 'Jodi', NULL, NULL, NULL),
(358, NULL, '2025-10-08 22:58:57', '5354564356', 2, 5, 'DISAWAR', '2', 'Loss', '35', NULL, NULL, 'Manual', NULL, NULL, NULL),
(360, NULL, '2025-10-08 22:59:06', '5354564356', 2, 5, 'DISAWAR', '555', 'Win', '5', NULL, NULL, 'BaharHaraf', NULL, NULL, NULL),
(361, NULL, '2025-10-08 22:59:16', '5354564356', 2, 5, 'DISAWAR', '22', 'Loss', '35', NULL, NULL, 'Crossing', NULL, NULL, NULL),
(362, NULL, '2025-10-08 22:59:32', '5354564356', 2, 5, 'DISAWAR', '22', 'Loss', '35', NULL, NULL, 'CopyPaste', NULL, NULL, NULL),
(363, NULL, '2025-10-08 23:27:34', '5354564356', 7, 5, 'DISAWAR', '01', 'Loss', '35', NULL, NULL, 'Jodi', NULL, NULL, NULL),
(364, NULL, '2025-10-09 05:56:19', '5354564356', 7, 5, 'DISAWAR', '34', NULL, NULL, NULL, NULL, 'Jodi', NULL, NULL, NULL),
(365, NULL, '2025-10-09 11:39:16', '5354564356', 1, 5, 'DISAWAR', '34', NULL, NULL, NULL, NULL, 'Jodi', NULL, NULL, NULL),
(366, NULL, '2025-10-09 11:49:18', '5354564356', 1, 5, 'DISAWAR', '42', NULL, NULL, NULL, NULL, 'Jodi', NULL, NULL, NULL),
(367, NULL, '2025-10-09 06:27:24', '5354564356', 6, 5, 'DISAWAR', '01', NULL, NULL, NULL, NULL, 'Jodi', NULL, NULL, NULL),
(368, NULL, '2025-10-08 06:27:57', '5354564356', 6, 5, 'DISAWAR', '87', 'Loss', '35', NULL, NULL, 'Jodi', NULL, NULL, NULL),
(369, NULL, '2025-10-08 06:29:38', '5354564356', 7, 5, 'DISAWAR', '70', 'Loss', '35', NULL, NULL, 'Jodi', NULL, NULL, NULL),
(370, NULL, '2025-10-08 06:32:20', '5354564356', 1, 5, 'DISAWAR', '39', 'Loss', '35', NULL, NULL, 'Jodi', NULL, NULL, NULL),
(371, NULL, '2025-10-08 06:35:38', '5354564356', 5, 5, 'DISAWAR', '42', 'Loss', '35', NULL, NULL, 'Jodi', NULL, NULL, NULL),
(372, NULL, '2025-10-08 06:35:38', '5354564356', 4, 5, 'DISAWAR', '78', 'Loss', '35', NULL, NULL, 'Jodi', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `BET_TRANSACTIONS`
--

CREATE TABLE `BET_TRANSACTIONS` (
  `ID` int(11) NOT NULL,
  `USER_ID` varchar(255) DEFAULT NULL,
  `DATE_TIME` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `AMOUNT` int(10) DEFAULT NULL,
  `GAME_ID` int(10) DEFAULT NULL,
  `GAME` varchar(100) DEFAULT NULL,
  `NUMBER` varchar(100) DEFAULT NULL,
  `STATUS` varchar(100) DEFAULT NULL,
  `RESULT` varchar(100) DEFAULT NULL,
  `RAND` varchar(200) DEFAULT NULL,
  `DATE` date DEFAULT NULL,
  `TYPE` varchar(100) DEFAULT NULL,
  `WIN_AMOUNT` int(10) DEFAULT NULL,
  `NUMBER1` int(10) DEFAULT NULL,
  `TIME` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `BET_TRANSACTIONS`
--

INSERT INTO `BET_TRANSACTIONS` (`ID`, `USER_ID`, `DATE_TIME`, `AMOUNT`, `GAME_ID`, `GAME`, `NUMBER`, `STATUS`, `RESULT`, `RAND`, `DATE`, `TYPE`, `WIN_AMOUNT`, `NUMBER1`, `TIME`) VALUES
(1, '1', '2024-02-05 13:04:28', 10, 5, 'open', '1', 'CHECKED', 'PASS', '749580803', '2024-02-05', 'Single', 100, NULL, NULL),
(2, '1', '2024-07-08 13:42:41', 100, 5, 'close', '444', '', '', '555957701', '2024-07-08', 'Tripple Patti', NULL, NULL, NULL),
(3, '1', '2024-07-08 13:43:19', 200, 5, 'close', '122', '', '', '264558851', '2024-07-08', 'Double Patti', NULL, NULL, NULL),
(4, '1', '2024-07-08 19:06:27', 10, 1, 'close', '0', '', '', '1480825866', '2024-07-10', 'Single', NULL, NULL, NULL),
(5, '1', '2024-07-08 19:06:27', 10, 1, 'close', '1', '', '', '1480825866', '2024-07-10', 'Single', NULL, NULL, NULL),
(6, '1', '2024-07-09 15:43:44', 50, 8, 'open', '7', '', '', '857678185', '2024-07-10', 'Single', NULL, NULL, NULL),
(7, '1', '2024-07-09 15:47:41', 50, 6, 'close', '128', '', '', '823387570', '2024-07-09', 'Single Patti', NULL, NULL, NULL),
(8, '1', '2024-07-11 11:33:35', 14, 4, 'close', '137', '', '', '1012989494', '2024-07-11', 'Single Patti', NULL, NULL, NULL),
(9, '1', '2024-07-11 11:34:30', 13, 6, 'JODI', '05', '', '', '172419444', '2024-07-11', 'Jodi', NULL, NULL, NULL),
(10, '1', '2024-07-11 19:52:35', 10, 1, 'open', '100', '', '', '1269193969', '2024-07-12', 'Double Patti', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `commission`
--

CREATE TABLE `commission` (
  `ID` int(11) NOT NULL,
  `betId` int(11) NOT NULL,
  `betuser` varchar(123) DEFAULT NULL,
  `DATE_TIME` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `phone` varchar(123) DEFAULT NULL,
  `point` int(10) DEFAULT NULL,
  `GAME_ID` int(10) DEFAULT NULL,
  `GAME` varchar(100) DEFAULT NULL,
  `Pay` varchar(123) NOT NULL DEFAULT 'pending',
  `STATUS` varchar(100) DEFAULT NULL,
  `earn` varchar(123) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `commission`
--

INSERT INTO `commission` (`ID`, `betId`, `betuser`, `DATE_TIME`, `phone`, `point`, `GAME_ID`, `GAME`, `Pay`, `STATUS`, `earn`) VALUES
(305, 328, '9859609348', '2025-09-09 06:56:43', '5354564356', 3, 1, 'Jodi', 'success', 'Loss', '0.15'),
(306, 327, '9859609348', '2025-09-04 06:37:45', '5354564356', 33, 1, 'Jodi', 'pending', 'Loss', '1.65');

-- --------------------------------------------------------

--
-- Table structure for table `FORGOT`
--

CREATE TABLE `FORGOT` (
  `ID` int(11) NOT NULL,
  `MOBILE` varchar(255) DEFAULT NULL,
  `OTP` varchar(255) DEFAULT NULL,
  `STATUS` varchar(255) DEFAULT NULL,
  `DATE` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `FREE_GAME`
--

CREATE TABLE `FREE_GAME` (
  `ID` int(11) NOT NULL,
  `GAME_ID` varchar(255) DEFAULT NULL,
  `WHICH_ONE` varchar(255) DEFAULT NULL,
  `FIRST` varchar(255) DEFAULT NULL,
  `SECOND` varchar(255) DEFAULT NULL,
  `THIRD` varchar(255) DEFAULT NULL,
  `FORTH` varchar(255) DEFAULT NULL,
  `DATE` date DEFAULT NULL,
  `FIFTH` varchar(255) DEFAULT NULL,
  `SIXTH` varchar(255) DEFAULT NULL,
  `SEVEN` varchar(255) DEFAULT NULL,
  `EIGHT` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `FREE_GAME`
--

INSERT INTO `FREE_GAME` (`ID`, `GAME_ID`, `WHICH_ONE`, `FIRST`, `SECOND`, `THIRD`, `FORTH`, `DATE`, `FIFTH`, `SIXTH`, `SEVEN`, `EIGHT`) VALUES
(1, '1', 'OPEN', '111', '222', '333', '444', '2024-02-05', NULL, NULL, NULL, NULL),
(2, '1', 'JODI', '11', '22', '33', '44', '2024-02-05', '55', '66', '77', '88'),
(3, '1', 'PATTI', '123', '234', '345', '456', '2024-02-05', NULL, NULL, NULL, NULL),
(4, '2', 'OPEN', '112', '222', '333', '444', '2024-02-05', NULL, NULL, NULL, NULL),
(5, '2', 'JODI', '11', '22', '33', '44', '2024-02-05', '55', '66', '77', '88'),
(6, '2', 'PATTI', '123', '234', '345', '456', '2024-02-05', NULL, NULL, NULL, NULL),
(7, '3', 'OPEN', '111', '222', '333', '444', '2024-02-05', NULL, NULL, NULL, NULL),
(8, '3', 'JODI', '3', '6', '9', '2', '2024-02-05', '', '', '', ''),
(9, '3', 'PATTI', '999', '888', '777', '666', '2024-02-05', NULL, NULL, NULL, NULL),
(10, '4', 'OPEN', '123', '456', '789', '567', '2024-02-05', NULL, NULL, NULL, NULL),
(11, '4', 'JODI', '00', '11', '77', '88', '2024-02-05', '', '', '', ''),
(12, '4', 'PATTI', '768', '456', '890', '468', '2024-02-05', NULL, NULL, NULL, NULL),
(13, '5', 'OPEN', '389', '479', '356', '289', '2024-02-05', NULL, NULL, NULL, NULL),
(14, '5', 'JODI', '00', '11', '22', '77', '2024-02-05', '', '', '', ''),
(15, '5', 'PATTI', '479', '790', '357', '689', '2024-02-05', NULL, NULL, NULL, NULL),
(16, '6', 'OPEN', '689', '356', '378', '579', '2024-02-05', NULL, NULL, NULL, NULL),
(17, '6', 'JODI', '87', '54', '99', '33', '2024-02-05', '', '', '', ''),
(18, '6', 'PATTI', '235', '468', '470', '567', '2024-02-05', NULL, NULL, NULL, NULL),
(19, '7', 'OPEN', '111', '666', '888', '999', '2024-02-05', NULL, NULL, NULL, NULL),
(20, '7', 'JODI', '67', '88', '99', '55', '2024-02-05', '', '', '', ''),
(21, '7', 'PATTI', '567', '990', '467', '110', '2024-02-05', NULL, NULL, NULL, NULL),
(22, '8', 'OPEN', '678', '880', '440', '220', '2024-02-05', NULL, NULL, NULL, NULL),
(23, '8', 'JODI', '11', '56', '77', '08', '2024-02-05', '', '', '', ''),
(24, '8', 'PATTI', '111', '566', '889', '880', '2024-02-05', NULL, NULL, NULL, NULL),
(25, '9', 'OPEN', '178', '456', '200', '222', '2024-02-05', NULL, NULL, NULL, NULL),
(26, '9', 'JODI', '20', '78', '90', '76', '2024-02-05', '', '', '', ''),
(27, '9', 'PATTI', '799', '778', '445', '770', '2024-02-05', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `GAMES`
--

CREATE TABLE `GAMES` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(255) DEFAULT NULL,
  `TIME1` time DEFAULT NULL,
  `TIME2` time DEFAULT NULL,
  `RTIME` time DEFAULT NULL,
  `RESULT1` varchar(123) DEFAULT NULL,
  `RESULT2` varchar(123) DEFAULT NULL,
  `RESULT_TIME` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `PAGE` varchar(255) DEFAULT NULL,
  `POSITION` int(11) DEFAULT 1,
  `GUESS` varchar(255) DEFAULT NULL,
  `HIGHLIGHT` varchar(255) DEFAULT NULL,
  `PANEL_RESULT` longtext DEFAULT NULL,
  `JODI_RESULT` longtext DEFAULT NULL,
  `DAYS` int(10) DEFAULT NULL,
  `REMARK2` varchar(255) DEFAULT NULL,
  `HOLIDAY` varchar(10) DEFAULT NULL,
  `INACTIVE` varchar(100) DEFAULT NULL,
  `AUTO_GUESS` varchar(200) DEFAULT NULL,
  `COLOR` varchar(255) DEFAULT NULL,
  `PLAY` varchar(100) DEFAULT NULL,
  `RATE` varchar(123) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `GAMES`
--

INSERT INTO `GAMES` (`ID`, `NAME`, `TIME1`, `TIME2`, `RTIME`, `RESULT1`, `RESULT2`, `RESULT_TIME`, `PAGE`, `POSITION`, `GUESS`, `HIGHLIGHT`, `PANEL_RESULT`, `JODI_RESULT`, `DAYS`, `REMARK2`, `HOLIDAY`, `INACTIVE`, `AUTO_GUESS`, `COLOR`, `PLAY`, `RATE`) VALUES
(1, 'MILAN MORNING', '15:39:00', '16:21:00', '00:00:00', '', '', '2025-09-13 10:51:00', 'milanmorning', 7, '', '', '', '', 7, NULL, NULL, NULL, '', '', 'unchecked', '2'),
(2, 'SRIDEVI', '11:35:00', '13:00:00', '00:00:00', '', '', '2025-10-11 07:30:00', 'sridevi', 7, '', '', '', '', 7, NULL, NULL, NULL, '', '', 'unchecked', '1.5'),
(3, 'MAIN BAJAR DAY', '15:00:00', '17:00:00', '00:00:00', '', '', '2025-10-08 09:30:00', 'mainbajarday', 3, '', '', '', '', 7, NULL, NULL, NULL, '', '', 'checked', ''),
(4, 'KALYANft', '16:00:00', '18:00:00', '03:00:00', '', '', '2025-09-29 12:02:54', 'kalyan', 1, '', '', '', '', 7, NULL, NULL, NULL, '', '', 'unchecked', ''),
(5, 'DISAWAR', '22:38:00', '07:32:00', '06:00:00', '', '', '2025-10-11 06:20:48', 'timebazar', NULL, '', '', '', '', 7, NULL, NULL, NULL, '', '', 'unchecked', ''),
(6, 'MILAN NIGHT77', '21:00:00', '23:00:00', '00:00:00', '', '', '2025-10-08 17:30:00', 'milannight', 5, '234', '234', '234', 'ertert', 7, NULL, NULL, NULL, 'erty', 'erty', 'unchecked', ''),
(7, 'MAIN BAZAR', '21:40:00', '23:45:00', '00:00:00', '', '', '2025-09-08 09:36:32', 'mainbazar', 7, '', '', '', '', 7, NULL, NULL, NULL, '', '', 'checked', ''),
(15, 'SRIDEVI NIGHT', '19:00:00', '20:00:00', '00:00:00', '', '', '2025-10-06 12:15:06', 'sridevinight', 2, '', '', '', '', 7, NULL, NULL, NULL, '', '', 'checked', '');

-- --------------------------------------------------------

--
-- Table structure for table `OPEN_CLOSE_PATTI`
--

CREATE TABLE `OPEN_CLOSE_PATTI` (
  `OPEN_CLOSE_PATTI` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `OPEN_CLOSE_PATTI`
--

INSERT INTO `OPEN_CLOSE_PATTI` (`OPEN_CLOSE_PATTI`) VALUES
('100'),
('119'),
('155'),
('227'),
('335'),
('344'),
('399'),
('588'),
('669'),
('200'),
('110'),
('228'),
('255'),
('336'),
('499'),
('660'),
('688'),
('778'),
('300'),
('166'),
('229'),
('337'),
('355'),
('445'),
('599'),
('779'),
('788'),
('400'),
('112'),
('220'),
('266'),
('338'),
('446'),
('455'),
('699'),
('770'),
('500'),
('113'),
('122'),
('177'),
('339'),
('366'),
('447'),
('799'),
('889'),
('600'),
('114'),
('277'),
('330'),
('448'),
('466'),
('556'),
('880'),
('899'),
('700'),
('115'),
('133'),
('188'),
('223'),
('377'),
('449'),
('557'),
('566'),
('800'),
('116'),
('224'),
('233'),
('288'),
('440'),
('477'),
('558'),
('990'),
('900'),
('117'),
('144'),
('199'),
('225'),
('388'),
('559'),
('577'),
('667'),
('550'),
('668'),
('244'),
('299'),
('226'),
('488'),
('677'),
('118'),
('334'),
('128'),
('137'),
('146'),
('236'),
('245'),
('290'),
('380'),
('470'),
('489'),
('560'),
('678'),
('579'),
('129'),
('138'),
('147'),
('156'),
('237'),
('246'),
('345'),
('390'),
('480'),
('570'),
('679'),
('120'),
('139'),
('148'),
('157'),
('238'),
('247'),
('256'),
('346'),
('490'),
('580'),
('670'),
('689'),
('130'),
('149'),
('158'),
('167'),
('239'),
('248'),
('257'),
('347'),
('356'),
('590'),
('680'),
('789'),
('140'),
('159'),
('168'),
('230'),
('249'),
('258'),
('267'),
('348'),
('357'),
('456'),
('690'),
('780'),
('123'),
('150'),
('169'),
('178'),
('240'),
('259'),
('268'),
('349'),
('358'),
('457'),
('367'),
('790'),
('124'),
('160'),
('179'),
('250'),
('269'),
('278'),
('340'),
('359'),
('368'),
('458'),
('467'),
('890'),
('125'),
('134'),
('170'),
('189'),
('260'),
('279'),
('350'),
('369'),
('378'),
('459'),
('567'),
('468'),
('126'),
('135'),
('180'),
('234'),
('270'),
('289'),
('360'),
('379'),
('450'),
('469'),
('478'),
('568'),
('127'),
('136'),
('145'),
('190'),
('235'),
('280'),
('370'),
('479'),
('460'),
('569'),
('389'),
('578'),
('589'),
('000'),
('111'),
('222'),
('333'),
('444'),
('555'),
('666'),
('777'),
('888'),
('999');

-- --------------------------------------------------------

--
-- Table structure for table `PAYMENTS`
--

CREATE TABLE `PAYMENTS` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(255) DEFAULT NULL,
  `MODE` varchar(255) DEFAULT NULL,
  `DATE` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `AMOUNT` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `PAYMENTS`
--

INSERT INTO `PAYMENTS` (`ID`, `NAME`, `MODE`, `DATE`, `AMOUNT`) VALUES
(1, 'TXXt UXXr', 'ONLINE', '2024-07-11 14:27:31', '100');

-- --------------------------------------------------------

--
-- Table structure for table `PAYMENT_QUEUE`
--

CREATE TABLE `PAYMENT_QUEUE` (
  `ID` int(11) NOT NULL,
  `USER_ID` varchar(20) DEFAULT NULL,
  `AMOUNT` varchar(100) DEFAULT NULL,
  `TIME` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `IMAGE` varchar(100) DEFAULT NULL,
  `MODE` varchar(100) DEFAULT NULL,
  `STATUS` varchar(100) DEFAULT NULL,
  `TXN_ID` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `PAYMENT_QUEUE`
--

INSERT INTO `PAYMENT_QUEUE` (`ID`, `USER_ID`, `AMOUNT`, `TIME`, `IMAGE`, `MODE`, `STATUS`, `TXN_ID`) VALUES
(43, '9859609348', '100', '2025-09-08 15:26:06', NULL, 'manual', 'approved', '588756ghjhj'),
(44, '9859609348', '102', '2025-09-08 15:41:34', NULL, 'manual', 'approved', '786r67yuhb'),
(45, '9859609348', '101', '2025-09-08 15:43:02', NULL, 'manual', 'approved', 'asdfas34'),
(46, '9859609348', '105', '2025-09-08 15:43:02', NULL, 'manual', 'approved', 'sdasf344'),
(47, '9859609348', '100', '2025-09-08 15:49:13', NULL, 'manual', 'approved', '48ke100rs408pr'),
(48, '9859609348', '102', '2025-09-08 15:49:13', NULL, 'manual', 'approved', 'contin102408pr48ke'),
(49, '5354564356', '100', '2025-09-08 15:49:13', NULL, 'manual', 'approved', 'first 4356ke100rsat256pr'),
(50, '5354564356', '105', '2025-09-08 16:15:17', NULL, 'manual', 'pending', '105scondsepost4356 wale ka '),
(51, '5354564356', '100', '2025-09-08 16:07:03', NULL, 'manual', 'pending', 'sdfg44'),
(52, '5354564356', '100', '2025-09-08 16:15:46', NULL, 'manual', 'approved', '2435wretdf'),
(53, '5354564356', '2000', '2025-09-08 16:28:43', NULL, 'manual', 'approved', 'testst'),
(54, '9859609348', '2000', '2025-09-08 16:30:09', NULL, 'manual', 'approved', 'testertydgfh'),
(55, '9859609348', '100', '2025-09-09 14:32:11', NULL, 'manual', 'pending', 'testdeooos'),
(56, '9859609348', '100', '2025-09-13 15:38:49', NULL, 'manual', 'pending', ''),
(57, '9859609348', '100', '2025-09-13 16:05:33', NULL, 'manual', 'pending', ''),
(58, '5354564356', '100', '2025-10-09 10:50:54', NULL, 'manual', 'pending', '');

-- --------------------------------------------------------

--
-- Table structure for table `RESULT`
--

CREATE TABLE `RESULT` (
  `ID` int(11) NOT NULL,
  `GAME_ID` varchar(255) DEFAULT NULL,
  `GAME_NAME` varchar(123) NOT NULL,
  `RESULT1` varchar(255) DEFAULT NULL,
  `RESULT2` varchar(255) DEFAULT NULL,
  `Jodi` int(11) DEFAULT NULL,
  `Manual` varchar(123) DEFAULT NULL,
  `andarHaraf` varchar(123) DEFAULT NULL,
  `baharHaraf` varchar(123) DEFAULT NULL,
  `Crossing` varchar(123) DEFAULT NULL,
  `CopyPaste` varchar(123) DEFAULT NULL,
  `DATE` timestamp NOT NULL DEFAULT current_timestamp(),
  `REMARK` varchar(255) DEFAULT NULL,
  `REMARK2` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `RESULT`
--

INSERT INTO `RESULT` (`ID`, `GAME_ID`, `GAME_NAME`, `RESULT1`, `RESULT2`, `Jodi`, `Manual`, `andarHaraf`, `baharHaraf`, `Crossing`, `CopyPaste`, `DATE`, `REMARK`, `REMARK2`) VALUES
(131, '5', 'DISAWAR', '12', '12', 12, '12', '1', '2', '12', '12', '2025-10-05 18:30:00', NULL, NULL),
(132, '5', 'DISAWAR', '35', '35', 35, '35', '3', '5', '35', '35', '2025-10-07 18:30:00', NULL, NULL),
(133, '5', 'DISAWAR', '45', '45', 45, '45', '4', '5', '45', '45', '2025-10-09 18:30:00', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `SETTINGS`
--

CREATE TABLE `SETTINGS` (
  `ID` int(11) NOT NULL,
  `MOBILE` varchar(255) DEFAULT NULL,
  `WHATSAPP` varchar(123) DEFAULT NULL,
  `SINGLE` varchar(255) DEFAULT NULL,
  `JODI` varchar(255) DEFAULT NULL,
  `SINGLE_PATTI` varchar(255) DEFAULT NULL,
  `DOUBLE_PATTI` varchar(255) DEFAULT NULL,
  `TRIPPLE_PATTI` varchar(255) DEFAULT NULL,
  `HALF_SANGAM` varchar(255) DEFAULT NULL,
  `FULL_SANGAM` varchar(255) DEFAULT NULL,
  `GPAY` varchar(100) DEFAULT NULL,
  `PAYTM` varchar(100) DEFAULT NULL,
  `PHONEPAY` varchar(100) DEFAULT NULL,
  `STARLINE` varchar(100) DEFAULT NULL,
  `STARLINE_SINGLE` varchar(100) DEFAULT NULL,
  `STARLINE_DOUBLE` varchar(100) DEFAULT NULL,
  `USERNAME` varchar(255) DEFAULT NULL,
  `PASSWORD` varchar(255) DEFAULT NULL,
  `STARLINE_GAME` varchar(100) DEFAULT NULL,
  `APP_NAME` varchar(100) DEFAULT NULL,
  `GUESS` varchar(100) DEFAULT NULL,
  `GATEWAY` varchar(100) DEFAULT NULL,
  `GATEWAY_KEY` varchar(100) DEFAULT NULL,
  `RECHARGE` int(10) DEFAULT NULL,
  `WITHDRAW` int(10) DEFAULT NULL,
  `BONUS` int(10) DEFAULT NULL,
  `REFER` int(10) DEFAULT NULL,
  `OTP` varchar(100) DEFAULT NULL,
  `OTP_KEY` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `SETTINGS`
--

INSERT INTO `SETTINGS` (`ID`, `MOBILE`, `WHATSAPP`, `SINGLE`, `JODI`, `SINGLE_PATTI`, `DOUBLE_PATTI`, `TRIPPLE_PATTI`, `HALF_SANGAM`, `FULL_SANGAM`, `GPAY`, `PAYTM`, `PHONEPAY`, `STARLINE`, `STARLINE_SINGLE`, `STARLINE_DOUBLE`, `USERNAME`, `PASSWORD`, `STARLINE_GAME`, `APP_NAME`, `GUESS`, `GATEWAY`, `GATEWAY_KEY`, `RECHARGE`, `WITHDRAW`, `BONUS`, `REFER`, `OTP`, `OTP_KEY`) VALUES
(1, 'admin', '9837281933', '100', '1000', '100', '200', '300', '800', '400', '9876543210', '9876543210', '9876543210', '', '', '', 'Rahul', '$2y$12$fwN.wHkFaFBZcD9cjWv5Uuzx/JvNkx7E9KfTCnuLlxjyLdpGOZ36.', 'NO', '', 'YES', '9672273290@ybl', '123', 101, 121, 20, 10, '232323', '123');

-- --------------------------------------------------------

--
-- Table structure for table `STARLINE`
--

CREATE TABLE `STARLINE` (
  `ID` int(11) NOT NULL,
  `RESULT` varchar(255) DEFAULT NULL,
  `GAME_ID` varchar(100) DEFAULT NULL,
  `TIME` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `STARLINE`
--

INSERT INTO `STARLINE` (`ID`, `RESULT`, `GAME_ID`, `TIME`) VALUES
(1, '12', '', '2024-02-05 09:00:00'),
(2, '13', '', '2024-02-05 10:00:00'),
(3, '14', '', '2024-02-05 11:00:00'),
(4, '22', '', '2024-02-05 12:00:00'),
(5, '66', '', '2024-02-05 13:00:00'),
(6, '88', '', '2024-02-05 14:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `STARLINE_GAMES`
--

CREATE TABLE `STARLINE_GAMES` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(255) DEFAULT NULL,
  `INACTIVE` varchar(100) DEFAULT NULL,
  `START_HOUR` varchar(100) DEFAULT NULL,
  `INTERVAL_HOUR` varchar(100) DEFAULT NULL,
  `END_HOUR` varchar(100) DEFAULT NULL,
  `STATUS` varchar(100) DEFAULT NULL,
  `PAGE` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `STARLINE_GAMES`
--

INSERT INTO `STARLINE_GAMES` (`ID`, `NAME`, `INACTIVE`, `START_HOUR`, `INTERVAL_HOUR`, `END_HOUR`, `STATUS`, `PAGE`) VALUES
(1, 'POONA STARLINE', NULL, '9', '6', '14', 'ACTIVE', 'POONA'),
(2, 'JK STARLINE', NULL, '9', '6', '14', 'ACTIVE', 'JK'),
(3, 'GUJRAT STARLINE', NULL, '12', '4', '15', 'DEACTIVE', 'GUJRAT'),
(4, 'GOLD LINE', NULL, '10', '6', '15', 'ACTIVE', 'GOLDLINE');

-- --------------------------------------------------------

--
-- Table structure for table `STARLINE_GUESS`
--

CREATE TABLE `STARLINE_GUESS` (
  `PATTI` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `TRANSACTIONS`
--

CREATE TABLE `TRANSACTIONS` (
  `ID` int(11) NOT NULL,
  `USER_ID` varchar(255) DEFAULT NULL,
  `DATE_TIME` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `AMOUNT` int(10) DEFAULT NULL,
  `GAME_ID` int(10) DEFAULT NULL,
  `GAME` varchar(100) DEFAULT NULL,
  `BET_ID` int(10) DEFAULT NULL,
  `BALANCE` decimal(10,2) DEFAULT NULL,
  `REMARK` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `TRANSACTIONS`
--

INSERT INTO `TRANSACTIONS` (`ID`, `USER_ID`, `DATE_TIME`, `AMOUNT`, `GAME_ID`, `GAME`, `BET_ID`, `BALANCE`, `REMARK`) VALUES
(1, '1', '2024-02-05 13:00:45', 1000, NULL, NULL, NULL, 1000.00, ''),
(2, '1', '2024-02-05 13:01:02', -100, NULL, NULL, NULL, 900.00, ''),
(3, '1', '2024-02-05 13:01:25', 10, 5, 'open', 1, 890.00, NULL),
(4, '1', '2024-02-05 13:01:58', 100, NULL, NULL, NULL, 990.00, 'Added'),
(5, '1', '2024-02-05 13:04:28', 100, NULL, NULL, 1, 1090.00, 'Game Win'),
(6, '1', '2024-07-08 13:42:41', 100, 5, 'close', 2, 990.00, NULL),
(7, '1', '2024-07-08 13:43:19', 200, 5, 'close', 3, 790.00, NULL),
(8, '1', '2024-07-08 19:06:27', 10, 1, 'close', 4, 780.00, NULL),
(9, '1', '2024-07-08 19:06:27', 10, 1, 'close', 5, 770.00, NULL),
(10, '1', '2024-07-09 15:43:44', 50, 8, 'open', 6, 720.00, NULL),
(11, '1', '2024-07-09 15:47:41', 50, 6, 'close', 7, 670.00, NULL),
(12, '1', '2024-07-11 11:33:35', 14, 4, 'close', 8, 656.00, NULL),
(13, '1', '2024-07-11 11:34:30', 13, 6, 'JODI', 9, 643.00, NULL),
(14, '1', '2024-07-11 14:27:31', 100, NULL, NULL, NULL, 743.00, 'Added'),
(15, '1', '2024-07-11 19:52:35', 10, 1, 'open', 10, 373.00, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `USERS`
--

CREATE TABLE `USERS` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(255) DEFAULT NULL,
  `EMAIL` varchar(255) DEFAULT NULL,
  `MOBILE` varchar(255) DEFAULT NULL,
  `OTP` varchar(123) DEFAULT NULL,
  `WALLET` decimal(10,2) DEFAULT NULL,
  `state` varchar(20) NOT NULL DEFAULT 'active',
  `PASSWORD` varchar(250) DEFAULT NULL,
  `GOOGLE_ID` varchar(250) DEFAULT NULL,
  `IMAGE` varchar(250) DEFAULT NULL,
  `REFER_BY` varchar(250) DEFAULT NULL,
  `role` varchar(20) NOT NULL DEFAULT 'user',
  `created_by` varchar(255) DEFAULT NULL,
  `DATE` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `USERS`
--

INSERT INTO `USERS` (`ID`, `NAME`, `EMAIL`, `MOBILE`, `OTP`, `WALLET`, `state`, `PASSWORD`, `GOOGLE_ID`, `IMAGE`, `REFER_BY`, `DATE`) VALUES
(19, 'charchit meena', NULL, '09001310480', NULL, 925.00, 'active', NULL, NULL, NULL, NULL, '2025-09-01 16:18:00'),
(20, 'Tes', NULL, '9859609348', NULL, 1599.80, 'active', NULL, NULL, NULL, '5354564356', '2025-09-01 16:18:00'),
(23, NULL, NULL, '5354564356', NULL, 2373.60, 'active', NULL, NULL, NULL, '', '2025-09-01 16:25:30'),
(25, NULL, NULL, '9876543211', NULL, 34.00, 'active', NULL, NULL, NULL, '', '2025-09-27 13:12:22'),
(26, NULL, NULL, '9251149244', NULL, NULL, 'active', NULL, NULL, NULL, '', '2025-10-08 17:23:17');

-- --------------------------------------------------------

--
-- Table structure for table `WINNERS`
--

CREATE TABLE `WINNERS` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(255) DEFAULT NULL,
  `GAME` varchar(255) DEFAULT NULL,
  `TIME` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `AMOUNT` varchar(255) DEFAULT NULL,
  `WIN_AMOUNT` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `WINNERS`
--

INSERT INTO `WINNERS` (`ID`, `NAME`, `GAME`, `TIME`, `AMOUNT`, `WIN_AMOUNT`) VALUES
(1, 'DXXpXk ChXXh', 'STARLINE', '2021-12-28 11:55:34', '10', '100'),
(4, 'NXRXXH XXHRXX', 'STARLINE', '2021-12-30 06:42:01', '10', '100'),
(5, 'DXXpXk ChXXh', 'STARLINE', '2021-12-30 09:35:02', '10', '100'),
(6, 'PRXKXXH', '', '2022-03-13 16:35:01', '10', '100'),
(7, 'NXRXXH XXHRXX', '', '2022-03-14 04:35:01', '56', '560'),
(8, 'TXXt XXXr', 'SRIDEVI NIGHT', '2024-02-05 13:04:28', '10', '100');

-- --------------------------------------------------------

--
-- Table structure for table `WITHDRAW`
--

CREATE TABLE `WITHDRAW` (
  `ID` int(11) NOT NULL,
  `MOBILE` varchar(100) NOT NULL,
  `HOLDER` varchar(255) DEFAULT NULL,
  `UPI` varchar(255) DEFAULT NULL,
  `AMOUNT` varchar(255) DEFAULT NULL,
  `TIME` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `STATUS` varchar(100) DEFAULT NULL,
  `BANK` varchar(255) DEFAULT NULL,
  `IFSC` varchar(255) DEFAULT NULL,
  `ACCOUNT` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `WITHDRAW`
--

INSERT INTO `WITHDRAW` (`ID`, `MOBILE`, `HOLDER`, `UPI`, `AMOUNT`, `TIME`, `STATUS`, `BANK`, `IFSC`, `ACCOUNT`) VALUES
(29, '9859609348', '', 'Test@3fjl', '1000', '2025-09-03 06:14:23', 'cancelled', '', '', ''),
(32, '9859609348', '', 'Test@3fjl', '1012', '2025-09-03 06:30:54', 'approved', '', '', ''),
(33, '9859609348', '', 'Test@3fjl', '1000', '2025-09-08 11:05:34', 'cancelled', '', '', ''),
(34, '9859609348', '', 'Test@3fjl', '1000', '2025-09-08 11:36:10', 'cancelled', '', '', ''),
(35, '9859609348', '', 'Test@3fjl', '1000', '2025-09-13 09:55:46', 'pending', '', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `BANK`
--
ALTER TABLE `BANK`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `bets`
--
ALTER TABLE `bets`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `BET_TRANSACTIONS`
--
ALTER TABLE `BET_TRANSACTIONS`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `commission`
--
ALTER TABLE `commission`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `FORGOT`
--
ALTER TABLE `FORGOT`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `FREE_GAME`
--
ALTER TABLE `FREE_GAME`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `GAMES`
--
ALTER TABLE `GAMES`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `PAYMENTS`
--
ALTER TABLE `PAYMENTS`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `PAYMENT_QUEUE`
--
ALTER TABLE `PAYMENT_QUEUE`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `RESULT`
--
ALTER TABLE `RESULT`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `SETTINGS`
--
ALTER TABLE `SETTINGS`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `STARLINE`
--
ALTER TABLE `STARLINE`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `STARLINE_GAMES`
--
ALTER TABLE `STARLINE_GAMES`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `TRANSACTIONS`
--
ALTER TABLE `TRANSACTIONS`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `USERS`
--
ALTER TABLE `USERS`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `WINNERS`
--
ALTER TABLE `WINNERS`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `WITHDRAW`
--
ALTER TABLE `WITHDRAW`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `BANK`
--
ALTER TABLE `BANK`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `bets`
--
ALTER TABLE `bets`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=373;

--
-- AUTO_INCREMENT for table `BET_TRANSACTIONS`
--
ALTER TABLE `BET_TRANSACTIONS`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `commission`
--
ALTER TABLE `commission`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=307;

--
-- AUTO_INCREMENT for table `FORGOT`
--
ALTER TABLE `FORGOT`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `FREE_GAME`
--
ALTER TABLE `FREE_GAME`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `GAMES`
--
ALTER TABLE `GAMES`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `PAYMENTS`
--
ALTER TABLE `PAYMENTS`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `PAYMENT_QUEUE`
--
ALTER TABLE `PAYMENT_QUEUE`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `RESULT`
--
ALTER TABLE `RESULT`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=135;

--
-- AUTO_INCREMENT for table `SETTINGS`
--
ALTER TABLE `SETTINGS`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `STARLINE`
--
ALTER TABLE `STARLINE`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `STARLINE_GAMES`
--
ALTER TABLE `STARLINE_GAMES`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `TRANSACTIONS`
--
ALTER TABLE `TRANSACTIONS`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `USERS`
--
ALTER TABLE `USERS`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `WINNERS`
--
ALTER TABLE `WINNERS`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `WITHDRAW`
--
ALTER TABLE `WITHDRAW`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
