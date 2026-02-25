document.querySelectorAll('.cuenta').forEach(el => {
    // Indicador visual de que es clickeable
    el.style.cursor = 'pointer';
    el.title = 'Clic para copiar';

    el.addEventListener('click', () => {
        const texto = el.innerText.trim();

        navigator.clipboard.writeText(texto).then(() => {
            mostrarToast('✓ Copiado al portapapeles');

            // Feedback visual en el elemento
            el.classList.add('copiado');
            setTimeout(() => el.classList.remove('copiado'), 1500);
        }).catch(() => {
            // Fallback para navegadores sin soporte de clipboard API
            const rango = document.createRange();
            rango.selectNode(el);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(rango);
            document.execCommand('copy');
            window.getSelection().removeAllRanges();
            mostrarToast('✓ Copiado al portapapeles');
        });
    });
});

function mostrarToast(mensaje) {
    // Evitar duplicados
    document.querySelector('.toast-copia')?.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-copia';
    toast.textContent = mensaje;
    document.body.appendChild(toast);

    // Forzar reflow para que la animación de entrada funcione
    toast.getBoundingClientRect();
    toast.classList.add('visible');

    setTimeout(() => {
        toast.classList.remove('visible');
        toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    }, 2000);
}