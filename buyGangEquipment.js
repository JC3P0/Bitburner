/** @param {NS} ns **/
export async function main(ns) {
    const equipment = ns.gang.getEquipmentNames();

    const members = ns.gang.getMemberNames();
    for (const member of members) {
        for (const item of equipment) {
            if (ns.gang.purchaseEquipment(member, item)) {
                ns.tprint(`Bought ${item} for ${member}`);
            } else {
                ns.tprint(`Failed to buy ${item} for ${member}. Not enough money or already owned.`);
            }
        }
    }
}
