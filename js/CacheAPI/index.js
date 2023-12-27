

const fakeAPICall=(URL)=>{
   
 
    return new Promise((res)=>{
        setTimeout(()=>{
            const randomNumber = Math.floor(Math.random() * 10); // This will generate a random number between 0 and 9.
            res(randomNumber)

        },500);
    })
}

//implement cachedAPICall
function cachedAPICall(cacheTime,config){
   
    const cacheResponse=new Map();
    //{data:some, time:new Date().toString()}

    return async(url,obj)=>{
        const key=JSON.stringify(obj);//"API_RESPONSE_CACHE";
        const cacheData=cacheResponse.get(key)
            
        if(!cacheData || Date.now()>cacheData.time){

            const response=await fakeAPICall(url);
            cacheResponse.set(key,{data:response,time:Date.now()+cacheTime})
            return response;
        }
        return cacheData.data;
       

    }

}
  

const call=cachedAPICall(1500);

const callAPI=()=>{

     call('API url',{name:"Meghraj"}).then((res)=>console.log("Response from API call"+res));

}
 


 
const CacheAPICall=()=>{

    callAPI();
    call('API url',{name:"AMU"}).then((res)=>console.log("Response from API call"+res));

    setTimeout(()=>{
        console.log("Calling after 1s--")
        callAPI();
    },800);
    // setTimeout(()=>{
    //     console.log("Calling after 2s--")
    //     callAPI();
    // },3000);

}
 export default CacheAPICall;