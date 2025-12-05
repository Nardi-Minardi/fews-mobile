import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export class ChartLine extends Component {
  render() {
    return (
      <View style={{ padding: 16 }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            marginBottom: 12,
          }}
        >
          Monitoring AWLR
        </Text>

        <LineChart
          data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
            datasets: [
              {
                data: [12, 25, 18, 40, 32, 50],
                strokeWidth: 2,
              },
            ],
          }}
          width={Dimensions.get('window').width - 32}
          height={220}
          yAxisSuffix=" cm"
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#f7f7f7',
            backgroundGradientTo: '#efefef',
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            propsForDots: {
              r: '5',
              strokeWidth: '2',
              stroke: '#007AFF',
            },
          }}
          bezier
          style={{
            borderRadius: 12,
          }}
        />
      </View>
    );
  }
}

export default ChartLine;
