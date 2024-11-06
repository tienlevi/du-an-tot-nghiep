import { useRoutes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import RootRoutes from './routes/routes';


function App() {
  const router = useRoutes(RootRoutes)
  return router
}

export default App;
