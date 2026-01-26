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

      carregarDadosNavbar();

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


function carregarDadosNavbar() { 
  const navbar = document.getElementById("sitio_navbar");
  const logotipo = document.getElementById("logotipo_navbar");
  const linha_divisoria = document.getElementById("linha_divisoria_navbar");
  const botao = document.getElementById("botao_navbar");

  const seta = document.getElementById("seta_dropdown_navbar");
  const pagina = window.location.pathname;

  if (pagina.includes("animation_jam.html")) {
    logotipo.src = "images/logotipo_navbar_red.svg";
    botao.classList.add("botao_navbar_animation");
    linha_divisoria.style.borderColor = "#FE0000";
    seta.src = "images/seta_vermelha.svg";
    const opcaoAnimationJam = document.getElementById("opcao_animation_jam_navbar");
    opcaoAnimationJam.style.textDecoration = "underline";
    opcaoAnimationJam.style.color = "#FE0000";
  }

  if (pagina.includes("game_jam.html")) {
    logotipo.src = "images/logo_azul.svg";
    botao.classList.add("botao_navbar_game");
    linha_divisoria.style.borderColor = "#0F60FF";
    seta.src = "images/seta_azul.svg";
    const opcaoGameJam = document.getElementById("opcao_game_jam_navbar");
    opcaoGameJam.style.textDecoration = "underline";
    opcaoGameJam.style.color = "#0F60FF";
  }

  if (pagina.includes("index.html")) {
    const inicio = document.getElementById("opcao_inicio");
    inicio.style.textDecoration = "underline";
  }

  if (pagina.includes("arquivo.html")) {
    const arquivo = document.getElementById("opcao_arquivo");
    arquivo.style.textDecoration = "underline";
  }

  if (pagina.includes("faq.html")) {
    const faq = document.getElementById("opcao_faq");
    faq.style.textDecoration = "underline";
  }

  if (pagina.includes("sobre.html")) {
    const sobre = document.getElementById("opcao_sobre");
    sobre.style.textDecoration = "underline";
  }

  if (pagina.includes("photo_jam.html")) {
    logotipo.src = "images/logo_verde.svg";
    botao.classList.add("botao_navbar_photo");
    linha_divisoria.style.borderColor = "#22B751";
    seta.src = "images/seta_verde.svg";
    const opcaoPhotoJam = document.getElementById("opcao_photo_jam_navbar");
    opcaoPhotoJam.style.textDecoration = "underline";
    opcaoPhotoJam.style.color = "#22B751";
  }

  if (pagina.includes("video_jam.html")) {
    logotipo.src = "images/logo_roxo.svg";
    botao.classList.add("botao_navbar_video");
    linha_divisoria.style.borderColor = "#AB31AA";
    seta.src = "images/seta_roxa.svg";
    const opcaoVideoJam = document.getElementById("opcao_video_jam_navbar");
    opcaoVideoJam.style.textDecoration = "underline";
    opcaoVideoJam.style.color = "#AB31AA";
  }
}