# useGoodreads
A react hook to get your Goodreads data. Strongly typed using Typescript.

## Installation
```bash
   // yarn
   yarn add usegoodreads

   // npm
   npm i usegoodreads
```

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
| mainColor    | string   | Yes      | rgba(12, 83, 175, 0.9) | Change custom color to the media controls                            |
| isLoading    | boolean  | Yes      | false                  | When is loading                                                      |
| isFullScreen | boolean  | Yes      | false                  | To change icon state of fullscreen                                   |

## Constants 
```js
  PLAYING,
  PAUSED,
  ENDED,
```  
## Example
Refer to the example folder to find an implementation of this project
