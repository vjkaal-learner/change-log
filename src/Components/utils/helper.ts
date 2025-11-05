import { MapProps } from "../Map/Map";

const filterCommitData =(commitData: any) => {
    if(commitData) {
        const list:MapProps[]= [];
        commitData.forEach((item:any) => {
            list.push({date:new Date(item.commit.committer.date).toLocaleDateString(), text:item.commit.message})
        })
        return list;
    }
    return [];
}
export default filterCommitData