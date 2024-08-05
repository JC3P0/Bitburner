/** @param {NS} ns **/
export async function main(ns) {
    const targetServer = "w0r1d_d43m0n";
    const visited = new Set();
    const portManager = {
        "BruteSSH.exe": ns.brutessh,
        "FTPCrack.exe": ns.ftpcrack,
        "relaySMTP.exe": ns.relaysmtp,
        "HTTPWorm.exe": ns.httpworm,
        "SQLInject.exe": ns.sqlinject
    };

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

    // Function to crack the server
    function crackServer(server) {
        let numCracks = 0;
        for (const file of Object.keys(portManager)) {
            if (ns.fileExists(file, "home")) {
                portManager[file](server);
                numCracks++;
            }
        }
        if (numCracks >= ns.getServerNumPortsRequired(server)) {
            ns.nuke(server);
            ns.tprint(`Gained root access to ${server}`);
        }
    }

    // Function to connect to the target server
    async function connectToServer(path) {
        ns.tprint(`Path to ${targetServer}: ${path.join(" -> ")}`);
        for (const server of path) {
            if (server !== ns.getHostname()) {
                ns.tprint(`Connecting to ${server}`);
                await ns.singularity.connect(server);
            }
        }
        ns.tprint(`Connected to ${targetServer}. You can now manually install the backdoor.`);
    }

    // Function to scan the network and find the target server
    async function scanAndConnect(currentServer, path) {
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
                        if (!ns.hasRootAccess(neighbor)) {
                            crackServer(neighbor);
                        }
                        if (ns.hasRootAccess(neighbor)) {
                            await connectToServer(newPath);
                        } else {
                            ns.tprint(`Unable to gain root access to ${neighbor}`);
                        }
                    } else {
                        ns.tprint(`Hacking level ${hackingLevel} is not sufficient to hack ${targetServer}. Required level: ${requiredHackingLevel}`);
                    }
                    return;
                }
                await scanAndConnect(neighbor, newPath);
            }
        }
    }

    ns.tprint(`Starting scan to find and connect to ${targetServer}`);
    await scanAndConnect(ns.getHostname(), [ns.getHostname()]);
}
