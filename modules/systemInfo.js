const system = require('systeminformation');

const getSystemData = async () => {
  const cpu = await system.cpu();
  const mem = await system.mem();
  const cpuUsage = await system.currentLoad();
  const processes = await system.processes();
  const sortedProcesses = processes.list.sort((a, b) => b.cpu - a.cpu);
  const topProcesses = sortedProcesses.slice(0, 5);
  
  return { cpu, mem, cpuUsage, topProcesses }
};

module.exports = { getSystemData };
