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
                if (targetServers.has(neighbor) && ns.hasRootAccess(neighbor) && !ns.getServer(neighbor).backdoorInstalled) {
                    await backdoorServer(newPath);
                }
                await scanAndBackdoor(neighbor, newPath);
            }
        }
    }

    await scanAndBackdoor(ns.getHostname(), [ns.getHostname()]);
}
