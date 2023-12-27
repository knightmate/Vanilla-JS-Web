

const fakeAPICall=(URL)=>{
   
 
    return new Promise((res)=>{
        setTimeout(()=>{
            const randomNumber = Math.floor(Math.random() * 10); // This will generate a random number between 0 and 9.
            res(randomNumber)

        },500);
    })
}

//implement cachedAPICall
function cachedAPICall(cacheTime){
   
    const cacheResponse=new Map();
    const key="API_RESPONSE_CACHE";
   //{data:some, time:new Date().toString()}

    return (url,obj)=>{

       return new Promise((res,rej)=>{

        const cacheData=cacheResponse.get(key)||null;
        const isCacheValid= cacheData && cacheData.time?Date.now()-cacheData.time<cacheTime?true:false:false;
           
         if(isCacheValid){
            //validate cache time
        //if valid return the same else call again and cache
          return res(cacheData.data)
        }
        fakeAPICall(url).then((result)=>{
            //save api response into map

            cacheResponse.set(key,{data:result,time:Date.now()})
             
            res(result)
        });

       })

    }

}
  

const call=cachedAPICall(1500);

const callAPI=()=>{

     call('API url',{}).then((res)=>console.log("Response from API call"+res));

}
 


 
const CacheAPICall=()=>{

    callAPI();
    setTimeout(()=>{
        console.log("Calling after 1s--")
        callAPI();
    },800);
    setTimeout(()=>{
        console.log("Calling after 2s--")
        callAPI();
    },3000);

}
 export default CacheAPICall;