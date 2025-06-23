import { Request, Response } from 'express';
import { Borrow } from '../models/borrow.model';
import { Book } from '../models/book.model';
import { sendResponse } from '../untils/apiResponse';
//6
export const borrowBook = async (req: Request, res: Response) => {
  try {
    const { book, quantity, dueDate } = req.body;
    const foundBook = await Book.findById(book);
    if (!foundBook) return sendResponse(res, 404, 'Book not found');

    if (foundBook.copies < quantity) {
      return sendResponse(res, 400, 'Not enough copies available');
    }

    foundBook.copies -= quantity;
    await foundBook.save();
    await Book.updateAvailability(foundBook._id);

    const borrowRecord = await Borrow.create({ book, quantity, dueDate });
    sendResponse(res, 201, 'Book borrowed successfully', borrowRecord);
  } catch (error) {
    sendResponse(res, 400, 'Failed to borrow book', null, error);
  }
};
//7
export const borrowedBooksSummary = async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: '$book',
          totalQuantity: { $sum: '$quantity' },
        },
      },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: '_id',
          as: 'bookInfo',
        },
      },
      { $unwind: '$bookInfo' },
      {
        $project: {
          book: {
            title: '$bookInfo.title',
            isbn: '$bookInfo.isbn',
          },
          totalQuantity: 1,
        },
      },
    ]);

    sendResponse(res, 200, 'Borrowed books summary retrieved successfully', summary);
  } catch (error) {
    sendResponse(res, 500, 'Failed to retrieve summary', null, error);
  }
};
