
function change()
{
    let theme = localStorage.getItem("currentTheme")
    if (theme == "dark-mode")
    {
        document.getElementsByTagName('html')[0].setAttribute("class", "light-mode")
        localStorage.setItem("currentTheme", "light-mode")
    }
    else {
        document.getElementsByTagName('html')[0].setAttribute("class", "dark-mode")
        localStorage.setItem("currentTheme", "dark-mode")
    }
    window.location.reload()
}


function verifyTheme()
{
    let theme = localStorage.getItem("currentTheme")
    if (!theme)
    {
        localStorage.setItem("currentTheme", "dark-mode")
    }
    else
    {
        if (theme == "dark-mode")
        {
            document.getElementsByTagName('html')[0].setAttribute("class", "dark-mode")
            localStorage.setItem("currentTheme", "dark-mode")
        }
        else {
            document.getElementsByTagName('html')[0].setAttribute("class", "light-mode")
            localStorage.setItem("currentTheme", "light-mode")
        }
    }
}