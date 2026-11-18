import { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTema } from '../context/TemaContext';
import useAoFocar from '../utils/useAoFocar';
import { listarHabitos, todosRegistros, marcar, desmarcar } from '../database/repository';
import { hoje, addDias } from '../utils/datas';
import { sequencia } from '../utils/streak';
import HabitCard from '../components/HabitCard';
import ProgressBar from '../components/ProgressBar';
import EmptyState from '../components/EmptyState';

export default function HojeScreen({ navigation }) {
  const { t, nome } = useTema();
  const [habitos, setHabitos] = useState([]);
  const [regs, setRegs] = useState([]);

  const carregar = async () => {
    setHabitos(await listarHabitos());
    setRegs(await todosRegistros());
  };
  useAoFocar(carregar);

  const dia = hoje();
  const inicioSemana = addDias(dia, -6);
  const datasDe = (id) => regs.filter((r) => r.habito_id === id).map((r) => r.data);

  const itens = habitos.map((h) => {
    const datas = datasDe(h.id);
    return { ...h, feito: datas.includes(dia), streak: sequencia(datas), semana: datas.filter((d) => d >= inicioSemana).length };
  });
  const feitos = itens.filter((i) => i.feito).length;

  const alternar = async (h) => {
    h.feito ? await desmarcar(h.id, dia) : await marcar(h.id, dia);
    carregar();
  };

  const hora = new Date().getHours();
  const saudacao = hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite';

  return (
    <FlatList
      style={{ backgroundColor: t.bg }}
      contentContainerStyle={s.lista}
      data={itens}
      keyExtractor={(i) => String(i.id)}
      ListHeaderComponent={
        <View>
          <Text style={[s.ola, { color: t.ink }]}>{saudacao}{nome ? `, ${nome}` : ''}</Text>
          <Text style={[s.data, { color: t.sub }]}>Cada dia marcado faz o hábito crescer.</Text>
          {itens.length > 0 && <ProgressBar feitos={feitos} total={itens.length} />}
        </View>
      }
      renderItem={({ item }) => (
        <HabitCard
          selo={String(item.streak)}
          nome={item.nome}
          subtitulo={`${item.streak} ${item.streak === 1 ? 'dia seguido' : 'dias seguidos'} · ${item.semana}/${item.meta_semanal} na semana`}
          feito={item.feito}
          onToggle={() => alternar(item)}
        />
      )}
      ListEmptyComponent={
        <EmptyState
          titulo="Nenhum hábito ainda"
          texto="Plante o primeiro: beber água, estudar, caminhar."
          acao="Criar hábito"
          onAcao={() => navigation.navigate('HabitosTab', { screen: 'FormHabito' })}
        />
      }
    />
  );
}
const s = StyleSheet.create({
  lista: { padding: 20, flexGrow: 1 },
  ola: { fontSize: 28, fontWeight: '800' },
  data: { fontSize: 15, marginTop: 4, marginBottom: 20 },
});
