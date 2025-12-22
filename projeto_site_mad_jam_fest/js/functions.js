// adiciona a navbar, que está noutro ficheiro html, à página html
document.addEventListener("DOMContentLoaded", () => {
  fetch("navbar.html")
    .then(response => response.text())
    .then(html => {

      // coloca a navbar no elemento html correspondente
      const sitioNavbar = document.getElementById("sitio_navbar");
      sitioNavbar.innerHTML = html;

      // mostra a navbar
      requestAnimationFrame(() => {
        sitioNavbar.style.opacity = 1;
      });
    });

  // adiciona o footer, que está noutro ficheiro html, à página html
  fetch("footer.html")
    .then(response => response.text())
    .then(html => {

      // coloca o footer no elemento html correspondente
      const sitioFooter = document.getElementById("sitio_footer");
      sitioFooter.innerHTML = html;

      // mostra o footer
      requestAnimationFrame(() => {
        sitioFooter.style.opacity = 1;
      });
    });
});

// mudar idioma -> faz o setIdioma e carrega opções da navbar