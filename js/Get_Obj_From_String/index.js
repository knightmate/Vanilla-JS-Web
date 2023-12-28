 

function splitStringToArray(inputString) {
    return inputString.replace(/\[/g, '.').replace(/\]/g, '').split('.');
}
 

const get=(obj,path)=>{

    //for arrray
    //first we find how to split
 
     
    let targets=splitStringToArray(path)
 
     
     
     let temp=obj;
      
     targets.forEach(target=> {
       

        if(  target!==""){
             
            temp=temp[target]
        }
 
     });

     console.log(temp,targets)
 
}


export default   function GetObjectFromString(){

     get({developer:"Software Engineer"},"developer") //"Software Engineer"
     get({developer:{firstName:"TOm",lastName:"Cruz"}},"developer.lastName") //"Cruz "
     get([{developer:"tom"},{count:[0,1]}],"[1].count[0]")//o
     get([{developer:"Tom"},[0,null]],"[1][1]")//null
      
  



}