import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";

// Kas anatomisini gösteren silüet görüntüsü
const muscleSilhouette =
  "https://w7.pngwing.com/pngs/538/753/png-transparent-human-body-anatomy-muscle-muscular-system-appetite-human-fictional-character-anatomy-thumbnail.png"; // Orijinal görüntünün URL'i

const ProgressScreen = () => {
  // Temel Fiziksel Bilgiler (Varsayılan değerler)
  const [height, setHeight] = useState("160");
  const [weight, setWeight] = useState("62");
  const [weightHistory, setWeightHistory] = useState([
    65, 64.5, 63.8, 63, 62.5, 62,
  ]);

  // Mezura Ölçüleri (Veri giriş ekranı)
  const [inputMeasurements, setInputMeasurements] = useState({
    bel: "",
    kalca: "",
    kol: "",
    bacak: "",
  });

  // Kaydedilen Mezura Ölçüleri (Silüete yansıtılacak veriler)
  const [savedMeasurements, setSavedMeasurements] = useState({
    bel: "65",
    kalca: "90",
    kol: "28",
    bacak: "50", // Varsayılan değerler
  });

  // --- MATEMATİKSEL FONKSİYON: VKİ HESAPLAMA ---
  const calculateBMI = () => {
    const h = parseFloat(height) / 100; // Santimetreyi metreye çeviriyoruz
    const w = parseFloat(weight);

    if (h > 0 && w > 0) {
      const bmiValue = (w / (h * h)).toFixed(1);
      return bmiValue;
    }
    return "0.0";
  };

  const bmi = calculateBMI();

  // VKİ Durum Analizi (Renk ve Metin)
  const getBMIDetails = () => {
    const val = parseFloat(bmi);
    if (val === 0) return { text: "Değer Girin", color: "#AAA" };
    if (val < 18.5) return { text: "Zayıf", color: "#3498db" }; // Mavi
    if (val >= 18.5 && val <= 24.9) return { text: "Normal", color: "#4CAF50" }; // Yeşil
    if (val >= 25 && val <= 29.9)
      return { text: "Fazla Kilolu", color: "#f1c40f" }; // Sarı
    return { text: "Obezite", color: "#e74c3c" }; // Kırmızı
  };

  const bmiDetails = getBMIDetails();

  // Veri Girişini Kaydetme ve Silüete Yansıtma Fonksiyonu
  const handleSaveData = () => {
    // Verileri kaydet
    setSavedMeasurements(inputMeasurements);

    // Veri giriş ekranını boşalt
    setInputMeasurements({ bel: "", kalca: "", kol: "", bacak: "" });

    Alert.alert("Başarılı", "Ölçülerin başarıyla kaydedildi.");
  };

  const getMeasurementText = (measureName) => {
    const val = savedMeasurements[measureName];
    if (val && !isNaN(val))
      return `${measureName.toUpperCase()} Çevresi: ${val} cm`;
    return `${measureName.toUpperCase()} Girin...`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Text style={styles.headerTitle}>Gelişim & Analiz</Text>

        {/* 1. KISIM: BOY, KİLO VE VKİ KARTI */}
        <View style={styles.bmiCard}>
          <View style={styles.bmiHeader}>
            <Ionicons name="body" size={24} color="#FF5722" />
            <Text style={styles.cardTitle}>Vücut Kitle İndeksi (VKİ)</Text>
          </View>

          <View style={styles.bmiRow}>
            {/* Boy ve Kilo Girişleri */}
            <View style={styles.inputGroup}>
              <View style={styles.inputBox}>
                <Text style={styles.inputLabel}>Boy (cm)</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={height}
                  onChangeText={setHeight}
                  maxLength={3}
                />
              </View>
              <View style={styles.inputBox}>
                <Text style={styles.inputLabel}>Kilo (kg)</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={weight}
                  onChangeText={setWeight}
                  maxLength={5}
                />
              </View>
            </View>

            {/* VKİ Sonuç Göstergesi */}
            <View style={styles.bmiResultContainer}>
              <View
                style={[styles.bmiCircle, { borderColor: bmiDetails.color }]}
              >
                <Text style={styles.bmiValue}>{bmi}</Text>
              </View>
              <Text style={[styles.bmiText, { color: bmiDetails.color }]}>
                {bmiDetails.text}
              </Text>
            </View>
          </View>
        </View>

        {/* 2. KISIM: DİNAMİK SİLÜET (ÖLÇÜLER Kaydedildi) */}
        <View style={styles.measurementsCard}>
          <View style={styles.bmiHeader}>
            <Ionicons name="man" size={24} color="#FF5722" />
            <Text style={styles.cardTitle}>
              Gelişim Silüeti (ÖLÇÜLER Kaydedildi)
            </Text>
          </View>

          <View style={styles.silhouetteContainer}>
            <Image
              source={{ uri: muscleSilhouette }}
              style={styles.silhouetteImage}
            />
            <Text style={[styles.measurementLabel, styles.kolLabel]}>
              {getMeasurementText("kol")}
            </Text>
            <Text style={[styles.measurementLabel, styles.belLabel]}>
              {getMeasurementText("bel")}
            </Text>
            <Text style={[styles.measurementLabel, styles.kalcaLabel]}>
              {getMeasurementText("kalca")}
            </Text>
            <Text style={[styles.measurementLabel, styles.bacakLabel]}>
              {getMeasurementText("bacak")}
            </Text>
          </View>
        </View>

        {/* 3. KISIM: VERİ GİRİŞ EKRANI (Mezura Ölçüleri) */}
        <View style={styles.inputCard}>
          <View style={styles.bmiHeader}>
            <Ionicons name="cut" size={24} color="#FF5722" />
            <Text style={styles.cardTitle}>
              Yeni Mezura Ölçüleri Girin (cm)
            </Text>
          </View>

          <View style={styles.gridContainer}>
            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>Kol Çevresi</Text>
              <TextInput
                style={styles.gridInput}
                placeholder="Örn: 28"
                placeholderTextColor="#666"
                keyboardType="numeric"
                value={inputMeasurements.kol}
                onChangeText={(text) =>
                  setInputMeasurements({ ...inputMeasurements, kol: text })
                }
              />
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>Bel Çevresi</Text>
              <TextInput
                style={styles.gridInput}
                placeholder="Örn: 65"
                placeholderTextColor="#666"
                keyboardType="numeric"
                value={inputMeasurements.bel}
                onChangeText={(text) =>
                  setInputMeasurements({ ...inputMeasurements, bel: text })
                }
              />
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>Kalça Çevresi</Text>
              <TextInput
                style={styles.gridInput}
                placeholder="Örn: 90"
                placeholderTextColor="#666"
                keyboardType="numeric"
                value={inputMeasurements.kalca}
                onChangeText={(text) =>
                  setInputMeasurements({ ...inputMeasurements, kalca: text })
                }
              />
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>Bacak Çevresi</Text>
              <TextInput
                style={styles.gridInput}
                placeholder="Örn: 50"
                placeholderTextColor="#666"
                keyboardType="numeric"
                value={inputMeasurements.bacak}
                onChangeText={(text) =>
                  setInputMeasurements({ ...inputMeasurements, bacak: text })
                }
              />
            </View>
          </View>

          {/* KAYDET VE SİLÜETE YANSIT BUTONU */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveData}>
            <Ionicons
              name="checkmark-circle"
              size={24}
              color="#FFF"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.saveButtonText}>Tüm Ölçüleri Kaydet</Text>
          </TouchableOpacity>
        </View>

        {/* 4. KISIM: KİLO GRAFİĞİ */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Haftalık Kilo Değişimi</Text>
          <View style={styles.chartBars}>
            {weightHistory.map((val, index) => (
              <View key={index} style={styles.barWrapper}>
                <Text style={styles.barValueText}>{val}</Text>
                <View
                  style={[
                    styles.bar,
                    { height: Math.max(10, verticalScale(val * 1.5 - 50)) },
                  ]}
                />
                <Text style={styles.barLabelText}>{index + 1}.H</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    paddingHorizontal: scale(15),
  },
  headerTitle: {
    color: "#FFF",
    fontSize: scale(24),
    fontWeight: "bold",
    marginVertical: verticalScale(15),
  },

  cardTitle: {
    color: "#FFF",
    fontSize: scale(16),
    fontWeight: "bold",
    marginLeft: 10,
  },

  // VKİ Kartı Stilleri
  bmiCard: {
    backgroundColor: "#2C2C2C",
    padding: scale(15),
    borderRadius: 15,
    marginBottom: verticalScale(15),
    elevation: 3,
  },
  bmiHeader: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  bmiRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputGroup: { flex: 1, marginRight: 15 },
  inputBox: { marginBottom: 10 },
  inputLabel: { color: "#AAA", fontSize: scale(11), marginBottom: 5 },
  input: {
    backgroundColor: "#1E1E1E",
    color: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: scale(14),
    borderWidth: 1,
    borderColor: "#444",
  },

  bmiResultContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: scale(100),
  },
  bmiCircle: {
    width: scale(70),
    height: scale(70),
    borderRadius: scale(35),
    borderWidth: 4,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    backgroundColor: "#1E1E1E",
  },
  bmiValue: { color: "#FFF", fontSize: scale(20), fontWeight: "bold" },
  bmiText: { fontSize: scale(12), fontWeight: "bold" },

  // Silüet Stilleri
  measurementsCard: {
    backgroundColor: "#2C2C2C",
    padding: scale(15),
    borderRadius: 15,
    marginBottom: verticalScale(15),
  },
  silhouetteContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginTop: 15,
  },
  silhouetteImage: {
    width: scale(180),
    height: verticalScale(220),
    resizeMode: "contain",
  },
  measurementLabel: {
    position: "absolute",
    backgroundColor: "rgba(30, 30, 30, 0.7)",
    color: "#FFF",
    fontSize: scale(9),
    fontWeight: "bold",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 5,
  },
  kolLabel: { top: verticalScale(25), left: scale(10) },
  belLabel: { top: verticalScale(75), left: scale(5) },
  kalcaLabel: { top: verticalScale(105), left: scale(10) },
  bacakLabel: { bottom: verticalScale(30), right: scale(20) },

  // Veri Giriş Kartı Stilleri
  inputCard: {
    backgroundColor: "#2C2C2C",
    padding: scale(15),
    borderRadius: 15,
    marginBottom: verticalScale(15),
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: { width: "48%", marginBottom: 15 },
  gridLabel: { color: "#AAA", fontSize: scale(11), marginBottom: 5 },
  gridInput: {
    backgroundColor: "#1E1E1E",
    color: "#FF5722",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: scale(13),
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "#444",
    textAlign: "center",
  },

  // Grafik Stilleri
  chartContainer: {
    backgroundColor: "#2C2C2C",
    padding: scale(15),
    borderRadius: 15,
    marginBottom: verticalScale(20),
  },
  chartTitle: {
    color: "#FFF",
    fontSize: scale(14),
    fontWeight: "bold",
    marginBottom: verticalScale(20),
  },
  chartBars: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: verticalScale(110),
  },
  barWrapper: { alignItems: "center" },
  barValueText: {
    color: "#FF5722",
    fontSize: scale(10),
    fontWeight: "bold",
    marginBottom: 5,
  },
  bar: { width: scale(12), backgroundColor: "#FF5722", borderRadius: 6 },
  barLabelText: { color: "#AAA", fontSize: scale(10), marginTop: 8 },

  // Kaydet Butonu
  saveButton: {
    backgroundColor: "#FF5722",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: verticalScale(12),
    borderRadius: 12,
    marginTop: 15,
  },
  saveButtonText: { color: "#FFF", fontSize: scale(16), fontWeight: "bold" },
});

export default ProgressScreen;
