 

//add event listen  -> scroll and stop
/*the logic here is when im scrolling start event listener and when
 stop->start the timer or 2 sec if user
  stop more then 2 sec then capture the product which are in viewport*/

 
  (function(){

    const allProductsElements=document.getElementById("gridContainer");


     function onScrollStart(event){
        let scrollStarted=0;//time
        let timerId=null;

         return (event,callback)=>{
            console.log("Event onScroollStarete")
            if(timerId){
             clearTimeout(timerId);
            };

           timerId= setTimeout(()=>{
            callback()
            },2000);
        }
 
    }
    const callScroll= onScrollStart()

   const onScroll=(event)=>{

     callScroll(event,()=>{
        console.log("capture the products");
        captureProduct()
    });
    
   };

   /**This wil capture the product in viewport */
   const captureProduct=()=>{
     
    const result=[];
    const prod=allProductsElements.children
       for(element of prod){
         if(isInViewport(element)){

            result.push(element.textContent)
             
         }else{

         }
        }


     console.log("Result->",result);

  
   }

   function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
  
     console.log("-Consoe.log-")
    document.addEventListener('scroll',onScroll);
     


  })();