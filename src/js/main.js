listItensSaved();
var intervalId = setInterval(
    function() 
    {
        console.log("oloco");
        
        listItensSaved();
        loginVerification();
    }, 2000
);
listInterests();
// You can clear a periodic function by uncommenting:
// clearInterval(intervalId);

