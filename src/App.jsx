import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://pmc5vl2l-5001.asse.devtunnels.ms/books"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        // รองรับทั้งแบบ array และ { books: [...] }
        const data = Array.isArray(result) ? result : result.books || [];

        setBooks(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load books.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    setAppliedSearch(search);
  };

  const categoryFilteredBooks =
    selectedCategory === "all"
      ? books
      : books.filter(
        b => b.category?.toLowerCase() === selectedCategory.toLowerCase()
      );

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-top">
          <h1 className="logo-title">Anime Ebook</h1>
        </div>
        <div className="header-bottom">
          <nav className="categories">
            <button
              className={selectedCategory === "all" ? "active" : ""}
              onClick={() => setSelectedCategory("all")}
            >
              All
            </button>

            <button
              className={selectedCategory === "Action" ? "active" : ""}
              onClick={() => setSelectedCategory("Action")}
            >
              Action
            </button>

            <button
              className={selectedCategory === "Romance" ? "active" : ""}
              onClick={() => setSelectedCategory("Romance")}
            >
              Romance
            </button>

            <button
              className={selectedCategory === "Mystery" ? "active" : ""}
              onClick={() => setSelectedCategory("Mystery")}
            >
              Mystery
            </button>

            <button
              className={selectedCategory === "Fantasy" ? "active" : ""}
              onClick={() => setSelectedCategory("Fantasy")}
            >
              Fantasy
            </button>

            <button
              className={selectedCategory === "Slice of Life" ? "active" : ""}
              onClick={() => setSelectedCategory("Slice of Life")}
            >
              Slice of Life
            </button>
          </nav>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search books..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <button onClick={handleSearch}>🔍</button>
          </div>
        </div>
      </header>

      <main>
        <section className="book-grid">

          {loading && <p>Loading books...</p>}

          {error && <p>{error}</p>}

          {!loading && !error && books.length === 0 && (
            <p>No books found.</p>
          )}

          {!loading && !error &&
            categoryFilteredBooks
              .filter(b =>
                b.title?.toLowerCase().includes(appliedSearch.toLowerCase()) ||
                b.author?.toLowerCase().includes(appliedSearch.toLowerCase())
              ).map((b, idx) => (
                <article className="book-card" key={b.id ?? idx}>
                  <div className="book-image">
                    <img
                      src={b.image_url || "https://via.placeholder.com/300x200"}
                      alt={b.title}
                    />
                  </div>
                  <div className="book-info">
                    <h3 className="book-title">{b.title}</h3>
                    <p className="book-author">{b.author}</p>
                    {b.price && (
                      <p className="book-price">${b.price}</p>
                    )}
                  </div>
                </article>
              ))
          }

        </section>
      </main>

      <footer className="App-footer">
        <p>&copy; 2026 Anime Ebook. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;