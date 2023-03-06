const system = require('systeminformation');

const getSystemData = async () => {
  const cpu = await system.cpu();
  const mem = await system.mem();
  const cpuUsage = await system.currentLoad();
  const processes = await system.processes();
  const sortedProcesses = processes.list.sort((a, b) => b.cpu - a.cpu);
  const topProcesses = sortedProcesses.slice(0, 5);

  /*
  const cpuUsage = await system.currentLoad({ interval: 1000 });
  
  const processes = await system.processes({ path: 'name', sort: 'pcpu', reverse: true });

  const topProcesses = processes.slice(0, 5)
    .map((process) => ({ name: process.name, cpuUsage: process.pcpu }));

  console.log({
    cpuName: cpu.brand,
    cpuCores: cpu.cores,
    cpuSpeed: cpu.speed,
    cpuUsage: cpuUsage.currentLoad.toFixed(2),
    memUsage: memUsage.used,
    topProcesses,
  });

  return {
    cpuName: cpu.brand,
    cpuCores: cpu.cores,
    cpuSpeed: cpu.speed,
    cpuUsage: cpuUsage.currentLoad.toFixed(2),
    memUsage: memUsage.used,
    topProcesses,
  };
  */
 return { cpu, mem, cpuUsage, topProcesses }
};

module.exports = { getSystemData };
