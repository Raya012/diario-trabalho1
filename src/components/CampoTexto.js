import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useTema } from '../context/TemaContext';

export default function CampoTexto({ label, valor, onChangeText, erro, ...resto }) {
  const { t } = useTema();
  return (
    <View style={s.wrap}>
      <Text style={[s.label, { color: t.sub }]}>{label}</Text>
      <TextInput
        value={valor}
        onChangeText={onChangeText}
        placeholderTextColor={t.sub}
        style={[s.input, { backgroundColor: t.card, color: t.ink, borderColor: erro ? t.danger : t.line }]}
        {...resto}
      />
      {!!erro && <Text style={[s.erro, { color: t.danger }]}>{erro}</Text>}
    </View>
  );
}
const s = StyleSheet.create({
  wrap: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 6 },
  input: { borderWidth: 1.5, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 16 },
  erro: { fontSize: 13, marginTop: 4 },
});
