/** @param {NS} ns */
export async function main(ns) {
    var localhost = ns.args[0];
    var minSecurity = ns.getServerMinSecurityLevel(localhost) + 5
    var maxMoney = ns.getServerMaxMoney(localhost) * 0.75;
  
    while(true) {
      if (ns.getServerSecurityLevel(localhost) > minSecurity) {
        await ns.weaken(localhost);
      } else if ( ns.getServerMoneyAvailable(localhost) < maxMoney){
        await ns.grow(localhost);
      } else {
        await ns.hack(localhost);
      }
    }
  }
  