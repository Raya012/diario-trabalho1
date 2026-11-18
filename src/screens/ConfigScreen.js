import { useState } from 'react';
import { ScrollView, View, Text, Switch, Alert, StyleSheet } from 'react-native';
import { useTema } from '../context/TemaContext';
import CampoTexto from '../components/CampoTexto';
import Botao from '../components/Botao';

export default function ConfigScreen() {
  const { t, nome, escuro, salvar } = useTema();
  const [nomeLocal, setNomeLocal] = useState(nome);
  const [escuroLocal, setEscuroLocal] = useState(escuro);
  const [erro, setErro] = useState('');

  const aplicar = async () => {
    if (nomeLocal.trim().length < 2) return setErro('Use pelo menos 2 letras.');
    setErro('');
    await salvar(nomeLocal.trim(), escuroLocal);
    Alert.alert('Pronto', 'Configurações salvas.');
  };

  return (
    <ScrollView style={{ backgroundColor: t.bg }} contentContainerStyle={s.pad} keyboardShouldPersistTaps="handled">
      <CampoTexto label="Seu nome" valor={nomeLocal} onChangeText={setNomeLocal} erro={erro} placeholder="Como devemos te chamar?" />
      <View style={[s.linha, { backgroundColor: t.card, borderColor: t.line }]}>
        <Text style={[s.txt, { color: t.ink }]}>Tema escuro</Text>
        <Switch value={escuroLocal} onValueChange={setEscuroLocal} trackColor={{ true: t.accent }} />
      </View>
      <Botao titulo="Salvar configurações" onPress={aplicar} />
    </ScrollView>
  );
}
const s = StyleSheet.create({
  pad: { padding: 20 },
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, borderRadius: 12, borderWidth: 1, marginBottom: 20 },
  txt: { fontSize: 16, fontWeight: '600' },
});
