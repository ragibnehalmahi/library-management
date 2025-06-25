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
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const book_model_1 = require("../models/book.model");
const apiResponse_1 = require("../untils/apiResponse");
//1
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = new book_model_1.Book(req.body);
        const saved = yield book.save();
        (0, apiResponse_1.sendResponse)(res, 201, 'Book created successfully', saved);
    }
    catch (error) {
        (0, apiResponse_1.sendResponse)(res, 400, 'Failed to create book', null, error);
    }
});
exports.createBook = createBook;
//2
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = req.query;
        const query = filter ? { genre: filter.toUpperCase() } : {};
        const books = yield book_model_1.Book.find(query)
            .sort({ [sortBy]: sort === 'asc' ? 1 : -1 })
            .limit(parseInt(limit));
        (0, apiResponse_1.sendResponse)(res, 200, 'Books retrieved successfully', books);
    }
    catch (error) {
        (0, apiResponse_1.sendResponse)(res, 500, 'Failed to retrieve books', null, error);
    }
});
exports.getAllBooks = getAllBooks;
//3
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.findById(req.params.bookId);
        if (!book)
            return (0, apiResponse_1.sendResponse)(res, 404, 'Book not found');
        (0, apiResponse_1.sendResponse)(res, 200, 'Book retrieved successfully', book);
    }
    catch (error) {
        (0, apiResponse_1.sendResponse)(res, 500, 'Failed to retrieve book', null, error);
    }
});
exports.getBookById = getBookById;
//4
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield book_model_1.Book.findByIdAndUpdate(req.params.bookId, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updated)
            return (0, apiResponse_1.sendResponse)(res, 404, 'Book not found');
        (0, apiResponse_1.sendResponse)(res, 200, 'Book updated successfully', updated);
    }
    catch (error) {
        (0, apiResponse_1.sendResponse)(res, 400, 'Failed to update book', null, error);
    }
});
exports.updateBook = updateBook;
//5
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield book_model_1.Book.findByIdAndDelete(req.params.bookId);
        if (!deleted)
            return (0, apiResponse_1.sendResponse)(res, 404, 'Book not found');
        (0, apiResponse_1.sendResponse)(res, 200, 'Book deleted successfully');
    }
    catch (error) {
        (0, apiResponse_1.sendResponse)(res, 500, 'Failed to delete book', null, error);
    }
});
exports.deleteBook = deleteBook;
