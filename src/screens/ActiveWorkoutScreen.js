import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { verticalScale } from "react-native-size-matters";

const ActiveWorkoutScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  // Yeni isimlerle eşleşme sağlandı
  const { workoutTitle } = route.params || { workoutTitle: "TÜM VÜCUT" };

  const WARMUP = [
    {
      id: "w1",
      name: "Bacaklar Yukarı",
      duration: 10,
      type: "Isınma",
      image:
        "https://media.post.rvohealth.io/wp-content/uploads/sites/2/2019/05/WARM-UP-MOVES_ALTERNATING-KNEE-HUGS.gif",
    },
    {
      id: "w2",
      name: "Çember Çizme",
      duration: 10,
      type: "Isınma",
      image:
        "https://media.post.rvohealth.io/wp-content/uploads/sites/2/2019/05/WARM-UP-MOVES_ALTERNATING-HAMSTRING-SWEEPS.gif",
    },
  ];

  const COOLDOWN = [
    {
      id: "c1",
      name: "Esneme 1",
      duration: 10,
      type: "Soğuma",
      image:
        "https://i.pinimg.com/originals/35/f6/dd/35f6ddfcc8f20f1145c8d7518d2d5a24.gif",
    },
    {
      id: "c2",
      name: "Esneme 2",
      duration: 10,
      type: "Soğuma",
      image:
        "https://publish.purewow.net/wp-content/uploads/sites/2/2020/09/cool-down-exercises-piriformis-stretch.gif?fit=680%2C654",
    },
  ];

  // KATEGORİ İSİMLERİ ANA EKRANDAKİ YENİ İSİMLERLE EŞLEŞTİRİLDİ
  const EXERCISES = {
    "TÜM VÜCUT": [
      {
        id: "e1",
        name: "Dağ Tırmanışı",
        duration: 15,
        type: "Egzersiz",
        image:
          "https://coveteur.com/media-library/body-by-simone.gif?id=25367835&width=210",
      },
      {
        id: "e2",
        name: "Tahteravalli",
        duration: 15,
        type: "Egzersiz",
        image:
          "https://i.pinimg.com/originals/99/95/b7/9995b78a73a1c51de156ee2d594389cc.gif",
      },
      {
        id: "e3",
        name: "Kobra",
        duration: 15,
        type: "Egzersiz",
        image:
          "https://media.post.rvohealth.io/wp-content/uploads/sites/2/2020/06/GRT-1.11.FloorProneCobra.gif",
      },
    ],
    KARIN: [
      {
        id: "k1",
        name: "Mekik",
        duration: 15,
        type: "Egzersiz",
        image:
          "https://cdn.shopify.com/s/files/1/0892/0416/2858/files/The-Best-ab-workouts-for-woman_480x480.gif?v=1729241652",
      },
      {
        id: "k2",
        name: "Makas",
        duration: 15,
        type: "Egzersiz",
        image:
          "https://media.post.rvohealth.io/wp-content/uploads/sites/2/2019/05/LOWER-ABS_SCISSORS.gif",
      },
      {
        id: "k3",
        name: "Bacaklar Yanda Plank",
        duration: 15,
        type: "Egzersiz",
        image: "https://s3.r29static.com/bin/entry/22f/x/1421366/image.gif",
      },
    ],
    "BACAK VE KALÇA": [
      {
        id: "b1",
        name: "Ayaklar Havaya",
        duration: 15,
        type: "Egzersiz",
        image:
          "https://assets.vogue.com/photos/5891e0f79c1609bf7a72e38c/master/w_1600%2Cc_limit/karlie-butt-1.gif",
      },
      {
        id: "b2",
        name: "Dağ Tırmanışı",
        duration: 15,
        type: "Egzersiz",
        image:
          "https://coveteur.com/media-library/body-by-simone.gif?id=25367835&width=210",
      },
      {
        id: "b3",
        name: "Makas",
        duration: 15,
        type: "Egzersiz",
        image:
          "https://media.post.rvohealth.io/wp-content/uploads/sites/2/2019/05/LOWER-ABS_SCISSORS.gif",
      },
    ],
    "ÜST VÜCUT": [
      {
        id: "u1",
        name: "Kollar Yana Şınav",
        duration: 15,
        type: "Egzersiz",
        image:
          "https://dailyburn.com/life/wp-content/uploads/2015/10/prince-arm-raise.gif",
      },
      {
        id: "u2",
        name: "Yarım Şınav",
        duration: 15,
        type: "Egzersiz",
        image: "https://media.giphy.com/media/lRLeO3y9NS4zuWPfxQ/giphy.gif",
      },
      {
        id: "u3",
        name: "Kobra",
        duration: 15,
        type: "Egzersiz",
        image:
          "https://media.post.rvohealth.io/wp-content/uploads/sites/2/2020/06/GRT-1.11.FloorProneCobra.gif",
      },
    ],
  };

  // MOLA EKLENEREK AKIŞIN OLUŞTURULMASI
  const buildRoutine = () => {
    const routine = [...WARMUP];
    // İsimler eşleştiği için ilgili bölgenin egzersizleri hatasız yüklenecek
    const mainExercises = EXERCISES[workoutTitle] || EXERCISES["TÜM VÜCUT"];

    mainExercises.forEach((ex, index) => {
      routine.push(ex);
      // Son ana egzersiz değilse araya mola koy
      if (index < mainExercises.length - 1) {
        routine.push({
          id: `rest-${index}`,
          name: "Dinlenme Zamanı",
          duration: 10,
          type: "Mola",
          image:
            "https://images.unsplash.com/photo-1543352634-99a5d50ae78e?w=500",
        });
      }
    });

    routine.push(...COOLDOWN);
    return routine;
  };

  const FULL_ROUTINE = buildRoutine();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(FULL_ROUTINE[0].duration);
  const [isActive, setIsActive] = useState(false);
  const [warningVisible, setWarningVisible] = useState(false);

  const currentMove = FULL_ROUTINE[currentIndex];

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0 && isActive) {
      handleNext();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleNext = () => {
    if (currentIndex < FULL_ROUTINE.length - 1) {
      const next = currentIndex + 1;
      setCurrentIndex(next);
      setTimeLeft(FULL_ROUTINE[next].duration);
      setIsActive(true);
    } else {
      setIsActive(false);
      Alert.alert("Harika İş! 🎉", "Antrenmanı başarıyla bitirdin.", [
        { text: "Tamam", onPress: () => navigation.goBack() },
      ]);
    }
  };

  // ATLA BUTONU MANTIĞI
  const handleSkip = () => {
    if (currentMove.type === "Isınma" || currentMove.type === "Soğuma") {
      setIsActive(false);
      setWarningVisible(true);
    } else {
      handleNext();
    }
  };

  // ÇIKIŞ ONAYI MANTIĞI
  const handleExitAttempt = () => {
    setIsActive(false);
    Alert.alert("Çıkış Yap", "Çıkmak istediğine emin misin?", [
      {
        text: "Hayır, Devam Et",
        onPress: () => setIsActive(true),
        style: "cancel",
      },
      {
        text: "Evet, Çık",
        onPress: () => navigation.goBack(),
        style: "destructive",
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* SAKATLIK UYARISI MODALI */}
      <Modal visible={warningVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="warning" size={50} color="#FFD700" />
            <Text style={styles.modalTitle}>DİKKAT!</Text>
            <Text style={styles.modalText}>
              ısınma ve soğuma yapmamak sakatlıklara yol açar. lütfen bu bölümü
              tamamla.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setWarningVisible(false);
                setIsActive(true);
              }}
            >
              <Text style={styles.modalButtonText}>Anladım</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <TouchableOpacity onPress={handleExitAttempt} style={styles.iconButton}>
          <Ionicons name="close" size={32} color="#FFF" />
        </TouchableOpacity>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>{currentMove.type}</Text>
        </View>

        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>ATLA</Text>
          <Ionicons name="chevron-forward" size={20} color="#FF5722" />
        </TouchableOpacity>
      </View>

      <View style={styles.progressContainer}>
        <View
          style={[
            styles.progressBar,
            { width: `${((currentIndex + 1) / FULL_ROUTINE.length) * 100}%` },
          ]}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.moveName}>{currentMove.name}</Text>
        <View style={styles.imageContainer}>
          <Image source={{ uri: currentMove.image }} style={styles.gifStyle} />
        </View>

        <Text
          style={[
            styles.timerText,
            currentMove.type === "Mola" && { color: "#4CAF50" },
          ]}
        >
          {timeLeft}s
        </Text>

        <TouchableOpacity
          style={styles.playBtn}
          onPress={() => setIsActive(!isActive)}
        >
          <Ionicons
            name={isActive ? "pause" : "play"}
            size={40}
            color="#FFF"
            style={{ marginLeft: isActive ? 0 : 5 }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  iconButton: { padding: 5 },
  badge: {
    backgroundColor: "#FF5722",
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 13,
    textTransform: "uppercase",
  },
  skipButton: { flexDirection: "row", alignItems: "center", padding: 5 },
  skipText: {
    color: "#FF5722",
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 2,
  },
  progressContainer: { height: 6, backgroundColor: "#333", width: "100%" },
  progressBar: { height: 6, backgroundColor: "#FF5722" },
  content: { flex: 1, alignItems: "center", justifyContent: "center" },
  moveName: {
    color: "#FFF",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  imageContainer: {
    width: "85%",
    height: verticalScale(240),
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#1E1E1E",
    elevation: 5,
  },
  gifStyle: { width: "100%", height: "100%", resizeMode: "contain" },
  timerText: {
    color: "#FFF",
    fontSize: 75,
    fontWeight: "900",
    marginVertical: 30,
  },
  playBtn: {
    backgroundColor: "#FF5722",
    width: 85,
    height: 85,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.92)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#2C2C2C",
    width: "85%",
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFD700",
  },
  modalTitle: {
    color: "#FFD700",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 12,
  },
  modalText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 25,
  },
  modalButton: {
    backgroundColor: "#FF5722",
    paddingHorizontal: 35,
    paddingVertical: 14,
    borderRadius: 12,
  },
  modalButtonText: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
});

export default ActiveWorkoutScreen;
