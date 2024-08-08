import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { database } from '../firebase';
import { ref, onValue } from 'firebase/database';

const StaffPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const ordersRef = ref(database, 'orders');
    const unsubscribe = onValue(ordersRef, (snapshot) => {
      const ordersData = snapshot.val();
      if (ordersData) {
        const ordersList = Object.keys(ordersData).map(key => ({
          id: key,
          ...ordersData[key]
        }));
        setOrders(ordersList);
        console.log("Fetched orders:", ordersList);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text style={styles.customerName}>{item.customerName}</Text>
            <Text style={styles.orderDetails}>
              {item.orderItems.map(i => `${i.name} (${i.quantity})`).join(', ')}
            </Text>
            <Text style={styles.totalAmount}>Total: ${item.totalAmount}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
  orderItem: {
    marginBottom: 16,
    padding: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  orderDetails: {
    fontSize: 16,
    marginTop: 8
  },
  totalAmount: {
    fontSize: 16,
    marginTop: 8,
    fontWeight: 'bold'
  }
});

export default StaffPage;
