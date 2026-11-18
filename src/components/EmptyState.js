import { View, Text, StyleSheet } from 'react-native';
import { useTema } from '../context/TemaContext';
import Botao from './Botao';

export default function EmptyState({ titulo, texto, acao, onAcao }) {
  const { t } = useTema();
  return (
    <View style={s.wrap}>
      <Text style={[s.titulo, { color: t.ink }]}>{titulo}</Text>
      <Text style={[s.texto, { color: t.sub }]}>{texto}</Text>
      {acao && <View style={{ marginTop: 16, alignSelf: 'stretch' }}><Botao titulo={acao} onPress={onAcao} /></View>}
    </View>
  );
}
const s = StyleSheet.create({
  wrap: { alignItems: 'center', paddingVertical: 48, paddingHorizontal: 24 },
  titulo: { fontSize: 20, fontWeight: '700', marginTop: 0 },
  texto: { fontSize: 15, textAlign: 'center', marginTop: 6 },
});
