import {MapProps} from "../Map/Map";
import { showAlert } from './alert'
const getMessageValue = (item: { commit: { message: string; }; }) => {
  if(!item?.commit?.message) {
    showAlert("Could not find commit or its message", "error");
    return '';
  }
  return item.commit.message;
}

const getDateValue = (item: { commit: { committer: { date: any; }; }; }) => {
  if ( !item?.commit?.committer?.date ) {
    showAlert("Could not find commit or its date", "error");
    return '';
  }
  return new Date(item.commit.committer.date).toLocaleDateString();
}

const filterCommitData =(commitData: any) => {
  if(commitData) {
    const list:MapProps[]= [];
    commitData.forEach((item:any) => {
      list.push(
        {
          date: getDateValue(item),
          text: getMessageValue(item)
        }
      )
    })
    return list;
  }
  return [];
}

const extractRepo = (pathname: string) => {
  const repo_parts = pathname.split('/').filter(Boolean);
  return repo_parts[1];
}

export {
  filterCommitData,
  extractRepo,
  getMessageValue,
  getDateValue,
}