import * as React from "react";
import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import { Input, Button } from "@ui-kitten/components";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const CustomerLogin = () => {
  const navigation = useNavigation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [tableNumber, setTableNumber] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isPhoneNumberValid = (number) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(number);
  };

  const canProceed = name && isPhoneNumberValid(phoneNumber) && tableNumber;

  const handleStartOrdering = () => {
    if (canProceed) {
      navigation.navigate("OrderPage");
    } else {
      Alert.alert("Invalid Input", "Please ensure all fields are correctly filled.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
          <Text style={styles.dateText}>{currentTime.toLocaleDateString()}</Text>
          <Text style={styles.timeText}>{currentTime.toLocaleTimeString()}</Text>
        </View>
      </View>
      <View style={styles.formContainer}>
        <Input
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          keyboardType="numeric"
          onChangeText={(text) => setPhoneNumber(text)}
        />
        <Input
          style={styles.input}
          placeholder="Table Number"
          value={tableNumber}
          onChangeText={(text) => setTableNumber(text)}
        />
        <Button
          style={styles.button}
          size="medium"
          status="primary"
          appearance="filled"
          onPress={handleStartOrdering}
        >
          Start Ordering
        </Button>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Copyright ©2024 Savoy’s South Indian Kitchen</Text>
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
    height: 60, // Increased height of input fields
    placeholderTextColor: "#000",
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

export default CustomerLogin;
