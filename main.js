const express = require('express');
const { getGeneralInfo } = require('./chat/generalSystem');

const app = express();
const port = process.env.PORT || 3000;

app.get('/general-system-info', async (req, res) => {
  try {
    const result = await getGeneralInfo();
    if (result.data.choices[0].message.content) {
      res.send(result.data.choices[0].message.content);
    } else {
      throw new Error('Unexpected API response')
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while retrieving system information');
  }
});

/*
app.get('/get-memory-info', async (req, res) => {
  try {

  } catch {

  }
})
*/
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
