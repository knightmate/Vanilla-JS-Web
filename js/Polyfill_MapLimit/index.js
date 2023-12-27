function runCode(){

    const batchIt = (input, limit) => {

        if (limit > input.length) return input;
    
        const result=[];
        let i=0;
        
        while(i<input.length){
           result.push(input.slice(i,i+limit)); 
           i=i+limit
         }
    
        return result
    
    }
    
    function asynFn(num, callback){
        setTimeout(function(){
            num = num * 1,
          //  console.log(num);
            callback("User->"+num);
        }, 
        500);  
    }
    async function mapLimit(arr, limit, asynFunction, result) {
    
        /**Max task which will  execute concurrently are-> limit */
        const batchedArray = batchIt(arr, limit);    
       
        console.log("choppedValue", batchedArray);
         
         //pre value will be Promise.resolve()--initailly
         const newOutput=batchedArray.reduce((preBatch,currentBatch)=>{
    
            return  preBatch.then((val)=>{
               // console.log("preval",preBatch,val)    
                return new Promise((res,reject)=>{
                   const temp=[];
                   currentBatch.forEach((batchValue)=>{                
                       asynFn(batchValue,function result(resultVal){
                           temp.push(resultVal); 
                           if(temp.length==currentBatch.length){
                            res([...val,...temp])
                        };                       
                       })
                   });
                    
                   //console.log("temp",temp.length,currentBatch.length)
                   
       
               })
             
            })
         },Promise.resolve([]));
    
        console.log("output,n",newOutput)
         const resul1t=await newOutput;
         result(resul1t);
     
         
    };
    
    
    mapLimit([1,2,3,4,5,6],2,asynFn,(result)=>{
    
        console.log("Result",result);
    
    })
    
   
};

export default runCode;