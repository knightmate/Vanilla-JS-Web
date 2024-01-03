

function computerAmount(){

    const getActualValByMethodName=(val,method)=>{
       
        switch(method){
         case "lacs":{  
        return val*100000
         };
         case "crores":{
            return val*10000000
         };
         case "thousand":{
            return  val*1000
         }

         default: 0;
        }

    }
//   let totalVal=0;

    // const result= {

    //     lacs:(val)=>{
    //     totalVal=getActualValByMethodName(val,"lacs")+totalVal;
    //     return result;
    //     },
    //     thousand:(val)=>{
    //         totalVal=getActualValByMethodName(val,"thousand")+totalVal;
    //         return result;

    //     },
    //     crores:(val)=>{
    //       totalVal=getActualValByMethodName(val,"crores")+totalVal;
    //       return result;

    //     },
    //     val:()=>{
    //       return totalVal
    //     }
    // }

    //If we use Arrow fuction then this will not potin to calling referece, it will point to outer scope-lexical environment
    //version 2
      const result= {
        totalVal:0,
        lacs:function(val){
        this.totalVal+=Math.pow(10,5)*val//getActualValByMethodName(val,"lacs") 
        return result;
        },
        thousand:function(val){
            this.totalVal+=Math.pow(10,3)*val
            return result;

        },
        crores:function(val){
          this.totalVal+=Math.pow(10,7)*val
          return result;
        },
        val:function(val){
          return this.totalVal
        }
    }


  return result

}

function MethodChainingCal(){

    //Expection
    //const total=computAmounf().lac(15).crore(5).crore(2).lacs(20).thousand(45).value();
    //total should have result of all computed value.
 

    //first we need three method lacs, crores, thousand

    const total=computerAmount().lacs(10).crores(1).val();
    console.log("total",total);


};



export default MethodChainingCal;
