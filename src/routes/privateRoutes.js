import { Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Account from "../pages/MyAccount";
import Practice from "../pages/MyPractices";
import FlashAnzan from "../pages/FlashAnzan";
import FlashAnzanStart from "../pages/FlashAnzanStart";
import FlashCards from "../pages/FlashCards";
import MentalArithmetic from "../pages/MentalArithmetic";
import MentalCalculation from "../pages/MentalCalculation";
import SpeadDrill from "../pages/SpeadDrill";
import SpeadDrillStart from "../pages/SpeadDrillStart";
import Quizzes from "../pages/Quizzes";
import Competition from "../pages/Competition";
import Abacus from "../pages/Abacus";
import Students from "../pages/MyStudents";
import Logout from "../pages/Logout";


const privateRoutes = [
    <Route path="/Dashboard" element={<Dashboard />} />,
    <Route path="/my-account" element={<Account />} />,
    <Route path="/Logout" element={<Logout />} />,
    <Route path="/my-practices" element={<Practice />} />,
    <Route path="/FlashAnzan" element={<FlashAnzan />} />,
    <Route path="/FlashAnzanStart" element={<FlashAnzanStart />} />,
    <Route path="/FlashCards" element={<FlashCards />} />,
    <Route path="/MentalArithmetic" element={<MentalArithmetic />} />,
    <Route path="/MentalCalculation" element={<MentalCalculation />} />,
    <Route path="/SpeadDrill" element={<SpeadDrill />} />,
    <Route path="/SpeadDrillStart" element={<SpeadDrillStart />} />,
    <Route path="/quizzes" element={<Quizzes />} />,
    <Route path="/competition" element={<Competition />} />,
    <Route path="/abacus" element={<Abacus type={0} />} />,
    <Route path="/my-students" element={<Students />} />

];

export default privateRoutes;