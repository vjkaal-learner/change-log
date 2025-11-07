import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {useLocation} from 'react-router';
import './App.css';
import {Header} from "./Components/Header/Header";
import {MapComponent, MapProps} from "./Components/Map/Map";
import {STATIC_COMMIT_STRING, STATICURL, USER} from "./Components/utils/constants";
import {filterCommitData, extractRepo} from "./Components/utils/helper";

export const setRepoName = (
  location: any,
  setRepo: React.Dispatch<React.SetStateAction<string>>,
) => {
  if(location.pathname !== '/') {
    // console.table(location);
    // console.log(location.pathname);
    setRepo(extractRepo(location?.pathname));
  }
  else {
    const url = `https://api.github.com/users/${USER}/repos`;
    fetch(url, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      }})
      .then(res => res.json())
      .then(data => setRepo(data[0].name));
  }
}

export const setRepoData = (
  repo: string,
  setCommitData: Dispatch<SetStateAction<MapProps[]>>
) => {
  if(repo) {
    // console.table(repo);
    const url = `${STATICURL}/${USER}/${repo}/${STATIC_COMMIT_STRING}`;
    fetch(url, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    })
      .then(res => res.json())
      .then(data => setCommitData(filterCommitData(data)));
  }
}

export const setCommit = (
  commitData: MapProps[],
  setItemsList: React.Dispatch<React.SetStateAction<MapProps[]>>,
) => {
  if(commitData.length > 0) {
    // console.log('vanshaj commitData: ', commitData);
    setItemsList(commitData);
  }
}

function App() {
  const [itemsList, setItemsList] = useState([
      { date: '2025-11-04', text: 'First log entry' },
      { date: '2025-11-05', text: 'Second log entry' },
  ]);

  const location = useLocation();

  const [repo, setRepo] = React.useState<any>();
  const [commitData, setCommitData] = React.useState<any>([]);

  useEffect(() => {
    setRepoName(location, setRepo);
  }, [location]);

  useEffect(() => {
    setRepoData(repo, setCommitData);
  }, [repo]);

  useEffect(() => {
    setCommit(commitData, setItemsList);
  }, [commitData]);

  // TODO: Add skeleton for loading in Map Component
  return (
    <div className="App">
      <Header />
      <MapComponent items={itemsList} />
    </div>
  );
}

export default App;
