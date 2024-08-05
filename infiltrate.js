/** @param {NS} ns */
export async function main(ns) {
    var target = ns.args[0];
    var home = "home";
    var portManager = {
      "BruteSSH.exe": ns.brutessh,
      "FTPCrack.exe": ns.ftpcrack,
      "relaySMTP.exe": ns.relaysmtp,
      "HTTPWorm.exe": ns.httpworm,
      "SQLInject.exe": ns.sqlinject
    };
    var virus = "getMoney.js";
    var virusRam = ns.getScriptRam(virus);
  
  
    function getNumCracks() {
      return Object.keys(portManager).filter(function (file) {
        return ns.fileExists(file, home);
      }).length;
    }
  
  
    function portCrack(server) {
      ns.print("INFILTRATING " + server);
      for (var file of Object.keys(portManager)) {
        if (ns.fileExists(file, home)) {
          var runCrack = portManager[file];
          runCrack(server);
        }
      }
    }
  
  
    function getNetworkNodes() {
      //depth first search
      var visited = {};
      var stack = [];
      var origin = ns.getHostname();
      stack.push(origin);
      while (stack.length > 0) {
        var node = stack.pop();
        if (!visited[node]) {
          visited[node] = node;
          var neighbors = ns.scan(node);
          for (var i = 0; i < neighbors.length; i++) {
            var child = neighbors[i];
            if(visited[child]) {
              continue;
            }
            stack.push(child);
          }
        }
      }
      return Object.keys(visited);
    }
  
  
    function canHack(server) {
      var numCracks = getNumCracks();
      var reqPorts = ns.getServerNumPortsRequired(server);
      var getRam = ns.getServerMaxRam(server);
        //check if we have enough portManagers and ram to hack.
      return numCracks >= reqPorts && getRam > virusRam;
    }
  
  
    function getTargetServers() {
      var networkNodes = getNetworkNodes();
      var targets = networkNodes.filter(function (node) { return canHack(node) });
      //add private servers
      var i = 0;
      var servPrefix = "privateServer-";
      while(ns.serverExists(servPrefix + i)) {
        targets.push(servPrefix + i);
        ++i;
      }
      return targets;
    }
  
  
    async function scpVirus(server) {
      ns.print("VIRUS-> " + server);
      await ns.scp(virus, server);
      if (!ns.hasRootAccess(server)) {
        var reqPorts = ns.getServerNumPortsRequired(server);
        if (reqPorts > 0) {
          portCrack(server);
        }
        ns.print("Root: " + server);
        ns.nuke(server);
      }
      if (ns.scriptRunning(virus, server)) {
        ns.scriptKill(virus, server);
      }
      var maxThreads = Math.floor(ns.getServerMaxRam(server) / virusRam);
      ns.exec(virus, server, maxThreads, target);
    }
  
  
    async function deployHacks(targets) {
      ns.tprint("Deploying to servers: " + targets);
      for (var serv of targets) {
        await scpVirus(serv);
      }
    }
  
  
    var currentTarget = [];
    var waitTime = 2000;
    while(true){
      var newTargets = getTargetServers();
      if(newTargets.length !== currentTarget.length) {
        await deployHacks(newTargets);
        currentTarget = newTargets;
      }
      await ns.sleep(waitTime);
    }
  }
