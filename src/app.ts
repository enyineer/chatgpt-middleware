import { ChatGPTAPIBrowser, ChatGPTError } from 'chatgpt';
import * as dotenv from 'dotenv';
import express, { Request, Response } from 'express';

async function main() {
  dotenv.config();

  const email = process.env.OPENAPI_EMAIL;
  const password = process.env.OPENAPI_PASSWORD;
  const serverPort = parseInt(process.env.SERVER_PORT || "NaN");

  const app = express();

  if (email === undefined) {
    throw Error('OPENAPI_EMAIL not set.');
  }

  if (password === undefined) {
    throw Error('OPENAPI_PASSWORD not set.');
  }

  if (isNaN(serverPort)) {
    throw Error('SERVER_PORT is not a number or not set.');
  }

  const api = new ChatGPTAPIBrowser({
    email,
    password
  });

  await api.initSession();

  app.get('/message', async (req: Request, res: Response) => {
    const q = req.query.q;
    
    if (q === undefined || q === '') {
      return res.status(400).send({ message: 'Invalid query parameter q'});
    }

    try {
      const result = await api.sendMessage(q.toString());
      return res.send({ q, result });
    } catch (err) {
      if (err instanceof ChatGPTError) {
        return res.status(500).send({ message: `ChatGPT Error: ${err.message}` });
      }
    }
  });

  app.listen(serverPort, () => {
    console.log(`Server is running at http://localhost:${serverPort}`);
  });
}

main();