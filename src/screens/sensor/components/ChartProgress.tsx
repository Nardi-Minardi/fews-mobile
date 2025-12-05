import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';

const ChartProgress = () => {
  const screenWidth = Dimensions.get('window').width;

  // Contoh data progress (0 - 1)
  const data = {
    labels: ["AWS", "AWLR", "ARR"], 
    data: [0.7, 0.5, 0.3],   // 70%, 50%, 30%
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          fontWeight: '700',
          marginBottom: 10,
        }}
      >
        Progress Perangkat
      </Text>

      <ProgressChart
        data={data}
        width={screenWidth - 32}
        height={220}
        strokeWidth={12}
        radius={32}
        chartConfig={{
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          color: (opacity = 1) => `rgba(30, 144, 255, ${opacity})`,
        }}
        hideLegend={false}
      />
    </View>
  );
};

export default ChartProgress;
