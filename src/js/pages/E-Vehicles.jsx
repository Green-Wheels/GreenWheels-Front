import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "../components/E-VehicleDetails";
import EFahrzeugModal from "../features/EFahrzeugModal.jsx";

// eine Hilfsfunktion aggregateVehicleData, die die Fahrzeugdaten basierend auf den Fahrzeugmodellen gruppiert:

function aggregateVehicleData(vehicles, vehicleCounts) {
  const aggregatedVehicles = {};

  vehicles.forEach((vehicle) => {
    const vehicleKey = `${vehicle.name}-${vehicle.type}-${vehicle.driveRange}-${vehicle.price}-${vehicle.chargingTime}`;

    if (!aggregatedVehicles[vehicleKey]) {
      aggregatedVehicles[vehicleKey] = {
        ...vehicle,
        count: 0,
        _id: vehicle._id,
      };
    }

    if (vehicleCounts[vehicle._id] !== undefined) {
      aggregatedVehicles[vehicleKey].count += vehicleCounts[vehicle._id];
    }
  });

  return Object.values(aggregatedVehicles);
}

function EVehicles() {
  const [vehicleCounts, setVehicleCounts] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [carDetails, setCarDetails] = useState({});
  const [cars, setCars] = useState([]);

  const [typeFilter, setTypeFilter] = useState("");
  const [minPriceFilter, setMinPriceFilter] = useState("");
  const [maxPriceFilter, setMaxPriceFilter] = useState("");
  const [minDriveRangeFilter, setMinDriveRangeFilter] = useState("");
  const [maxDriveRangeFilter, setMaxDriveRangeFilter] = useState("");

  const navigate = useNavigate();

  const sortByPrice = (ascending = true) => {
    const sortedVehicles = [...cars].sort((a, b) => {
      return ascending ? a.price - b.price : b.price - a.price;
    });
    setCars(sortedVehicles);
  }

  const sortByName = (ascending = true) => {
    const sortedVehicles = [...cars].sort((a, b) => {
      return ascending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    });
    setCars(sortedVehicles);
  }
  function closeModle() {
    setCarDetails({})
    setShowModal(false)
  }
  async function fetchVehicles() {
    try {
      const queryParams = new URLSearchParams();

      if (typeFilter) {
        queryParams.append("type", typeFilter);
      }
      if (minPriceFilter) {
        queryParams.append("minPrice", minPriceFilter);
      }
      if (maxPriceFilter) {
        queryParams.append("maxPrice", maxPriceFilter);
      }
      if (minDriveRangeFilter) {
        queryParams.append("minDriveRange", minDriveRangeFilter);
      }
      if (maxDriveRangeFilter) {
        queryParams.append("maxDriveRange", maxDriveRangeFilter);
      }

      const response = await axios.get(
        "https://g5-greenwheels-backend-2ilc.onrender.com/vehicles?" + queryParams.toString()
      );
      const aggregatedVehicles = aggregateVehicleData(
        response.data,
        vehicleCounts
      );
      setCars(aggregatedVehicles);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  }
  //Fahrzeugzahlen vom Backend abrufen
  async function fetchVehicleCounts() {
    try {
      const response = await axios.get(
        "https://g5-greenwheels-backend-2ilc.onrender.com/api/vehicleCounts"
      );
      setVehicleCounts(response.data);
    } catch (error) {
      console.error("Error fetching vehicle counts:", error);
    }
  }
  function handleShowModle(carDetails) {
    setCarDetails(carDetails);
    setShowModal(true);
  }

  useEffect(() => {
    fetchVehicles();
    fetchVehicleCounts();
  }, [
    typeFilter,
    minPriceFilter,
    maxPriceFilter,
    minDriveRangeFilter,
    maxDriveRangeFilter,
  ]);

  return (
    <>
      <div className="flex justify-center  items-center   h-fit md:min-h-screen  md:flex flex-wrap pt-24 pb-10">
        <button className="m-auto  tracking-wider  md:mt-0 rounded-sm  shadow-md dark:shadow-sm shadow-gray-400 bg-green-600 p-3 px-6 font-base  text-gray-200 hover:bg-green-500  " onClick={() => sortByPrice(true)}>Sortieren nach Preis aufsteigend</button>
        <button className=" m-auto  tracking-wider  md:mt-0 rounded-sm  shadow-md dark:shadow-sm shadow-gray-400 bg-green-600 p-3 px-6 font-base  text-gray-200 hover:bg-green-500  " onClick={() => sortByPrice(false)}> Sortieren nach Preis absteigend </button>

        <button className=" m-auto  tracking-wider  md:mt-0 rounded-sm  shadow-md dark:shadow-sm shadow-gray-400 bg-green-600 gap-1 p-3 px-6 font-base  text-gray-200 hover:bg-green-500  " onClick={() => sortByName(true)}>Sortieren nach Name A-Z</button>
        <button className=" m-auto  tracking-wider  md:mt-0 rounded-sm  shadow-md dark:shadow-sm shadow-gray-400 bg-green-600 p-3 px-6 font-base  text-gray-200 hover:bg-green-500  " onClick={() => sortByName(false)}>Sortieren nach Name Z-A</button>

        <div className="flex flex-col pt-24">
          <section className="text-green-700 w-1/2">            

            <p>
              <strong>Auswahl eines Fahrzeugs:</strong> Die Webseite zeigt Ihnen verschiedene Elektrofahrzeuge mit Name und Preis pro Stunde an. Sie können die Liste nach dem Namen (A-Z oder Z-A) oder Preis (aufsteigend oder absteigend) sortieren, um die Auswahl zu erleichtern.

            </p>
            <p>
              <strong>Anzeigen von Fahrzeugdetails:</strong> Klicken Sie auf das Bild eines Fahrzeugs, um mehr Details anzuzeigen. Eine Popup-Seite wird geöffnet, die zusätzliche Informationen wie Reichweite, Ladezeit, Gewicht und die verfügbare Menge zeigt.

            </p>
            <p>
              <strong>Buchungszeitraum auswählen:</strong> Auf der Detailseite können Sie Ihren gewünschten Buchungszeitraum auswählen. Geben Sie das Startdatum und die Startzeit sowie das Enddatum und die Endzeit Ihrer Buchung ein.

            </p>
            <p>
              <strong>Buchung durchführen: </strong> Nachdem Sie den gewünschten Zeitraum ausgewählt haben, können Sie auf die Schaltfläche "Buchen" klicken, um das Fahrzeug für den ausgewählten Zeitraum zu reservieren.

            </p>
          </section>

        </div>

        {cars.map((car) => (
          <div
            key={car._id}
            className=" mt-24 md:mt-20"
            onClick={() => handleShowModle(car)}
          >
            <Card
              imageUrls={car.imageUrls}
              name={car.name}
              price={car.price}
              vehicleId={car._id}

            />
          </div>
        ))}
      </div>
      {showModal && (
        <EFahrzeugModal
          imageUrls={carDetails.imageUrls}
          name={carDetails.name}
          type={carDetails.type}
          driveRange={carDetails.driveRange}
          price={carDetails.price}
          chargingTime={carDetails.chargingTime}
          weight={carDetails.weight}
          vehicleId={carDetails._id}
          quantity={carDetails.quantity}
          closeModle={closeModle}
        />
      )}</>
  );
}
/* Dies ist eine funktionskomponente, die für jedes Fahrzeug-Objekt in der als Prop übergebenen Array von Fahrzeugen eine Karte rendert. Die Karte zeigt das Fahrzeugbild, den Namen und den Preis an. Die Komponente hat auch einen onClick-Ereignishandler, der die Funktion handleShowModle mit der ID des Fahrzeugs als Argument aufruft, wenn die Karte geklickt wird. Dies ist wahrscheinlich verwendet, um ein Modal oder andere UI-Element anzuzeigen, das Informationen über das Fahrzeug anzeigt.
 */
export default EVehicles;
