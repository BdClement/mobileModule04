import { useSupabaseSession } from '../context/AuthContext';
import LoginPage from './Login';
import HomePage from './Home';

export default function AppContent() {
  const { session } = useSupabaseSession();

  return session ? <HomePage /> : <LoginPage />;
}