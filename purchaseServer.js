/** @param {NS} ns **/
export async function main(ns) {
  const target = ns.args[0] || "foodnstuff"; // Default target to 'foodnstuff' if not provided
  const home = "home";
  let pRam = 8;
  const servPrefix = "(J)$$$(";

  const maxRam = ns.getPurchasedServerMaxRam();
  const maxServers = ns.getPurchasedServerLimit();

  const virus = "getMoney.js";
  const virusRam = ns.getScriptRam(virus);

  function canPurchaseServer() {
      return ns.getServerMoneyAvailable(home) > ns.getPurchasedServerCost(pRam);
  }

  function killVirus(server) {
      if (ns.scriptRunning(virus, server)) {
          ns.scriptKill(virus, server);
      }
  }

  async function copyVirus(server) {
      ns.print("virus-> " + server);
      await ns.scp(virus, server);
      killVirus(server);
      const maxThreads = Math.floor(pRam / virusRam);
      ns.exec(virus, server, maxThreads, target);
  }

  function shutdownServer(server) {
      killVirus(server);
      ns.deleteServer(server);
  }

  async function upgradeServer(server) {
      const sRam = ns.getServerMaxRam(server);
      if (sRam < pRam) {
          while (!canPurchaseServer()) {
              await ns.sleep(10000); // wait 10 sec until you have enough money to buy server
          }
          shutdownServer(server);
          ns.purchaseServer(server, pRam);
      }
      await copyVirus(server);
  }

  async function autoUpgradeServers() {
      let i = 1;
      while (i <= maxServers) {
          const server = `${servPrefix}${i.toString().padStart(2, '0')})`;
          if (ns.serverExists(server)) {
              ns.print("Upgrading: " + server + " (" + pRam + "GB)");
              await upgradeServer(server);
              i++;
          } else if (canPurchaseServer()) {
              ns.print("Buying: " + server + " (" + pRam + "GB)");
              ns.purchaseServer(server, pRam);
              await copyVirus(server);
              i++;
          }
      }
  }

  while (true) {
      await autoUpgradeServers();
      if (pRam === maxRam) {
          break;
      }
      // move up a tier
      const newRam = pRam * 2;
      pRam = newRam > maxRam ? maxRam : newRam;
  }
}
