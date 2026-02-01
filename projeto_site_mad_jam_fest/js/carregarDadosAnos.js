document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const ano = params.get("ano") || "2025";

  fetch("json/dados_anos.json")
    .then(res => res.json())
    .then(data => {
      if (!data[ano]) return;

      const evento = data[ano];

      document.getElementById("nome_evento").innerHTML =
        `${evento.nome_evento}`;

      document.getElementById("logotipo_evento_ano").src = evento.logotipo_evento_ano;

      const linkLogotipo = document.getElementById("link_logotipo_evento_ano");
      
      if (evento.link_logotipo) {
        linkLogotipo.href = evento.link_logotipo;
        linkLogotipo.style.cursor = "pointer";
      } else {
        linkLogotipo.removeAttribute("href");
        linkLogotipo.style.cursor = "default";
      }

      const videoContainer = document.getElementById("video_ano");
      if (evento.imagem_ano && evento.imagem_ano.trim() !== "") {
        videoContainer.innerHTML = `<img src="${evento.imagem_ano}" alt="Imagem do ano ${ano}" style="width:100%; height:auto;">`;
      } else if (evento.video_ano && evento.video_ano.trim() !== "") {
        videoContainer.innerHTML = `
          <iframe
            src="${evento.video_ano}"
            frameborder="0"
            allowfullscreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        `;
      } else {
        videoContainer.innerHTML = "";
      }

      const premiadosJAMS = document.getElementById("premiados_jams_container");
      premiadosJAMS.innerHTML = "";

      evento.premiados_jams.forEach(jam => {
        let html = `
          <div class="row">
            <h1 class="titulo1_pagina_premiados">
              PREMIADOS DA<br><span style="color:${jam.cor};">${jam.tipo_jam}</span> JAM
            </h1>
          </div>
          <div class="row premiado-grid">
        `;

        jam.premiados.forEach((p, index) => {
          const lugares = ["primeiro", "segundo", "terceiro"];
          const lugar = lugares[index] || "primeiro";

          if (p.imagem && p.imagem.trim() !== "") {
            html += `
              <div class="premiado">
                <div class="premiado-card ${lugar}" style="background-image:url('${p.imagem}'); border: 10px solid ${jam.cor}; position: relative;">
                  <div class="texto_lugar" style="background-color: ${jam.cor};">${p.lugar}</div>
                </div>
                <p class="nome_projeto">${p.nome_projeto}</p>
                ${p.nome_participantes ? `<p class="nome_participantes">${p.nome_participantes.join(", ")}</p>` : ""}
              </div>
            `;
          } else {
            html += `
              <div class="premiado" style="border: none; position: relative; padding: 20px; background: none;">
                <div class="texto_lugar" style="background-color: ${jam.cor}; font-weight: bold; font-size: 20px; margin-bottom: 10px; text-align: center;">
                  ${p.lugar}
                </div>
                <p class="nome_projeto">${p.nome_projeto}</p>
                ${p.nome_participantes ? `<p class="nome_participantes">${p.nome_participantes.join(", ")}</p>` : ""}
              </div>
            `;
          }
        });

        html += `</div>`;

        if (jam.download && jam.download.trim() !== "") {
          html += `
            <div class="row justify-content-center">
              <a href="${jam.download}" class="textbutton_download btn" style="--btn-cor: ${jam.cor};" target="_blank" rel="noopener noreferrer">
                descarregar arquivos >
              </a>
            </div>
          `;
        }

        premiadosJAMS.innerHTML += html;
      });

      function carregarJuri(categoria) {
 
  const dadosJuri = {
    categoria1: [
      { nome: "Jurado 1", foto: "url1.jpg", bio: "Bio 1" },
      { nome: "Jurado 2", foto: "url2.jpg", bio: "Bio 2" }
    ],
    categoria2: [
      { nome: "Jurado A", foto: "urlA.jpg", bio: "Bio A" },
      { nome: "Jurado B", foto: "urlB.jpg", bio: "Bio B" }
    ]
  };

  const juriContainer = document.getElementById("juri_container");
  juriContainer.innerHTML = "";

  if (!dadosJuri[categoria]) {
    juriContainer.innerHTML = "<p>Nenhum jurado disponível para esta categoria.</p>";
    return;
  }

  dadosJuri[categoria].forEach(jurado => {
    const juradoElem = document.createElement("div");
    juradoElem.classList.add("equipa-item"); 
    juradoElem.innerHTML = `
      <img src="${jurado.foto}" alt="Foto de ${jurado.nome}">
      <h3>${jurado.nome}</h3>
      <p>${jurado.bio}</p>
    `;
    juriContainer.appendChild(juradoElem);
  });
}

      const galeriaSection = document.querySelector(".galeria");
      const galeriaContainer = document.getElementById("galeria_container");

      if (evento.galeria && evento.galeria.some(img => img.trim() !== "")) {
        galeriaContainer.innerHTML = "";
        evento.galeria.forEach(img => {
          if (img.trim() !== "") {
            galeriaContainer.innerHTML += `<img src="${img}">`;
          }
        });
        galeriaSection.style.display = "block";
      } else {
        galeriaSection.style.display = "none";
      }

      const equipa = document.getElementById("equipa_container");
      equipa.innerHTML = "";
      evento.equipa_organizadora.forEach(m => {
        equipa.innerHTML += `
          <div class="organizacao">
            <img src="${m.foto}" class="elemento_equipa" alt="">
            <p class="nome_elemento_equipa">${m.nome}</p>
            ${m.funcao ? `<p class="funcao_elemento_equipa">${m.funcao}</p>` : ""}
          </div>
        `;
      });

      const voluntariosContainer = document.getElementById("voluntarios_container");

      if (voluntariosContainer) {
        voluntariosContainer.innerHTML = "";

        if (evento.voluntarios && evento.voluntarios.length > 0) {
          evento.voluntarios.forEach(v => {
            voluntariosContainer.innerHTML += `
              <div class="organizacao voluntario">
                <p class="nome_elemento_voluntario">${v.nome}</p>
              </div>
            `;
          });
          voluntariosContainer.parentElement.style.display = "block";
        } else {
          voluntariosContainer.parentElement.style.display = "none";
        }
      }
    });
});
