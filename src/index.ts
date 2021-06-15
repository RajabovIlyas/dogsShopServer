import express, {Request, Response} from 'express';
import {PORT} from './core/app';
import customizationExpress from './core/express';

import createRoutes from './routers'

const app = express();

customizationExpress(app);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
  });
  
  app.use('/api', createRoutes);

app.listen(PORT, () => {
    console.log(`Server started: http://localhost:${PORT}`);
  });