
import { Provider } from 'react-redux';
import { store } from './store';
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <main className="bg-slate-900 h-screen flex items-center justify-center">
        <h1 className="text-7xl text-white">Welcome to E-commerce</h1>
      </main>
    </Provider>
  );
}

export default App;
