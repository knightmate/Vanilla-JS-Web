 

const root=document.getElementById("root");


const dom={
type:'div',
props:{id:'abc'},
children:[
    {type:"h1",
    props:{id:'name'},
    children:"Meghraj Deshmukh"}]}



 


let count_=4;
function RenderView(root,domObj){
 
     const type=domObj?.type;
    const props=domObj?.props;
    const children=domObj?.children;
      
    const element= document.createElement(type);
    element.id=props?.id;
    if(typeof(children)=="string"){
     element.innerHTML=children;      
    }else{
        if(Array.isArray(children)){
          for(child of children){
            RenderView(element,child)
          }
        }else{
         RenderView(element,children)
        }
     }

    root.appendChild(element);
   return ;
 

}


RenderView(root,dom);
