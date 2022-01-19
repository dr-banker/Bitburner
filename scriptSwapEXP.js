/** @param {NS} ns **/
export async function main(ns) {
	//In this script I want to be able to target specific owned servers
	// and swap out the script theyre running for a new one
	//Arguments- 	0: New filename
	//				1:Script Target -- Selecting -a will use array/list of high value targets
	//				2:-a (All) --OR-- Specific Server name 


	var server_list = ns.getPurchasedServers();
	var filename = ns.args[0];
	var target = ns.args[1];
	const targetList = ["syscore", "alpha-ent", "aerocorp", "deltaone", "icarus", "infocomm"
		, "univ-energy", "taiyang-digital", "solaris", "nova-med", "snap-fitness", "millenium-fitness"
		, "unitalife", "galactic-cyber", "omnia", "defcomm", "zb-def", "zeus-med", "global-pharm", "microdyne",
		"rothman-uni", "rho-construction", "lexo-corp", "b-and-a", "stormtech", "fulcrumtech",
		"The-Cave", "nwo", "kuai-gong", "titan-labs", "helios", "vitalife", "4sigma", "clarkinc",
		"megacorp"];

	if (ns.args[1] == "-a") {
		target = targetList;
	}


	if (ns.args[2] == "-a") {
		for (var i = 0; i < server_list.length; i++) {

			let true_kill = ns.killall(server_list[i]);
			var ram = ns.getServerMaxRam(server_list[i]);
			await ns.scp(filename, "home", server_list[i]);
			var threads = Math.floor((ram / (ns.getScriptRam(filename, server_list[i]))));
			var threadsNew = threads / targetList.length;
			if (i >= 1) {
				await ns.sleep(60000);
			}
			for (var j = 0; j < targetList.length; j++) {
				ns.exec(filename, server_list[i], threadsNew, targetList[j]);


			}
		}
	}
	else if (ns.args[2] != null && ns.args[0] != "-a") {

		var server_to_swap = ns.args[2];
	}
	if (ns.args[2] == null) {
		ns.tprint("Args[2] not defined");
		ns.exit();
	}
	//ns.killall(server_to_swap);
	/*
	var target = ns.args[1];
	await ns.scp(filename, "home", server_to_swap);
	var threads = Math.floor((ram / (ns.getScriptRam(filename, server_to_swap))));
	ns.exec(filename, server_to_swap, threads, target);
	*/
}
//let script = ns.ps(server_list[i]);
		//if (ns.isRunning(script)) {
