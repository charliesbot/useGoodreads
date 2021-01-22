import { useCallback, useRef, useState } from 'react';

export type GoodreadsShelf = 'read' | 'to-read' | 'currently-reading';

export type useGoodreadsProps = {
  userId: string;
  shelf?: GoodreadsShelf;
  customShelf?: string;
};

type Book = {
  id: string;
  author: string | undefined;
  cover: { small: string; big: string } | undefined;
  title: string | undefined;
};

type Cache = {
  [key: string]: Book[];
};

export const useGoodreads = (props: useGoodreadsProps) => {
  const { userId, shelf = 'read', customShelf = shelf } = props;
  const cache = useRef<Cache>({});
  const error = useRef<unknown | undefined>(undefined);
  const [loading, setIsLoading] = useState(false);
  const [data, setData] = useState<Book[] | undefined>(undefined);

  const fetchBooks = useCallback(async () => {
    if (cache.current[customShelf]) {
      setData(cache.current[customShelf]);
      return;
    }

    setIsLoading(true);
    error.current = undefined;

    const resp = await fetch(
      `https://cors-anywhere.herokuapp.com/https://www.goodreads.com/review/list/${userId}?shelf=${customShelf}`
    );

    if (!resp.ok) {
      setIsLoading(false);
      error.current = resp;
      return;
    }

    const parser = new DOMParser();
    const dom = parser.parseFromString(await resp.text(), 'text/html');

    const books = Array.from(dom.querySelectorAll('.bookalike'));

    const booksData: Book[] = books.map(b => {
      const id = b.id;
      const title = b.querySelector('.title a')?.textContent?.trim();
      const cover = b.querySelector('img')?.src;
      const author = b.querySelector('.author a')?.textContent?.trim();
      const coverSizes = (() => {
        if (!cover) {
          return undefined;
        }

        return {
          big: cover.replace(/\._\w+\d+_/, ''),
          small: cover,
        };
      })();

      return {
        id,
        title,
        author,
        cover: coverSizes,
      };
    });

    cache.current[shelf] = booksData;
    setData(booksData);
    setIsLoading(false);
  }, [customShelf]);

  return { fetchBooks, data, loading };
};
