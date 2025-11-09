import React, {Dispatch, SetStateAction} from "react";
import {extractRepo, filterCommitData} from "./helper";
import {STATIC_COMMIT_STRING, STATICURL, USER} from "./constants";
import {MapProps} from "../Map/Map";

const setRepoName = (
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

const setRepoData = (
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

const setCommit = (
  commitData: MapProps[],
  setItemsList: React.Dispatch<React.SetStateAction<MapProps[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if(commitData.length > 0) {
    // console.log('vanshaj commitData: ', commitData);
    setItemsList(commitData);
    setLoading(false);
  }
}


export {
  setRepoName,
  setRepoData,
  setCommit
}