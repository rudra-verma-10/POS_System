import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, FlatList, Alert } from 'react-native';
import { getDatabase, ref, onValue, update } from 'firebase/database';

const OrderScreen = () => {
  const [orders, setOrders] = useState([]);
  const [elapsedTimes, setElapsedTimes] = useState({});

  useEffect(() => {
    const db = getDatabase();
    const ordersRef = ref(db, 'orders/');
    const unsubscribe = onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Firebase data:", data); // Check if data is retrieved
      if (data) {
        const formattedData = Object.keys(data)
          .map(key => ({ id: key, ...data[key] }))
          .filter(order => order.status !== 'bumped');
        setOrders(formattedData);
      } else {
        console.log("No data available");
      }
    });
    

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedElapsedTimes = { ...elapsedTimes };
      orders.forEach(order => {
        updatedElapsedTimes[order.id] = calculateElapsedTime(order.timestamp);
      });
      setElapsedTimes(updatedElapsedTimes);
    }, 1000);

    return () => clearInterval(interval);
  }, [orders, elapsedTimes]);

  const calculateElapsedTime = (timestamp) => {
    const orderTime = new Date(timestamp);
    const currentTime = new Date();
    const elapsed = Math.floor((currentTime - orderTime) / 1000); // in seconds
    return elapsed;
  };

  const handleStartPreparing = (orderId) => {
    const db = getDatabase();
    const orderRef = ref(db, `orders/${orderId}`);
    update(orderRef, { status: 'Preparing' });
  };

  const handlePrepared = (orderId) => {
    const db = getDatabase();
    const orderRef = ref(db, `orders/${orderId}`);
    update(orderRef, { status: 'Prepared' });
  };

  const handleBumpOrder = (orderId) => {
    Alert.alert(
      "Confirm Bump",
      "Are you sure you want to bump this order?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", onPress: () => {
          const db = getDatabase();
          const orderRef = ref(db, `orders/${orderId}`);
          update(orderRef, { status: 'bumped' });
        }}
      ]
    );
  };

  const renderOrderItem = ({ item }) => {
    const elapsedTime = elapsedTimes[item.id] || 0;

    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;

    let backgroundColor = '#fff';
    if (item.status === 'Preparing') {
      backgroundColor = '#FFD700';
    } else if (item.status === 'Prepared') {
      backgroundColor = "#4CAF50";
    }
    let orderItemsDisplay;
  if (Array.isArray(item.orderItems)) {
    orderItemsDisplay = item.orderItems.map(orderItem => {
      // Assuming each order item object has a 'name' property
      return orderItem.name || JSON.stringify(orderItem);
    }).join(', ');
  } else {
    orderItemsDisplay = JSON.stringify(item.orderItems);
  }

    return (
      <View style={[styles.orderItem, { backgroundColor }]}>
        <Text>Customer: {item.customerName}</Text>
        <Text>Table: {item.tableNumber}</Text>
        <Text>Order Items: {item.orderItems.map(o => o.name).join(', ')}</Text>
        <Text>Comments: {item.comment}</Text>
        <Text>Total Amount: {item.totalAmount}</Text>
        <Text>Elapsed Time: {minutes} minutes {seconds} seconds</Text>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <Button title="Start Preparing" onPress={() => handleStartPreparing(item.id)} />
          </View>
          <View style={styles.buttonWrapper}>
            <Button title="Prepared" onPress={() => handlePrepared(item.id)} />
          </View>
          <View style={styles.buttonWrapper}>
            <Button title="Bump Order" onPress={() => handleBumpOrder(item.id)} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={orders}
      renderItem={renderOrderItem}
      keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({
  orderItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 10, // Add margin for better visual separation
    borderRadius: 10, // Add border radius for rounded corners
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default OrderScreen;
