import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Ekranlarımızı ve Navigatörümüzü içeri aktarıyoruz
import MainTabNavigator from "./src/navigation/MainTabNavigator";
import ActiveWorkoutScreen from "./src/screens/ActiveWorkoutScreen";
import LoginScreen from "./src/screens/LoginScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* headerShown: false yaparak tüm sayfalarda üstteki varsayılan beyaz başlığı kaldırıyoruz */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* 1. ADIM: Giriş ve Kayıt Ekranı (Uygulama buradan başlar) */}
        <Stack.Screen name="Login" component={LoginScreen} />

        {/* 2. ADIM: Ana Sayfa Yapısı (Tab Navigator - Alt Menü) */}
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />

        {/* 3. ADIM: Aktif Antrenman Sayacı (Antrenman kartına tıklayınca açılır) 
            Hocanın istediği "Parametre Geçirme" bu ekran üzerinden gerçekleşecek. */}
        <Stack.Screen name="ActiveWorkout" component={ActiveWorkoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
