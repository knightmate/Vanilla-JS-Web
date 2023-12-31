

const fetchWithTimeOut=(url,time)=>{

     
    return new Promise((response,rej)=>{
        let timerId;
        const controller=new AbortController();
        const signal=controller.signal;
        fetch(url,{signal}).then((result)=>{
            clearTimeout(timerId);
         result.json().then((responseText)=>{
            response(responseText);
         })

        }).catch((error)=>{

            rej(error)

        })

          timerId=setTimeout(()=>{

             
            controller.abort();

        },time)

    });


}


function runfetchWithTimeOut(){

const url="https://my-json-server.typicode.com/typicode/demo/posts";

fetchWithTimeOut(url,1000).then((response)=>{

     console.log("response",response);


})

}

export default runfetchWithTimeOut;