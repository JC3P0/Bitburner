/** @param {NS} ns **/
export async function main(ns) {
  const target = ns.args[0] || "foodnstuff"; // Default target if no argument is provided
  const home = "home";
  const portManager = {
      "BruteSSH.exe": ns.brutessh,
      "FTPCrack.exe": ns.ftpcrack,
      "relaySMTP.exe": ns.relaysmtp,
      "HTTPWorm.exe": ns.httpworm,
      "SQLInject.exe": ns.sqlinject
  };
  const virus = "getMoney.js";
  const virusRam = ns.getScriptRam(virus);
  const waitTime = 20000;
  let previousNumCracks = 0;

  // Get the number of port-cracking programs available
  const getNumCracks = () => {
      return Object.keys(portManager).filter(file => ns.fileExists(file, home)).length;
  };

  // Run all available port-cracking programs on the target server
  const portCrack = (server) => {
      ns.print(`INFILTRATING ${server}`);
      for (const file of Object.keys(portManager)) {
          if (ns.fileExists(file, home)) {
              portManager[file](server);
          }
      }
  };

  // Perform a depth-first search to discover all servers
  const getNetworkNodes = () => {
      const visited = new Set();
      const stack = [home];
      
      while (stack.length > 0) {
          const node = stack.pop();
          if (!visited.has(node)) {
              visited.add(node);
              const neighbors = ns.scan(node);
              for (const neighbor of neighbors) {
                  if (!visited.has(neighbor)) {
                      stack.push(neighbor);
                  }
              }
          }
      }
      return Array.from(visited);
  };

  // Check if the server can be hacked based on available resources and cracking programs
  const canHack = (server) => {
      const numCracks = getNumCracks();
      const reqPorts = ns.getServerNumPortsRequired(server);
      const maxRam = ns.getServerMaxRam(server);
      const hackingLevel = ns.getHackingLevel();
      const serverHackingLevel = ns.getServerRequiredHackingLevel(server);
      return numCracks >= reqPorts && maxRam > virusRam && hackingLevel >= serverHackingLevel;
  };

  // Get a list of all target servers that can be hacked
  const getTargetServers = () => {
      const networkNodes = getNetworkNodes();
      const targets = networkNodes.filter(node => canHack(node));
      
      // Add private servers to the target list
      let i = 0;
      const servPrefix = "privateServer-";
      while (ns.serverExists(servPrefix + i)) {
          targets.push(servPrefix + i);
          i++;
      }
      return targets;
  };

  // Copy the virus script to the target server and execute it
  const scpVirus = async (server) => {
      ns.print(`VIRUS-> ${server}`);
      await ns.scp(virus, server);

      if (!ns.hasRootAccess(server)) {
          portCrack(server);
          ns.print(`Root: ${server}`);
          ns.nuke(server);
      }

      // Double-check root access before deploying the virus
      if (!ns.hasRootAccess(server)) {
          ns.print(`ERROR: Failed to gain root access to ${server}`);
          return;
      }

      if (ns.scriptRunning(virus, server)) {
          ns.scriptKill(virus, server);
      }

      const maxThreads = Math.floor(ns.getServerMaxRam(server) / virusRam);
      ns.exec(virus, server, maxThreads, target);
  };

  // Deploy the virus to all target servers
  const deployHacks = async (targets) => {
      ns.tprint(`Deploying to servers: ${targets.join(", ")}`);
      for (const server of targets) {
          await scpVirus(server);
      }
  };

  // Main loop to continuously scan and deploy the virus
  let currentTarget = [];
  while (true) {
      const numCracks = getNumCracks();
      if (numCracks > previousNumCracks) {
          const newTargets = getTargetServers();
          if (newTargets.length !== currentTarget.length || !newTargets.every((val, index) => val === currentTarget[index])) {
              await deployHacks(newTargets);
              currentTarget = newTargets;
          }
          previousNumCracks = numCracks;
      }
      await ns.sleep(waitTime);
  }
}
