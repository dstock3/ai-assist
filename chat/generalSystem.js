const { Configuration, OpenAIApi } = require('openai');
const { getSystemData } = require('../modules/systemInfo');
require('dotenv').config();

const getGeneralInfo = async () => {
  const openai = new OpenAIApi(new Configuration({ apiKey: process.env.API_KEY }));
  
  const { cpu, mem, cpuUsage, topProcesses } = await getSystemData();

  const messages = [
    {
      role: 'system',
      content: `You are analyzing a personal computer, collecting data, and looking for ways to optimize it.`
    },
    {
        role: 'user',
        content: `My CPU data is as follows: ${JSON.stringify(cpu)}, and the current load is ${JSON.stringify(cpuUsage)}. My RAM data is as follows: ${JSON.stringify(mem)}. The top processes are as follows: ${JSON.stringify(topProcesses)}. Summarize this data in plain English based solely on the information provided. Create a concise status report to inform me about performance.`
    }
  ];

  const completion = await openai.createChatCompletion({ model: 'gpt-3.5-turbo', messages });
  return completion
};

module.exports = { getGeneralInfo }