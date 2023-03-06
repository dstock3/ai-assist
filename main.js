const { Configuration, OpenAIApi } = require('openai');
const { getSystemData } = require('./modules/systemInfo');
require('dotenv').config();

const run = async () => {
  const openai = new OpenAIApi(new Configuration({ apiKey: process.env.API_KEY }));
  const systemData = await getSystemData();
  const messages = [
    {
      role: 'system',
      content: `You are analyzing a personal computer and looking for ways to optimize it.`
    },
    { role: 'user', content: `Current CPU usage is ${systemData.cpuUsage}%, current memory usage is ${(systemData.memUsage / 1024 / 1024 / 1024).toFixed(2)}GB, and the top five applications in terms of computational demand are: ${systemData.topProcesses.map(process => `${process.name} (${process.cpuUsage}% CPU usage)`).join(', ')}.` },
  ];

  const completion = await openai.createChatCompletion({ model: 'gpt-3.5-turbo', messages });
  console.log(completion.data.choices);
};

run();




