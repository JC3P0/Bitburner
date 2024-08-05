/** @param {NS} ns **/
export async function main(ns) {
    const targetServer = "w0r1d_d43m0n";
    const visited = new Set();

    // Function to backdoor a server
    async function backdoorServer(path) {
        for (const server of path) {
            await ns.singularity.connect(server);
        }
        await ns.singularity.installBackdoor();
        ns.tprint(`Backdoored ${targetServer}`);
        await ns.singularity.connect("home");
    }

    // Function to find the path to a server
    function findPathToServer(target) {
        let paths = [[ns.getHostname()]];
        let visited = new Set([ns.getHostname()]);
        
        while (paths.length > 0) {
            let path = paths.shift();
            let current = path[path.length - 1];
            let neighbors = ns.scan(current);
            
            for (const neighbor of neighbors) {
                if (neighbor === target) {
                    return path.concat(neighbor);
                }
                
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    paths.push(path.concat(neighbor));
                }
            }
        }
        return [];
    }

    // Function to scan the network and backdoor the target server
    async function scanAndBackdoor(currentServer, path) {
        visited.add(currentServer);
        const neighbors = ns.scan(currentServer);

        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor); // Ensure we mark this neighbor as visited
                const newPath = path.concat(neighbor);
                if (neighbor === targetServer) {
                    const hackingLevel = ns.getHackingLevel();
                    const requiredHackingLevel = ns.getServerRequiredHackingLevel(targetServer);
                    if (hackingLevel >= requiredHackingLevel) {
                        ns.tprint(`Found target server: ${neighbor}`);
                        if (ns.hasRootAccess(neighbor) && !ns.getServer(neighbor).backdoorInstalled) {
                            await backdoorServer(newPath);
                        }
                    } else {
                        ns.tprint(`Hacking level ${hackingLevel} is not sufficient to hack ${targetServer}. Required level: ${requiredHackingLevel}`);
                    }
                    return;
                }
                await scanAndBackdoor(neighbor, newPath);
            }
        }
    }

    await scanAndBackdoor(ns.getHostname(), [ns.getHostname()]);
}
