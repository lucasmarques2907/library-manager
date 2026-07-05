import { useState, type ChangeEvent } from "react";

function App() {
  interface Book {
    id: string;
    title: string;
    author: string;
  }

  const [books, setBooks] = useState<Book[]>([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [editingId, setEditingId] = useState("");

  function handleSetTitle(e: ChangeEvent<HTMLInputElement, HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function handleSetAuthor(e: ChangeEvent<HTMLInputElement, HTMLInputElement>) {
    setAuthor(e.target.value);
  }

  function handleAddBook() {
    if (!title || !author) return;

    setBooks([
      ...books,
      {
        id: crypto.randomUUID(),
        title: title,
        author: author,
      },
    ]);

    setTitle("");
    setAuthor("");
  }

  function handleDeleteBook(id: string) {
    setBooks(books.filter((book) => book.id !== id));

    if (id === editingId) {
      setTitle("");
      setAuthor("");
      setEditingId("");
    }
  }

  function handleUpdateBook() {
    if (!title || !author) return;

    setBooks(
      books.map((book) =>
        book.id === editingId ? { ...book, title, author } : book,
      ),
    );

    setTitle("");
    setAuthor("");
    setEditingId("");
  }

  function handleEditBook(id: string) {
    const bookToEdit: Book | undefined = books.find((book) => book.id === id);
    if (!bookToEdit) return;

    setTitle(bookToEdit.title);
    setAuthor(bookToEdit.author);
    setEditingId(bookToEdit.id);
  }

  return (
    <div>
      <form className="flex gap-x-3">
        <div className="flex flex-col max-w-3xs gap-y-1">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => handleSetTitle(e)}
            className="bg-white rounded-md px-2 py-1"
          />
        </div>
        <div className="flex flex-col max-w-3xs gap-y-1">
          <label>Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => handleSetAuthor(e)}
            className="bg-white rounded-md px-2 py-1"
          />
        </div>
        {editingId ? (
          <button
            type="button"
            onClick={handleUpdateBook}
            className="bg-yellow-700 text-yellow-100 h-fit px-4 py-1 rounded-md font-semibold self-end cursor-pointer"
          >
            Update
          </button>
        ) : (
          <button
            type="button"
            onClick={handleAddBook}
            className="bg-green-700 text-green-100 h-fit px-4 py-1 rounded-md font-semibold self-end cursor-pointer"
          >
            Add
          </button>
        )}
      </form>

      <div>
        {books.map((book, i) => (
          <div key={i} className="flex gap-x-3">
            <h1 className="text-white">
              {book.title} • {book.author}
            </h1>
            <button
              onClick={() => handleDeleteBook(book.id)}
              className="bg-red-700 text-red-100 h-fit px-4 py-1 rounded-md font-semibold self-end cursor-pointer"
            >
              Delete
            </button>
            <button
              onClick={() => handleEditBook(book.id)}
              className="bg-yellow-700 text-yellow-100 h-fit px-4 py-1 rounded-md font-semibold self-end cursor-pointer"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
