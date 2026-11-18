import { useState } from 'react';
import { View, Text, SectionList, StyleSheet } from 'react-native';
import { useTema } from '../context/TemaContext';
import useAoFocar from '../utils/useAoFocar';
import { historico } from '../database/repository';
import { rotulo } from '../utils/datas';
import EmptyState from '../components/EmptyState';

export default function HistoricoScreen() {
  const { t } = useTema();
  const [secoes, setSecoes] = useState([]);

  const carregar = async () => {
    const linhas = await historico();
    const grupos = {};
    linhas.forEach((l) => { (grupos[l.data] ||= []).push(l); });
    setSecoes(Object.keys(grupos).sort().reverse().map((d) => ({ title: rotulo(d), data: grupos[d] })));
  };
  useAoFocar(carregar);

  return (
    <SectionList
      style={{ backgroundColor: t.bg }}
      contentContainerStyle={s.lista}
      sections={secoes}
      keyExtractor={(i) => String(i.id)}
      stickySectionHeadersEnabled={false}
      renderSectionHeader={({ section }) => (
        <Text style={[s.secao, { color: t.sub }]}>{section.title}</Text>
      )}
      renderItem={({ item }) => (
        <View style={[s.linha, { backgroundColor: t.card, borderColor: t.line }]}>
          <View style={[s.ponto, { backgroundColor: t.accent }]} />
          <Text style={[s.nome, { color: t.ink }]}>{item.nome}</Text>
        </View>
      )}
      ListEmptyComponent={<EmptyState titulo="Histórico vazio" texto="Os hábitos que você marcar aparecem aqui, dia a dia." />}
    />
  );
}
const s = StyleSheet.create({
  lista: { padding: 20, flexGrow: 1 },
  secao: { fontSize: 15, fontWeight: '700', marginTop: 14, marginBottom: 8 },
  linha: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, borderWidth: 1, marginBottom: 6 },
  ponto: { width: 8, height: 8, borderRadius: 4, marginRight: 12 },
  nome: { fontSize: 16, fontWeight: '600' },
});
