

 

function createAsyncTask(){

    const val=Math.floor(Math.random()*10)

    return new Promise((res,rej)=>{

 
         setTimeout(()=>{
             if(val<5){
                ///rejcet
                rej(val)
            }else{
    
                res(val);
    
            }

         },1000)

    });


}


async function asycSeqV1(tasks,callBackFun){

        const errors=[];
       const resolved=[];

       for(let task of tasks){

        try {
           
            let res=await task;
            resolved.push(res);

        } catch (error){            
            
            errors.push(error);

        }

       }
        
       callBackFun(resolved,errors);

      

}

function asycSeqV2(tasks,callBackFun){


    const results=[];
    const errors=[];
    let promiseResolvedCount=0;

    tasks.reduce((pre,curr)=>{
             
        console.log("Debugger",pre,curr);

             return pre.then(()=>{  
                  curr.then((val)=>{              
                results.push(val);              
            }).catch((val)=>{                
                errors.push(val);
            }).finally(()=>{
                promiseResolvedCount++;
                if(promiseResolvedCount==tasks.length){
                   callBackFun(results,errors);
                }


            });

        })

      },Promise.resolve());

}

function asycSeqParallel(tasks,callBackFun){


    const results=[];
    const errors=[];
    let promiseResolvedCount=0;

     tasks.map((curr)=>{

        curr.then((val)=>{
            results.push(val)
        }
            )    
            .catch((val)=>{errors.push(val)})
            .finally(()=>{
                
                promiseResolvedCount++;
              
                if(promiseResolvedCount==tasks.length){
                  callBackFun(results,errors);
              }

          });
        
     })

 
}

 function AsyncTaskRunCode(){

    const tasks=[createAsyncTask(),createAsyncTask(),createAsyncTask(),createAsyncTask(),createAsyncTask(),createAsyncTask()];
    
    asycSeqV2(tasks,(error,results)=>{

           console.log("Error",error);
           console.log("Resolved",results);



      });


 }


export default AsyncTaskRunCode;