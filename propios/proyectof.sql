-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-06-2022 a las 03:38:49
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyectof`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrega`
--

CREATE TABLE `entrega` (
  `id` int(11) NOT NULL,
  `nombre_entrega` varchar(45) NOT NULL,
  `fecha_entrega` date NOT NULL,
  `boleta` int(10) NOT NULL,
  `nombre_archivo` varchar(100) NOT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `entrega`
--

INSERT INTO `entrega` (`id`, `nombre_entrega`, `fecha_entrega`, `boleta`, `nombre_archivo`, `estado`) VALUES
(2, 'Segunda Entrega', '2022-06-07', 2021679183, 'ejercicio5_VSSL.pdf', 1),
(3, 'Tercera Entrega', '2022-06-07', 2021679183, 'ejercicio6_VSSL.pdf', 0),
(4, 'Tercera Entrega', '2022-06-08', 2021679183, 'EvaluacionTT.pdf', 1),
(17, 'Primera Entrega', '2022-06-09', 2021679183, 'ejercicio7_VSSL.pdf', 1),
(18, 'Primera Entrega', '2022-06-09', 2021679183, 'Algoritmos de sustitución de páginas.pdf', 0),
(19, 'Segunda Entrega', '2022-06-09', 2021679183, '2-5 Planificación.pdf', 1),
(20, 'Tercera Entrega', '2022-06-09', 2021679183, '2-3 y 2-4.pdf', 0),
(22, 'Primera Entrega', '2022-06-10', 2021679183, 'eje1_VSSL.pdf', 0),
(23, 'Segunda Entrega', '2022-06-10', 2021679183, 'Algoritmos de sustitución de páginas 2.pdf', 0),
(24, 'No Duplicidad', '2022-06-10', 2021679183, '1DIAGNOSTICO_VSSL.pdf', 0),
(26, 'Tercera Entrega', '2022-06-10', 2021679183, 'Diseño digital, 3ra Edición - M. Morris Mano.pdf', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluacion`
--

CREATE TABLE `evaluacion` (
  `id_entrega` int(11) NOT NULL,
  `portada_1` decimal(3,3) NOT NULL,
  `portada_2` decimal(3,3) NOT NULL,
  `portada_3` decimal(3,3) NOT NULL,
  `portada_4` decimal(3,3) NOT NULL,
  `portada_5` decimal(3,3) NOT NULL,
  `indice` decimal(3,3) NOT NULL,
  `resumen_1` decimal(3,3) NOT NULL,
  `resumen_2` decimal(3,3) NOT NULL,
  `resumen_3` decimal(3,3) NOT NULL,
  `resumen_4` decimal(3,3) NOT NULL,
  `def_prob_1` decimal(3,3) NOT NULL,
  `def_prob_2` decimal(3,3) NOT NULL,
  `def_prob_3` decimal(3,3) NOT NULL,
  `edo_arte_1` decimal(3,3) NOT NULL,
  `edo_arte_2` decimal(3,3) NOT NULL,
  `edo_arte_3` decimal(3,3) NOT NULL,
  `edo_arte_4` decimal(3,3) NOT NULL,
  `edo_arte_5` decimal(3,3) NOT NULL,
  `edo_arte_6` decimal(3,3) NOT NULL,
  `desc_proyec_1` decimal(3,3) NOT NULL,
  `desc_proyec_2` decimal(3,3) NOT NULL,
  `obj_gen_proy_1` decimal(3,3) NOT NULL,
  `obj_part_proy_1` decimal(3,3) NOT NULL,
  `obj_part_proy_2` decimal(3,3) NOT NULL,
  `justificacion_1` decimal(3,3) NOT NULL,
  `justificacion_2` decimal(3,3) NOT NULL,
  `justificacion_3` decimal(3,3) NOT NULL,
  `hipotesis_1` decimal(3,3) NOT NULL,
  `marco_teo_1` decimal(3,3) NOT NULL,
  `factibilidad_1` decimal(3,3) NOT NULL,
  `factibilidad_2` decimal(3,3) NOT NULL,
  `factibilidad_3` decimal(3,3) NOT NULL,
  `factibilidad_4` decimal(3,3) NOT NULL,
  `bibliografia_1` decimal(3,3) NOT NULL,
  `bibliografia_2` decimal(3,3) NOT NULL,
  `bibliografia_3` decimal(3,3) NOT NULL,
  `observaciones` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `evaluacion`
--

INSERT INTO `evaluacion` (`id_entrega`, `portada_1`, `portada_2`, `portada_3`, `portada_4`, `portada_5`, `indice`, `resumen_1`, `resumen_2`, `resumen_3`, `resumen_4`, `def_prob_1`, `def_prob_2`, `def_prob_3`, `edo_arte_1`, `edo_arte_2`, `edo_arte_3`, `edo_arte_4`, `edo_arte_5`, `edo_arte_6`, `desc_proyec_1`, `desc_proyec_2`, `obj_gen_proy_1`, `obj_part_proy_1`, `obj_part_proy_2`, `justificacion_1`, `justificacion_2`, `justificacion_3`, `hipotesis_1`, `marco_teo_1`, `factibilidad_1`, `factibilidad_2`, `factibilidad_3`, `factibilidad_4`, `bibliografia_1`, `bibliografia_2`, `bibliografia_3`, `observaciones`) VALUES
(2, '0.000', '0.000', '0.000', '0.500', '0.500', '0.999', '0.250', '0.250', '0.250', '0.250', '0.750', '0.750', '0.750', '0.999', '0.999', '0.999', '0.999', '0.999', '0.999', '0.000', '0.250', '0.000', '0.999', '0.250', '0.250', '0.250', '0.999', '0.999', '0.999', '0.250', '0.750', '0.500', '0.500', '0.250', '0.750', '0.999', ''),
(3, '0.999', '0.500', '0.999', '0.500', '0.500', '0.999', '0.250', '0.250', '0.250', '0.250', '0.750', '0.750', '0.750', '0.999', '0.999', '0.999', '0.999', '0.999', '0.999', '0.000', '0.250', '0.000', '0.999', '0.250', '0.250', '0.250', '0.999', '0.999', '0.999', '0.250', '0.750', '0.500', '0.500', '0.250', '0.750', '0.999', ''),
(4, '0.000', '0.000', '0.000', '0.500', '0.500', '0.999', '0.250', '0.250', '0.250', '0.250', '0.750', '0.750', '0.750', '0.999', '0.999', '0.999', '0.999', '0.999', '0.999', '0.000', '0.250', '0.000', '0.999', '0.250', '0.250', '0.250', '0.999', '0.999', '0.999', '0.250', '0.750', '0.500', '0.500', '0.250', '0.750', '0.999', 'Algo de ejemplo'),
(16, '0.999', '0.500', '0.999', '0.500', '0.500', '0.999', '0.250', '0.250', '0.250', '0.250', '0.750', '0.750', '0.750', '0.999', '0.999', '0.999', '0.999', '0.999', '0.999', '0.000', '0.250', '0.000', '0.999', '0.250', '0.250', '0.250', '0.999', '0.999', '0.999', '0.250', '0.750', '0.500', '0.500', '0.250', '0.750', '0.999', ''),
(17, '0.000', '0.000', '0.000', '0.500', '0.500', '0.999', '0.250', '0.250', '0.250', '0.250', '0.750', '0.750', '0.750', '0.999', '0.999', '0.999', '0.999', '0.999', '0.999', '0.000', '0.250', '0.000', '0.999', '0.250', '0.250', '0.250', '0.999', '0.999', '0.999', '0.250', '0.750', '0.500', '0.500', '0.250', '0.750', '0.999', ''),
(18, '0.999', '0.500', '0.999', '0.500', '0.500', '0.999', '0.250', '0.250', '0.250', '0.250', '0.750', '0.750', '0.750', '0.999', '0.999', '0.999', '0.999', '0.999', '0.999', '0.000', '0.250', '0.000', '0.999', '0.250', '0.250', '0.250', '0.999', '0.999', '0.999', '0.250', '0.750', '0.500', '0.500', '0.250', '0.750', '0.999', ''),
(19, '0.000', '0.000', '0.000', '0.500', '0.500', '0.999', '0.250', '0.250', '0.250', '0.250', '0.750', '0.750', '0.750', '0.999', '0.999', '0.999', '0.999', '0.999', '0.999', '0.000', '0.250', '0.000', '0.999', '0.250', '0.250', '0.250', '0.999', '0.999', '0.999', '0.250', '0.750', '0.500', '0.500', '0.250', '0.750', '0.999', ''),
(20, '0.999', '0.500', '0.999', '0.500', '0.500', '0.999', '0.250', '0.250', '0.250', '0.250', '0.750', '0.750', '0.750', '0.999', '0.999', '0.999', '0.999', '0.999', '0.999', '0.000', '0.250', '0.000', '0.999', '0.250', '0.250', '0.250', '0.999', '0.999', '0.999', '0.250', '0.750', '0.500', '0.500', '0.250', '0.750', '0.999', '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `entrega`
--
ALTER TABLE `entrega`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `entrega`
--
ALTER TABLE `entrega`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
