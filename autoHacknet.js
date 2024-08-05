/** @param {NS} ns */
export async function main(ns) {
  const maxNumOfNodes = ns.hacknet.maxNumNodes();

  while (true) {
      let numOfNodes = ns.hacknet.numNodes();
      let moneyAvailable = ns.getServerMoneyAvailable("home");
      let nodeCost = ns.hacknet.getPurchaseNodeCost();

      while (numOfNodes === 0) {
          if (moneyAvailable >= nodeCost) {
              ns.hacknet.purchaseNode();
              numOfNodes += 1;
              moneyAvailable -= nodeCost;
          } else {
              await ns.sleep(2000);
          }
          nodeCost = ns.hacknet.getPurchaseNodeCost(); // Update nodeCost in case it changes
      }

      for (let i = 0; i < numOfNodes; i++) {
          const nodeStats = ns.hacknet.getNodeStats(i);

          const coreCost = ns.hacknet.getCoreUpgradeCost(i);
          const ramCost = ns.hacknet.getRamUpgradeCost(i);
          const levelCost = ns.hacknet.getLevelUpgradeCost(i);

          nodeCost = ns.hacknet.getPurchaseNodeCost(); // Update nodeCost in case it changes

          if (nodeCost <= moneyAvailable && numOfNodes < maxNumOfNodes) {
              ns.hacknet.purchaseNode();
              moneyAvailable -= nodeCost;
              numOfNodes += 1;
          } else if (coreCost <= moneyAvailable && nodeStats.cores < 16) {
              ns.hacknet.upgradeCore(i);
              moneyAvailable -= coreCost;
          } else if (ramCost <= moneyAvailable) {
              ns.hacknet.upgradeRam(i);
              moneyAvailable -= ramCost;
          } else if (levelCost <= moneyAvailable && nodeStats.level < 200) {
              ns.hacknet.upgradeLevel(i);
              moneyAvailable -= levelCost;
          }
      }
      await ns.sleep(2000);
  }
}
