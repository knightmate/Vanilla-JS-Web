


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

  
//     const recursiveTry=(promise,retryCount,delay,finalMessage)=>{

//           if(retryCount==0){
             
//          return Promise.reject(finalMessage);
//         }

//     return new Promise((res,rej)=>{
//         setTimeout(()=>{
//             promise().then((val)=>{
               
//               //resolve
//                 res(val);
  
//             }).catch((val)=>{
//                recursiveTry(promise,retryCount-1,delay,finalMessage).then((val)=>{
//                  res(val)
//                }).catch((val)=>{
//                console.log("Attemp"+retryCount+"--"+val)
//                rej(val)
//               });
   
//             })
//            },delay)
   
//     })
     
  
//  }
const recursiveTry = (promise, retryCount, delay, finalMessage) => {
   
    if (retry === 0) {
        return Promise.reject(finalMessage);
    }
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            promise().then((val)=>{
               
              //resolve
                res(val);
  
            }).catch((val)=>{
                console.log("Attempt " + (retriesCountMe - retryCount + 1) + " -- " + val);
               recursiveTry(promise,retryCount-1,delay,finalMessage).then((val)=>{
                 res(val)
               }).catch((val)=>{
               console.log("Attemp"+retryCount+"--"+val)
               rej(val)
              });
   
            })
           },delay)

        })}
 
    const asynCall=apiCall();
      
//    return new Promise((res,rej)=>{

//     asynCall().then((val)=>{
       
//         res(val);

//     }).catch((val)=>{

//         console.log("Attempt 1"+retriesCountMe)

//         recursiveTry(asynCall,retriesCountMe-1,delay,finalMessage).then((val)=>{
//         console.log("Done");
//         res(val);
//        }).catch((val)=>{
//          rej(val)
//        })
//     });






//    })
return new Promise((res, rej) => {
    asynCall().then(val => {
        res(val);
    }).catch(val => {
        console.log("Attempt 1: " + val);
        recursiveTry(asynCall, retriesCountMe - 1, delay, finalMessage).then(val => {
            console.log("Done");
            res(val);
        }).catch(val => {
            rej(val);
        });
    });
});
       

};

 

 
const retryFun=()=>{

    retry(asynFn,8, 50,'Failed').then((res)=>{
        
        console.log("Success"+res);

    }).catch((val)=>{
       
        console.log("Failed API after all retries-"+val);

    });
    
}

export default retryFun;
