(() => {
    const panel = document.querySelector("#panel");
    const desktop = document.querySelector("#aside-menu-desktop .aside-nav");
    const mobile = document.querySelector("#aside-menu-mobile");
    const desktopButton = document.querySelector("#toggle-desktop");
    const mobileButton = document.querySelector("#toggle-mobile");

    // Para a execução se os elementos do menu não estiverem nesta página.
    if (!panel || !desktop || !mobile || !desktopButton || !mobileButton) return;

    // Corrige o destino inexistente e reaproveita os links no menu móvel.
    desktop.querySelectorAll('a[href="painel.projetos.html"]').forEach(link => {
        link.href = "projetos.html";
    });
    mobile.replaceChildren(desktop.cloneNode(true));
    mobile.setAttribute("aria-label", "Navegação do painel");

    const closeMobile = () => {
        mobile.classList.remove("active");
        mobileButton.classList.remove("active");
    };

    // A classe active controla tanto a largura do menu quanto o ícone X no CSS.
    desktopButton.addEventListener("click", () => {
        panel.classList.toggle("active");
        desktopButton.classList.toggle("active", panel.classList.contains("active"));
    });

    mobileButton.addEventListener("click", () => {
        mobile.classList.toggle("active");
        mobileButton.classList.toggle("active", mobile.classList.contains("active"));
    });

    // Fecha o menu móvel após escolher uma página, clicar fora ou pressionar Esc.
    mobile.addEventListener("click", event => {
        if (event.target.closest("a")) closeMobile();
    });

    document.addEventListener("click", event => {
        if (mobile.classList.contains("active") &&
            !mobile.contains(event.target) && !mobileButton.contains(event.target)) {
            closeMobile();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") closeMobile();
    });
})();
