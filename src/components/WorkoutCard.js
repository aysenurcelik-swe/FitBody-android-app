import { Ionicons } from "@expo/vector-icons";
import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

// Bu component dışarıdan title (başlık), image (arka plan resmi) ve onPress (tıklanma olayı) parametrelerini alıyor.
const WorkoutCard = ({ title, image, onPress, duration }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.cardContainer}
    >
      <ImageBackground
        source={{ uri: image }}
        style={styles.imageBackground}
        imageStyle={{ borderRadius: 15 }}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.durationContainer}>
            <Ionicons name="time-outline" size={scale(16)} color="#FFF" />
            <Text style={styles.durationText}>{duration} Dk</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: verticalScale(10),
    height: verticalScale(120),
    borderRadius: 15,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
      },
      android: { elevation: 5 },
    }),
  },
  imageBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)", // Yazılar okunsun diye resmi biraz karartıyoruz
    padding: scale(15),
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#FFF",
    fontSize: scale(18),
    fontWeight: "bold",
  },
  durationContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF5722",
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
    borderRadius: 8,
  },
  durationText: {
    color: "#FFF",
    marginLeft: scale(4),
    fontWeight: "bold",
  },
});

export default WorkoutCard;
