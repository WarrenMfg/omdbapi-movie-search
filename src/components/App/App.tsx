import './App.module.css';

interface AppProps {
  query: string;
}

function App({ query }: AppProps) {
  return <h2>Movie List: {query}</h2>;
}

export default App;
