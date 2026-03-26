import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Oluşturduğumuz taslak ekranları çağırıyoruz
import GymsScreen from "../screens/GymsScreen";
import ProgressScreen from "../screens/ProgressScreen";
import WorkoutScreen from "../screens/WorkoutScreen";

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Üstteki varsayılan başlığı gizler
        tabBarStyle: {
          backgroundColor: "#1E1E1E",
          borderTopColor: "#333",
          paddingBottom: 5,
          height: 60,
        },
        tabBarActiveTintColor: "#FF5722", // Seçili sekme rengi (Turuncu)
        tabBarInactiveTintColor: "gray", // Seçili olmayan sekme rengi (Gri)
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // Hangi sekmedeysek ona uygun Expo ikonu gösteriyoruz
          if (route.name === "Antrenmanlar") {
            iconName = focused ? "barbell" : "barbell-outline";
          } else if (route.name === "Gelişim") {
            iconName = focused ? "trending-up" : "trending-up-outline";
          } else if (route.name === "Salonlar") {
            iconName = focused ? "map" : "map-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Antrenmanlar" component={WorkoutScreen} />
      <Tab.Screen name="Gelişim" component={ProgressScreen} />
      <Tab.Screen name="Salonlar" component={GymsScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
