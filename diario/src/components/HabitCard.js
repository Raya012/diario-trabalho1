import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTema } from '../context/TemaContext';

// Card reutilizado em "Hoje" (com check) e em "Hábitos" (com ações em `direita`).
export default function HabitCard({ selo, nome, subtitulo, feito, onToggle, onPress, direita }) {
  const { t } = useTema();
  return (
    <Pressable onPress={onPress} style={[s.card, { backgroundColor: feito ? t.soft : t.card, borderColor: t.line }]}>
      {selo !== undefined && (
        <View style={[s.selo, { backgroundColor: t.soft }]}>
          <Text style={[s.seloTxt, { color: t.accent }]}>{selo}</Text>
        </View>
      )}
      <View style={s.meio}>
        <Text style={[s.nome, { color: t.ink }, feito && s.riscado]} numberOfLines={1}>{nome}</Text>
        <Text style={[s.sub, { color: t.sub }]}>{subtitulo}</Text>
      </View>
      {onToggle && (
        <Pressable
          onPress={onToggle}
          hitSlop={8}
          style={[s.check, { borderColor: t.accent, backgroundColor: feito ? t.accent : 'transparent' }]}
        >
          {feito && <Text style={[s.ok, { color: t.onAccent }]}>✓</Text>}
        </Pressable>
      )}
      {direita}
    </Pressable>
  );
}
const s = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 16, borderWidth: 1, marginBottom: 10 },
  selo: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  seloTxt: { fontSize: 18, fontWeight: '800' },
  meio: { flex: 1 },
  nome: { fontSize: 17, fontWeight: '700' },
  riscado: { opacity: 0.7 },
  sub: { fontSize: 13, marginTop: 2 },
  check: { width: 34, height: 34, borderRadius: 17, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  ok: { fontSize: 18, fontWeight: '800' },
});
