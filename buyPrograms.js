/** @param {NS} ns **/
export async function main(ns) {
    const programs = [
        "BruteSSH.exe",
        "FTPCrack.exe",
        "relaySMTP.exe",
        "HTTPWorm.exe",
        "SQLInject.exe",
        "DeepscanV1.exe",
        "DeepscanV2.exe",
        "ServerProfiler.exe",
        "AutoLink.exe",
        "Formulas.exe"
    ];

    // Check if the player has access to the Dark Web
    if (!ns.scan("home").includes("darkweb")) {
        ns.tprint("You do not have access to the Dark Web. Please buy a TOR router from Alpha Enterprises first.");
        return;
    }

    // Attempt to purchase each program
    for (const program of programs) {
        if (!ns.fileExists(program, "home")) {
            const success = ns.singularity.purchaseProgram(program);
            if (success) {
                ns.tprint(`Successfully purchased ${program}`);
            } else {
                ns.tprint(`Failed to purchase ${program}. You might not have enough money.`);
            }
        } else {
            ns.tprint(`${program} already exists on your home computer.`);
        }
    }
}
