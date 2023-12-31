 
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

 
   (function(){

   

    console.log("Hii,5pm")

    const input=document.getElementById("search");
    const suggestionUIref=document.getElementById("suggestion");
     const suggestionList=[];

    const onFocus=()=>{
        suggestionUIref.style.display="block"
    }


    const onBlur=()=>{
        suggestionUIref.style.display="none"
    }

    input.addEventListener('focus',onFocus)
    input.addEventListener('blur',onBlur)
    input.addEventListener('input',hanldeOnChange)
     

     
    
   function hanldeOnChange(event){
    const val=event.target.value;
    console.log("onType",val);
    getSugestionsByTextAndSave(val)
    };

   async function getSugestionsByTextAndSave(text){

    try {
        //clear Suggestion 
         
        clearSuggestionBoxUI()


     const getSuggestedResult=await getRandomSuggestions(text);
     adddToSuggestionBox(getSuggestedResult)
     console.log("getSuggestedResult",getSuggestedResult);


    } catch (error) {
        
        console.log("getSuggestedResult","ERROR",error);
    }
     
   }

   function adddToSuggestionBox(suggestion){

     
    if( suggestion && !suggestion.length)return ;

    const li=document.createElement('li');
     suggestion.forEach(suggestion => {
        const element=document.createElement("li");
         element.style.cursor="pointer";
         element.value=suggestion
         element.innerHTML=suggestion
         li.appendChild(element);

        });
        li.addEventListener('click',(event)=>{
            
            debugger
            //setSerachBoxVal(event.target.innerHTML);

         })
      suggestionUIref.appendChild(li)
     console.log("suggestion","Created");

   }
   function clearSuggestionBoxUI(){
    suggestionUIref.innerHTML = '';
   
   }

   function setSerachBoxVal(val){
    debugger
    input.value=val;
     onBlur()


}

 


   })()