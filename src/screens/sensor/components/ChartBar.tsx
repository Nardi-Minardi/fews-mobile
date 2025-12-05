import React from "react";
import { View, Text, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const ChartBar = () => {
  const data = {
    labels: ["08", "09", "10", "11", "12", "13"],
    datasets: [
      {
        data: [30, 45, 55, 70, 65, 90],
      },
    ],
  };

  return (
    <View style={{ padding: 20 }}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        Monitoring ARR
      </Text>

      <BarChart
        data={data}
        width={screenWidth - 40}
        height={260}
        fromZero={true}
        showValuesOnTopOfBars={true}
        yAxisLabel=""
        yAxisSuffix=" cm"
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#eef2ff",
          backgroundGradientTo: "#c7d2fe",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
          labelColor: () => "#374151",
          barPercentage: 0.6,
        }}
        style={{
          borderRadius: 12,
        }}
      />
    </View>
  );
};

export default ChartBar;
