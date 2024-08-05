/** @param {NS} ns */
export async function main(ns) {
    const maxNumOfNodes = ns.hacknet.maxNumNodes();
    while(true){
      var numOfNodes = await ns.hacknet.numNodes();
      var moneyAvailable = await ns.getServerMoneyAvailable("home");
      var nodeCost = await ns.hacknet.getPurchaseNodeCost();
  
      while(numOfNodes == 0) {
        if(moneyAvailable >= nodeCost) {
          await ns.hacknet.purchaseNode();
          numOfNodes += 1;
          moneyAvailable -= nodeCost;
        }
        else {
          ns.sleep(2000);
        }
      }
  
      for(let i=0; i<numOfNodes; i++) {
        var nodeStats = await ns.hacknet.getNodeStats(i);
  
        var coreCost = await ns.hacknet.getCoreUpgradeCost(i);
        var ramCost = await ns.hacknet.getRamUpgradeCost(i);
        var levelCost = await ns.hacknet.getLevelUpgradeCost(i);
  
        nodeCost = await ns.hacknet.getPurchaseNodeCost();
  
        if(nodeCost <= moneyAvailable && numOfNodes < maxNumOfNodes) {
          await ns.hacknet.purchaseNode();
          moneyAvailable -= nodeCost;
          numOfNodes += 1;
        }
        else if(coreCost <= moneyAvailable && nodeStats.cores < 16) {
          await ns.hacknet.upgradeCore(i);
          moneyAvailable -= coreCost;
        }
        else if(ramCost <= moneyAvailable) {
          await ns.hacknet.upgradeRam(i);
          moneyAvailable -= ramCost;
        }
        else if(levelCost <= moneyAvailable && nodeStats.level < 200) {
          await ns.hacknet.upgradeLevel(i);
          moneyAvailable -= levelCost;
        }
      }
      await ns.sleep(2000);
    }
  }
  