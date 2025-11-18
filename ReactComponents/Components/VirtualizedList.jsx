import React from 'react';
import {View, VirtualizedList, StyleSheet, Text, StatusBar} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

// Removed: type ItemData = { id: string; title: string; };

const getItem = (_data, index) => ({ // Removed type annotations
  // FIX: Updated string generation to ensure keys are unique and valid
  id: String(index), 
  title: `Item ${index + 1}`,
});

const getItemCount = (_data) => 50; // Removed type annotation

// Removed: type ItemProps = { title: string; };

// Adjusted Item component destructuring to work without type annotation
const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const VIEWL = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container} edges={['top']}>
      <VirtualizedList
        initialNumToRender={4}
        // Assumes item has a 'title' property, which getItem ensures
        renderItem={({item}) => <Item title={item.title} />} 
        keyExtractor={item => item.id}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  item: {
    backgroundColor: '#f9c2ff',
    height: 150,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
  title: {
    fontSize: 32,
  },
});

export default VIEWL;