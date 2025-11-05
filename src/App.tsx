import React, {useEffect, useState} from 'react';
import './App.css';
import {Header} from "./Components/Header/Header";
import {MapComponent} from "./Components/Map/Map";
import {USER} from "./Components/utils/constants";
import filterCommitData from "./Components/utils/helper";

function App() {
  const [itemsList, setItemsList] = useState([
      { date: '2025-11-04', text: 'First log entry' },
      { date: '2025-11-05', text: 'Second log entry' },
  ]);

  const [repos, setRepos] = React.useState<any>([]);
  const [commitData, setCommitData] = React.useState<any>([]);


  useEffect(() => {
      const url = `https://api.github.com/users/${USER}/repos`;
      console.log(url);
      fetch(url, {
          headers: {
              Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
          }})
          .then(res => res.json())
          .then(data => setRepos(data));
  }, []);

  useEffect(() => {
      if(repos.length > 0) {
          console.log('vanshaj repos: ', repos);
          fetch(`https://api.github.com/repos/${USER}/${repos[0].name}/commits?sha=master&per_page=10&page=1`, {
              headers: {
                  Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
              },
          })
              .then(res => res.json())
              .then(data => setCommitData(filterCommitData(data)));
      }
  }, [repos]);

  useEffect(() => {
      if(commitData.length > 0) {
          console.log('vanshaj commitData: ', commitData);
          setItemsList(commitData);
      }
  }, [commitData]);

  return (
    <div className="App">
      <Header />
      <MapComponent items={itemsList} />
    </div>
  );
}

export default App;
