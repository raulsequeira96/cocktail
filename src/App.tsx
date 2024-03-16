
import Cocktail from './components/cocktail/Cocktail';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <>
      <Provider store={store}>
        <Cocktail />
      </Provider>
    </>
  );
}

export default App;
