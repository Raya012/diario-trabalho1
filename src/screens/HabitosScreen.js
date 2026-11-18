import { useState } from 'react';
import { View, Text, FlatList, Pressable, Alert, StyleSheet } from 'react-native';
import { useTema } from '../context/TemaContext';
import useAoFocar from '../utils/useAoFocar';
import { listarHabitos, excluirHabito } from '../database/repository';
import HabitCard from '../components/HabitCard';
import EmptyState from '../components/EmptyState';

export default function HabitosScreen({ navigation }) {
  const { t } = useTema();
  const [habitos, setHabitos] = useState([]);
  const carregar = async () => setHabitos(await listarHabitos());
  useAoFocar(carregar);

  const confirmarExclusao = (h) =>
    Alert.alert('Excluir hábito', `Excluir "${h.nome}" e todo o histórico dele?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: async () => { await excluirHabito(h.id); carregar(); } },
    ]);

  return (
    <View style={[s.tela, { backgroundColor: t.bg }]}>
      <FlatList
        contentContainerStyle={s.lista}
        data={habitos}
        keyExtractor={(h) => String(h.id)}
        renderItem={({ item }) => (
          <HabitCard
            selo={`${item.meta_semanal}x`}
            nome={item.nome}
            subtitulo={`Meta: ${item.meta_semanal}x por semana`}
            onPress={() => navigation.navigate('FormHabito', { habitoId: item.id })}
            direita={
              <Pressable onPress={() => confirmarExclusao(item)} hitSlop={10}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: t.danger }}>Excluir</Text>
              </Pressable>
            }
          />
        )}
        ListEmptyComponent={<EmptyState titulo="Sem hábitos cadastrados" texto="Toque no + para criar o primeiro." />}
      />
      <Pressable
        onPress={() => navigation.navigate('FormHabito')}
        style={[s.fab, { backgroundColor: t.accent }]}
      >
        <Text style={[s.mais, { color: t.onAccent }]}>+</Text>
      </Pressable>
    </View>
  );
}
const s = StyleSheet.create({
  tela: { flex: 1 },
  lista: { padding: 20, paddingBottom: 100, flexGrow: 1 },
  fab: { position: 'absolute', right: 20, bottom: 24, width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center', elevation: 4 },
  mais: { fontSize: 32, fontWeight: '600', marginTop: -2 },
});
