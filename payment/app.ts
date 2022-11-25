import express, { Request, Response } from 'express';
import axios from 'axios';
import { randomBytes } from 'crypto';

const app = express();

const checkPendingEvents = async () => {
  const pendingEvents = await axios.get(
    'http://localhost:3001/events?type=payment&status=pending'
  );
  if(pendingEvents.data.length !== 0) {
    // Requesting to Payment Provider's API with IDs
    // To check If the Transaction is Successful or Not
    console.log(pendingEvents.data)
    console.log('Events checking...');
  }
  console.log('Successfully checked pending events');

};

checkPendingEvents();

app.post('/order', async (req: Request, res: Response) => {
  
  let error;
  // Requesting to Payment Provider
  const paymentEvent = await axios
    .post('http://localhost:3001/event', {
        type: 'payment',
        status: 'pending',
        id: randomBytes(6).toString('hex'),
    })
    .catch((err) => (error = err));
  if (error) return res.sendStatus(503);

  setTimeout(() => {
    console.log('payment accepted');
  }, 5000);

  // Creating Order and Saving to DB
  setTimeout(() => {
    console.log('saved to DB');
  }, 10000);

  // Sending Successful Transaction Email
  setTimeout(() => {
    console.log('Transaction email sent');
  }, 15000);

  return res.sendStatus(201)
});

app.listen(3000, () => {
  console.log('http://localhost:3000 Payment');
});
