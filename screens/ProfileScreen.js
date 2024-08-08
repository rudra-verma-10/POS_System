import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Color, FontSize, FontFamily } from "../GlobalStyles";

const ProfileScreen = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenText}>Profile Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.colorWhite,
  },
  screenText: {
    fontSize: FontSize.size_21xl,
    fontFamily: FontFamily.interRegular,
    color: Color.colorBlack,
  },
});

export default ProfileScreen;
