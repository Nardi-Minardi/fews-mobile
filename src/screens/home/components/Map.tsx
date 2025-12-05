import React, { useState, useMemo } from 'react';
import { View, Dimensions, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { Das } from '../../../atoms/dasAtom';
import { Device } from '../../../atoms/deviceAtom';

interface MapCompProps {
  dataDas: Das[];
  devices: Device[];
}

const MapComp: React.FC<MapCompProps> = ({ dataDas, devices }) => {
  const [selectedBlock, setSelectedBlock] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Transform dataDas menjadi format Leaflet
  const polygons = useMemo(
    () =>
      dataDas.map(d => ({
        name: d.name,
        codes: [d.kode_das],
        color: d.color || 'rgba(121,204,30,0.4)',
        coords: d.geom.coordinates.flatMap((poly: any) =>
          poly.map((ring: any) =>
            ring.map((coord: [number, number]) => [coord[1], coord[0]])
          )
        ),
      })),
    [dataDas]
  );

  // Hitung bounds untuk autofokus
  const bounds = useMemo(() => {
    const allPoints: [number, number][] = [];
    polygons.forEach(p =>
      p.coords.forEach(ring => {
        allPoints.push(...ring);
      })
    );
    return allPoints;
  }, [polygons]);

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="initial-scale=1, maximum-scale=1">
      <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
      <style>
        html, body, #map { height: 100%; margin: 0; padding: 0; }
        .leaflet-interactive:focus { outline: none !important; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        document.addEventListener("DOMContentLoaded", function() {
          var map = L.map('map').setView([-6.9, 107.6], 7);
          L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 22 }).addTo(map);

          var polygons = ${JSON.stringify(polygons)};
          var devices = ${JSON.stringify(devices)};

          function drawMulti(polygons) {
            let allPoints = [];
            polygons.forEach(p => {
              p.coords.forEach(ring => {
                const poly = L.polygon(ring, {
                  color: p.color,
                  fillColor: p.color,
                  fillOpacity: 0.4
                }).addTo(map)
                .bindTooltip(p.name);

                poly.on('click', () => {
                  window.ReactNativeWebView.postMessage(JSON.stringify({
                    name: p.name,
                    codes: p.codes
                  }));
                });

                allPoints = allPoints.concat(ring);
              });
            });

            if (allPoints.length > 0) {
              map.fitBounds(allPoints);
            }
          }

          function addDeviceMarkers(devices) {
            devices.forEach(d => {
              if (d.lat && d.long) {
                const tagId = d.device_tag_id && d.device_tag_id.length > 0 ? d.device_tag_id[0] : 1;
                let bgColor = 'blue';
                if(tagId === 1) bgColor = 'blue';
                else if(tagId === 2) bgColor = 'purple';
                else if(tagId === 3) bgColor = 'orange';

                const marker = L.marker([d.lat, d.long], {
                  icon: L.divIcon({
                    html: '<div style="background-color:'+bgColor+'; color:white; width:20px; height:20px; display:flex; justify-content:center; align-items:center; border-radius:12px; font-size:14px; font-weight:bold;">' + tagId + '</div>',
                    className: 'custom-marker-icon',
                    iconSize: [24,24],
                    iconAnchor: [12,12]
                  })
                }).addTo(map)
                .bindTooltip(d.device_name + ' (' + d.das_name + ')');
              }
            });
          }

          drawMulti(polygons);
          addDeviceMarkers(devices);
        });
      </script>
    </body>
    </html>
  `;

  const handleMessage = (event: any) => {
    const data = JSON.parse(event.nativeEvent.data);
    setSelectedBlock(data);
    setModalVisible(true);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* <TphListModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        blockName={selectedBlock?.name}
        tphCodes={selectedBlock?.codes || []}
      /> */}

      {polygons.length === 0 ? (
        <Text>Memuat data…</Text>
      ) : (
        <WebView
          originWhitelist={['*']}
          source={{ html }}
          javaScriptEnabled
          domStorageEnabled
          onMessage={handleMessage}
          style={{ height: Dimensions.get('screen').height }}
        />
      )}
    </View>
  );
};

export default React.memo(MapComp);
