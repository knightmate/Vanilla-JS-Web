

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

const chopee = (arr, limit) => {

    if (limit > arr.length) return arr;

    const output = [];
    let counter = 0;
    let batch = [];
    arr.forEach(element => {

        batch.push(element);
        counter++;
        if (counter == limit) {
            output.push(batch);
            batch = [];
            counter = 0;
        };



    });

    return output

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
    const chopedArray = chopee(arr, limit);    
    console.log("choppedValue", chopedArray);
     const newOutput=[];
     
     for(let i=0;i<chopedArray.length;i++){
        const batch=chopedArray[i];
            const bathcResult=await waitTillAllPromise(batch,asynFunction);
            newOutput.push(...bathcResult);     
          
     }

     result(newOutput)
 

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






