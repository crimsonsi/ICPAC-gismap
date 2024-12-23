import React, { useEffect, useRef } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import TileWMS from "ol/source/TileWMS";
import { fromLonLat } from "ol/proj";

const MapComponent = ({ selectedYear, selectedMonth, selectedTenDays }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const wmsSource = new TileWMS({
      url: "https://droughtwatch.icpac.net/mapserver/",
      params: {
        LAYERS: "dekadal_cdi_chirps",
        FORMAT: "image/png",
        TRANSPARENT: true,
        SERVICE: "WMS",
        VERSION: "1.1.1",
        REQUEST: "GetMap",
        SRS: "EPSG:4326",
        BBOX: "29.5,-11.5,51.5,23.5",
        SELECTED_YEAR: selectedYear,
        SELECTED_DMONTH: selectedMonth,
        SELECTED_TENDAYS: selectedTenDays,
      },
      serverType: "geoserver",
    });

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new TileLayer({
          source: wmsSource,
        }),
      ],
      view: new View({
        center: fromLonLat([36.8219, -1.2921]),
        zoom: 4,
      }),
    });

    return () => map.setTarget(null);
  }, [selectedYear, selectedMonth, selectedTenDays]);

  return (
    <div
      style={{
        margin: "20px",
        padding: "20px",
        backgroundColor: "#f5f5f5",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "400px",
          borderRadius: "8px",
          overflow: "hidden",
          border: "2px solid #ddd",
          backgroundColor: "#fff",
        }}
      ></div>
    </div>
  );
};

export default MapComponent;
