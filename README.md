# Bitburner Scripts

Welcome to the Bitburner scripts repository! This collection of scripts is designed to help automate various tasks in the Bitburner game. Below you'll find an overview of the scripts included, their purposes, and how to use them.

## Table of Contents

- [Overview](#overview)
- [Scripts](#scripts)
  - [infiltrate.js](#infiltratejs)
  - [purchaseServer.js](#purchaseserverjs)
  - [sellHash.js](#sellhashjs)
  - [endNode.js](#endnodejs)
  - [autoHacknet.js](#autohacknetjs)
  - [setSleeves.js](#setsleevesjs)
  - [setHackSleeves.js](#sethacksleevesjs)
  - [milestones.js](#milestonesjs)
  - [getMoney.js](#getmoneyjs)
  - [buyPrograms.js](#buyprogramsjs)
  - [buyGangEquipment.js](#buygangequipmentjs)
- [Installation](#installation)
- [License](#license)

## Overview

Bitburner is a programming-based incremental game that involves hacking servers, managing finances, and expanding your hacking empire. This repository contains scripts to automate various in-game tasks, making your progression smoother and more efficient.

## Scripts

### infiltrate.js

The `infiltrate.js` script scans the network, gains root access on hackable servers, and deploys a specified hacking script (`getMoney.js`) on them.

### purchaseServer.js

The `purchaseServer.js` script automates the process of purchasing and upgrading servers. It ensures servers are bought when affordable and upgrades them based on available funds.

### sellHash.js

The `sellHash.js` script monitors the player's hash capacity and sells hashes for money when the hash count reaches a certain threshold.

### endNode.js

The `endNode.js` script is designed to locate and backdoor the World Daemon server (`w0r1d_d43m0n`) to complete a BitNode. It checks if the player's hacking level is sufficient before attempting to backdoor the server.

### autoHacknet.js

The `autoHacknet.js` script automates the management of Hacknet Nodes. It purchases new nodes, upgrades existing ones, and ensures the most efficient use of available funds.

### setSleeves.js

The `setSleeves.js` script assigns tasks to all sleeves, configuring them based on their indexes.

### setHackSleeves.js

The `setHackSleeves.js` script specifically configures sleeves to train hacking at a university.

### milestones.js

The `milestones.js` script scans the network to find specific servers and installs backdoors on them if the required hacking level is met.

### getMoney.js

The `getMoney.js` script is a basic hacking script designed to grow, weaken, and hack a specified target server.

### buyPrograms.js

The `buyPrograms.js` script automates the purchase of hacking programs when they become available and the player has enough funds.

### buyGangEquipment.js

The `buyGangEquipment.js` script automates the purchase of equipment for gang members.

## Installation

1. **Clone the Repository:**
   ```sh
   git clone https://github.com/JC3P0/Bitburner.git

## License

This repository is licensed under the MIT License. See the LICENSE file for more details.
