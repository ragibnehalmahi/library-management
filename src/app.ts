import express from 'express';
import bookRouter from './routes/book.route';
import borrowRouter from './routes/borrow.route';

const app = express();
app.use(express.json());
app.use('/api/books', bookRouter);
app.use('/api/borrow', borrowRouter);
export default app;
