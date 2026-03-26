import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";

// BÖLGELER VE ŞEHİRLER VERİ YAPISI
const REGIONS = {
  KARADENİZ: [
    "Gümüşhane",
    "Trabzon",
    "Artvin",
    "Amasya",
    "Tokat",
    "Sinop",
    "Giresun",
    "Ordu",
    "Rize",
    "Samsun",
    "Zonguldak",
    "Bartın",
    "Düzce",
    "Bolu",
    "Karabük",
    "Kastamonu",
    "Bayburt",
  ],
  MARMARA: ["İstanbul", "Bursa", "Edirne", "Kocaeli"],
  "İÇ ANADOLU": ["Ankara", "Konya", "Eskişehir", "Kayseri"],
  EGE: ["İzmir", "Aydın", "Muğla", "Manisa"],
  AKDENİZ: ["Antalya", "Adana", "Mersin"],
  "G.DOĞU ANADOLU": ["Gaziantep", "Diyarbakır", "Mardin"],
  "DOĞU ANADOLU": ["Erzurum", "Erzincan", "Malatya"],
};

// SALON VERİLERİ
const GYM_DATA = {
  Gümüşhane: [
    {
      id: "1",
      name: "Gümüşhane Üniversitesi Yüzme Havuzu ve Fitness Salonu",
      rating: 4.0,
      image:
        "https://gumushane.gsb.gov.tr/Public/Images/IM/Gumushane/01204/photo-2018-06-21-09-47-191.jpg",
      hours: {
        male: "salı-cuma-cumartesi",
        female: "pazartesi-çarşamba-perşembe",
      },
      price: { daily: "120 TL", monthly: "960 TL" },
      location: "Kampüs",
    },
    {
      id: "2",
      name: "Loca Fitness",
      rating: 4.5,
      image:
        "https://avatars.mds.yandex.net/get-altay/14306621/2a00000193b8a41bdbefa233ef6288795bb9/L_height",
      hours: {
        male: "salı-cuma-cumartesi",
        female: "pazartesi-çarşamba-perşembe",
      },
      price: { daily: "120 TL", monthly: "960 TL" },
      location: "Gümüşhane Loca Fitness",
    },
    {
      id: "3",
      name: "Dark GYM",
      rating: 4.8,
      image:
        "https://png.pngtree.com/thumb_back/fh260/background/20230516/pngtree-large-room-full-of-equipment-in-a-gym-image_2549099.jpg",
      hours: {
        male: "her gün",
        female: "her gün",
      },
      price: { daily: "-", monthly: "1200 TL" },
      location: "Gümüşhane Dark GYM",
    },
  ],
  İstanbul: [
    {
      id: "101",
      name: "Marmara Fit",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1571902251103-d87389d04941?w=500",
      hours: { male: "24 Saat", female: "07:00-22:00" },
      price: { daily: "250 TL", monthly: "2000 TL" },
      location: "Kadıköy",
    },
  ],
  Ankara: [
    {
      id: "201",
      name: "Başkent Power",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=500",
      hours: { male: "06:00-23:00", female: "06:00-23:00" },
      price: { daily: "180 TL", monthly: "1400 TL" },
      location: "Çankaya",
    },
  ],
};

const GymsScreen = () => {
  const [selectedRegion, setSelectedRegion] = useState("KARADENİZ");
  const [selectedCity, setSelectedCity] = useState("Gümüşhane");
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  const renderGymItem = ({ item }) => (
    <View style={styles.gymCard}>
      <Image source={{ uri: item.image }} style={styles.gymImage} />

      {/* Ücret Rozeti */}
      <View style={styles.priceBadge}>
        <Text style={styles.priceBadgeText}>{item.price.monthly} / Ay</Text>
      </View>

      <TouchableOpacity
        style={styles.favButton}
        onPress={() => toggleFavorite(item.id)}
      >
        <Ionicons
          name={favorites.includes(item.id) ? "heart" : "heart-outline"}
          size={22}
          color={favorites.includes(item.id) ? "#E91E63" : "#FFF"}
        />
      </TouchableOpacity>

      <View style={styles.gymInfo}>
        <Text style={styles.gymName}>{item.name}</Text>
        <Text style={styles.locationText}>
          <Ionicons name="location-outline" size={12} /> {item.location}
        </Text>

        {/* Ücret Tablosu */}
        <View style={styles.priceRow}>
          <View style={styles.priceBox}>
            <Text style={styles.priceLabel}>Günlük Giriş</Text>
            <Text style={styles.priceValue}>{item.price.daily}</Text>
          </View>
          <View
            style={[
              styles.priceBox,
              { borderLeftWidth: 1, borderLeftColor: "#444" },
            ]}
          >
            <Text style={styles.priceLabel}>Aylık Üyelik</Text>
            <Text style={styles.priceValue}>{item.price.monthly}</Text>
          </View>
        </View>

        {/* Saatler */}
        <View style={styles.hoursRow}>
          <View style={styles.hourItem}>
            <Ionicons name="man" size={14} color="#2196F3" />
            <Text style={styles.hourText}>E: {item.hours.male}</Text>
          </View>
          <View style={styles.hourItem}>
            <Ionicons name="woman" size={14} color="#E91E63" />
            <Text style={styles.hourText}>K: {item.hours.female}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.mapButton}
          onPress={() =>
            Linking.openURL(
              `https://www.google.com/maps/search/${item.name}+${selectedCity}`,
            )
          }
        >
          <Text style={styles.mapButtonText}>📍 Haritada Gör</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainTitle}>SPOR SALONLARI</Text>

      {/* 1. SEVİYE: BÖLGE SEÇİMİ */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.regionScroll}
      >
        {Object.keys(REGIONS).map((region) => (
          <TouchableOpacity
            key={region}
            style={[
              styles.regionTab,
              selectedRegion === region && styles.activeRegionTab,
            ]}
            onPress={() => {
              setSelectedRegion(region);
              setSelectedCity(REGIONS[region][0]); // Bölge değişince ilk şehre odaklan
            }}
          >
            <Text
              style={[
                styles.regionTabText,
                selectedRegion === region && styles.activeRegionText,
              ]}
            >
              {region}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 2. SEVİYE: ŞEHİR SEÇİMİ (Seçilen bölgeye göre dinamik gelir) */}
      <View style={styles.citySection}>
        <Text style={styles.sectionLabel}>Şehir Seçin (A-Z):</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cityScroll}
        >
          {REGIONS[selectedRegion].sort().map((city) => (
            <TouchableOpacity
              key={city}
              style={[
                styles.cityChip,
                selectedCity === city && styles.activeCityChip,
              ]}
              onPress={() => setSelectedCity(city)}
            >
              <Text
                style={[
                  styles.cityChipText,
                  selectedCity === city && styles.activeCityText,
                ]}
              >
                {city}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* 3. SEVİYE: SALON LİSTESİ */}
      <FlatList
        data={GYM_DATA[selectedCity] || []}
        renderItem={renderGymItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 50 }}
        ListEmptyComponent={
          <View style={styles.emptyView}>
            <Ionicons name="alert-circle-outline" size={50} color="#444" />
            <Text style={styles.emptyText}>
              {selectedCity} için veri girişi bekleniyor...
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: scale(15),
  },
  mainTitle: {
    color: "#FF5722",
    fontSize: scale(22),
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: verticalScale(15),
  },
  regionScroll: {
    marginBottom: verticalScale(15),
  },
  regionTab: {
    height: 40,
    paddingHorizontal: 15,
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: "#1E1E1E",
    justifyContent: "center",
    alignItems: "center",
  },
  activeRegionTab: { backgroundColor: "#FF5722" },
  regionTabText: {
    color: "#888",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
  },
  activeRegionText: { color: "#FFF" },
  citySection: { marginBottom: 20 },
  sectionLabel: { color: "#666", fontSize: 10, marginBottom: 8, marginLeft: 5 },
  cityScroll: { flexDirection: "row" },
  cityChip: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#333",
    justifyContent: "center",
  },
  activeCityChip: { backgroundColor: "#333", borderColor: "#FF5722" },
  cityChipText: { color: "#888", fontSize: 12 },
  activeCityText: { color: "#FF5722", fontWeight: "bold" },
  gymCard: {
    backgroundColor: "#1E1E1E",
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden",
    elevation: 4,
  },
  gymImage: { width: "100%", height: verticalScale(140) },
  priceBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "#FF5722",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  priceBadgeText: { color: "#FFF", fontSize: 10, fontWeight: "bold" },
  favButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 8,
    borderRadius: 20,
  },
  gymInfo: { padding: 15 },
  gymName: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
  locationText: { color: "#888", fontSize: 11, marginTop: 4 },
  priceRow: {
    flexDirection: "row",
    backgroundColor: "#262626",
    borderRadius: 10,
    marginTop: 15,
    padding: 10,
  },
  priceBox: { flex: 1, alignItems: "center" },
  priceLabel: { color: "#888", fontSize: 9, marginBottom: 4 },
  priceValue: { color: "#FFF", fontWeight: "bold", fontSize: 14 },
  hoursRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  hourItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#262626",
    padding: 8,
    borderRadius: 8,
    width: "48%",
  },
  hourText: { color: "#BBB", fontSize: 10, marginLeft: 5 },
  mapButton: {
    backgroundColor: "#333",
    marginTop: 15,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#444",
  },
  mapButtonText: { color: "#FFF", fontWeight: "bold" },
  emptyView: { alignItems: "center", marginTop: 50 },
  emptyText: { color: "#444", marginTop: 10, fontSize: 12 },
});

export default GymsScreen;
