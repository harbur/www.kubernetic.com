import React from 'react';
import './App.css';
import HeroBanner from './components/HeroBanner';
import BirdsEye from './components/features/BirdsEye';
import RealTimeUpdates from './components/features/RealTimeUpdates';
import MultiCluster from './components/features/MultiCluster';
import ManageNamespaces from './components/features/ManageNamespaces';
import DashboardView from './components/features/DashboardView';
import NativeKubernetes from './components/features/NativeKubernetes';
import ChartRepositories from './components/features/ChartRepositories';
import PricingTable from './components/PricingTable';
import Footers from './components/Footer';

function App() {
  return (
    <div className="main">
      <HeroBanner/>
      <BirdsEye/>
      <RealTimeUpdates/>
      <MultiCluster/>
      <ManageNamespaces/>
      <DashboardView/>
      <NativeKubernetes/>
      <ChartRepositories/>
      <PricingTable/>
      <Footers/>
    </div>
  );
}

export default App;
