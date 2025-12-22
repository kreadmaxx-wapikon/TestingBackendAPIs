import express from 'express';
import { createBook, handleBookList, deleteBook, updateBook } from '../controller/book.controller.js';

const router = express.Router();
//localhost:5000/api/book/create
router.post('/create', createBook);

//localhost:5000/api/book/list
router.get('/list', handleBookList);

//localhost:5000/api/book/delete/:id
router.delete('/delete/:id', deleteBook);

//localhost:5000/api/book/update/:id
router.put('/update', updateBook);
export default router;      