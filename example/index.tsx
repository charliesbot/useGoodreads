import 'react-app-polyfill/ie11';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useGoodreads, GoodreadsShelf } from '../.';

const App = () => {
  const [shelf, setShelf] = useState<GoodreadsShelf>('currently-reading');

  const { fetchBooks, loading, data } = useGoodreads({
    userId: '51327323-carlos-l-pez',
    shelf,
  });

  useEffect(() => {
    fetchBooks();
  }, [shelf]);

  return (
    <div>
      Selected shelf: {shelf}
      <div>
        <button onClick={() => setShelf('read')}>Read</button>
        <button onClick={() => setShelf('currently-reading')}>
          Currently Reading
        </button>
        <button onClick={() => setShelf('to-read')}>To Read</button>
      </div>
      {loading ? 'Loading' : null}
      {!loading ? (
        <ul
          style={{
            display: 'grid',
            gap: 10,
            gridTemplateColumns: '1fr 1fr 1fr',
            listStyle: 'none',
          }}
        >
          {data?.map(b => (
            <li key={b.id} style={{ display: 'flex', flexDirection: 'column' }}>
              <img style={{ width: 100 }} src={b.cover?.big} />
              {b.title}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
