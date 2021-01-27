# useGoodreads
A react hook to get your Goodreads data. Strongly typed using Typescript.

## Installation
```bash
   // yarn
   yarn add usegoodreads

   // npm
   npm i usegoodreads
```

## Live Example
https://charliesbot.github.io/useGoodreads/

## Usage
```jsx
// Require the module
import { useGoodreads } from 'usegoodreads';

const App = () => {
  const { fetchBooks, loading, data } = useGoodreads({
    userId: 'your-user-id',
    shelf: 'currenty-reading',
  });

  useEffect(() => {
    // use the callback to retrieve data from Goodreads
    fetchBooks();
  }, []);
  
  return (
    <div>
        <ul>
          {data?.map(b => (
            // render your UI with your Goodreads data!
          ))}
        </ul>
    </div>
  );
};

```
## Props
| Prop         | Type     | Optional | Default                | Description                                                          |
|--------------|----------|----------|------------------------|----------------------------------------------------------------------|
| userId       | string   | No       | undefined                     | Required to get the books data from the user                         |
| shelf        | string   | Yes      | 'read'                 | Based on the default shelf from Goodreads, which are 'read', 'currently-reading' or 'to-read'                                                      |
| customShelf  | string   | Yes      | undefined                  | Used to retrieve shelfs created by the user. This overrides the value from the 'shelf' property                                   |

## Example
Refer to the example folder to find an implementation of this project
