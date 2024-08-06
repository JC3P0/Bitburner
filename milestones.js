/** @param {NS} ns **/
export async function main(ns) {
    const targetServers = new Set(["CSEC", "avmnite-02h", "I.I.I.I", "run4theh111z"]);
    const visited = new Set();

    // Function to backdoor a server
    async function backdoorServer(path) {
        for (const server of path) {
            await ns.singularity.connect(server);
        }
        await ns.singularity.installBackdoor();
        ns.tprint(`Backdoored ${path[path.length - 1]}`);
        await ns.singularity.connect("home");
    }

    // Function to scan the network and backdoor target servers
    async function scanAndBackdoor(currentServer, path) {
        visited.add(currentServer);
        const neighbors = ns.scan(currentServer);

        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor); // Ensure we mark this neighbor as visited
                const newPath = path.concat(neighbor);
                
                // Check if the neighbor is a target server
                if (targetServers.has(neighbor)) {
                    const serverInfo = ns.getServer(neighbor);
                    
                    // Check if we have root access and if the server is already backdoored
                    if (ns.hasRootAccess(neighbor) && !serverInfo.backdoorInstalled) {
                        // Check if our hacking level is sufficient
                        if (ns.getHackingLevel() >= serverInfo.requiredHackingSkill) {
                            await backdoorServer(newPath);
                        } else {
                            ns.tprint(`Cannot backdoor ${neighbor}. Required hacking level: ${serverInfo.requiredHackingSkill}`);
                        }
                    }
                }
                
                await scanAndBackdoor(neighbor, newPath);
            }
        }
    }

    await scanAndBackdoor(ns.getHostname(), [ns.getHostname()]);
}
