/** @param {NS} ns **/
export async function main(ns) {
  const target = ns.args[0];
  const minSecurity = ns.getServerMinSecurityLevel(target) + 5;
  const maxMoney = ns.getServerMaxMoney(target) * 0.75;

  while (true) {
      if (ns.getServerSecurityLevel(target) > minSecurity) {
          await ns.weaken(target);
      } else if (ns.getServerMoneyAvailable(target) < maxMoney) {
          await ns.grow(target);
      } else {
          await ns.hack(target);
      }
  }
}
 