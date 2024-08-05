/** @param {NS} ns **/
export async function main(ns) {
    // Number of sleeves you have
    const sleeveCount = ns.sleeve.getNumSleeves();

    // Loop through each sleeve and assign tasks
    for (let i = 0; i < sleeveCount; i++) {
        // Set each sleeve to train hacking by taking university course Algorithms
        ns.sleeve.setToUniversityCourse(i, "Rothman University", "Algorithms");
        ns.tprint(`Assigned sleeve ${i} to train hacking by taking Algorithms course at Rothman University`);
    }
}
