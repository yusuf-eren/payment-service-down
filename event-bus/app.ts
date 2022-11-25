import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

let events: any[] = [];

app.post('/event', (req: Request, res: Response) => {
  const { id, type, status } = req.body;
  console.log(req.body)
  events.push({ id, type, status });
  res.sendStatus(201);
});

app.get('/events', (req: Request, res: Response) => {
  const { type, status } = req.query;
  const requestedEvents = events.filter((event)=> {
    return event.type === type && event.status === status
  })
  return res.status(200).send(requestedEvents);
});

app.listen(3001, () => {
  console.log('http://localhost:3001 Event Bus');
});
