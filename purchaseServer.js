/** @param {NS} ns */
export async function main(ns) {
    var target = ns.args[0];
    var home = "home";
    var pRam = 8;
    // var servPrefix = "PurchasedServer(";
    var servPrefix = "(J)$$$(";
  
    var maxRam = ns.getPurchasedServerMaxRam();
    var maxServers = ns.getPurchasedServerLimit();
  
    var virus = "getMoney.js";
    var virusRam = ns.getScriptRam(virus);
  
    function canPurchaseServer(){
      return ns.getServerMoneyAvailable(home) > ns.getPurchasedServerCost(pRam);
    }
  
    function killVirus(server){
      if(ns.scriptRunning(virus, server)){
        ns.scriptKill(virus, server);
      }
    }
  
    async function copyVirus(server){
      ns.print("virus-> " + server);
      await ns.scp(virus, server);
      killVirus(server);
      var maxThreads = Math.floor(pRam / virusRam);
      ns.exec(virus, server, maxThreads, target);
    }
  
    function shutdownServer(server){
      killVirus(server);
      ns.deleteServer(server);
    }
  
    async function upgradeServer(server){
      var sRam = ns.getServerMaxRam(server);
      if(sRam < pRam){
        while(!canPurchaseServer()){
          await ns.sleep(10000); //wait 10 sec, until you have enough money to buy server
        }
        shutdownServer(server);
        ns.purchaseServer(server, pRam);
      }
      await copyVirus(server);
    }
  
    async function autoUpgradeServers(){
      var i = 1;
      while(i < (maxServers + 1)){
        var server = servPrefix + i.toString().padStart(2, '0') + ")";
        if(ns.serverExists(server)){
          ns.print("Upgrading: " + server + " (" + pRam + "GB)");
          await upgradeServer(server);
          ++i;
        } else if (canPurchaseServer()) {
          ns.print("Buying: " + server + " (" + pRam + "GB)");
          ns.purchaseServer(server, pRam);
          await copyVirus(server);
          ++i;
        }
      }
    }
  
    while(true){
      await autoUpgradeServers();
      if(pRam === maxRam){
        break;
      }
      //move up a tier
      var newRam = pRam * 2;
      if (newRam > maxRam){
        pRam = maxRam;
      } else {
        pRam = newRam;
      }
    }
  }
  