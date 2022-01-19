/** @param {NS} ns **/
export async function main(ns) {
var target = ns.args[0];
if (ns.args[0] == null) {
    ns.tprint("Missing target argument for hack.js");
    ns.exit();
}
ns.disableLog("getServerRequiredHackingLevel", "getHackingLevel");
var moneyThresh = ns.getServerMaxMoney(target) * 0.75;

var securityThresh = ns.getServerMinSecurityLevel(target) + 5;

if (ns.hasRootAccess(target) == false) {

if (ns.fileExists("BruteSSH.exe", "home")) {
    ns.brutessh(target);
}
if (ns.fileExists("FTPCrack.exe", "home")) {
    ns.ftpcrack(target);
}
if (ns.fileExists("relaySMTP.exe", "home")) {
    ns.relaysmtp(target);
}
if (ns.fileExists("HTTPWorm.exe", "home")) {
    ns.httpworm(target);
}
if (ns.fileExists("SQLInject.exe", "home")) {
    ns.sqlinject(target);
}
ns.nuke(target);
}

let hackTargetLevel = ns.getServerRequiredHackingLevel(target);
let myHackLevel = ns.getHackingLevel();
// Infinite loop that continously hacks/grows/weakens the target server
while(true) {
    if (ns.getServerSecurityLevel(target) > securityThresh) {
        // If the server's security level is above our threshold, weaken it
        await ns.weaken(target);
    } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
        // If the server's money is less than our threshold, grow it
        await ns.grow(target);
    } else if (myHackLevel < hackTargetLevel) {
        await ns.sleep(300000);
    }
    
    else {
        // Otherwise, hack it
        await ns.hack(target);
    }
}
}
