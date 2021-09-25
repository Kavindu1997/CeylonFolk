-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 25, 2021 at 05:47 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ceylonfolkdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `customerId` int(11) NOT NULL,
  `itemId` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `size` varchar(255) NOT NULL,
  `isDeleted` int(11) NOT NULL,
  `isBought` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `customerId`, `itemId`, `quantity`, `size`, `isDeleted`, `isBought`, `createdAt`, `updatedAt`) VALUES
(80, 40, '34', 2, 'M', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(81, 40, '33', 2, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(82, 40, '40', 2, 'M', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(83, 40, '19', 2, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(84, 40, '47', 4, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(85, 40, '47', 3, 'M', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(86, 40, '34', 1, 'M', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(87, 40, '34', 1, 'M', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(88, 41, '34', 1, 'M', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(89, 41, '33', 1, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(90, 1, '34', 1, 'M', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(91, 1, '40', 1, 'M', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(92, 1, '19', 1, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(93, 1, '22', 2, 'M', 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(94, 1, '37', 2, 'M', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(95, 1, '33', 4, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(96, 1, '33', 4, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(97, 1, '22', 1, 'M', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(98, 1, '40', 1, 'M', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(99, 1, '33', 1, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(100, 1, '33', 1, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(101, 1, '40', 1, 'M', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(102, 1, '33', 1, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(103, 1, '34', 1, 'M', 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(104, 35, '34', 0, 'S', 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(105, 35, '34', 2, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(106, 35, '40', 6, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(107, 35, '34', 1, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(108, 35, '34', 1, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(109, 35, '34', 1, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(110, 35, '34', 1, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(111, 35, '34', 1, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(112, 35, '34', 1, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(113, 35, '34', 1, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(114, 35, '34', 1, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(115, 36, '89', 1, 'S', 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(116, 35, '90', 1, 'XS', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(117, 35, '89', 1, 'S', 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(118, 35, '89', 1, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(119, 35, '89', 1, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(120, 35, '89', 1, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(121, 35, '89', 1, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(122, 35, '89', 1, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(123, 35, '89', 1, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(124, 35, '89', 2, 'S', 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(125, 35, '89', 1, 'S', 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(126, 35, '89', 1, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(127, 35, '90', 1, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(128, 35, '91', 1, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(129, 35, '85', 1, 'XS', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(130, 35, '64', 1, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(131, 35, '89', 1, 'M', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(132, 35, '85', 1, 'L', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(133, 35, '63', 1, 'L', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(134, 35, '65', 1, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(135, 35, '64', 1, 'M', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(136, 35, '89', 1, 'S', 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(137, 35, '89', 1, 'S', 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(138, 35, '89', 2, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(139, 35, '90', 1, 'S', 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(140, 35, '90', 1, 'S', 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(141, 35, '78', 1, 'M', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(142, 35, '89', 1, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(143, 42, '89', 3, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(144, 42, '62', 1, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(145, 42, '89', 1, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(146, 42, '89', 1, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(147, 46, '89', 1, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(148, 46, '89', 1, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(149, 46, '89', 1, 'M', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(150, 46, '90', 1, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(151, 46, '85', 1, 'M', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(152, 46, '85', 1, 'M', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(153, 46, '63', 1, 'M', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(154, 48, '89', 1, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(155, 49, '89', 1, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(156, 49, '90', 1, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(157, 49, '62', 1, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(158, 49, '62', 1, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(159, 49, '79', 1, 'S', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(160, 49, '79', 1, 'M', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `collections`
--

CREATE TABLE `collections` (
  `id` int(11) NOT NULL,
  `collection_name` varchar(255) DEFAULT NULL,
  `coverImage` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `collections`
--

INSERT INTO `collections` (`id`, `collection_name`, `coverImage`, `createdAt`, `updatedAt`) VALUES
(33, 'BTS', 'public/collections/1631789108537.jpg', '2021-09-16 10:45:09', '2021-09-16 10:45:09'),
(34, 'Butter', 'public/collections/1631789133701.jpg', '2021-09-16 10:45:34', '2021-09-16 10:45:34'),
(35, 'Elephant SL', 'public/collections/1631789155206.jpg', '2021-09-16 10:45:55', '2021-09-16 10:45:55'),
(36, 'Flower SL', 'public/collections/1631789221501.jpg', '2021-09-16 10:47:01', '2021-09-16 10:47:01'),
(37, 'FRIENDS', 'public/collections/1631789237638.jpg', '2021-09-16 10:47:17', '2021-09-16 10:47:17'),
(38, 'How You Doing', 'public/collections/1631789254272.jpg', '2021-09-16 10:47:34', '2021-09-16 10:47:34'),
(39, 'She is ur Lobster', 'public/collections/1631789317397.jpg', '2021-09-16 10:48:37', '2021-09-16 10:48:37'),
(40, 'Smelly Cat', 'public/collections/1631789331204.jpg', '2021-09-16 10:48:51', '2021-09-16 10:48:51'),
(41, 'Snowy', 'public/collections/1631789345472.jpg', '2021-09-16 10:49:05', '2021-09-16 10:49:05'),
(42, 'The friendly finger', 'public/collections/1631789362821.jpg', '2021-09-16 10:49:22', '2021-09-16 10:49:22'),
(44, 'Unicorn', 'public/collections/1632076053265.jpg', '2021-09-19 18:27:33', '2021-09-19 18:27:33');

-- --------------------------------------------------------

--
-- Table structure for table `colors`
--

CREATE TABLE `colors` (
  `id` int(11) NOT NULL,
  `color` varchar(255) DEFAULT NULL,
  `color_name` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `colors`
--

INSERT INTO `colors` (`id`, `color`, `color_name`, `price`, `createdAt`, `updatedAt`) VALUES
(15, '#9d001a', 'Red', 1200, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(16, '#000000', 'Black', 1200, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(17, '#ffffff', 'White', 1300, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(18, '#ffc30b', 'Yellow', 1200, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(19, '#565656', 'Ash', 1200, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(20, '#03023b', 'Dark Blue', 1200, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(21, '#00eaf9', 'Light Blue', 1200, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(22, '#ff8be0', 'Light Pink', 1200, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(23, '#3e14a2', 'Purple', 1200, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(24, '#082bff', 'Blue', 1200, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `contactus`
--

CREATE TABLE `contactus` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `orderId` int(11) NOT NULL,
  `contactNo` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `enquiryType` varchar(255) NOT NULL,
  `notifiFlag` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `response` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contactus`
--

INSERT INTO `contactus` (`id`, `name`, `orderId`, `contactNo`, `email`, `message`, `enquiryType`, `notifiFlag`, `status`, `response`, `createdAt`, `updatedAt`) VALUES
(10, 'Nimali Karunathilaka', 0, 765678798, 'nimali@gmail.com', 'Hi Ceylonfolk, when you are going to refill the stock with green tshits?', 'GeneralEnquiry', 1, 'solved', 'Hi Nimali, As soon as possible we are going to refill our inventory with green tshirts. Stay tuned with us!!!', '2021-09-19 19:32:30', '2021-09-19 19:32:30'),
(11, 'Nimal Bandara', 2147483647, 712234567, 'nimal@gmail.com', 'I want to change the order which I have already placed. How can I do that?', 'OrderEnquiry', 1, 'not_solved', '', '2021-09-19 19:36:47', '2021-09-19 19:36:47'),
(12, 'Kasuni Hewawasam', 0, 765674534, 'Kasuni123@gmail.com', 'I want to place a bulk order. So how can I do that?', 'ProductRelated', 1, 'not_solved', '', '2021-09-19 19:39:03', '2021-09-19 19:39:03'),
(13, 'Janani Gamage', 2147483647, 765678767, 'janani.gamage18@gmail.com', 'I have paid half of the amount as a online payment. Can I pay other half amount in cash? ', 'OrderEnquiry', 1, 'not_solved', '', '2021-09-19 19:44:38', '2021-09-19 19:44:38');

-- --------------------------------------------------------

--
-- Table structure for table `coupons`
--

CREATE TABLE `coupons` (
  `id` int(11) NOT NULL,
  `coupon_number` varchar(255) NOT NULL,
  `discount_amount` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `coupons`
--

INSERT INTO `coupons` (`id`, `coupon_number`, `discount_amount`, `start_date`, `end_date`, `createdAt`, `updatedAt`) VALUES
(1, 'kavindu001', 500, '2021-09-16', '2021-10-01', '2021-09-16 13:24:18', '2021-09-16 13:24:18'),
(2, 'naveen015', 120, '2021-09-16', '2021-09-30', '2021-09-16 15:17:35', '2021-09-16 15:17:35'),
(3, 'nimal075', 400, '2021-09-19', '2021-11-05', '2021-09-19 17:39:43', '2021-09-19 17:39:43');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customerId` int(11) NOT NULL,
  `cartId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phoneNo` int(11) NOT NULL,
  `addLine1` varchar(255) NOT NULL,
  `addLine2` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `customizeorders`
--

CREATE TABLE `customizeorders` (
  `orderId` int(11) NOT NULL,
  `orderNo` varchar(255) NOT NULL,
  `customerId` int(11) DEFAULT NULL,
  `customerName` varchar(255) DEFAULT NULL,
  `customerEmail` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `fixedPrice` varchar(255) DEFAULT NULL,
  `totalAmount` varchar(255) DEFAULT NULL,
  `placedDate` datetime DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `size` char(255) DEFAULT NULL,
  `textCount` int(11) DEFAULT NULL,
  `notificationFlag` int(11) DEFAULT NULL,
  `imageCount` int(11) DEFAULT NULL,
  `deleteFlag` varchar(255) DEFAULT NULL,
  `notificationStatus` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customizeorders`
--

INSERT INTO `customizeorders` (`orderId`, `orderNo`, `customerId`, `customerName`, `customerEmail`, `status`, `price`, `fixedPrice`, `totalAmount`, `placedDate`, `address`, `note`, `size`, `textCount`, `notificationFlag`, `imageCount`, `deleteFlag`, `notificationStatus`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 'cust223199', 37, 'Thashwini Wattuhewa', 'thashwiniwattuhewa@gmail.com', 'Printed', '1000', '2250', '2250', '2021-09-21 11:58:24', '101/2 Bangalawatta Kaduwela', '', 'S', 0, 1, 1, 'false', 'Paid', 'public/1632205188689image.png', '2021-09-21 06:19:48', '2021-09-21 06:19:48'),
(2, 'cust867696', 37, 'Thashwini Wattuhewa', 'thashwiniwattuhewa@gmail.com', 'Advance Paid', '600', '1100', '600', NULL, NULL, '', 'S', 0, 1, 0, 'false', 'Advance Paid', 'public/1632205940258image.png', '2021-09-21 06:32:20', '2021-09-21 06:32:20'),
(3, 'cust862286', 37, 'Thashwini Wattuhewa', 'thashwiniwattuhewa@gmail.com', 'Rejected', '1900', '1900', NULL, NULL, NULL, '', 'S', 0, 1, 1, 'reject', 'false', 'public/1632206096532image.png', '2021-09-21 06:34:56', '2021-09-21 06:34:56'),
(4, 'cust609363', 37, 'Thashwini Wattuhewa', 'thashwiniwattuhewa@gmail.com', 'Canceled', '2400', '1900', NULL, NULL, NULL, '', 'S', 0, 1, 1, 'cancel', 'Canceled', 'public/1632207740007image.png', '2021-09-21 07:02:20', '2021-09-21 07:02:20'),
(6, 'cust229528', 37, 'Thashwini Wattuhewa', 'thashwiniwattuhewa@gmail.com', 'Printing', '1000', '2200', '1000', NULL, NULL, '', 'XS', 1, 1, 1, 'false', 'Advance Paid', 'public/1632242858429image.png', '2021-09-21 16:47:38', '2021-09-21 16:47:38'),
(7, 'cust277487', 37, 'Thashwini Wattuhewa', 'thashwiniwattuhewa@gmail.com', 'Paid', '1200', '2650', '2650', '2021-09-22 08:20:43', '101/2 Kothalawala Kaduwela', '', 'S', 1, 1, 1, 'false', 'Paid', 'public/1632249993092image.png', '2021-09-21 18:46:33', '2021-09-21 18:46:33'),
(8, 'cust804779', 37, 'Thashwini Wattuhewa', 'thashwiniwattuhewa@gmail.com', 'Pending', '2200', '2200', NULL, NULL, NULL, '', 'S', 1, 1, 1, 'false', 'Pending', 'public/1632253344719image.png', '2021-09-21 19:42:24', '2021-09-21 19:42:24'),
(9, 'cust797274', 37, 'Thashwini Wattuhewa', 'thashwiniwattuhewa@gmail.com', 'Accept', '2000', '2000', NULL, NULL, NULL, '', 'S', 0, 0, 0, 'false', 'false', 'public/1632275336694image.png', '2021-09-22 01:48:56', '2021-09-22 01:48:56'),
(10, 'cust83640', 37, 'Thashwini Wattuhewa', 'thashwiniwattuhewa@gmail.com', 'Dispatched', '1000', '2250', '2250', '2021-09-22 08:23:41', '101/2 Bangalawatta Kaduwela', '', 'L', 0, 1, 0, 'false', 'Paid', 'public/1632275354529image.png', '2021-09-22 01:49:14', '2021-09-22 01:49:14'),
(11, 'cust319981', 37, 'Thashwini Wattuhewa', 'thashwiniwattuhewa@gmail.com', 'Recieved', '600', '1450', '1450', '2021-09-22 08:10:26', 'ww ww ww', '', 'S', 0, 1, 0, 'false', 'Recieved', 'public/1632275378535image.png', '2021-09-22 01:49:38', '2021-09-22 01:49:38');

-- --------------------------------------------------------

--
-- Table structure for table `deposits`
--

CREATE TABLE `deposits` (
  `id` int(11) NOT NULL,
  `customerId` int(11) NOT NULL,
  `orderId` varchar(255) NOT NULL,
  `slip` varchar(255) NOT NULL,
  `uploadedDate` datetime NOT NULL,
  `isValidated` int(11) NOT NULL,
  `isRejected` int(11) NOT NULL,
  `isProcessed` int(11) NOT NULL,
  `flag` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `deposits`
--

INSERT INTO `deposits` (`id`, `customerId`, `orderId`, `slip`, `uploadedDate`, `isValidated`, `isRejected`, `isProcessed`, `flag`, `createdAt`, `updatedAt`) VALUES
(9, 38, '1632046437045', 'public/bankSlips/1632046598526.jpg', '2021-09-19 15:46:38', 1, 0, 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(12, 38, '1632048073822', 'public/bankSlips/1632050259652.png', '2021-09-19 16:47:39', 1, 0, 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(13, 42, '1632236662836', 'public/bankSlips/1632236711432.png', '2021-09-21 20:35:11', 1, 0, 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(14, 42, '1632238788042', 'public/bankSlips/1632238826109.png', '2021-09-21 21:10:26', 1, 0, 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(15, 42, '1632240239808', 'public/bankSlips/1632240301116.png', '2021-09-21 21:35:01', 1, 0, 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(16, 46, '1632279829810', 'public/bankSlips/1632279950170.png', '2021-09-22 08:35:50', 0, 0, 0, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(17, 49, '1632282524787', 'public/bankSlips/1632282678909.png', '2021-09-22 09:21:18', 1, 0, 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `designs`
--

CREATE TABLE `designs` (
  `id` int(11) NOT NULL,
  `collection_id` int(11) DEFAULT NULL,
  `design_name` varchar(255) DEFAULT NULL,
  `color_id` int(11) DEFAULT NULL,
  `type_id` int(11) DEFAULT NULL,
  `coverImage` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `discountedPrice` int(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `designs`
--

INSERT INTO `designs` (`id`, `collection_id`, `design_name`, `color_id`, `type_id`, `coverImage`, `price`, `discountedPrice`, `createdAt`, `updatedAt`) VALUES
(62, 33, 'BTS Black', 16, 6, 'public/designs/1631789960913.jpg', 1200, 1080, '2021-09-16 10:59:21', '2021-09-16 10:59:21'),
(63, 33, 'BTS Dark Blue', 20, 6, 'public/designs/1631789999120.jpg', 1200, 1080, '2021-09-16 10:59:59', '2021-09-16 10:59:59'),
(64, 33, 'BTS Purple', 23, 6, 'public/designs/1631790016384.jpg', 1200, 1080, '2021-09-16 11:00:16', '2021-09-16 11:00:16'),
(65, 33, 'BTS White', 17, 6, 'public/designs/1631790030319.jpg', 1200, 1080, '2021-09-16 11:00:30', '2021-09-16 11:00:30'),
(67, 34, 'Croptop Butter1 Black', 16, 8, 'public/designs/1631790427931.jpg', 1200, 960, '2021-09-16 11:07:08', '2021-09-16 11:07:08'),
(68, 34, 'Croptop Butter1 White', 17, 8, 'public/designs/1631790463920.jpg', 1200, 960, '2021-09-16 11:07:44', '2021-09-16 11:07:44'),
(69, 34, 'Croptop Butter 2 Black', 16, 8, 'public/designs/1631790488644.jpg', 1200, 960, '2021-09-16 11:08:08', '2021-09-16 11:08:08'),
(70, 34, 'Croptop Butter 2 White', 17, 8, 'public/designs/1631790505354.jpg', 1200, 960, '2021-09-16 11:08:25', '2021-09-16 11:08:25'),
(78, 34, 'Butter 1 Black', 16, 6, 'public/designs/1631790863263.jpg', 1200, 960, '2021-09-16 11:14:23', '2021-09-16 11:14:23'),
(79, 34, 'Butter 2 Black', 16, 6, 'public/designs/1631790875332.jpg', 1200, 960, '2021-09-16 11:14:35', '2021-09-16 11:14:35'),
(80, 34, 'Butter 3 Black', 16, 6, 'public/designs/1631790887129.jpg', 1200, 960, '2021-09-16 11:14:47', '2021-09-16 11:14:47'),
(81, 34, 'Butter 4 Black', 16, 6, 'public/designs/1631790898162.jpg', 1200, 960, '2021-09-16 11:14:58', '2021-09-16 11:14:58'),
(82, 34, 'Butter 1 White', 17, 6, 'public/designs/1631790915525.jpg', 1200, 960, '2021-09-16 11:15:15', '2021-09-16 11:15:15'),
(83, 34, 'Butter 2 White', 17, 6, 'public/designs/1631790924726.jpg', 1200, 960, '2021-09-16 11:15:24', '2021-09-16 11:15:24'),
(84, 34, 'Butter 3 White', 17, 6, 'public/designs/1631790936525.jpg', 1200, 960, '2021-09-16 11:15:36', '2021-09-16 11:15:36'),
(85, 35, 'Blue Elephant SL White', 17, 6, 'public/designs/1631791006206.jpg', 1300, NULL, '2021-09-16 11:16:46', '2021-09-16 11:16:46'),
(86, 35, 'Yellow Elephant SL Black', 16, 6, 'public/designs/1631791036301.jpg', 1300, NULL, '2021-09-16 11:17:16', '2021-09-16 11:17:16'),
(87, 35, 'White Elephant SL Red', 15, 6, 'public/designs/1631791064623.jpg', 1300, NULL, '2021-09-16 11:17:44', '2021-09-16 11:17:44'),
(88, 35, 'Pink Elephant SL White', 17, 6, 'public/designs/1631791084418.jpg', 1300, NULL, '2021-09-16 11:18:04', '2021-09-16 11:18:04'),
(89, 35, 'Black Elephant SL Yellow', 18, 6, 'public/designs/1631791098863.jpg', 1300, NULL, '2021-09-16 11:18:18', '2021-09-16 11:18:18'),
(90, 36, 'Black flower SL White', 17, 6, 'public/designs/1631791156784.jpg', 1200, NULL, '2021-09-16 11:19:17', '2021-09-16 11:19:17'),
(91, 36, 'Black flower SL Yellow', 18, 6, 'public/designs/1631791173157.jpg', 1200, NULL, '2021-09-16 11:19:33', '2021-09-16 11:19:33'),
(92, 36, 'Yellow flower SL Black', 16, 6, 'public/designs/1631791191278.jpg', 1200, NULL, '2021-09-16 11:19:51', '2021-09-16 11:19:51'),
(93, 36, 'Yellow flower SL Red', 15, 6, 'public/designs/1631791202282.jpg', 1200, NULL, '2021-09-16 11:20:02', '2021-09-16 11:20:02'),
(94, 36, 'Yellow flower SL White', 17, 6, 'public/designs/1631791216930.jpg', 1200, NULL, '2021-09-16 11:20:16', '2021-09-16 11:20:16'),
(95, 37, 'FRIENDS Black', 16, 6, 'public/designs/1631791298832.jpg', 1250, 1000, '2021-09-16 11:21:38', '2021-09-16 11:21:38'),
(96, 37, 'FRIENDS White', 17, 6, 'public/designs/1631791311095.jpg', 1250, 1000, '2021-09-16 11:21:51', '2021-09-16 11:21:51'),
(97, 38, 'How You Doing Dark Blue', 20, 6, 'public/designs/1631791347510.jpg', 1200, 960, '2021-09-16 11:22:27', '2021-09-16 11:22:27'),
(98, 38, 'How You Doing White', 17, 6, 'public/designs/1631791360153.jpg', 1200, 960, '2021-09-16 11:22:40', '2021-09-16 11:22:40'),
(99, 39, 'She is ur Lobster Dark Blue', 20, 6, 'public/designs/1631791402714.jpg', 1200, NULL, '2021-09-16 11:23:23', '2021-09-16 11:23:23'),
(100, 39, 'She is ur Lobster White', 17, 6, 'public/designs/1631791418427.jpg', 1200, NULL, '2021-09-16 11:23:38', '2021-09-16 11:23:38'),
(101, 40, 'Smelly Cat Dark Blue', 20, 6, 'public/designs/1631791466552.jpg', 1200, NULL, '2021-09-16 11:24:26', '2021-09-16 11:24:26'),
(102, 40, 'Smelly Cat White', 17, 6, 'public/designs/1631791478599.jpg', 1200, NULL, '2021-09-16 11:24:38', '2021-09-16 11:24:38'),
(103, 41, 'Snowy Black', 16, 6, 'public/designs/1631791528200.jpg', 1300, 1170, '2021-09-16 11:25:28', '2021-09-16 11:25:28'),
(104, 41, 'Snowy Blue', 24, 6, 'public/designs/1631791542090.jpg', 1300, 1170, '2021-09-16 11:25:42', '2021-09-16 11:25:42'),
(105, 41, 'Snowy Dark Blue', 20, 6, 'public/designs/1631791557459.jpg', 1300, 1170, '2021-09-16 11:25:57', '2021-09-16 11:25:57'),
(106, 41, 'Snowy Light Blue', 21, 6, 'public/designs/1631791571462.jpg', 1300, 1170, '2021-09-16 11:26:11', '2021-09-16 11:26:11'),
(107, 41, 'Snowy Pink', 22, 6, 'public/designs/1631791585063.jpg', 1300, 1170, '2021-09-16 11:26:25', '2021-09-16 11:26:25'),
(108, 41, 'Snowy Purple', 23, 6, 'public/designs/1631791598505.jpg', 1300, 1170, '2021-09-16 11:26:38', '2021-09-16 11:26:38'),
(109, 41, 'Snowy Red', 15, 6, 'public/designs/1631791610580.jpg', 1300, 1170, '2021-09-16 11:26:50', '2021-09-16 11:26:50'),
(110, 41, 'Snowy White', 17, 6, 'public/designs/1631791620433.jpg', 1300, 1170, '2021-09-16 11:27:00', '2021-09-16 11:27:00'),
(111, 42, 'The friendly finger Black', 16, 6, 'public/designs/1631791684326.jpg', 1200, NULL, '2021-09-16 11:28:04', '2021-09-16 11:28:04'),
(112, 42, 'The friendly finger White', 17, 6, 'public/designs/1631791694650.jpg', 1200, NULL, '2021-09-16 11:28:14', '2021-09-16 11:28:14'),
(115, 44, 'Pink unicorn white', 17, 9, 'public/designs/1632076203088.jpg', 1200, 1080, '2021-09-19 18:30:03', '2021-09-19 18:30:03'),
(116, 44, 'Yellow unicorn white', 17, 9, 'public/designs/1632076269955.jpg', 1200, 1080, '2021-09-19 18:31:10', '2021-09-19 18:31:10');

-- --------------------------------------------------------

--
-- Table structure for table `inventories`
--

CREATE TABLE `inventories` (
  `id` int(11) NOT NULL,
  `colour_id` int(11) NOT NULL,
  `size_id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `margin` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `inventories`
--

INSERT INTO `inventories` (`id`, `colour_id`, `size_id`, `type_id`, `quantity`, `margin`, `createdAt`, `updatedAt`) VALUES
(77, 15, 21, 6, 50, 20, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(78, 15, 22, 6, 50, 20, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(79, 15, 23, 6, 50, 20, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(80, 16, 21, 6, 46, 20, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(81, 16, 22, 6, 48, 20, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(82, 16, 23, 6, 50, 20, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(84, 16, 25, 6, 50, 20, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(85, 17, 20, 6, 48, 20, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(86, 17, 21, 6, 46, 20, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(87, 17, 22, 6, 48, 20, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(88, 17, 23, 6, 49, 20, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(89, 17, 25, 6, 50, 20, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(90, 18, 21, 6, 30, 20, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(91, 18, 22, 6, 48, 20, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(92, 20, 22, 6, 49, 20, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(93, 20, 23, 6, 49, 20, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(94, 21, 21, 6, 50, 20, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(95, 21, 22, 6, 50, 20, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(96, 22, 20, 6, 50, 20, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(97, 22, 21, 6, 50, 20, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(98, 22, 22, 6, 50, 20, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(99, 23, 21, 6, 49, 20, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(100, 23, 22, 6, 49, 20, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(101, 23, 23, 6, 50, 20, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(102, 24, 21, 6, 50, 20, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(103, 24, 22, 6, 50, 20, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(104, 24, 23, 6, 50, 20, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(105, 16, 20, 8, 50, 20, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(106, 16, 21, 8, 50, 20, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(107, 16, 22, 8, 50, 20, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(108, 16, 23, 8, 50, 20, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(109, 17, 21, 8, 50, 20, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(110, 17, 22, 8, 50, 20, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(111, 17, 23, 8, 50, 20, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(112, 17, 25, 8, 50, 20, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(113, 15, 21, 8, 50, 20, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(114, 15, 22, 8, 50, 20, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(115, 15, 20, 9, 50, 20, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(116, 17, 20, 9, 50, 20, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(117, 17, 21, 9, 50, 20, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `masterdata`
--

CREATE TABLE `masterdata` (
  `id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `decription` varchar(255) NOT NULL,
  `value` int(11) NOT NULL,
  `subValue` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `masterdata`
--

INSERT INTO `masterdata` (`id`, `type`, `decription`, `value`, `subValue`, `createdAt`, `updatedAt`) VALUES
(1, 'status', 'Pending', 0, 0, '2021-08-29 20:19:17', '2021-08-29 20:19:17'),
(2, 'status', 'Approved', 0, 0, '2021-08-29 20:20:11', '2021-08-29 20:20:11'),
(3, 'status', 'Processing', 0, 0, '2021-08-29 20:20:39', '2021-08-29 20:20:39'),
(4, 'status', 'Waiting for deposit', 0, 0, '2021-08-29 20:21:05', '2021-08-29 20:21:05'),
(5, 'status', 'Deposit verifying', 0, 0, '2021-08-29 20:21:33', '2021-08-29 20:21:33'),
(6, 'status', 'Order placed', 0, 0, '2021-08-29 20:30:51', '2021-08-29 20:30:51'),
(7, 'payment method', 'cash on delivery', 0, 0, '2021-08-29 20:31:13', '2021-08-29 20:31:13'),
(8, 'payment method', 'payhere', 0, 0, '2021-08-29 20:32:01', '2021-08-29 20:32:01'),
(9, 'payment method', 'bank transfer', 0, 0, '2021-08-29 20:32:37', '2021-08-29 20:32:37'),
(10, 'delivery', 'Colombo', 1, 0, '2021-09-03 11:12:55', '2021-09-03 11:12:55'),
(11, 'delivery', 'Gampaha', 2, 0, '2021-09-03 11:12:55', '2021-09-03 11:12:55'),
(12, 'delivery', 'Kaluthara', 2, 0, '2021-09-03 11:16:18', '2021-09-03 11:16:18'),
(13, 'delivery', 'Galle', 2, 0, '2021-09-03 11:16:18', '2021-09-03 11:16:18'),
(14, 'delivery', 'Matara', 2, 0, '2021-09-03 11:17:38', '2021-09-03 11:17:38'),
(15, 'delivery', 'Hambanthota', 2, 0, '2021-09-03 11:17:38', '2021-09-03 11:17:38'),
(16, 'delivery', 'Ampara', 2, 0, '2021-09-03 11:19:16', '2021-09-03 11:19:16'),
(17, 'delivery', 'Puttalam', 2, 0, '2021-09-03 11:19:16', '2021-09-03 11:19:16'),
(18, 'delivery', 'Kurunegala', 2, 0, '2021-09-03 11:19:16', '2021-09-03 11:19:16'),
(19, 'delivery', 'Kegalle', 2, 0, '2021-09-03 11:47:11', '2021-09-03 11:47:11'),
(20, 'delivery', 'Ratnapura', 2, 0, '2021-09-03 11:47:11', '2021-09-03 11:47:11'),
(21, 'delivery', 'Matale', 2, 0, '2021-09-03 11:47:11', '2021-09-03 11:47:11'),
(22, 'delivery', 'Kandy', 2, 0, '2021-09-03 11:47:11', '2021-09-03 11:47:11'),
(23, 'delivery', 'Nuwara Eliya', 2, 0, '2021-09-03 11:47:11', '2021-09-03 11:47:11'),
(24, 'delivery', 'Badulla', 2, 0, '2021-09-03 11:49:29', '2021-09-03 11:49:29'),
(25, 'delivery', 'Monaragala', 2, 0, '2021-09-03 11:49:29', '2021-09-03 11:49:29'),
(26, 'delivery', 'Baticaloa', 3, 0, '2021-09-03 11:49:29', '2021-09-03 11:49:29'),
(27, 'delivery', 'Polonnaruwa', 3, 0, '2021-09-03 11:49:29', '2021-09-03 11:49:29'),
(28, 'delivery', 'Anuradhapura', 3, 0, '2021-09-03 11:49:29', '2021-09-03 11:49:29'),
(29, 'delivery', 'Trincomalee', 3, 0, '2021-09-03 11:51:12', '2021-09-03 11:51:12'),
(30, 'delivery', 'Mannar', 3, 0, '2021-09-03 11:51:12', '2021-09-03 11:51:12'),
(31, 'delivery', 'Vavunia', 3, 0, '2021-09-03 11:51:12', '2021-09-03 11:51:12'),
(32, 'delivery', 'Mullaitivu', 3, 0, '2021-09-03 11:51:12', '2021-09-03 11:51:12'),
(33, 'delivery', 'Kilinochchi', 3, 0, '2021-09-03 11:51:12', '2021-09-03 11:51:12'),
(34, 'delivery', 'Jaffna', 3, 0, '2021-09-03 11:51:12', '2021-09-03 11:51:12'),
(35, 'deliveryType', 'colombo', 1, 250, '2021-09-03 17:37:50', '2021-09-03 17:37:50'),
(36, 'deliveryType', 'outstation', 2, 300, '2021-09-03 17:37:50', '2021-09-03 17:37:50'),
(37, 'deliveryType', 'jaffna', 3, 350, '2021-09-03 17:38:59', '2021-09-03 17:38:59'),
(38, 'status', 'Payment validation failed', 0, 0, '2021-09-13 19:51:13', '2021-09-13 19:51:13'),
(40, 'status', 'Dispatched', 0, 0, '2021-09-15 19:45:34', '2021-09-15 19:45:34'),
(41, 'status', 'Order Delayed', 0, 0, '2021-09-15 19:45:53', '2021-09-15 19:45:53');

-- --------------------------------------------------------

--
-- Table structure for table `offers`
--

CREATE TABLE `offers` (
  `id` int(11) NOT NULL,
  `collection_id` int(11) NOT NULL,
  `rate` int(11) NOT NULL,
  `from` date NOT NULL,
  `to` date NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `offers`
--

INSERT INTO `offers` (`id`, `collection_id`, `rate`, `from`, `to`, `createdAt`, `updatedAt`) VALUES
(1, 33, 10, '2021-09-17', '2021-09-20', '2021-09-17 05:03:26', '2021-09-17 05:03:26'),
(2, 34, 20, '2021-09-18', '2021-09-29', '2021-09-17 05:05:06', '2021-09-17 05:05:06'),
(3, 37, 20, '2021-09-20', '2021-09-23', '2021-09-17 05:09:59', '2021-09-17 05:09:59'),
(4, 41, 10, '2021-09-21', '2021-09-28', '2021-09-21 20:20:37', '2021-09-21 20:20:37'),
(5, 0, 10, '2021-09-21', '2021-09-27', '2021-09-21 20:20:52', '2021-09-21 20:20:52'),
(6, 44, 10, '2021-09-21', '2021-09-27', '2021-09-21 20:21:46', '2021-09-21 20:21:46'),
(7, 38, 20, '2021-09-24', '2021-09-30', '2021-09-24 13:44:06', '2021-09-24 13:44:06');

-- --------------------------------------------------------

--
-- Table structure for table `orderitems`
--

CREATE TABLE `orderitems` (
  `id` int(11) NOT NULL,
  `orderId` varchar(255) NOT NULL,
  `itemId` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `size` varchar(255) NOT NULL,
  `purchasedUnitPrice` varchar(255) NOT NULL,
  `isDeleted` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orderitems`
--

INSERT INTO `orderitems` (`id`, `orderId`, `itemId`, `quantity`, `size`, `purchasedUnitPrice`, `isDeleted`, `createdAt`, `updatedAt`) VALUES
(1, '1631959781038', '62', 1, 'M', '1080', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, '1631959781038', '89', 2, 'S', '1300', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, '1631959875911', '63', 1, 'L', '1080', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, '1631959875911', '63', 1, 'M', '1080', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(8, '1632034428879', '64', 1, 'S', '1080', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(9, '1632034428879', '90', 1, 'S', '1200', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(10, '1632044371501', '65', 2, 'S', '1080', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(11, '1632044371501', '78', 1, 'M', '960', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(12, '1632044371501', '91', 2, 'M', '1200', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(13, '1632046437045', '105', 1, 'M', '1300', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(14, '1632046437045', '78', 2, 'L', '960', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(15, '1632046437045', '78', 2, 'M', '960', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(16, '1632046437045', '89', 2, 'M', '1300', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(17, '1632046437045', '89', 2, 'S', '1300', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(18, '1632048073822', '78', 1, 'L', '960', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(19, '1632051707955', '63', 1, 'M', '1080', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(20, '1632051707955', '89', 2, 'S', '1300', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(21, '1632060345668', '95', 1, 'S', '1000', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(22, '1632071836181', '63', 1, 'M', '1080', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(23, '1632071836181', '96', 2, 'S', '1000', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(24, '1632128079401', '78', 1, 'M', '960', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(25, '1632128079401', '89', 2, 'S', '1300', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(26, '1632128278908', '89', 1, 'M', '1300', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(27, '1632236662836', '62', 1, 'S', '1080', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(28, '1632236662836', '89', 3, 'S', '1300', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(29, '1632238788042', '89', 1, 'S', '1300', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(30, '1632240239808', '89', 1, 'S', '1300', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(31, '1632277064257', '89', 1, 'S', '1300', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(32, '1632279505564', '89', 1, 'M', '1300', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(33, '1632279505564', '89', 1, 'S', '1300', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(34, '1632279591306', '90', 1, 'S', '1200', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(35, '1632279662196', '85', 2, 'M', '1300', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(36, '1632279829810', '63', 1, 'M', '1080', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(37, '1632281573200', '89', 1, 'S', '1300', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(38, '1632282425532', '89', 1, 'S', '1300', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(39, '1632282425532', '90', 1, 'S', '1200', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(40, '1632282477756', '62', 2, 'S', '1080', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(41, '1632282524787', '79', 1, 'S', '960', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(42, '1632282572921', '79', 1, 'M', '960', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `orderId` varchar(255) NOT NULL,
  `customerId` int(11) NOT NULL,
  `fullAmount` varchar(255) NOT NULL,
  `PaymentMethod` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `deliveryAddress` varchar(255) NOT NULL,
  `deliveryValue` int(11) NOT NULL,
  `couponValue` int(11) NOT NULL,
  `contactNo` varchar(255) NOT NULL,
  `placedDate` datetime NOT NULL,
  `isDeleted` int(11) NOT NULL,
  `specialNotes` varchar(255) DEFAULT NULL,
  `notifications` varchar(255) NOT NULL,
  `flag` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `orderId`, `customerId`, `fullAmount`, `PaymentMethod`, `status`, `deliveryAddress`, `deliveryValue`, `couponValue`, `contactNo`, `placedDate`, `isDeleted`, `specialNotes`, `notifications`, `flag`, `createdAt`, `updatedAt`) VALUES
(1, '1632282425532', 49, '2750', '7', '1', 'wijerama gangodawila Nugegoda', 250, 0, '773445556', '2021-09-22 09:17:05', 0, '', 'placed', 1, '2021-09-22 03:47:05', '0000-00-00 00:00:00'),
(2, '1632282477756', 49, '2460', '9', '4', 'wijerama gangodawila nugegoda', 300, 0, '773445556', '2021-09-22 09:17:57', 0, '', 'placed', 1, '2021-09-22 03:47:57', '0000-00-00 00:00:00'),
(3, '1632282524787', 49, '1260', '9', '3', 'wijerama gangodawila Nugegoda', 300, 0, '773445556', '2021-09-22 09:18:44', 0, '', 'placed', 1, '2021-09-22 03:48:44', '0000-00-00 00:00:00'),
(4, '1632282572921', 49, '1260', '8', '3', 'wijerama gangodawila nugegoda', 300, 0, '773445556', '2021-09-22 09:19:32', 0, '', 'placed', 1, '2021-09-22 03:50:11', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Stand-in structure for view `pendings`
-- (See below for the actual view)
--
CREATE TABLE `pendings` (
`pendingCount` bigint(21)
);

-- --------------------------------------------------------

--
-- Table structure for table `productdetails`
--

CREATE TABLE `productdetails` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `size` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sizes`
--

CREATE TABLE `sizes` (
  `id` int(11) NOT NULL,
  `size` char(4) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sizes`
--

INSERT INTO `sizes` (`id`, `size`, `createdAt`, `updatedAt`) VALUES
(20, 'XS', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(21, 'S', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(22, 'M', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(23, 'L', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(25, 'XL', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Stand-in structure for view `total_sales`
-- (See below for the actual view)
--
CREATE TABLE `total_sales` (
`sales_amount` double
);

-- --------------------------------------------------------

--
-- Table structure for table `types`
--

CREATE TABLE `types` (
  `id` int(11) NOT NULL,
  `types` varchar(255) DEFAULT NULL,
  `coverImage` varchar(255) DEFAULT NULL,
  `price` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `types`
--

INSERT INTO `types` (`id`, `types`, `coverImage`, `price`, `createdAt`, `updatedAt`) VALUES
(6, 'T-Shirts', 'public/tshirt_types/1631787122022.jpg', 1000, '2021-09-16 10:12:02', '2021-09-16 10:12:02'),
(8, 'Crop Top', 'public/tshirt_types/1631787167439.jpg', 1000, '2021-09-16 10:12:47', '2021-09-16 10:12:47'),
(9, 'Kids', 'public/tshirt_types/1632075677733.jpg', 1000, '2021-09-19 18:21:17', '2021-09-19 18:21:17');

-- --------------------------------------------------------

--
-- Table structure for table `usermanages`
--

CREATE TABLE `usermanages` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile_no` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gender` enum('Male','Female','Other') NOT NULL,
  `user_type` enum('Admin','Manager','Assistant','Customer') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contactNo` int(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_type_id` int(11) NOT NULL,
  `resetToken` varchar(255) DEFAULT NULL,
  `expireToken` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `contactNo`, `password`, `user_type_id`, `resetToken`, `expireToken`, `createdAt`, `updatedAt`) VALUES
(31, 'Pasan', 'Ranathunga', 'testceylonfolk@gmail.com', 719514902, '$2b$10$lEOcNWVjECcK/tuOwk4UDOgubT42fpi7hs6mq2XIsvHtcTvEBk62a', 1, NULL, NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(32, 'Manager', 'Manager', 'manager@gmail.com', 773445556, '$2b$10$ZH/BUQLNQnnRUCeEv7Zt7OkIygYzAdhB1hak.cxkTYJ98fW8Nm8ES', 3, NULL, NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(33, 'Assistant', 'Assistant', 'assistant@gmail.com', 773434445, '$2b$10$XvsSJTcZyM/9fDiiqbyjGOlRQKPM7Sj5Goa1mLNzUhTTnUKLhaj96', 4, NULL, NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(36, 'Nimal ', 'Bandara', 'nimal@gmail.com', 774565776, '$2b$10$I0eTTXksY.4IOPqV2ZkTs.uR6AVw/dHSFO8EDg2NhlEl.H.mcPpKS', 2, NULL, NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(37, 'janani', 'perera', 'janani@gmail.com', 773454656, '$2b$10$Ou6ALMC3mcc.NUExexbenuSwhV3zMEmZtMpWnNlOHZf9No7/OyPFu', 2, NULL, NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(38, 'Kavindu', 'Samaraweera', 'kksamaraweera1997@gmail.com', 775434445, '$2b$10$Nea77E7St07IrPfFZ/M7CO.8Av06eQSVWSY400riDUHUKwTqIofa6', 2, NULL, NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(49, 'Pramuka', 'Seneviratne', 'pramukaseneviratne@gmail.com', 773445556, '$2b$10$mJmM.X5XFZK1J1dr3xUeve0FWJLSN/mfrTcQUukyuMnjwYqFuycFW', 2, NULL, NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `usertypes`
--

CREATE TABLE `usertypes` (
  `id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `usertypes`
--

INSERT INTO `usertypes` (`id`, `type`, `createdAt`, `updatedAt`) VALUES
(1, 'ADMIN', '2021-08-17 16:54:50', '2021-08-17 16:54:50'),
(2, 'CUSTOMER', '2021-08-17 16:55:32', '2021-08-17 16:55:32'),
(3, 'MANAGER', '2021-08-17 16:56:03', '2021-08-17 16:56:03'),
(4, 'ASSISTANT', '2021-08-17 16:56:35', '2021-08-17 16:56:35');

-- --------------------------------------------------------

--
-- Table structure for table `wishlists`
--

CREATE TABLE `wishlists` (
  `id` int(11) NOT NULL,
  `itemId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `wishlists`
--

INSERT INTO `wishlists` (`id`, `itemId`, `userId`, `status`, `createdAt`, `updatedAt`) VALUES
(90, 34, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(93, 21, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(94, 22, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(95, 47, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(100, 89, 35, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(101, 90, 35, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(102, 91, 35, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Structure for view `pendings`
--
DROP TABLE IF EXISTS `pendings`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `pendings`  AS  select count(`orders`.`status`) AS `pendingCount` from `orders` where `orders`.`status` = '1' and `orders`.`isDeleted` = '0' or `orders`.`status` = '4' and `orders`.`isDeleted` = '0' or `orders`.`status` = '5' and `orders`.`isDeleted` = '0' or `orders`.`status` = '6' and `orders`.`isDeleted` = '0' union all select count(`customizeorders`.`status`) AS `pendingCount` from `customizeorders` where `customizeorders`.`status` = 'Pending' and `customizeorders`.`deleteFlag` = 'false' ;

-- --------------------------------------------------------

--
-- Structure for view `total_sales`
--
DROP TABLE IF EXISTS `total_sales`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `total_sales`  AS  select coalesce(sum(`orders`.`fullAmount`),0) AS `sales_amount` from `orders` where `orders`.`status` = '40' union all select coalesce(sum(`customizeorders`.`totalAmount`),0) AS `sales_amount` from `customizeorders` where `customizeorders`.`status` = 'Dispatched' ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `collections`
--
ALTER TABLE `collections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contactus`
--
ALTER TABLE `contactus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customerId`),
  ADD UNIQUE KEY `cartId` (`cartId`);

--
-- Indexes for table `customizeorders`
--
ALTER TABLE `customizeorders`
  ADD PRIMARY KEY (`orderId`);

--
-- Indexes for table `deposits`
--
ALTER TABLE `deposits`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `designs`
--
ALTER TABLE `designs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `collection.id.fk` (`collection_id`),
  ADD KEY `types.id.fk` (`type_id`),
  ADD KEY `color.id.fk` (`color_id`);

--
-- Indexes for table `inventories`
--
ALTER TABLE `inventories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `size.id.fk` (`size_id`),
  ADD KEY `type.id.fk` (`type_id`),
  ADD KEY `color.id.fk2` (`colour_id`);

--
-- Indexes for table `masterdata`
--
ALTER TABLE `masterdata`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `offers`
--
ALTER TABLE `offers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orderitems`
--
ALTER TABLE `orderitems`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `productdetails`
--
ALTER TABLE `productdetails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sizes`
--
ALTER TABLE `sizes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usermanages`
--
ALTER TABLE `usermanages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_type_fk` (`user_type_id`);

--
-- Indexes for table `usertypes`
--
ALTER TABLE `usertypes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wishlists`
--
ALTER TABLE `wishlists`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=161;

--
-- AUTO_INCREMENT for table `collections`
--
ALTER TABLE `collections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `colors`
--
ALTER TABLE `colors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `contactus`
--
ALTER TABLE `contactus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `coupons`
--
ALTER TABLE `coupons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `cartId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customizeorders`
--
ALTER TABLE `customizeorders`
  MODIFY `orderId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `deposits`
--
ALTER TABLE `deposits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `designs`
--
ALTER TABLE `designs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;

--
-- AUTO_INCREMENT for table `inventories`
--
ALTER TABLE `inventories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;

--
-- AUTO_INCREMENT for table `masterdata`
--
ALTER TABLE `masterdata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `offers`
--
ALTER TABLE `offers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `orderitems`
--
ALTER TABLE `orderitems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `productdetails`
--
ALTER TABLE `productdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sizes`
--
ALTER TABLE `sizes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `types`
--
ALTER TABLE `types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `usermanages`
--
ALTER TABLE `usermanages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `usertypes`
--
ALTER TABLE `usertypes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `wishlists`
--
ALTER TABLE `wishlists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `inventories`
--
ALTER TABLE `inventories`
  ADD CONSTRAINT `color.id.fk2` FOREIGN KEY (`colour_id`) REFERENCES `colors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `type.id.fk` FOREIGN KEY (`type_id`) REFERENCES `types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `user_type_fk` FOREIGN KEY (`user_type_id`) REFERENCES `usertypes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
