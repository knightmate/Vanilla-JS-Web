


function asynFn(){

    let count=0;

    return()=>{
        return new Promise((res,rej)=>{
            
            setTimeout(()=>{
                count=count+1;
                if(count<=5){
                  rej("I'm failed API");

                }else{

                  res("I'm Success API");

                }

            },[]);

        });        
    }
    
    
} 


function retry(apiCall,retriesCountMe,delay,finalMessage){
   
     
    return new Promise((res, rej)=>{
        
         if(retriesCountMe==0){
            rej(finalMessage)
         }

       apiCall().then((result)=>{

         res(result)

       }).catch((fail)=>{

          console.log("Failed-"+fail+retriesCountMe)
        
          setTimeout(()=>{
             
            retry(apiCall,retriesCountMe-1,delay,finalMessage).then(res,rej);

           },delay);

       })

    })

};

 

 
 const retryFun=async ()=>{

    // retry(asynFn(),8, 50,'Failed').then((res)=>{
        
    //     console.log("Success"+res);

    // }).catch((val)=>{
       
    //     console.log("Failed API after all retries-"+val);

    // });

    try {
        const result=await retry(asynFn(),5, 50,'Failed');
        console.log(result);
    } catch (error) {
        console.log(error);

    }

 


    
}

export default retryFun;
