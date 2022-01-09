var form_inscription = document.getElementById("register");

function passwordChanged() {
    var strength = document.getElementById('strength');
    var strongRegex = new RegExp("^(?=.{22,50})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
    var goodRegex = new RegExp("^(?=.{16,21})(((?=.*[A-Z])(?=.*[a-z]))|((?=.^[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
    var mediumRegex = new RegExp("^(?=.{13,15})(((?=.*[A-Z])(?=.^[a-z]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
    var enoughRegex = new RegExp("(?=.{8,12}).*$", "g");
    var pwd = document.getElementById("MyregisterInput");

    var nbr = pwd.value.length
    switch (true) {
        case (strongRegex.test(pwd.value)):
            strength.innerHTML = '<span style="color:forestgreen">Fort !</span>';
            break;
        case (goodRegex.test(pwd.value)):
            strength.innerHTML = '<span style="color:seagreen">Bon !</span>';
            break;
        case (mediumRegex.test(pwd.value)):
            strength.innerHTML = '<span style="color:orange">Moyen !</span>';
            break;
        case (enoughRegex.test(pwd.value)):
            strength.innerHTML = '<span style="color:red">Faible !</span>';
            break;
        case (nbr >= 0 && nbr <= 7):
            strength.innerHTML = '<span style="color:darkred">Très faible !</span>';
            break;
        default:
            strength.innerHTML = ''
    }
}

function valider(event) {
    var champ_nom = form_inscription.elements["nom"];
    var champ_mdp = form_inscription.elements["password"];
    var champ_confirmation = form_inscription.elements["confirmation"];
    var champ_email = form_inscription.elements["email"];
    var form_OK = true;

    if (!champ_nom.value) {
        form_OK = false;
        champ_nom.classList.add("erreur");
    } else {
        champ_nom.classList.remove("erreur");
    }

    if (champ_mdp.value == "") {
        form_OK = false;
        champ_mdp.classList.add("erreur");
    } else {
        champ_mdp.classList.remove("erreur");
    }
    //
    if (!champ_mdp.length > 7) {
        form_OK = false;
        champ_mdp.classList.add("erreur");
    }

    if (champ_confirmation.value == "") {
        form_OK = false;
        champ_confirmation.classList.add("erreur");
    } else {
        champ_confirmation.classList.remove("erreur");
    }
    //

    if (champ_confirmation.value !== champ_mdp.value) {
        console.log(champ_confirmation.value + " -- " + champ_mdp.value)
        form_OK = false;
        champ_mdp.classList.add("erreur");
        champ_confirmation.classList.add("erreur");

        var mdpverif = document.getElementById('mdpverif');
        mdpverif.innerHTML = '<span class="mdpverif" style="color:red">Les mot de passe ne corespondent pas !</span>';


    } else if (champ_confirmation.value && champ_mdp == null) {
        form_OK = false;
        champ_mdp.classList.add("erreur");
        champ_confirmation.classList.add("erreur");

    } else if (champ_confirmation.value == champ_mdp.value && champ_mdp.length >= 8) {
        champ_mdp.classList.remove("erreur");
        champ_confirmation.classList.remove("erreur");

        const container = document.getElementById("verif")
        const childOne = document.getElementById("mdpverif")

        container.removeChild(childOne)

    }

    var regex = /^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]&shy;{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$/;
    if (regex.exec(champ_email.value) == null) {
        form_OK = false;
        champ_email.classList.add("erreur");
    } else {
        champ_email.classList.remove("erreur");
    }

    if (!form_OK) {
        event.preventDefault();
    }
}
form_inscription.addEventListener('submit', valider);