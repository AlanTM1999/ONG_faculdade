window.onload = () => {
    const provincy = document.getElementById("provincy");
    const estadosBrasil = [
        "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
        "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI",
        "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
    ];

    (() => {

        estadosBrasil.forEach((uf, index) => {
            const option = document.createElement("option");
            option.dataset.index = index;
            option.dataset.uf = uf;
            option.value = uf;
            option.textContent = uf;
            provincy.append(option);
        })


    })()
}