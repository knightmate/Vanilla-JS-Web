

const root=document.getElementById("root");


function colorNameToRgb(colorName) {
    // Create an HTML element for temporary styling
    const div = document.createElement('div');
    div.style.color = colorName;
  
    // Append the element to the body (necessary for computed style)
    document.body.appendChild(div);
  
    // Get the computed style and extract the RGB values
    const computedStyle = window.getComputedStyle(div);
    const rgbValues = computedStyle.color.match(/\d+/g).map(Number);
  
    // Remove the temporary element
    document.body.removeChild(div);
  
    // Return the RGB representation as an object
    return { r: rgbValues[0], g: rgbValues[1], b: rgbValues[2] };
  }

const findElement=(element,color)=>{
   
    const targetColorRDG =JSON.stringify(colorNameToRgb(color))
    const result=[];

    for (const child of element.children) {
 
       const color_=child.style.color
       const childColor= JSON.stringify(colorNameToRgb(color_))

        if(targetColorRDG==childColor){
            result.push(child)
         }

      }
return result
 
}


const res=findElement(root,"pink")
console.log("res",res)