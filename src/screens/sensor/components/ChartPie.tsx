import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const ChartPie = () => {
  const screenWidth = Dimensions.get('window').width;

  const data = [
    {
      name: 'AWS',
      population: 30,
      color: '#FF6384',
      legendFontColor: '#333',
      legendFontSize: 14,
    },
    {
      name: 'AWLR',
      population: 20,
      color: '#36A2EB',
      legendFontColor: '#333',
      legendFontSize: 14,
    },
    {
      name: 'ARR',
      population: 15,
      color: '#FFCE56',
      legendFontColor: '#333',
      legendFontSize: 14,
    },
    {
      name: 'PDA',
      population: 10,
      color: '#4BC0C0',
      legendFontColor: '#333',
      legendFontSize: 14,
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        padding: 14,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          fontWeight: '700',
          marginBottom: 10,
        }}
      >
        Distribusi Perangkat
      </Text>

      <PieChart
        data={data}
        width={screenWidth - 32}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
        }}
        accessor={'population'}
        backgroundColor={'transparent'}
        paddingLeft={'15'}
        absolute
      />
    </View>
  );
};

export default ChartPie;
