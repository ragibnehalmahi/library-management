import { Schema, model } from 'mongoose';
import { IBook } from '../interfaces/book.interface';

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      required: true,
      enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: { type: Number, required: true, min: 0 },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

bookSchema.pre('save', function (next) {
  this.available = this.copies > 0;
  next();
});
bookSchema.statics.updateAvailability = async function (bookId: string) {
  const book = await this.findById(bookId);
  if (!book) return;
  book.available = book.copies > 0;
  await book.save();
};

export const Book = model<IBook, any>('Book', bookSchema);

 