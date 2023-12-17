

/**mapLimit function
 * Now we need to implment a map limit funciton which will tkae the async function , an array and a callback function
 * The problem statement is 
 * async.mapLimit(['1','2','3','4','5'], 3, function(num, callback){
setTimeout(function(){
    num = num * 2,
    console.log(num);
    callback(null, num);
}, 
4000);  
},function(err, results){
    console.log(results);
});
Output-[2,4,6,8,10]
 */

 
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
    1000);  
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


     const resul1t=await Promise.all([newOutput]);
     result(...resul1t);
 
     
};

async function waitTillAllPromise(batch,asyncFn){

    // batch.map()
    const promistList=[];
      for(let i=0;i<batch.length;i++){
       const pr=new Promise((res,rej)=>{
        asyncFn(batch[i],(input)=>{
      
            res(input)

     })
       })
         promistList.push(pr);

     };
    
  const valPromise=  await Promise.all([...promistList])

  console.log("valPromise",valPromise);

     return valPromise

}


mapLimit([1,2,3,4,5,6],2,asynFn,(result)=>{

    console.log("Result",result);

})






