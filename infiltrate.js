/** @param {NS} ns */
export async function main(ns) {
    const target = ns.args[0] || "foodnstuff";
    const home = "home";
    const portManager = {
        "BruteSSH.exe": ns.brutessh,
        "FTPCrack.exe": ns.ftpcrack,
        "relaySMTP.exe": ns.relaysmtp,
        "HTTPWorm.exe": ns.httpworm,
        "SQLInject.exe": ns.sqlinject,
    };
    const virus = "getMoney.js";
    const virusRam = ns.getScriptRam(virus);

    function getNumCracks() {
        return Object.keys(portManager).filter(file => ns.fileExists(file, home)).length;
    }

    function portCrack(server) {
        ns.print(`INFILTRATING ${server}`);
        for (const file of Object.keys(portManager)) {
            if (ns.fileExists(file, home)) {
                const runCrack = portManager[file];
                runCrack(server);
            }
        }
    }

    function getNetworkNodes() {
        const visited = {};
        const stack = [];
        const origin = ns.getHostname();
        stack.push(origin);
        while (stack.length > 0) {
            const node = stack.pop();
            if (!visited[node]) {
                visited[node] = true;
                const neighbors = ns.scan(node);
                for (const child of neighbors) {
                    if (!visited[child]) {
                        stack.push(child);
                    }
                }
            }
        }
        return Object.keys(visited);
    }

    function canHack(server) {
        const numCracks = getNumCracks();
        const reqPorts = ns.getServerNumPortsRequired(server);
        const getRam = ns.getServerMaxRam(server);
        return numCracks >= reqPorts && getRam >= virusRam;
    }

    function getTargetServers() {
        const networkNodes = getNetworkNodes();
        const targets = networkNodes.filter(node => canHack(node));
        let i = 0;
        const servPrefix = "privateServer-";
        while (ns.serverExists(servPrefix + i)) {
            targets.push(servPrefix + i);
            i++;
        }
        return targets;
    }

    async function scpVirus(server) {
        ns.print(`VIRUS-> ${server}`);
        await ns.scp(virus, server);
        if (!ns.hasRootAccess(server)) {
            const reqPorts = ns.getServerNumPortsRequired(server);
            if (reqPorts > 0) {
                portCrack(server);
            }
            ns.print(`Root: ${server}`);
            ns.nuke(server);
        }
        if (ns.scriptRunning(virus, server)) {
            ns.scriptKill(virus, server);
        }
        const maxThreads = Math.floor(ns.getServerMaxRam(server) / virusRam);
        if (maxThreads > 0) {
            ns.exec(virus, server, maxThreads, target);
        }
    }

    async function deployHacks(targets) {
        ns.tprint(`Deploying to servers: ${targets.join(", ")}`);
        for (const serv of targets) {
            await scpVirus(serv);
        }
    }

    let currentTarget = [];
    const waitTime = 2000;
    while (true) {
        const newTargets = getTargetServers();
        if (newTargets.length !== currentTarget.length) {
            await deployHacks(newTargets);
            currentTarget = newTargets;
        }
        await ns.sleep(waitTime);
    }
}
