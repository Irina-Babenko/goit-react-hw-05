import { useState } from 'react';
import css from './SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search for movies..."
        className={css.input}
      />
      <button type="submit" className={css.button}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
