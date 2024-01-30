

const runAlgorithm=()=>{



    console.log("Running Algorithm");
    //input a:[b,c]
    /**
     * b=[d,g]
     * d=[m,n]
     * z=[f,k]
     * output->[b,c,d,g,m,n]
     */

    const mapping={
        a:["b","c"],
        b:["d","g"],
        d:["p","q"],
        l:["x","y"]
    };
     
      
     const finalFriends=[];
     function getFriends(friends,person){
     
        const friendlist=friends[person];
    
        //edge case
        if(!friendlist || !friendlist.length)return;
          
        const personFriends=friendlist//?.split(",");
        finalFriends.push(...personFriends);
         
        for(const friend of personFriends){
            getFriends(friends,friend);

         }

         return finalFriends

      }

     const friends=getFriends(mapping,"a")


      console.log("All Friends",friends);



}

export  default runAlgorithm;