import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import withProtectedPage from '../withProtectedPage';
import { Link , useNavigate} from "react-router-dom";
import { MdOutlineShutterSpeed, MdFlashOn, MdFlashAuto } from "react-icons/md";
import { ImCalculator } from "react-icons/im";
import { TbMathSymbols } from "react-icons/tb";





const Practice = () => {
  return (
    <div className="dashboard">
    <div className="SideMenu">
    <Sidebar />
    </div>
    <div className="dashboard__content">
    <div className="db_content">
    <h2>My Practices</h2>
    <div className="sep"></div>

    <div className="flex-start flex-wrap">

    <Link to="/SpeadDrill" replace>
    <div className="card">
      <div className="card-header purple-bg">
      Speed Drill
      </div>
      <div className="card-body">
        <div className="card-content">
          <div className="card-percentage">
      

          <MdOutlineShutterSpeed className="purple-bg-color" />

         
          <span className="card-text">Practice Now</span>

         </div>
        
        </div>
      </div>
    </div>
    </Link>

    <Link to="/MentalCalculation" replace>
    <div className="card">
      <div className="card-header green-bg">
      Mental Calculation
      </div>
      <div className="card-body">
        <div className="card-content">
          <div className="card-percentage">
          <ImCalculator  className="green-bg-color"/>

          <span className="card-text">Practice Now</span>

         </div>
        
        </div>
      </div>
    </div>
    </Link>

 

    <Link to="/FlashCards" replace>
    <div className="card">
      <div className="card-header red-bg">
      Flash Cards
      </div>
      <div className="card-body">
        <div className="card-content">
          <div className="card-percentage">
          <MdFlashOn className="red-bg-color"/>

          <span className="card-text">Practice Now</span>

         </div>
        
        </div>
      </div>
    </div>
    </Link>

    <Link to="/FlashAnzan" replace>
    <div className="card">
      <div className="card-header orange-bg">
      Flash Anzan
      </div>
      <div className="card-body">
        <div className="card-content">
          <div className="card-percentage">
          <MdFlashAuto className="orange-bg-color"/>

            <span className="card-text">Practice Now</span>
         </div>
        
        </div>
      </div>
    </div>
    </Link>

    


  
    </div>

   



  </div>
     
    </div>
  </div>
  );
};

export default withProtectedPage(Practice);