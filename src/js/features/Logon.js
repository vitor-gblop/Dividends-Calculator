function hide(hideid, showid)
{
    let x = document.getElementById(hideid);
    x.style.display = 'none';

    let y = document.getElementById(showid);
    y.style.display = 'block'
}

function login()
{
    let usuario = document.getElementById("input-usuario").value;
    let senha = document.getElementById("input-senha").value;

    // Get user data from localStorage
    let userData = handleGetUserData();

    // console.log(userData[usuario].senha);
    
    // Simple validation: check if user exists and password matches
    if (userData[usuario])
    {
        if (userData[usuario].senha === senha) 
        {
            currentUser = { "usuario": userData[usuario].usuario, "senha": userData[usuario].senha }
            localStorage.setItem("currentUser", JSON.stringify(currentUser))
            
            console.log("deu certo");
            window.location.href ="../../../index.html";
        } 
        else {
            // Show error label
            document.getElementById("wrong-data-label").style.display = "block";
        }
    }
    else
    {
        window.alert("não cadastrado");
        document.getElementById("missing-user-label").style.display = "block";
    }
}

function signin()
{
    let usuario = document.getElementById("input-usuario-sign").value;
    let senha = document.getElementById("input-senha-sign").value;

    // console.log(usuario.length);
    if (usuario.length >= 3 && senha.length >= 3) 
    {
        if (usuario != "" && senha != "")
        {
            user = {"usuario": usuario, "senha": senha};
            handleSaveUser(user);
        }
    }
    else {
        window.alert("Usuario ou senha errado")
    }
}

function signOut()
{
    localStorage.setItem("currentUser", "{}");
    window.location.href = "../../views/logon/index.html";
}

// na tela inicial se estiver deslogado retorna ao login
function loginVerification() {

    console.log("verificando");
    
    if(localStorage.getItem("currentUser") == "{}")
    {
        window.location.href = "./src/views/logon/index.html";
    }
}

