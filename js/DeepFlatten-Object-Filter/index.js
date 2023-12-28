

const data = {
    a: 10,
    b: {
      c: 30,
      d: 40,
      h: {
        i: 20,
        j: 2
      }
    },
    e: {
      f: {
        g: 50,
        k: {
          l: 5,
          m: 35
        }
      }
    },
    n: 5
  };

const deepFilter=(obj,filter)=>{
 
      const keys=Object.keys(obj);
 
      for(let key of keys){

         if(typeof(obj[key])=="object"){
            deepFilter(obj[key],filter)
         }else{
 
              if(filter(obj[key])==false){   
                 delete obj[key]
            }
         }

         if(JSON.stringify(obj[key])=="{}"){
            delete obj[key]
         }
      }

}


export default function DeepFlatten(){


    deepFilter(data,(no)=>no>20)
   
     console.log("Filter",data);


}