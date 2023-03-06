const { Configuration, OpenAIApi } = require('openai');
const { getSystemData } = require('./modules/systemInfo');
require('dotenv').config();

const run = async () => {
  const openai = new OpenAIApi(new Configuration({ apiKey: process.env.API_KEY }));
  //const systemData = await getSystemData();
  const { cpu, mem, currentLoad } = await getSystemData();

  const messages = [
    {
      role: 'system',
      content: `You are analyzing a personal computer, collecting data, and looking for ways to optimize it.`
    },
    {
        role: 'user',
        content: `My CPU data is as follows: ${JSON.stringify(cpu)}, and the current load is ${JSON.stringify(currentLoad)}. My RAM data is as follows: ${JSON.stringify(mem)}. Summarize this data in plain English based solely on the information provided. As of right now, what is the status of the system in terms of performance?`
    }
    /*
    { role: 'user', content: `Current CPU usage is ${systemData.cpuUsage}%, current memory usage is ${(systemData.memUsage / 1024 / 1024 / 1024).toFixed(2)}GB, and the top five applications in terms of computational demand are: ${systemData.topProcesses.map(process => `${process.name} (${process.cpuUsage}% CPU usage)`).join(', ')}.` },*/
  ];

  const completion = await openai.createChatCompletion({ model: 'gpt-3.5-turbo', messages });
  console.log(completion.data.choices);
};

run();




