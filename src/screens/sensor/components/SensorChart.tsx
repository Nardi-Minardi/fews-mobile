

import React, { useMemo } from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import { VictoryAxis, VictoryChart, VictoryLine, VictoryScatter, VictoryTheme } from 'victory-native';
import moment from 'moment';
import type { SensorItem } from '../../../hooks/useSensors';

interface SensorChartProps {
  title?: string;
  readings: SensorItem[];
  unit?: string;
}

const SensorChart: React.FC<SensorChartProps> = ({ title = 'Monitoring', readings, unit }) => {
  const points = useMemo(() => {
    const valid = readings
      .filter(r => !!r.last_sending_data && Number.isFinite(Number(r.value)))
      .map(r => ({ x: new Date(r.last_sending_data as string), y: Number(r.value) }))
      .sort((a, b) => a.x.getTime() - b.x.getTime());
    if (!valid.length) return { data: [], domainX: [new Date(), new Date()] as [Date, Date] };
    const latest = valid[valid.length - 1].x;
    const start = moment(latest).startOf('day').toDate();
    const end = moment(start).add(24, 'hours').toDate();
    const sameDay = valid.filter(p => p.x >= start && p.x < end);
    return { data: sameDay, domainX: [start, end] as [Date, Date] };
  }, [readings]);

  const w = Dimensions.get('window').width - 32;
  const baseWidth = Math.max(160, Number.isFinite(w) ? w : 320);
  const minPxPerHour = 48;
  const chartWidth = Math.max(baseWidth, 24 * minPxPerHour);
  const hasData = points.data.length > 0;

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 12 }}>{title}</Text>
      {!hasData ? (
        <View style={{ padding: 16, backgroundColor: '#fff', borderRadius: 12 }}>
          <Text style={{ color: '#666' }}>Tidak ada data untuk ditampilkan</Text>
        </View>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <VictoryChart
            theme={VictoryTheme.material}
            width={chartWidth}
            height={260}
            domain={{ x: points.domainX }}
            padding={{ top: 20, bottom: 60, left: 60, right: 20 }}
          >
            <VictoryAxis
              tickFormat={(t) => moment(t).format('HH:mm')}
              fixLabelOverlap
              style={{ tickLabels: { angle: 45, fontSize: 10, padding: 20 } }}
            />
            <VictoryAxis dependentAxis tickFormat={(t) => `${t}${unit ? ` ${unit}` : ''}`} />
            <VictoryLine data={points.data} interpolation="monotoneX" style={{ data: { stroke: '#007AFF', strokeWidth: 2 } }} />
            <VictoryScatter data={points.data} size={3} style={{ data: { fill: '#007AFF' } }} />
          </VictoryChart>
        </ScrollView>
      )}
    </View>
  );
};

export default SensorChart;
