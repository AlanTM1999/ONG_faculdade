document.addEventListener("DOMContentLoaded", function(){
    const _FORM = document.getElementById("form-register");
    const _CHECK = _FORM.querySelector("#check");
    const SUBMIT = _FORM.querySelector("[type=\"submit\"]");

    const estadosBrasil = [
        "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
        "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI",
        "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
    ];

    function form_register(e){
        e.preventDefault();

        let formData = new FormData(e.target);
        formData = Object.fromEntries(formData);

        if(!estadosBrasil.includes(formData["provincy"])){
            alert("Selecione o estado");
            return;
        }

        if(formData["check"] !== "concordo"){
            alert("Você deve concordar com os termos");
            return;
        }

        message = "";
        valid = true;
        for(const [key, value] of Object.entries(formData)){

            if(value.trim() === ""){
                valid = false;
                message = "O campo "+key+" está vazio";
                break;
            } else if(key === "birthday" && calculate_years(value) < 18){
                valid = false;
                message = "Vc é de menor";
                break;
            }

            formData[key] = value.trim()
        }

        if(!valid){
            alert(message)
            return;
        }
        
        alert("Cadastrado!");
        _FORM.reset()
    }
    _FORM.addEventListener("submit", form_register);

    function calculate_years(nas){
        const nascimento = new Date(nasc);
        const hoje = new Date()

        let idade = hoje.getFullYear() - nascimento.getFullYear();

        const aindaNaoFezAniversario =
        hoje.getMonth() < nascimento.getMonth() ||
        (hoje.getMonth() === nascimento.getMonth() &&
         hoje.getDate() < nascimento.getDate());

        if(aindaNaoFezAniversario) idade--;

        return idade
    }

    function check_change(e){
        SUBMIT.disabled = !e.target.checked
    }
    _CHECK.addEventListener("change", check_change);



});