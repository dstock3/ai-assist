const system = require('systeminformation');

const getSystemData = async () => {
    const cpuUsage = await system.currentLoad({ interval: 1000 }).catch((err) => {
        console.error(err);
    });
      
    const memUsage = await system.mem();
    const processes = await system.processes({ path: 'name', sort: 'pcpu', reverse: true });

    const topProcesses = processes.slice(0, 5)
        .map((process) => ({ name: process.name, cpuUsage: process.pcpu }));

    console.log({
        cpuUsage: cpuUsage.currentload.toFixed(2),
        memUsage: memUsage.used,
        topProcesses,
    });

    return {
        cpuUsage: cpuUsage.currentload.toFixed(2),
        memUsage: memUsage.used,
        topProcesses,
    };
};

module.exports = { getSystemData };