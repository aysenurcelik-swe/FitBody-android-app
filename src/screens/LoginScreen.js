import { Ionicons } from "@expo/vector-icons"; // Hocanın istediği Expo ikonlarından ilki
import { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import api from "../api";

const LoginScreen = ({ navigation }) => {
  // Kullanıcının girdiği verileri tuttuğumuz state'ler (useState hook)
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // Giriş veya Kayıt olma fonksiyonu (Axios ile CRUD işlemi)
  const handleAuth = async () => {
    setLoading(true);
    try {
      if (isLogin) {
        // Giriş Yapma İşlemi
        const response = await api.get("/users");
        const user = response.data.find(
          (u) => u.email === email && u.password === password,
        );

        if (user) {
          setModalMessage("Giriş Başarılı! FitBody'ye Hoş Geldin.");
          setModalVisible(true);
          navigation.replace("MainTabs");
        } else {
          setModalMessage("Hatalı e-posta veya şifre.");
          setModalVisible(true);
        }
      } else {
        // Kayıt Olma İşlemi
        const newUser = { name, email, password };
        await api.post("/users", newUser);
        setModalMessage("Kayıt Başarılı! Şimdi giriş yapabilirsin.");
        setModalVisible(true);
        setIsLogin(true); // Kayıt olunca otomatik giriş ekranına atar
      }
    } catch (error) {
      setModalMessage("Bir hata oluştu. İnternet bağlantını kontrol et.");
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Üst Kısım: Logo ve Başlık */}
      <View style={styles.headerContainer}>
        <Ionicons
          name="barbell"
          size={100}
          color="#FF5722"
          style={{ transform: [{ rotate: "-45deg" }] }}
        />
        <Text style={styles.title}>FitBody</Text>
        <Text style={styles.subtitle}>
          {isLogin ? "Tekrar Hoş Geldin!" : "Aramıza Katıl"}
        </Text>
      </View>

      {/* Form Alanı */}
      <View style={styles.formContainer}>
        {!isLogin && (
          <TextInput
            style={styles.input}
            placeholder="Adın Soyadın"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#999"
          />
        )}
        <TextInput
          style={styles.input}
          placeholder="E-posta Adresin"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="Şifren"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#999"
        />

        {/* Buton ve Yükleniyor Animasyonu */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleAuth}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" size="small" />
          ) : (
            <Text style={styles.buttonText}>
              {isLogin ? "Giriş Yap" : "Kayıt Ol"}
            </Text>
          )}
        </TouchableOpacity>

        {/* Giriş/Kayıt Arası Geçiş Butonu */}
        <TouchableOpacity
          onPress={() => setIsLogin(!isLogin)}
          style={styles.switchButton}
        >
          <Text style={styles.switchText}>
            {isLogin
              ? "Hesabın yok mu? Kayıt Ol"
              : "Zaten hesabın var mı? Giriş Yap"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Uyarı Modalı (Hocanın Kriteri) */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Tamam</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

// CSS (Stil) Ayarları - Hocanın istediği flex, padding, margin vs. hepsi burada
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E", // Koyu ve şık bir arka plan
    padding: scale(20),
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(50),
    marginBottom: verticalScale(30),
  },
  title: {
    fontSize: scale(32),
    fontWeight: "bold",
    color: "#FF5722",
    marginTop: verticalScale(10),
  },
  subtitle: {
    fontSize: scale(16),
    color: "#CCCCCC",
    marginTop: verticalScale(5),
  },
  formContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#2C2C2C",
    color: "#FFF",
    borderRadius: 10,
    padding: scale(15),
    marginBottom: verticalScale(15),
    fontSize: scale(14),
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
      },
      android: { elevation: 2 },
    }),
  },
  button: {
    backgroundColor: "#FF5722",
    padding: scale(15),
    borderRadius: 10,
    alignItems: "center",
    marginTop: verticalScale(10),
  },
  buttonText: {
    color: "#FFF",
    fontSize: scale(16),
    fontWeight: "bold",
  },
  switchButton: {
    marginTop: verticalScale(20),
    alignItems: "center",
  },
  switchText: {
    color: "#FF5722",
    fontSize: scale(14),
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalView: {
    backgroundColor: "#333",
    padding: scale(20),
    borderRadius: 15,
    alignItems: "center",
    width: "80%",
  },
  modalText: {
    color: "#FFF",
    fontSize: scale(16),
    marginBottom: verticalScale(20),
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#FF5722",
    paddingHorizontal: scale(30),
    paddingVertical: scale(10),
    borderRadius: 8,
  },
  modalButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default LoginScreen;
