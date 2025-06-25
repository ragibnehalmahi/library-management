"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowedBooksSummary = exports.borrowBook = void 0;
const borrow_model_1 = require("../models/borrow.model");
const book_model_1 = require("../models/book.model");
const apiResponse_1 = require("../untils/apiResponse");
//6
const borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book, quantity, dueDate } = req.body;
        const foundBook = yield book_model_1.Book.findById(book);
        if (!foundBook)
            return (0, apiResponse_1.sendResponse)(res, 404, 'Book not found');
        if (foundBook.copies < quantity) {
            return (0, apiResponse_1.sendResponse)(res, 400, 'Not enough copies available');
        }
        foundBook.copies -= quantity;
        yield foundBook.save();
        yield book_model_1.Book.updateAvailability(foundBook._id);
        const borrowRecord = yield borrow_model_1.Borrow.create({ book, quantity, dueDate });
        (0, apiResponse_1.sendResponse)(res, 201, 'Book borrowed successfully', borrowRecord);
    }
    catch (error) {
        (0, apiResponse_1.sendResponse)(res, 400, 'Failed to borrow book', null, error);
    }
});
exports.borrowBook = borrowBook;
//7
const borrowedBooksSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.Borrow.aggregate([
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
        (0, apiResponse_1.sendResponse)(res, 200, 'Borrowed books summary retrieved successfully', summary);
    }
    catch (error) {
        (0, apiResponse_1.sendResponse)(res, 500, 'Failed to retrieve summary', null, error);
    }
});
exports.borrowedBooksSummary = borrowedBooksSummary;
