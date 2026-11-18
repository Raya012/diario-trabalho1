import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CLARO = { bg: '#EAF1E6', card: '#FFFFFF', ink: '#15301F', sub: '#5C7565', accent: '#2E7D4F', onAccent: '#FFFFFF', line: '#D3DFD0', danger: '#B3402F', soft: '#DCEBD8' };
export const ESCURO = { bg: '#0E1912', card: '#16251B', ink: '#E5F0E2', sub: '#8CA894', accent: '#6FCF97', onAccent: '#0E1912', line: '#243A2B', danger: '#E57360', soft: '#1E3526' };

const Ctx = createContext();
export const useTema = () => useContext(Ctx);

export function TemaProvider({ children }) {
  const [escuro, setEscuro] = useState(false);
  const [nome, setNome] = useState('');
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [n, e] = await Promise.all([AsyncStorage.getItem('nome'), AsyncStorage.getItem('escuro')]);
        if (n) setNome(n);
        setEscuro(e === '1');
      } finally { setPronto(true); }
    })();
  }, []);

  const salvar = async (novoNome, novoEscuro) => {
    setNome(novoNome); setEscuro(novoEscuro);
    await AsyncStorage.multiSet([['nome', novoNome], ['escuro', novoEscuro ? '1' : '0']]);
  };

  if (!pronto) return null;
  return <Ctx.Provider value={{ t: escuro ? ESCURO : CLARO, escuro, nome, salvar }}>{children}</Ctx.Provider>;
}
