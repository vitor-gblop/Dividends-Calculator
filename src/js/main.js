listItensSaved();
var intervalId = setInterval(
    function() 
    {
        listItensSaved();
        loginVerification();
    }, 3000
);
// You can clear a periodic function by uncommenting:
// clearInterval(intervalId);

