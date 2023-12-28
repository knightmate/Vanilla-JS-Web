




const get=(obj,path)=>{

    //for arrray
    //first we find how to split
    const isArray=path.includes('[')?true:false;

    let targets=path.includes("[")?path.split(""):path.split('.');
      if(targets.includes("[")){
        targets=targets.filter((val)=>parseInt(val))
     }
    
     let temp=obj;
      
     targets.forEach(target=> {
       
         temp=temp[target]

     });
     console.log("target",temp,targets);
    

}


export default   function GetObjectFromString(){

    //get({developer:"Software Engineer"},"devloper") //"Software Engineer"

     get({developer:{firstName:"TOm",lastName:"Cruz"}},"developer.lastName") //"Cruz "
     get ([{developer:"tom"},{count:[0,1]}],"[1].count[0]")//o
    // get([{developer:"Tom"},[0,null],"[1][1]"])//null

 



}