document.addEventListener("DOMContentLoaded", function(){
    const _INPUTCPF = document.getElementById("cpf");
    const _INPUTPHONENUMBER = document.getElementById("phone_number");
    const _INPUTCEP = document.getElementById("cep");

    function verify_input_type(inputType){
        return inputType !== "deleteContentBackward"
    }


    function maskCPF(e){
        if(verify_input_type(e.inputType)){
            let value = e.target.value.trim().replace(/\D+/g, "");

            let count = 0;
            let valueMask = "";

            for(let i = 0; i < value.length; i++){
                count++
                valueMask += value[i];

                if(valueMask.length === 11){
                    valueMask += "-"
                } else if(count === 3){
                    valueMask += "."
                    count = 0;
                }
            }

            e.target.value = valueMask;
        }
    }
    _INPUTCPF.addEventListener("input", maskCPF);

    function maskPhoneNumber(e){
        if(verify_input_type(e.inputType)){
            let value = e.target.value.trim().replace(/\D+/g, "");

            let valueMask = "";

            for(let i = 0; i < value.length; i++){
                switch(i){
                    case 0:
                        valueMask += "(" + value[i];
                        break;
                    case 2:
                        valueMask += ") " + value[i];
                        break;
                    case 7:
                        valueMask += "-" + value[i];
                        break;
                    default:
                        valueMask += value[i];
                }
            }

            e.target.value = valueMask;
        }
    }
    _INPUTPHONENUMBER.addEventListener("input", maskPhoneNumber);

    function maskCEP(e){
        if(verify_input_type(e.inputType)){
            let value = e.target.value.trim().replace(/\D+/g, "");

            let valueMask = "";

            for(let i = 0; i < value.length; i++){
                valueMask += value[i];
                if(i === 4) valueMask += "-"
            }

            e.target.value = valueMask;
        }
    }
    _INPUTCEP.addEventListener("input", maskCEP);
})