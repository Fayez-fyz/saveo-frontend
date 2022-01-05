import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Coordinates from "./components/Coordinates";
import { useEffect, useRef, useState } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import * as ttapi from "@tomtom-international/web-sdk-services";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import Map from "./components/Map";

function App() {
  const mapElement = useRef();
  const [map, setMap] = useState({});
  const [latitude, setLatitude] = useState(21.7679);
  const [longitude, setLongitude] = useState(78.8718);
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [location, setLocation] = useState("");
  const [loc, setLoc] = useState("");
  const [todo,setTodo]=useState([])

  const convertToPoints = (lngLat) => {
    return {
      point: {
        latitude: lngLat.lat,
        longitude: lngLat.lng,
      },
    };
  };

  const drawRoute = (geoJson, map) => {
    if (map.getLayer("route")) {
      map.removeLayer("route");
      map.removeSource("route");
    }
    map.addLayer({
      id: "route",
      type: "line",
      source: {
        type: "geojson",
        data: geoJson,
      },
      paint: {
        "line-color": "#4a90e2",
        "line-width": 6,
      },
    });
  };

  useEffect(() => {
    const origin = {
      lng: longitude,
      lat: latitude,
    };
    const destinations = [];

    const map = tt.map({
      key: process.env.REACT_APP_SAVEO,
      container: mapElement.current,
      center: [longitude, latitude],
      zoom: 3.5,
    });
    setMap(map);
    const addDeliveryMarker = (lngLat, map) => {
      const element = document.createElement("div");
      element.className = "marker-delivery";
      new tt.Marker({
        element: element,
      })
        .setLngLat(lngLat)
        
        .addTo(map);
        
    };
    const addMarker = () => {
      const popupOffset = {
        bottom: [0, -25],
      };
      const popup = new tt.Popup({ offset: popupOffset }).setHTML(
        "This is you!"
      );
      const element = document.createElement("div");
      element.className = "marker";

      const marker = new tt.Marker({
        draggable: true,
        element: element,
      })
        .setLngLat([longitude, latitude])
        .addTo(map);

      marker.on("dragend", () => {
        const lngLat = marker.getLngLat();
        setLongitude(lngLat.lng);
        setLatitude(lngLat.lat);
      });

      marker.setPopup(popup).togglePopup();
    };
    addMarker();

    const sortDestinations = (locations) => {
      const pointsForDestinations = locations.map((destination) => {
        return convertToPoints(destination);
      });
      const callParameters = {
        key: process.env.REACT_APP_SAVEO,
        destinations: pointsForDestinations,
        origins: [convertToPoints(origin)],
      };

      return new Promise((resolve, reject) => {
        ttapi.services
          .matrixRouting(callParameters)
          .then((matrixAPIResults) => {
            const results = matrixAPIResults.matrix[0];
            const resultsArray = results.map((result, index) => {
              return {
                location: locations[index],
                drivingtime: result.response.routeSummary.travelTimeInSeconds,
              };
            });
            resultsArray.sort((a, b) => {
              return a.drivingtime - b.drivingtime;
            });
            const sortedLocations = resultsArray.map((result) => {
              return result.location;
            });
            resolve(sortedLocations);
          });
      });
    };

    const recalculateRoutes = () => {
      sortDestinations(destinations).then((sorted) => {
        sorted.unshift(origin);

        ttapi.services
          .calculateRoute({
            key: process.env.REACT_APP_SAVEO,
            locations: sorted,
          })
          .then((routeData) => {
            const geoJson = routeData.toGeoJson();
            drawRoute(geoJson, map);
          });
      });
    };

    map.on("click", (e) => {
      destinations.push(e.lngLat);
      addDeliveryMarker(e.lngLat, map);
      
      recalculateRoutes();
    });

    return () => map.remove();
  }, [longitude, latitude]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodo([...todo , {loc:loc, lat:lat, long:long}])
    setLatitude(lat)
    setLongitude(long)
    setLoc('')
    setLat('')
    setLong('')
  };

  return (
    <div className="w-100">
      <div className="row">
        <div className="col-lg-12">
          <Header
            lat={lat}
            long={long}
            loc={loc}
            todo={todo}
            setTodo={setTodo}
            setLat={setLat}
            setLong={setLong}
            setLoc={setLoc}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 ">
          <Coordinates
            latitude={latitude}
            longitude={longitude}
            location={location}
            todo={todo}
            setTodo={setTodo}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
            setLocation={setLocation}
            data ='list'
          />
        </div>
        <div className="col-lg-6">
          {/* <div ref={mapElement}>

           </div> */}
          <Map mapElement={mapElement} />
        </div>
      </div>
    </div>
  );
}

export default App;
