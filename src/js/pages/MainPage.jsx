import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Typewriter from "../features/typeWriterEffect";

function MainPage() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const introText =
    " Entdecken Sie mit uns die Zukunft der Mobilität - einfach, bequem und umweltbewusst. Buchen Sie Ihre nächste Fahrt mit unseren Elektrofahrzeugen und tragen Sie dazu bei, unseren Planeten zu schonen und die Lebensqualität in unseren Städten zu verbessern. Machen Sie den ersten Schritt in eine nachhaltige Zukunft und erleben Sie Mobilität neu !";
  useEffect(() => {
    fetch("https://g5-greenwheels-backend-2ilc.onrender.com/vehicles")
      .then((response) => response.json())
      .then((data) => setVehicles(data))
      .catch((error) => console.error(error));
  }, []);
  const handletovehicle = () => {
    navigate("/e-vehicles");
  };
  return (

    <div className='pt-20 h-[95vh]'>
      <div className="flex justify-between border-2 border-t-green-500 h-[40vh] md:h-[20vh] lg:h-[25vh] xl:h-[40vh]"
        style={{
          backgroundImage: "url('/images/Stay Eco with our Vehicles.png')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      <div className='w-11/12 lg:w-3/4 flex lg:max-h-full flex-col   text-center  mt-6 md:mt-10 mb-2'>
        <h1 className="text-4xl md:text-6xl  text-green-600 dark:text-green-500">Green <span className='text-gray-600 dark:text-gray-500'>Wheels</span> </h1>
        <Typewriter text={introText} />

        <button onClick={handletovehicle}
          className="w-fit m-auto  tracking-wider  md:mt-0
                     rounded-xl  shadow-md dark:shadow-sm shadow-gray-400   bg-green-600 p-3 px-6 font-base  text-gray-200 hover:bg-green-500  "
          type="button"
        >
          zu unseren Fahrzeuge

        </button>



      </div>




      <div>
        <h1 className='text-center pt-20 font-semibold text-2xl'>Alle Fragen zu Elektro-Fahrzeugen - E einfach erklärt:</h1>
      </div>

      <div className='flex w-10/12 pb-5'>
        <img className='w-1/3 h-1/2 p-10' src="/images/GreenWheels.png" alt="" />

        
        <div className='p-5 px-20 font-semibold'>
          <h1 className='text-green-500  text-3xl'>Gewohnter Fahrspaß, neue Möglichkeiten. Entdecken Sie Elektromobilität mit</h1>
            <h1 className="text-6xl pb-5 text-green-600">Green <span className='text-gray-600'>Wheels</span> </h1>
          

          Elektromobilität mag für einige ein neues und anfangs vielleicht verunsicherndes Thema sein, in der Realität ist es jedoch wesentlich einfacher als gedacht. Wir liefern Ihnen alle Informationen zu den wichtigsten Fragen rund um Elektromobilität, damit Sie sich für Ihre nächste Fahrt in einem unserer vollelektrischen Premium-Fahrzeuge vollkommen sicher und ideal vorbereitet fühlen. In unseren FAQs finden Sie Antworten auf folgende Fragen:

          <li className='pt-5'>Wie lade ich ein Elektroauto?</li>
          <li>                    Green-Wheels-Richtlinien für das Laden bei Abholung und Rückgabe
          </li>
          <li>                    Wo kann ich ein E-Fahrzeug aufladen?
          </li>
          <li>                    Wie viel kostet das Aufladen?
          </li>
          <li>                    Wie weit kommt man mit einer voll aufgeladenen Batterie?
          </li>
          <li>                    So sparen Geschäftskunden mit Elektroautos Steuern
          </li>
          <li>                    Weitere Rabatte & Vorteile mit Elektrofahrzeugen für Geschäftskunden
          </li>
        </div>
      </div>



    </div>
  );
}
export default MainPage;
