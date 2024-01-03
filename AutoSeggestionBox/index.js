 
  function generateRandomText(length = 10) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }

    return result;
}

// Generate a random string of length 8
const randomString = generateRandomText(8);

 function getRandomSuggestions(inputText) {
    
    if(!inputText.length)return[]

    // List of random suffixes for suggestions
    const randomSuffixes = [generateRandomText(Math.random()),generateRandomText(Math.random()),generateRandomText(Math.random()),generateRandomText(Math.random())];

    // Generate suggestions by appending random suffixes to the input
    const suggestions = randomSuffixes.map(suffix => inputText + suffix);

    // Introduce a 10% chance of failure
    if (Math.random() < 0.1) {
        throw new Error('Internal Server Error');
    }

    return suggestions;
}

// Example usage:
 


 /**Create an Auto Suggestion Box in vanilla JS 
  * 
  * Create a Suggestion area bottom to the input box that shows the suggestn list. 
  * The list is visible when the input box is in foxus or when user types, it hides when the input box is blurreed.
  * getSuggestions (text);method will act mock sever and will return ransom tet base on the input with 0 - 200 milliseconds latency and may fail.
  * if a siggestion is clikced , pipulate the input with its valud and brind box in foccus
  */


 /**Implement leading and trailing options
  * Leading will invoke it in first call itself
  * Trailing will invoke after the delay
  */
 function deBounce(onChange,time,options={leading:false,trailing:true}){
    
    let timerId;
    const {leading,trailing}=options;
    let isLeadingInvoked=false;

    return function(...args){

      
        if(timerId){
        clearTimeout(timerId)
        }

        if(leading && !timerId){
        onChange(args)
        isLeadingInvoked=true
        if(!trailing)
        return;
        }else{
           isLeadingInvoked=false
        };
      
         
        timerId= setTimeout(()=>{

              if(!isLeadingInvoked){
                onChange(args)
                 
                console.log("After delay Invoking___---",args);

            }else{
                isLeadingInvoked=true;
                console.log("Already Invoked Not Invoking..");

            }
  
       },time);
    }

 }

 
   (function(){

    const input=document.getElementById("search");
    const suggestionUIref=document.getElementById("suggestion");
 
    const onFocus=()=>{
        suggestionUIref.style.display="block"
    }


    const onBlur=(e)=>{
         
        if(e.target==input || e.target==suggestionUIref)return;

        suggestionUIref.style.display="none"
    }

   
     

     
    
   const  hanldeOnChange=deBounce(onChange,200,{leading:true,trailing:true});

    function onChange(e){
        const text=e[0].target.value
         console.log("onType",text);
        getSugestionsByTextAndSave(text)
    }

   async function getSugestionsByTextAndSave(text){

    try {
        //clear Suggestion 
         
        clearSuggestionBoxUI()


     const getSuggestedResult=await getRandomSuggestions(text);
     adddToSuggestionBox(getSuggestedResult)
 

    } catch (error) {
        console.log("getSuggestedResult","ERROR",error);
        getSugestionsByTextAndSave(text)
    }
     
   }

   function adddToSuggestionBox(suggestion){

     
    if( suggestion && !suggestion.length)return ;

    const li=document.createElement('ui');
     suggestion.forEach(suggestion => {
        if(!suggestion || !suggestion.length)return;

        const element=document.createElement("li");
         element.style.cursor="pointer";
         element.value=suggestion
         element.innerHTML=suggestion
         li.appendChild(element);
        });
 
      suggestionUIref.appendChild(li)
     console.log("suggestion","Created",li);

   }
   function clearSuggestionBoxUI(){
    suggestionUIref.innerHTML = '';
   
   }

   function setSerachBoxVal(val){
    input.value=val;
}
 
 input.addEventListener('focus',onFocus)
window.addEventListener('click',onBlur)
 input.addEventListener('input',hanldeOnChange)
 suggestionUIref.addEventListener('click',(event)=>setSerachBoxVal(event.target.innerHTML))


 })()