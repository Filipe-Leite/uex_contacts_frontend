import { ToastContainer } from 'react-toastify';
import './App.css';
import AuthProvider from './contexts/auth';
import RoutesApp from './routes/RoutesApp';

function App() {
  return (
    <div className="App">
          <ToastContainer autoClose={3000} />
          <AuthProvider>
            <RoutesApp/>
          </AuthProvider>
      </div>
  );
}

export default App;
