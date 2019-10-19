import React from "react";
import "./App.css";
import HeroBanner from "./components/HeroBanner";
import BirdsEye from "./components/features/BirdsEye";
import RealTimeUpdates from "./components/features/RealTimeUpdates";
import MultiCluster from "./components/features/MultiCluster";
import ManageNamespaces from "./components/features/ManageNamespaces";
import DashboardView from "./components/features/DashboardView";
import NativeKubernetes from "./components/features/NativeKubernetes";
import ChartRepositories from "./components/features/ChartRepositories";
import PricingTable from "./components/PricingTable";
import Footer from "./components/Footer";
import ReactGA from "react-ga";
import HttpsRedirect from "react-https-redirect";
import { BrowserRouter as Router } from "react-router-dom";
import { Link } from "react-router-dom";

ReactGA.initialize("UA-11756963-5");
ReactGA.pageview(window.location.pathname + window.location.search);

function App() {
  return (
    <HttpsRedirect>
      <Router>
        <HeroBanner />
        <BirdsEye />
        <RealTimeUpdates />
        <MultiCluster />
        <ManageNamespaces />
        <DashboardView />
        <NativeKubernetes />
        <ChartRepositories />
        <PricingTable />
        <Footer />
      </Router>
    </HttpsRedirect>
  );
}

export default App;
