import React, { useEffect, useState } from 'react';
import {useLocation} from 'react-router';
import './App.css';
import {Header} from "./Components/Header/Header";
import {MapComponent, MapProps} from "./Components/Map/Map";
import { setRepoName, setRepoData, setCommit } from "./Components/utils/DataRendererHelper";
function App() {
  const [itemsList, setItemsList] = useState<MapProps[]>([]);

  const location = useLocation();

  const [repo, setRepo] = React.useState<any>();
  const [commitData, setCommitData] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setLoading(true);
    setRepoName(location, setRepo);
  }, [location]);

  useEffect(() => {
    setRepoData(repo, setCommitData);
  }, [repo]);

  useEffect(() => {
    setCommit(commitData, setItemsList, setLoading);
  }, [commitData]);
  // console.log('loading ', loading);

  // TODO: Add skeleton for loading in Map Component
  return (
    <div className="App">
      <Header />
      <MapComponent items={itemsList} loading={loading} />
    </div>
  );
}

export default App;
