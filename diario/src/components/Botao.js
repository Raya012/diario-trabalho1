import { Pressable, Text, StyleSheet } from 'react-native';
import { useTema } from '../context/TemaContext';

export default function Botao({ titulo, onPress, variante = 'cheio' }) {
  const { t } = useTema();
  const cheio = variante === 'cheio';
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        s.base,
        cheio ? { backgroundColor: t.accent } : { borderWidth: 1.5, borderColor: t.accent },
        pressed && { opacity: 0.75 },
      ]}
    >
      <Text style={[s.txt, { color: cheio ? t.onAccent : t.accent }]}>{titulo}</Text>
    </Pressable>
  );
}
const s = StyleSheet.create({
  base: { paddingVertical: 14, borderRadius: 14, alignItems: 'center' },
  txt: { fontSize: 16, fontWeight: '700' },
});
