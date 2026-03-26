import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import WorkoutCard from "../components/WorkoutCard";

// SENİN GÖNDERDİĞİN YENİ İSİMLER VE GÖRSELLER
const workoutData = [
  {
    id: "1",
    title: "TÜM VÜCUT",
    duration: "30",
    image:
      "https://thesculptsociety.com/cdn/shop/files/the-sculpt-society-blog-home-workouts-effective-A.jpg?v=1732576270&width=1080",
  },
  {
    id: "2",
    title: "KARIN",
    duration: "15",
    image:
      "https://i.gazeteoksijen.com/storage/files/images/2023/06/18/olimpiyat-sampiyonu-the-telegrapha-yazdi-40li-yaslarda-nasil-karin-kasi-yapilir-GIhb.jpg",
  },
  {
    id: "3",
    title: "BACAK VE KALÇA",
    duration: "20",
    image:
      "https://i.lezzet.com.tr/images-xxlarge-secondary/popo-nasil-buyutulur-kalca-nasil-sikilastirilir-b5b9c482-af4c-43a5-a2e8-bb3a180a3837",
  },
  {
    id: "4",
    title: "ÜST VÜCUT",
    duration: "25",
    image:
      "https://fitbabessquad.com/wp-content/uploads/2024/04/muscles-in-the-back-to-workout.png",
  },
];

const WorkoutScreen = ({ navigation }) => {
  const [goal, setGoal] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    checkGoal();
  }, []);

  const checkGoal = async () => {
    try {
      const savedGoal = await AsyncStorage.getItem("userGoal");
      if (savedGoal !== null) {
        setGoal(savedGoal);
      } else {
        setModalVisible(true);
      }
    } catch (e) {
      console.log("Hafıza okuma hatası:", e);
    }
  };

  const handleGoalSelect = async (selectedGoal) => {
    try {
      await AsyncStorage.setItem("userGoal", selectedGoal);
      setGoal(selectedGoal);
      setModalVisible(false);
    } catch (e) {
      console.log("Hafıza kaydetme hatası:", e);
    }
  };

  const getMotivationText = () => {
    switch (goal) {
      case "Kilo Verme":
        return "Kilo vermen için yalnızca spor yeterli değil. Kalori açığı oluşturman gerekiyor.";
      case "Kas Kazanma":
        return "Bugün yeterli proteini aldın mı? Kas gelişimi mutfakta başlar!";
      case "Hareketli Yaşam":
        return "Sağlıklı bir yaşam ve kilo koruması için sporun önemi çok büyük.";
      default:
        return "FitBody ile sınırlarını zorlamaya hazır mısın?";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Ionicons
          name="barbell"
          size={scale(35)}
          color="#FF5722"
          style={styles.logoIcon}
        />
        <Text style={styles.headerTitle}>FitBody</Text>
      </View>

      {goal && (
        <View style={styles.motivationCard}>
          <Ionicons name="bulb" size={scale(28)} color="#FFD700" />
          <View style={styles.motivationTextContainer}>
            <Text style={styles.motivationTitle}>Hedefin: {goal}</Text>
            <Text style={styles.motivationDesc}>{getMotivationText()}</Text>
          </View>
        </View>
      )}

      <Text style={styles.subHeader}>Bugün hangi bölgeyi çalıştırıyoruz?</Text>

      <FlatList
        data={workoutData}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: verticalScale(20) }}
        renderItem={({ item }) => (
          <WorkoutCard
            title={item.title}
            image={item.image}
            duration={item.duration}
            onPress={() =>
              navigation.navigate("ActiveWorkout", { workoutTitle: item.title })
            }
          />
        )}
      />

      {/* İLK GİRİŞ HEDEF SEÇİM MODALI */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="fitness" size={scale(50)} color="#FF5722" />
            <Text style={styles.modalTitle}>FitBody'ye Hoş Geldin!</Text>
            <Text style={styles.modalSubtitle}>
              Sana en uygun tavsiyeleri verebilmemiz için asıl amacını seçer
              misin?
            </Text>

            <TouchableOpacity
              style={styles.goalButton}
              onPress={() => handleGoalSelect("Kilo Verme")}
            >
              <Text style={styles.goalButtonText}>🔥 Kilo Verme</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.goalButton}
              onPress={() => handleGoalSelect("Kas Kazanma")}
            >
              <Text style={styles.goalButtonText}>💪 Kas Kazanma</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.goalButton}
              onPress={() => handleGoalSelect("Hareketli Yaşam")}
            >
              <Text style={styles.goalButtonText}>🏃‍♀️ Hareketli Yaşam</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    paddingHorizontal: scale(20),
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(15),
    marginBottom: verticalScale(10),
  },
  logoIcon: { marginRight: scale(10), transform: [{ rotate: "-45deg" }] },
  headerTitle: {
    color: "#FFF",
    fontSize: scale(26),
    fontWeight: "900",
    letterSpacing: 1,
  },
  subHeader: {
    color: "#AAA",
    fontSize: scale(14),
    marginBottom: verticalScale(15),
  },

  motivationCard: {
    backgroundColor: "#2C2C2C",
    padding: scale(15),
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(15),
    borderLeftWidth: 4,
    borderLeftColor: "#FFD700",
    minHeight: verticalScale(70),
  },
  motivationTextContainer: {
    flex: 1,
    marginLeft: scale(15),
    justifyContent: "center",
  },
  motivationTitle: {
    color: "#FFD700",
    fontSize: scale(14),
    fontWeight: "bold",
    marginBottom: 5,
  },
  motivationDesc: {
    color: "#DDD",
    fontSize: scale(12),
    lineHeight: scale(18),
    flexWrap: "wrap",
    flexShrink: 1,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#2C2C2C",
    width: "85%",
    padding: scale(25),
    borderRadius: 20,
    alignItems: "center",
    elevation: 10,
  },
  modalTitle: {
    color: "#FFF",
    fontSize: scale(20),
    fontWeight: "bold",
    marginVertical: verticalScale(10),
  },
  modalSubtitle: {
    color: "#AAA",
    fontSize: scale(13),
    textAlign: "center",
    marginBottom: verticalScale(20),
    lineHeight: scale(18),
  },
  goalButton: {
    backgroundColor: "#333",
    width: "100%",
    paddingVertical: verticalScale(15),
    borderRadius: 12,
    marginBottom: verticalScale(10),
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#444",
  },
  goalButtonText: { color: "#FFF", fontSize: scale(15), fontWeight: "bold" },
});

export default WorkoutScreen;
