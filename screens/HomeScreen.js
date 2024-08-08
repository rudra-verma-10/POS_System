import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Color, Border, FontSize, FontFamily } from "../GlobalStyles";

const HomeScreen = () => {
  const initialTableStatus = Array(15).fill("available");
  const [tableStatus, setTableStatus] = useState(initialTableStatus);

  const toggleTableStatus = (index) => {
    setTableStatus((prevStatus) => {
      const newStatus = [...prevStatus];
      newStatus[index] =
        newStatus[index] === "available" ? "occupied" : "available";
      return newStatus;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainscreen}>
        <View style={styles.tables}>
          {tableStatus.map((status, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.table,
                status === "available" ? styles.available : styles.occupied,
              ]}
              onPress={() => toggleTableStatus(index)}
            >
              <Text style={styles.tableText}>Table {index + 1}</Text>
              <Text style={styles.tableText}>{status}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    height: "100%",
  },
  mainscreen: {
    flex: 1,
    backgroundColor: Color.colorGainsboro,
    padding: 20,
  },
  tables: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  table: {
    width: 200,
    height: 150,
    borderRadius: Border.br_xl,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  available: {
    backgroundColor: "#4CAF50",
  },
  occupied: {
    backgroundColor: "#F44336",
  },
  tableText: {
    color: Color.colorWhite,
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_21xl,
    textAlign: "center",
  },
});

export default HomeScreen;
