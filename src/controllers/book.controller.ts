import { Request, Response } from 'express';
import { Book } from '../models/book.model';
import { sendResponse } from '../untils/apiResponse';

export const createBook = async (req: Request, res: Response) => {
  try {
    const book = new Book(req.body);
    const saved = await book.save();
    sendResponse(res, 201, 'Book created successfully', saved);
  } catch (error) {
    sendResponse(res, 400, 'Failed to create book', null, error);
  }
};

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = req.query;
    const query: any = filter ? { genre: (filter as string).toUpperCase() } : {};
    const books = await Book.find(query)
      .sort({ [sortBy as string]: sort === 'asc' ? 1 : -1 })
      .limit(parseInt(limit as string));

    sendResponse(res, 200, 'Books retrieved successfully', books);
  } catch (error) {
    sendResponse(res, 500, 'Failed to retrieve books', null, error);
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) return sendResponse(res, 404, 'Book not found');
    sendResponse(res, 200, 'Book retrieved successfully', book);
  } catch (error) {
    sendResponse(res, 500, 'Failed to retrieve book', null, error);
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return sendResponse(res, 404, 'Book not found');
    sendResponse(res, 200, 'Book updated successfully', updated);
  } catch (error) {
    sendResponse(res, 400, 'Failed to update book', null, error);
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.bookId);
    if (!deleted) return sendResponse(res, 404, 'Book not found');
    sendResponse(res, 200, 'Book deleted successfully');
  } catch (error) {
    sendResponse(res, 500, 'Failed to delete book', null, error);
  }
};