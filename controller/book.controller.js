import Book from '../model/book.model.js';

export const createBook = async (req, res) => {
    try {
        const body = req.body;
        if (!body.bookName || !body.bookTitle || !body.bookAuthor || !body.sellingPrice || !body.publicationDate) {
            return res.status(400).json({ message: 'All fields are required', success: false });
        }

        const book = await Book.create(body);
        console.log(book);
        return res.status(201).json({ message: 'Book created successfully', success: true, book });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', success: false, error: error.message });
    }
}

export const handleBookList = async (req, res) => {
    try {
        const books = await Book.find();
        console.log(books);
        return res.status(200).json({ message: 'Books fetched successfully', success: true, books });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', success: false, error: error.message });
    }
}

export const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findByIdAndDelete(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found', success: false });
        }
        return res.status(200).json({ message: 'Book deleted successfully', success: true, book });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', success: false, error: error.message });
    }
}

export const updateBook = async (req, res) => {
    try {
   const body = req.body;
   const updatingBook = await Book.updateOne({_id: body._id}, {$set: body});
   if (updatingBook.modifiedCount > 0) {
    return res.status(200).json({ message: 'Book updated successfully', success: true, updatingBook });
   } else {
    return res.status(400).json({ message: 'Book not updated', success: false });
   }
} catch (error) {
    return res.status(500).json({ message: 'Internal server error', success: false, error: error.message });
}
}