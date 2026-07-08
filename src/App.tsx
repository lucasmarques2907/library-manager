import { useState, type ChangeEvent } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function App() {
  interface Book {
    id: string;
    title: string;
    author: string;
  }

  const currentYear = new Date().getFullYear();

  const [books, setBooks] = useState<Book[]>([]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const [editingId, setEditingId] = useState("");
  const [editingTitle, setEditingTitle] = useState("");
  const [editingAuthor, setEditingAuthor] = useState("");

  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  }

  function handleSetTitle(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function handleSetAuthor(e: React.ChangeEvent<HTMLInputElement>) {
    setAuthor(e.target.value);
  }

  function handleAddBook(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title || !author) return;

    setBooks([
      ...books,
      {
        id: generateId(),
        title: title,
        author: author,
      },
    ]);

    setTitle("");
    setAuthor("");

    (document.activeElement as HTMLElement)?.blur();
  }

  function handleSetEditingBook(id: string) {
    const bookToEdit: Book | undefined = books.find((book) => book.id === id);
    if (!bookToEdit) return;

    setEditingId(bookToEdit.id);
    setEditingTitle(bookToEdit.title);
    setEditingAuthor(bookToEdit.author);
  }

  function handleSetEditingTitle(e: ChangeEvent<HTMLInputElement>) {
    setEditingTitle(e.target.value);
  }

  function handleSetEditingAuthor(e: ChangeEvent<HTMLInputElement>) {
    setEditingAuthor(e.target.value);
  }

  function handleEditBook(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!editingTitle || !editingAuthor) return;

    setBooks(
      books.map((book) =>
        book.id === editingId
          ? { ...book, title: editingTitle, author: editingAuthor }
          : book,
      ),
    );

    setEditingId("");
    setEditingTitle("");
    setEditingAuthor("");
  }

  function cancelEditBook() {
    setEditingId("");
    setEditingTitle("");
    setEditingAuthor("");
  }

  function handleDeleteBook(id: string) {
    setBooks(books.filter((book) => book.id !== id));
  }

  return (
    <div className='bg-orange-200/30 min-h-dvh w-screen flex flex-col'>
      <div className='mx-auto max-w-3xl p-8 flex flex-col gap-y-4 flex-1 min-h-0 w-full'>
        <div>
          <h1 className='text-4xl text-taupe-600'>Library Manager</h1>
          <h2 className='italic text-taupe-500 text-base'>
            A simple library application to manage your books
          </h2>
        </div>

        <form
          onSubmit={handleAddBook}
          className='grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3 justify-center items-end bg-white/50 p-4 rounded-lg shadow-sm '
        >
          <div className='flex flex-col gap-y-0.5'>
            <label
              htmlFor='title_add'
              className='text-xs tracking-widest text-taupe-500'
            >
              TITLE
            </label>
            <input
              name='title'
              id='title_add'
              placeholder='The Lord of the Rings'
              value={title}
              onChange={handleSetTitle}
              className='text-sm text-taupe-600 bg-white rounded-md border border-taupe-400/40 px-3 py-2 placeholder:text-taupe-400 focus:outline-none focus:ring-2 focus:ring-amber-500'
            />
          </div>
          <div className='flex flex-col gap-y-0.5'>
            <label
              htmlFor='author_add'
              className='text-xs tracking-widest text-taupe-500'
            >
              AUTHOR
            </label>
            <input
              name='author'
              id='author_add'
              placeholder='J. R. R. Tolkien'
              value={author}
              onChange={handleSetAuthor}
              className='text-sm text-taupe-600 bg-white rounded-md border border-taupe-400/40 px-3 py-2 placeholder:text-taupe-400  focus:outline-none focus:ring-2 focus:ring-amber-500'
            />
          </div>
          <button
            type='submit'
            disabled={!title || !author}
            className='bg-amber-800 text-white text-sm rounded-md h-9.5 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50'
          >
            Add book
          </button>
        </form>

        <div
          className={
            books.length === 0
              ? "hidden"
              : "flex flex-col gap-y-2 flex-1 min-h-0"
          }
        >
          <p className='text-taupe-500 text-base'>
            {books.length} {books.length === 1 ? "book" : "books"} on the shelf
          </p>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 -mx-1 py-2 px-1 overflow-y-auto mask-b-from-98% mask-t-from-98%'>
            {books.map((book, i) =>
              book.id === editingId ? (
                <form
                  key={i}
                  onSubmit={handleEditBook}
                  className='h-full flex flex-col gap-3 p-2 bg-white/50 shadow-sm rounded-lg justify-between'
                >
                  <div className='flex flex-col gap-3'>
                    <input
                      name='title'
                      id='title_edit'
                      placeholder='Title'
                      value={editingTitle}
                      onChange={handleSetEditingTitle}
                      className='text-sm text-taupe-600 bg-white rounded-md border border-taupe-400/40 px-3 py-2 placeholder:text-taupe-400 focus:outline-none focus:ring-2 focus:ring-amber-500'
                    />
                    <input
                      name='author'
                      id='author_edit'
                      placeholder='Author'
                      value={editingAuthor}
                      onChange={handleSetEditingAuthor}
                      className='text-sm text-taupe-600 bg-white rounded-md border border-taupe-400/40 px-3 py-2 placeholder:text-taupe-400 focus:outline-none focus:ring-2 focus:ring-amber-500'
                    />
                  </div>

                  <div className='grid grid-cols-[1fr_1fr] gap-x-2 align-bottom'>
                    <button
                      type='button'
                      onClick={cancelEditBook}
                      className='w-full text-amber-800 border border-amber-800 text-sm rounded-md h-9.5 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer'
                    >
                      Cancel
                    </button>
                    <button
                      type='submit'
                      disabled={!editingTitle || !editingAuthor}
                      className='w-full bg-amber-800 text-white text-sm rounded-md h-9.5 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50'
                    >
                      Save
                    </button>
                  </div>
                </form>
              ) : (
                <div
                  key={i}
                  className='flex flex-col gap-y-2 bg-white/50 shadow-sm rounded-lg'
                >
                  <div
                    className={`h-20 rounded-t-lg relative ${i % 2 === 0 ? "bg-orange-900/70" : "bg-amber-900/70"}`}
                  >
                    <div className='w-1 h-full bg-white/10 absolute left-3'></div>
                    <p className='text-white/70 text-4xl absolute bottom-0 left-3'>
                      {book.title[0].toUpperCase()}
                    </p>
                  </div>
                  <div className='px-3'>
                    <p
                      title={book.title}
                      className='text-taupe-600 text-base font-semibold leading-tight truncate'
                    >
                      {book.title}
                    </p>
                    <p
                      title={book.author}
                      className='text-taupe-500 text-sm italic leading-tight truncate'
                    >
                      by {book.author}
                    </p>
                  </div>
                  <div className='w-full h-px bg-taupe-500/10'></div>
                  <div className='flex gap-x-4 text-sm px-3 pb-2'>
                    <button
                      className='text-yellow-700 cursor-pointer h-fit leading-tight focus:outline-none focus:ring-2 focus:ring-amber-500'
                      onClick={() => handleSetEditingBook(book.id)}
                    >
                      Edit
                    </button>
                    <button
                      className='text-orange-700 cursor-pointer h-fit leading-tight focus:outline-none focus:ring-2 focus:ring-amber-500'
                      onClick={() => handleDeleteBook(book.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
      <footer className='flex  flex-col gap-y-1 w-full h-fit bg-taupe-600 text-taupe-200 p-2 text-center text-sm'>
        <p>Made by Lucas Vinícius Marques &copy; {currentYear}</p>
        <div className='flex items-center justify-center gap-x-2'>
          <a href='https://github.com/lucasmarques2907' target='_blank'>
            <FaGithub className='w-5 h-5' />
          </a>
          <a href='https://www.linkedin.com/in/lcsvmrqs' target='_blank'>
            <FaLinkedin className='w-5 h-5' />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
