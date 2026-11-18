import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

// Carrega ao abrir a tela e recarrega sempre que ela volta ao foco.
export default function useAoFocar(carregar) {
  const nav = useNavigation();
  useEffect(() => {
    carregar();
    return nav.addListener('focus', carregar);
  }, [nav]);
}
