import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';

const OrderHistory = () => {
  const [ordersByDate, setOrdersByDate] = useState({});

  useEffect(() => {
    const db = getDatabase();
    const ordersRef = ref(db, 'orders/');
    
    const unsubscribe = onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const orders = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        const groupedByDate = groupOrdersByDate(orders);
        setOrdersByDate(groupedByDate);
      } else {
        setOrdersByDate({});
      }
    });

    return () => unsubscribe();
  }, []);

  const groupOrdersByDate = (orders) => {
    return orders.reduce((acc, order) => {
      const orderDate = new Date(order.timestamp).toDateString();
      if (!acc[orderDate]) {
        acc[orderDate] = [];
      }
      acc[orderDate].push(order);
      return acc;
    }, {});
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Text>Customer: {item.customerName}</Text>
      <Text>Table: {item.tableNumber}</Text>
      <Text>Order Items: {item.orderItems.map(o => o.name).join(', ')}</Text>
      <Text>Total Amount: ${item.totalAmount}</Text>
    </View>
  );

  const renderOrdersByDate = ({ item }) => {
    const orders = ordersByDate[item.date] || [];
    const totalAmount = orders.reduce((sum, order) => sum + parseFloat(order.totalAmount), 0).toFixed(2);
    
    return (
      <View style={styles.dateSection}>
        <Text style={styles.dateTitle}>{item.date}</Text>
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={item => item.id}
        />
        <Text style={styles.totalText}>Total Sales: ${totalAmount}</Text>
      </View>
    );
  };

  const dateSections = Object.keys(ordersByDate).map(date => ({ date }));

  return (
    <FlatList
      data={dateSections}
      renderItem={renderOrdersByDate}
      keyExtractor={item => item.date}
    />
  );
};

const styles = StyleSheet.create({
  dateSection: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default OrderHistory;
