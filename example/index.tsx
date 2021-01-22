import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import ReactDOM from 'react-dom';
import { useGoodreads, GoodreadsShelf } from '../.';

const Options = [
  {
    name: 'Read',
    value: 'read',
  },
  {
    name: 'Currently Reading',
    value: 'currently-reading',
  },
  {
    name: 'To Read',
    value: 'to-read',
  },
];

const Page = styled.div`
  max-width: 940px;
  margin: 0 auto;
`;

const BookCard = styled.li`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
  button + button {
    margin-left: 8px;
  }
`;

const BooksContainer = styled.ul`
  display: grid;
  padding: 0;
  margin: 0;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  list-style: none;
  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, 200px);
  }
`;

const Button = styled.button`
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  color: black;
  background-color: white;
  border: none;
  outline: none;
  box-shadow: 0px 2px 7px 2px rgba(131, 131, 131, 0.4);
  transition: all ease-in 100ms;
  &:hover {
    transform: scale(0.9);
  }

  ${props => {
    if (props.selected) {
      return css`
        background-color: black;
        color: white;
        font-weight: bold;
      `;
    }

    return undefined;
  }}
`;

const Cover = styled.img`
  object-fit: cover;
  width: 100%;
  height: calc(300px * (3 / 2));
  border-radius: 4px;
`;

const BookTitle = styled.span`
  font-size: 16px;
  padding: 16px;
  color: #8a5a44;
  font-weight: bold;
  font-family: monospace;
`;

const SearchBar = styled.div`
  display: flex;
`;

const SearchButton = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  background: #a0c4ff;
  color: #141a23ad;
  font-weight: bold;

  &:hover {
    transform: scale(1);
  }
`;

const Input = styled.input`
  border: none;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  padding: 8px 16px;
  outline: none;
  box-shadow: 0px 2px 7px 2px rgba(131, 131, 131, 0.4);
  &:focus {
    border: none;
  }
`;

const App = () => {
  const [shelf, setShelf] = useState<GoodreadsShelf>('currently-reading');
  const [userId, setUserId] = useState('51327323-carlos-l-pez');
  const [tempUserId, setTempUserId] = useState(userId);

  const { fetchBooks, loading, data } = useGoodreads({
    userId,
    shelf,
  });

  useEffect(() => {
    fetchBooks();
  }, [shelf]);

  return (
    <Page>
      <SearchBar>
        <Input
          placeholder="Your Goodreads id"
          type="search"
          value={tempUserId}
          onChange={e => setTempUserId(e.target.value)}
        />

        <SearchButton
          onClick={() => {
            setUserId(tempUserId);
            fetchBooks();
          }}
        >
          Search
        </SearchButton>
      </SearchBar>

      <Container>
        {Options.map(o => (
          <Button
            key={o.value}
            selected={shelf === o.value}
            onClick={() => setShelf(o.value as GoodreadsShelf)}
          >
            {o.name}
          </Button>
        ))}
      </Container>
      {loading ? <div>Loading</div> : null}
      {!loading ? (
        <BooksContainer>
          {data?.map(b => (
            <BookCard key={b.id}>
              <Cover src={b.cover?.big} />
              <BookTitle>{b.title}</BookTitle>
            </BookCard>
          ))}
        </BooksContainer>
      ) : null}
    </Page>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
