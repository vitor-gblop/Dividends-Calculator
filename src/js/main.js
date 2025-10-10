listItensSaved();
loginVerification();
verifyTheme()
var intervalId = setInterval(
    function() 
    {
        
        listItensSaved();
        loginVerification();
        
        console.log("oloco");
    }, 2000
);
listInterests();
// You can clear a periodic function by uncommenting:
// clearInterval(intervalId);

