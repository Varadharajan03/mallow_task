import AppRouter from './router/AppRouter';
import { ToastProvider } from './components/common/Toast';

function App() {
  return (
    <ToastProvider>
      <div>
        <AppRouter />
      </div>
    </ToastProvider>
  );
}

export default App;

