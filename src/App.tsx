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
    <div className="grid grid-rows-[auto_1fr] h-dvh p-4 sm:p-8 max-w-7xl mx-auto gap-y-4 sm:gap-y-8">
      <form className="flex flex-col sm:flex-row gap-2 sm:gap-x-2 justify-center items-stretch sm:items-end">
        <div className="flex flex-col w-full sm:max-w-3xs gap-y-1">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => handleSetTitle(e)}
            className="bg-transparent border-white border-2 text-white rounded-md px-2 py-1 w-full"
          />
        </div>
        <div className="flex flex-col w-full sm:max-w-3xs gap-y-1">
          <label>Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => handleSetAuthor(e)}
            className="bg-transparent border-white border-2 text-white rounded-md px-2 py-1 w-full"
          />
        </div>
        {editingId ? (
          <button
            type="button"
            onClick={handleUpdateBook}
            className="bg-yellow-700 text-yellow-200 h-fit px-4 py-1 rounded-md font-semibold cursor-pointer w-full sm:w-auto"
          >
            Update
          </button>
        ) : (
          <button
            type="button"
            onClick={handleAddBook}
            className="bg-green-700 text-green-200 h-fit px-4 py-1.5 rounded-md font-semibold cursor-pointer w-full sm:w-auto"
          >
            Add
          </button>
        )}
      </form>

      <div
        className={
          books.length === 0
            ? "hidden"
            : "flex flex-col gap-y-2 items-center min-h-0"
        }
      >
        <h2 className="text-xl font-bold text-white">Book List</h2>
        <table className="w-full max-w-md rounded-md bg-neutral-700 overflow-hidden flex flex-col">
          <thead>
            <tr className="grid grid-cols-[1fr_1fr_auto] w-full">
              <th className="text-left text-white p-2">Title</th>
              <th className="text-left text-white p-2">Author</th>
              <th className="text-center text-white p-2">Actions</th>
            </tr>
          </thead>
          <tbody className="h-[calc(100dvh-200px)] overflow-y-auto flex flex-col">
            {books.map((book, i) => (
              <tr
                key={i}
                className={
                  "grid grid-cols-[1fr_1fr_auto] w-full" +
                  (i % 2 === 0 ? " bg-white" : " bg-white/90")
                }
              >
                <td className="text-ellipsis overflow-hidden max-w-full p-2">
                  {book.title}
                </td>
                <td className="text-ellipsis overflow-hidden max-w-full p-2">
                  {book.author}
                </td>
                <td className="flex gap-x-1 sm:gap-x-2 p-2 whitespace-nowrap">
                  <button
                    className="bg-yellow-700 text-yellow-100 h-fit px-2 sm:px-4 py-1 rounded-md font-semibold cursor-pointer text-sm sm:text-base"
                    onClick={() => handleEditBook(book.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-700 text-red-100 h-fit px-2 sm:px-4 py-1 rounded-md font-semibold cursor-pointer text-sm sm:text-base"
                    onClick={() => handleDeleteBook(book.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
