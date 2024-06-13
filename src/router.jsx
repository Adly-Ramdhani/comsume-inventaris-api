import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Profile from "./pages/profile";
import Dashboard from "./pages/Dashboard";
import Stuff from "./pages/Stuff";
import TrashStuff from "./pages/TrashStuff";
import Inbound from "./pages/Inbound";
import InboundCreate from "./components/inbound/ModalAdd";
import Lending from "./pages/Lending";
import LendingStuff from "./pages/LendingStuff"
import User from "./pages/Users";
import TrashUser from "./pages/TrashUser";
import Restoration from "./pages/Restoration";

export const router = createBrowserRouter([
    { path: '/', element: <App/> },
    { path: '/login', element: <Login/> },
    { path: '/profile', element: <Profile/> },
    { path: '/dashboard', element: <Dashboard/> },
    { path: '/stuff', element: <Stuff/> },
    { path: '/stuff/trash', element: <TrashStuff/> }, 
    { path: '/inbound-stuffs', element: <Inbound/>},
    { path: '/inbound/create', element: <InboundCreate/>},
    { path: '/Lending', element: <Lending/>},
    { path: '/user', element: <User/>},
    { path: '/user/trash', element: <TrashUser/> },
    { path: '/Lending/stuff', element: <LendingStuff/>},
    { path: '/restoration', element: <Restoration /> } 

]);
