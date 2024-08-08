import * as React from "react";
import { StyleSheet, Text, View, ScrollView, ImageBackground, Alert } from "react-native";
import { Input, Button } from "@ui-kitten/components";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const EmployeeLogin = () => {
  const navigation = useNavigation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogin = () => {
    if (employeeNumber && password) {
      // Perform login logic here (e.g., API call, authentication)
      navigation.navigate("HomePageEmployee");
    } else {
      Alert.alert("Invalid Input", "Please enter Employee Number and Password.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <ImageBackground
          style={styles.logoIcon}
          resizeMode="cover"
          source={require("../assets/logo.png")}
        />
        <View style={styles.headText}>
          <Text style={styles.mainTitle}>Savoy’s South Indian Kitchen</Text>
          <Text style={styles.subTitle}>Welcome</Text>
        </View>
        <View style={styles.dateTime}>
          <Text style={styles.dateText}>{currentTime.toLocaleDateString()}</Text>
          <Text style={styles.timeText}>{currentTime.toLocaleTimeString()}</Text>
        </View>
      </View>
      <View style={styles.formContainer}>
        <Input
          style={styles.input}
          placeholder="Employee Number"
          value={employeeNumber}
          keyboardType="number-pad"
          onChangeText={(text) => setEmployeeNumber(text)}
        />
        <Input
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button
          style={styles.button}
          size="medium"
          status="primary"
          appearance="filled"
          onPress={handleLogin}
        >
          Login
        </Button>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 Savoy’s South Indian Kitchen</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorGray,
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
  formContainer: {
    width: '80%',
    alignItems: 'center',
    marginVertical: 20,
  },
  input: {
    width: '60%',
    marginVertical: 10,
    height: 60,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  button: {
    width: '60%',
    height: 50,
    marginVertical: 20,
    borderRadius: Border.br_xl,
  },
  footer: {
    width: '100%',
    padding: 10,
    backgroundColor: Color.colorDarkgray,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  footerText: {
    color: Color.colorBlack,
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_21xl,
  },
});

export default EmployeeLogin;
