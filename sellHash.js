/** @param {NS} ns */
export async function main(ns) {
  while (true) {
      const numOfHashes = ns.hacknet.numHashes();
      const maxHashes = ns.hacknet.hashCapacity();
      // (0.9 * maxHashes) or 4 (max or min)
      if (numOfHashes >= (0.9 * maxHashes)) {
          await ns.hacknet.spendHashes("Sell for Money", "");
      } else {
          await ns.sleep(2000);
      }
  }
}
