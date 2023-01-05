-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 24 mars 2022 à 15:22
-- Version du serveur : 10.4.22-MariaDB
-- Version de PHP : 8.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `graphique`
--

-- --------------------------------------------------------

--
-- Structure de la table `kpi_graphique`
--

CREATE TABLE `kpi_graphique` (
  `id` int(11) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `description` varchar(254) DEFAULT NULL,
  `caracteristique` varchar(254) DEFAULT NULL,
  `idUser` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `libelle` varchar(100) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `role`
--

INSERT INTO `role` (`id`, `libelle`, `createdAt`, `updatedAt`) VALUES
(1, 'administrateur', '2022-03-15 11:38:32', '2022-03-15 11:38:32'),
(2, 'standard', '2022-03-15 11:38:32', '2022-03-15 11:38:32');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `id` int(11) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `prenom` varchar(100) DEFAULT NULL,
  `telephone` varchar(50) DEFAULT NULL,
  `email` varchar(60) DEFAULT NULL,
  `IdOauth` varchar(255) DEFAULT NULL,
  `modeLogin` varchar(50) DEFAULT NULL,
  `idRole` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `password`, `token`, `nom`, `prenom`, `telephone`, `email`, `IdOauth`, `modeLogin`, `idRole`, `image`, `refresh_token`, `createdAt`, `updatedAt`) VALUES
(2, NULL, NULL, 'jean', 'pierre', '+237 655194159', 'jean@gmail.com', NULL, 'GoogleId', 2, NULL, NULL, '2022-03-15 11:36:30', '2022-03-15 11:36:30'),
(3, NULL, NULL, 'laroma', 'roma', '655194159', 'test@gmail.com', NULL, 'manuel', 2, NULL, NULL, '2022-03-15 11:36:30', '2022-03-15 11:36:30'),
(4, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTY0ODAzMzM2NSwiZXhwIjoxNjQ4MDM2OTY1fQ.8JiWokjTIRKboJ0a8-kRKOgd2W4l3TbUmyQya8IPJXc', 'montest', 'mon prenom', '655194159', 'test@gmail.com', NULL, 'manuel', 2, NULL, NULL, '2022-03-15 13:03:12', '2022-03-23 11:06:32'),
(12, NULL, NULL, 'Romaric', 'Cabrel', NULL, 'cabrelromaric@gmail.com', '114286280509137186344', 'GoogleId', 2, 'https://lh3.googleusercontent.com/a/AATXAJwKBs7ppdFq8jMQWJsxjg1HOdpQoPRbFE7zyvVV=s96-c', NULL, '2022-03-22 11:39:26', '2022-03-22 11:39:26'),
(13, '$2a$08$cVTfrsDqLSTXLEbOqH8KXuqXwvl/YW0zcsmsr6ygRtDrj5XRzHrJG', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTY0ODEyNzQ3NSwiZXhwIjoxNjQ4MTMxMDc1fQ.RaPx3VB6ze7Lqooae7_wStB9WTpnMnDCL65zRTfFnI8', 'laroma1', 'cab', '5544', 'mail@t.com', NULL, 'manuel', 2, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTY0ODEyNzE0OSwiZXhwIjoxNjQ4MTk5MTQ5fQ.dVvB1SPbIOyhgGzF0H2qVfJ0jP3Lf0IN0KXP7Fyd2XQ', '2022-03-23 09:25:46', '2022-03-24 13:11:15');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `kpi_graphique`
--
ALTER TABLE `kpi_graphique`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_creer` (`idUser`);

--
-- Index pour la table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IdOauth` (`IdOauth`),
  ADD KEY `FK_posseder` (`idRole`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `kpi_graphique`
--
ALTER TABLE `kpi_graphique`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `kpi_graphique`
--
ALTER TABLE `kpi_graphique`
  ADD CONSTRAINT `FK_creer` FOREIGN KEY (`idUser`) REFERENCES `utilisateur` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD CONSTRAINT `FK_posseder` FOREIGN KEY (`idRole`) REFERENCES `role` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
