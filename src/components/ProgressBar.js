import { View, Text, StyleSheet } from 'react-native';
import { useTema } from '../context/TemaContext';

export default function ProgressBar({ feitos, total }) {
  const { t } = useTema();
  const pct = total ? (feitos / total) * 100 : 0;
  return (
    <View style={s.wrap}>
      <Text style={[s.txt, { color: t.ink }]}>{feitos} de {total} hábitos hoje</Text>
      <View style={[s.trilho, { backgroundColor: t.line }]}>
        <View style={[s.fill, { width: `${pct}%`, backgroundColor: t.accent }]} />
      </View>
    </View>
  );
}
const s = StyleSheet.create({
  wrap: { marginBottom: 18 },
  txt: { fontSize: 14, fontWeight: '600', marginBottom: 8 },
  trilho: { height: 10, borderRadius: 5, overflow: 'hidden' },
  fill: { height: 10, borderRadius: 5 },
});
