import './App.css';
import { useState, useEffect } from 'react';
function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fantastic-potato-r4xrwp7rx26p9-5000.app.github.dev/books");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setBooks(result.books || []);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchData();
  }, []);

  const bookList = books.map((b, idx) => (
    <article className="book-card" key={b.id ?? idx}>
      <div className="book-image">
        <img src={b.image_url} alt={b.title} />
      </div>
      <div className="book-info">
        <h3 className="book-title">{b.title}</h3>
        <p className="book-author">{b.author}</p>
        {b.price ? <p className="book-price">${b.price}</p> : null}
      </div>
    </article>
  ));

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-top">
          <h1>Anime Ebook</h1>
        </div>
        <div className="header-bottom">
          <nav className="categories">
            <a href="#action">Action</a>
            <a href="#romance">Romance</a>
            <a href="#mystery">Mystery</a>
            <a href="#fantasy">Fantasy</a>
            <a href="#slice-of-life">Slice of Life</a>
          </nav>
          <div className="search-box">
            <input type="text" placeholder="Search books..." />
            <button>🔍</button>
          </div>
        </div>
      </header>

      <main>
        <section className="book-grid">
          {bookList}
        </section>
      </main>

      <footer className="App-footer">
        <p>&copy; 2026 Anime Ebook. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
