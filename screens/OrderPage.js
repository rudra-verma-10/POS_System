import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Alert
} from "react-native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

// Importing JSON files
import beveragesData from "../data/beverages.json";
import startersData from "../data/starters.json";
import biryaniData from "../data/biryani.json";
import dessertsData from "../data/desserts.json";
import dosaData from "../data/dosa.json";
import paranthasData from "../data/parathas.json";
import breadsData from "../data/breads.json";
import eggsData from "../data/eggs.json";
import extrasData from "../data/extras.json";
import chineseSpecialData from "../data/chineseSpecial.json";

import { getDatabase, ref, push, set, serverTimestamp} from "firebase/database";
import { app, database } from "../firebase";

import { useNavigation, useRoute } from "@react-navigation/native"

const OrderPage = ({}) => {
  const [selectedCategory, setSelectedCategory] = useState("Biryani");
  const [foodItems, setFoodItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [comment, setComment] = useState(""); // State to hold comment text
  const scrollViewRef = useRef();
  // const customerName = "John Doe";

  const route = useRoute();
  const navigation = useNavigation();

  const { customerName,  tableNumber } = route.params;

  useEffect(() => {
    loadFoodItems(selectedCategory);
  }, [selectedCategory]);

  const loadFoodItems = (category) => {
    switch (category) {
      case "Beverages":
        setFoodItems(beveragesData);
        break;
      case "Starters":
        setFoodItems(startersData);
        break;
      case "Biryani":
        setFoodItems(biryaniData);
        break;
      case "Desserts":
        setFoodItems(dessertsData);
        break;
      case "Dosas":
        setFoodItems(dosaData);
        break;
      case "Paranthas":
        setFoodItems(paranthasData);
        break;
      case "Breads":
        setFoodItems(breadsData);
        break;
      case "Eggs":
        setFoodItems(eggsData);
        break;
      case "Extras":
        setFoodItems(extrasData);
        break;
      case "Chinese Special":
        setFoodItems(chineseSpecialData);
        break;
      // Add cases for other categories
      default:
        setFoodItems([]);
    }
  };

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find(
        (cartItem) => cartItem.name === item.name
      );
      if (itemExists) {
        return prevItems.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const incrementQuantity = (item) => {
    setCartItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.name === item.name
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  };

  const decrementQuantity = (item) => {
    setCartItems((prevItems) =>
      prevItems.reduce((result, cartItem) => {
        if (cartItem.name === item.name) {
          if (cartItem.quantity > 1) {
            result.push({ ...cartItem, quantity: cartItem.quantity - 1 });
          }
        } else {
          result.push(cartItem);
        }
        return result;
      }, [])
    );
  };

  const scrollToNext = () => {
    scrollViewRef.current.scrollTo({ x: 800, animated: true });
  };

  const scrollToPrev = () => {
    scrollViewRef.current.scrollTo({ x: -300, animated: true });
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleOrder = async () => {
    const db = getDatabase(app);
    const ordersRef = ref(db, "orders/");
    const newOrderRef = push(ordersRef);

    try {
      await set(newOrderRef, {
        customerName: customerName,
        tableNumber: tableNumber,
        orderItems: cartItems,
        totalAmount: calculateTotal(),
      });
      Alert.alert("Order placed successfully!");
      setCartItems([]);
    } catch (error) {
      console.error("Error placing order: ", error);
      Alert.alert("Error placing order. Please try again.");
    }
  };
  

  const handleComments = () => {
    setModalVisible(true); // Show the modal when "Comments" button is pressed
  };

  const saveComment = () => {
    // Save comment with the order details here
    setModalVisible(false);
  };

  const handleAssistance = async () => {
    const db = getDatabase(app);
    const assistanceRef = ref(db, "assistance/");
    const newAssistanceRef = push(assistanceRef);
  
    try {
      await set(newAssistanceRef, {
        tableNumber: tableNumber,
        customerName: customerName,
      });
      Alert.alert("Assistance request sent successfully!");
    } catch (error) {
      console.error("Error sending assistance request: ", error);
      Alert.alert("Error sending assistance request. Please try again.");
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Savoy's South Indian Kitchen</Text>
      </View>
      <View style={styles.mainContent}>
        <View style={styles.menuSection}>
          <View style={styles.menuHeader}>
            <TouchableOpacity onPress={scrollToPrev}>
              <Image
                style={styles.arrowIcon}
                source={require("../assets/right-arrow.png")}
              />
            </TouchableOpacity>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              ref={scrollViewRef}
              contentContainerStyle={styles.menuRow}
            >
              <TouchableOpacity onPress={() => setSelectedCategory("Biryani")}>
                <View style={styles.menuItem}>
                  <Text style={styles.menuItemText}>Biryani</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedCategory("Starters")}>
                <View style={styles.menuItem}>
                  <Text style={styles.menuItemText}>Starters</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedCategory("Chinese Special")}
              >
                <View style={styles.menuItem}>
                  <Text style={styles.menuItemText}>Chinese Special</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedCategory("Paranthas")}>
                <View style={styles.menuItem}>
                  <Text style={styles.menuItemText}>Paranthas</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedCategory("Dosas")}
              >
                <View style={styles.menuItem}>
                  <Text style={styles.menuItemText}>Dosas</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedCategory("Desserts")}>
                <View style={styles.menuItem}>
                  <Text style={styles.menuItemText}>Desserts</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedCategory("Beverages")}
              >
                <View style={styles.menuItem}>
                  <Text style={styles.menuItemText}>Beverages</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedCategory("Breads")}>
                <View style={styles.menuItem}>
                  <Text style={styles.menuItemText}>Breads</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedCategory("Eggs")}>
                <View style={styles.menuItem}>
                  <Text style={styles.menuItemText}>Eggs</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedCategory("Extras")}>
                <View style={styles.menuItem}>
                  <Text style={styles.menuItemText}>Extras</Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
            <TouchableOpacity onPress={scrollToNext}>
              <Image
                style={styles.arrowIcon}
                source={require("../assets/left-arrow.png")}
              />
            </TouchableOpacity>
          </View>
          <ScrollView>
          <View style={styles.foodItems}>
            {foodItems.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => addToCart(item)}>
                <View style={styles.foodItem}>
                  <Text style={styles.foodName}>{item.name}</Text>
                  <Text style={styles.foodPrice}>${item.price.toFixed(2)}</Text>
                </View>

              </TouchableOpacity>
            ))}
          </View>
          </ScrollView>
        </View>
        <View style={styles.cartSection}>
          <View style={styles.cartHeader}>
            <Text style={styles.cartText}>Cart</Text>
            <Image
              style={styles.cartIcon}
              source={require("../assets/cartplussolid-1.png")}
            />
          </View>
          <ScrollView>
            <View style={styles.billItems}>
              {cartItems.map((item, index) => (
                <View key={index} style={styles.billItem}>
                  <View style={styles.foodItemNameContainer}>
                    <Text style={styles.foodItemText}>{item.name}</Text>
                  </View>
                  <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => decrementQuantity(item)}>
                      <Image
                        style={styles.vectorIcon}
                        source={require("../assets/minus.png")}
                      />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => incrementQuantity(item)}>
                      <Image
                        style={styles.vectorIcon}
                        source={require("../assets/plus.png")}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.priceText}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalPrice}>${calculateTotal()}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleOrder}>
              <Text style={styles.buttonText}>Order</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleComments}>
              <Text style={styles.buttonText}>Comments</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleAssistance}>
              <Text style={styles.buttonText}>Assistance</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Comments Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.commentInput}
              placeholder="Enter your comments here..."
              multiline
              numberOfLines={4}
              value={comment}
              onChangeText={setComment}
            />
            <View style={styles.modalButtons}>
              <Button
                title="Close"
                onPress={() => setModalVisible(false)}
                color={Color.colorDarkgray}
              />
              <Button
                title="Save"
                onPress={saveComment}
                color={Color.colorOrange}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorNavy,
    justifyContent: "space-between",
  },
  header: {
    width: "100%",
    padding: 10,
    backgroundColor: Color.colorDarkgray,
    alignItems: "center",
  },
  headerText: {
    color: Color.colorWhite,
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_21xl,
  },
  mainContent: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
  },
  menuSection: {
    width: "70%",
    padding: 10,
  },
  menuHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItem: {
    width: 150,
    height: 50,
    backgroundColor: Color.colorOrange,
    borderRadius: Border.br_3xs,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  menuItemText: {
    fontSize: FontSize.size_21xl,
    fontFamily: FontFamily.interRegular,
    color: Color.colorBlack,
  },
  arrowIcon: {
    width: 30,
    height: 30,
  },
  foodItems: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  foodItem: {
    flexDirection: "column",
    flexWrap: "wrap",
    width: 200,
    padding: 10,
    textAlign: "center",
    borderRadius: Border.br_3xs,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Color.colorGray,
    // backgroundColor: Color.colorGray,
  },
  foodName: {
    // color: Color.colorWhite,
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_21xl,
    marginBottom: 5,
  },
  foodPrice: {
    // color: Color.colorWhite,
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_21xl,
  },
  cartSection: {
    width: "30%",
    padding: 10,
    // backgroundColor: Color.colorGray,
    borderTopRightRadius: Border.br_3xs,
    borderBottomRightRadius: Border.br_3xs,
    borderWidth: 1,
  },
  cartHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  cartText: {
    fontSize: FontSize.size_21xl,
    fontFamily: FontFamily.interRegular,
    color: Color.colorBlack,
  },
  cartIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  billItems: {
    marginBottom: 20,
  },
  billItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  foodItemNameContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: 100, // Adjust this as needed
  },
  foodItemText: {
    fontSize: FontSize.size_21xl,
    fontFamily: FontFamily.interRegular,
    color: Color.colorBlack,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  vectorIcon: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
  },
  quantityText: {
    fontSize: FontSize.size_21xl,
    fontFamily: FontFamily.interRegular,
    color: Color.colorBlack,
  },
  priceText: {
    fontSize: FontSize.size_21xl,
    fontFamily: FontFamily.interRegular,
    color: Color.colorBlack,
  },
  totalContainer: {
    alignItems: "flex-end",
  },
  subTotalText: {
    fontSize: FontSize.size_21xl,
    fontFamily: FontFamily.interRegular,
    color: Color.colorBlack,
  },
  subTotalPrice: {
    fontSize: FontSize.size_21xl,
    fontFamily: FontFamily.interRegular,
    color: Color.colorBlack,
    marginBottom: 10,
  },
  totalText: {
    fontSize: FontSize.size_21xl,
    fontFamily: FontFamily.interRegular,
    color: Color.colorBlack,
    fontWeight: "bold",
  },
  totalPrice: {
    fontSize: FontSize.size_21xl,
    fontFamily: FontFamily.interRegular,
    color: Color.colorBlack,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  button: {
    backgroundColor: Color.colorOrange,
    padding: 10,
    borderRadius: Border.br_3xs,
  },
  buttonText: {
    color: Color.colorWhite,
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_21xl,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_3xs,
    alignItems: "center",
  },
  commentInput: {
    width: "100%",
    height: 100,
    borderColor: Color.colorGray,
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: "top",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default OrderPage;
