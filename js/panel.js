(() => {
    const panel          = document.querySelector("#panel");
    const asideDesktop   = document.querySelector("#aside-menu-desktop");
    const asideMobile    = document.querySelector("#aside-menu-mobile");
    const desktopButton  = document.querySelector("#toggle-desktop");
    const mobileButton   = document.querySelector("#toggle-mobile");

    // Para a execução se algum elemento essencial não existir nesta página.
    if (!panel || !asideDesktop || !asideMobile || !desktopButton || !mobileButton) return;

    // ─── Popula o aside mobile clonando o conteúdo do aside desktop ────────
    asideMobile.innerHTML = asideDesktop.innerHTML;

    // ─── Helpers ───────────────────────────────────────────────────────────
    const closeMobile = () => {
        asideMobile.classList.remove("active");
        mobileButton.classList.remove("active");
        mobileButton.setAttribute("aria-expanded", "false");
    };

    const openMobile = () => {
        asideMobile.classList.add("active");
        mobileButton.classList.add("active");
        mobileButton.setAttribute("aria-expanded", "true");
    };

    // ─── Toggle desktop (expande/recolhe o aside) ──────────────────────────
    desktopButton.addEventListener("click", () => {
        const expanded = panel.classList.toggle("active");
        desktopButton.classList.toggle("active", expanded);
        desktopButton.setAttribute("aria-expanded", String(expanded));
    });

    // ─── Toggle mobile ─────────────────────────────────────────────────────
    mobileButton.addEventListener("click", () => {
        if (asideMobile.classList.contains("active")) {
            closeMobile();
        } else {
            openMobile();
        }
    });

    // Fecha o menu mobile ao clicar em um link dentro dele.
    asideMobile.addEventListener("click", event => {
        if (event.target.closest("a")) closeMobile();
    });

    // Fecha ao clicar fora do aside mobile.
    document.addEventListener("click", event => {
        if (
            asideMobile.classList.contains("active") &&
            !asideMobile.contains(event.target) &&
            !mobileButton.contains(event.target)
        ) {
            closeMobile();
        }
    });

    // Fecha com Escape.
    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && asideMobile.classList.contains("active")) {
            closeMobile();
            mobileButton.focus();
        }
    });
})();
