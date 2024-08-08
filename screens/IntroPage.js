import * as React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Dimensions,
} from "react-native";
import { Button } from "@ui-kitten/components";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import { useState, useEffect } from "react";

const { width, height } = Dimensions.get("window");

const IntroPage = () => {
  const navigation = useNavigation();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.introPage}>
        <View style={styles.actionPage}>
          <View style={styles.header}>
            <Image
              style={styles.logoIcon}
              contentFit="cover"
              source={require("../assets/logo.png")}
            />
            <View style={styles.headText}>
              <Text style={styles.mainTitle}>Savoy’s South Indian Kitchen</Text>
              <Text style={styles.subTitle}>Welcome</Text>
            </View>
            <View style={styles.dateTime}>
              <Text style={styles.dateText}>
                {currentTime.toLocaleDateString()}
              </Text>
              <Text style={styles.timeText}>
                {currentTime.toLocaleTimeString()}
              </Text>
            </View>
          </View>
          <View style={styles.group}>
            <Button
              style={styles.groupButton}
              size="giant"
              status="primary"
              appearance="filled"
              onPress={() => navigation.navigate("CustomerLogin")}
            >
              Customer
            </Button>
            <Button
              style={styles.groupButton}
              size="giant"
              status="primary"
              appearance="filled"
              onPress={() => navigation.navigate("EmployeeLogin")}
            >
              Staff
            </Button>
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>Copyright</Text>
            <Text style={styles.footerText}>
              ©2024 Savoy’s South Indian Kitchen
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    backgroundColor: Color.colorGray,
    flex: 1,
  },
  introPage: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  actionPage: {
    backgroundColor: Color.colorGray,
    width: "100%",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginTop: 20,
  },
  logoIcon: {
    width: 200,
    height: 200,
  },
  headText: {
    flexDirection: "column",
    alignItems: "center",
  },
  mainTitle: {
    fontSize: FontSize.size_61xl,
    fontFamily: FontFamily.interRegular,
    color: Color.colorOrange,
    textAlign: "center",
  },
  subTitle: {
    fontSize: FontSize.size_61xl,
    fontFamily: FontFamily.interRegular,
    color: Color.colorOrange,
    textAlign: "center",
  },
  dateTime: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  dateText: {
    fontSize: FontSize.size_21xl,
    fontFamily: FontFamily.interRegular,
    color: Color.colorWhite,
    textAlign: "left",
  },
  timeText: {
    fontSize: FontSize.size_21xl,
    fontFamily: FontFamily.interRegular,
    color: Color.colorWhite,
    textAlign: "left",
  },
  group: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  groupButton: {
    width: "60%",
    marginVertical: 10,
  },
  footer: {
    backgroundColor: Color.colorDarkgray,
    width: "100%",
    padding: 10,
  },
  footerText: {
    fontSize: FontSize.size_21xl,
    fontFamily: FontFamily.interRegular,
    color: Color.colorBlack,
  },
});

export default IntroPage;
