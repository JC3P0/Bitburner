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
- [License](#license)

## Overview

Bitburner is a programming-based incremental game that involves hacking servers, managing finances, and expanding your hacking empire. This repository contains scripts to automate various in-game tasks, making your progression smoother and more efficient.

## Scripts

### infiltrate.js

The `infiltrate.js` script scans the network, gains root access on hackable servers, and deploys a specified hacking script (`getMoney.js`) on them. Targets "foodnstuff" by default unless an arg is given, for example - run infiltrate.js "iron-gym"

### purchaseServer.js

The `purchaseServer.js` script automates the process of purchasing and upgrading servers. It ensures servers are bought when affordable and upgrades them based on available funds.

### sellHash.js

The `sellHash.js` script monitors the player's hash capacity and sells hashes for money when the hash count reaches a certain threshold.

### endNode.js

The endNode.js script is designed to locate and prepare the World Daemon server (w0r1d_d43m0n) for backdoor installation to complete a BitNode. It runs the necessary cracking programs to gain root access and then connects you directly to the server, allowing you to manually install the backdoor. This script requires access to the Singularity API functions, which are unlocked by completing BitNode 4: The Singularity. These functions enable the script to connect to servers and perform the necessary actions programmatically.

### autoHacknet.js

The `autoHacknet.js` script automates the management of Hacknet Nodes. It purchases new nodes, upgrades existing ones, and ensures the most efficient use of available funds.

### setSleeves.js

The `setSleeves.js` script assigns tasks to all sleeves, configuring them based on their indexes.

### setHackSleeves.js

The `setHackSleeves.js` script specifically configures sleeves to train hacking at a university.

### milestones.js

The milestones.js script scans the network to find specific servers and installs backdoors on them if the required hacking level is met. This script requires access to the Singularity API functions, which are unlocked by completing BitNode 4: The Singularity. These functions enable the script to connect to servers and install backdoors programmatically. The script requires 67.90 GB of RAM to run, so upgrading your 'home' server's RAM before executing this script is necessary.

### getMoney.js

The `getMoney.js` script is a basic hacking script designed to grow, weaken, and hack a specified target server.

### buyPrograms.js

The `buyPrograms.js` script automates the purchase of hacking programs when they become available and the player has enough funds.

### buyGangEquipment.js

The `buyGangEquipment.js` script automates the purchase of equipment for gang members.

## License

This repository is licensed under the MIT License. See the LICENSE file for more details.
