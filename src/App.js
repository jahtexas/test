import React from "react";
import "./styles.css";
import {
  Viewer,
  Entity,
  PointGraphics,
  EntityDescription,
  GeoJsonDataSource,
  ImageryLayer,
  Cesium3DTileset
} from "resium";
import {
  Cartesian3,
  createWorldTerrain,
  ArcGisMapServerImageryProvider,
  IonResource,
  PolylineArrowMaterialProperty,
  Color
} from "cesium";

const terrainProvider = createWorldTerrain();
const position = Cartesian3.fromDegrees(-74.0707383, 40.7117244, 100);
const pointGraphics = { pixelSize: 20 };
const data = {
  type: "Feature",
  properties: {
    name: "Coors Field",
    amenity: "Baseball Stadium",
    popupContent: "This is where the Rockies play!"
  },
  geometry: {
    type: "Point",
    coordinates: [-104.99404, 39.75621]
  }
};

export default function App() {
  let viewer; // This will be raw Cesium's Viewer object.
  const handleReady = (tileset) => {
    if (viewer) {
      viewer.zoomTo(tileset);
    }
  };
  return (
    <div className="App">
      <Viewer
        full
        animation={false}
        timeline={false}
        terrainProvider={terrainProvider}
        ref={(e) => {
          window.viewer = viewer = e && e.cesiumElement;
        }}
      >
        <Entity
          position={position}
          // point={pointGraphics}
          name="Tokyo"
          description="Hello, world."
        >
          <PointGraphics pixelSize={20} />
          <EntityDescription>
            <h1>Hello, world.</h1>
            <p>JSX is available here!</p>
          </EntityDescription>
        </Entity>
        <Entity
          name="arrowx"
          polyline={{
            positions: [new Cartesian3(0, 0, 0), new Cartesian3(1000000, 0, 0)],
            width: 25,
            material: new PolylineArrowMaterialProperty(Color.RED)
          }}
        />
        <Entity
          name="arrowy"
          polyline={{
            positions: [new Cartesian3(0, 0, 0), new Cartesian3(0, 1000000, 0)],
            width: 25,
            material: new PolylineArrowMaterialProperty(Color.GREEN)
          }}
        />
        <Entity
          name="arrowz"
          polyline={{
            positions: [new Cartesian3(0, 0, 0), new Cartesian3(0, 0, 1000000)],
            width: 25,
            material: new PolylineArrowMaterialProperty(Color.BLUE)
          }}
        />
        <GeoJsonDataSource data={data} />
        {/* <Cesium3DTileset
          url={IonResource.fromAssetId(5714)}
          onReady={handleReady}
        /> */}
      </Viewer>
    </div>
  );
}
