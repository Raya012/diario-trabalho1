import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useTema } from '../context/TemaContext';
import { buscarHabito, criarHabito, atualizarHabito } from '../database/repository';
import CampoTexto from '../components/CampoTexto';
import Botao from '../components/Botao';

export default function FormHabitoScreen({ route, navigation }) {
  const { t } = useTema();
  const habitoId = route.params?.habitoId; // parâmetro: presente = edição
  const [nome, setNome] = useState('');
  const [meta, setMeta] = useState('7');
  const [erros, setErros] = useState({});

  useEffect(() => {
    navigation.setOptions({ title: habitoId ? 'Editar hábito' : 'Novo hábito' });
    if (habitoId) {
      buscarHabito(habitoId).then((h) => {
        if (h) { setNome(h.nome); setMeta(String(h.meta_semanal)); }
      });
    }
  }, [habitoId]);

  const salvar = async () => {
    const e = {};
    const n = parseInt(meta, 10);
    if (!nome.trim()) e.nome = 'Dê um nome ao hábito.';
    if (isNaN(n) || n < 1 || n > 7) e.meta = 'Informe um número de 1 a 7.';
    setErros(e);
    if (Object.keys(e).length) return;
    habitoId ? await atualizarHabito(habitoId, nome.trim(), n) : await criarHabito(nome.trim(), n);
    navigation.goBack();
  };

  return (
    <ScrollView style={{ backgroundColor: t.bg }} contentContainerStyle={s.pad} keyboardShouldPersistTaps="handled">
      <CampoTexto label="Nome do hábito" valor={nome} onChangeText={setNome} erro={erros.nome} placeholder="Ex.: Beber 2 litros de água" />
      <CampoTexto label="Meta semanal (dias)" valor={meta} onChangeText={setMeta} erro={erros.meta} keyboardType="number-pad" maxLength={1} />
      <Botao titulo={habitoId ? 'Salvar alterações' : 'Criar hábito'} onPress={salvar} />
    </ScrollView>
  );
}
const s = StyleSheet.create({ pad: { padding: 20 } });
