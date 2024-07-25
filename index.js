import express from 'express';
import { Client } from '@gradio/client';
import cors from 'cors';

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

app.post('/predict', async (req, res) => {
  const { source, target, text } = req.body;

  try {
    const client = await Client.connect('Geonmo/nllb-translation-demo');
    const result = await client.predict('/predict', { 
      source, 
      target, 
      text 
    });
    res.json(result.data);
  } catch (error) {
    console.error('Error making prediction:', error);
    res.status(500).send('An error occurred while making the prediction.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
