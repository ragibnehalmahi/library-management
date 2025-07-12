import express from 'express';
import bookRouter from './routes/book.route';
import borrowRouter from './routes/borrow.route';
import cors from 'cors'
const app = express();

app.use(cors({
  origin:[' http://localhost:5173','https://library-management-frontend-8ont.vercel.app/api'],
  
  
   
}));

app.use(express.json());
app.use('/api/books', bookRouter);
app.use('/api/borrow', borrowRouter);
export default app;
