 

const root=document.getElementById("root");


const dom={
type:'div',
props:{id:'abc'},
children:[
    {type:"h1",
    props:{id:'name'},
    children:"Meghraj Deshmukh"}]}



 


let count_=4;
function renderView(root, domObj) {
    const type = domObj?.type;
    const props = domObj?.props;
    const children = domObj?.children;

    const element = document.createElement(type);
     
    if(props){
        for(property in props){
        element[property] = property;
        }
    }

    if (typeof children === "string") {
        element.innerHTML = children;
    } else{
        for (const child of children) {
            renderView(element, child);
        }
    }
      

    root.appendChild(element);
}



renderView(root,dom);


/**document.createDocumentFragement() */