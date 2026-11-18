import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTema } from '../context/TemaContext';
import HojeScreen from '../screens/HojeScreen';
import HabitosScreen from '../screens/HabitosScreen';
import FormHabitoScreen from '../screens/FormHabitoScreen';
import HistoricoScreen from '../screens/HistoricoScreen';
import ConfigScreen from '../screens/ConfigScreen';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HabitosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListaHabitos" component={HabitosScreen} options={{ headerShown: false }} />
      <Stack.Screen name="FormHabito" component={FormHabitoScreen} options={{ title: 'Hábito' }} />
    </Stack.Navigator>
  );
}

const semIcone = { tabBarIconStyle: { display: 'none' }, tabBarLabelStyle: { fontSize: 14, paddingBottom: 10 } };

function Tabs() {
  const { t } = useTema();
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: t.accent, tabBarInactiveTintColor: t.sub }}>
      <Tab.Screen name="Hoje" component={HojeScreen} options={semIcone} />
      <Tab.Screen name="HabitosTab" component={HabitosStack} options={{ ...semIcone, title: 'Hábitos' }} />
      <Tab.Screen name="Historico" component={HistoricoScreen} options={{ ...semIcone, title: 'Histórico' }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { t } = useTema();
  return (
    <Drawer.Navigator screenOptions={{ drawerActiveTintColor: t.accent, headerTitleStyle: { fontWeight: '800' } }}>
      <Drawer.Screen name="Principal" component={Tabs} options={{ title: 'Diário de hábitos' }} />
      <Drawer.Screen name="Configuracoes" component={ConfigScreen} options={{ title: 'Configurações' }} />
    </Drawer.Navigator>
  );
}
