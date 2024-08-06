/** @param {NS} ns **/
export async function main(ns) {
    // Number of sleeves you have
    const sleeveCount = ns.sleeve.getNumSleeves();

    // Loop through each sleeve and assign tasks
    for (let i = 0; i < sleeveCount; i++) {
        // Set each sleeve to commit the crime "homicide"
        ns.sleeve.setToCommitCrime(i, "homicide");
        ns.tprint(`Assigned sleeve ${i} to commit the crime "homicide"`);
    }
}
