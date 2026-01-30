document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const ano = params.get("ano") || "2025";

  fetch("json/dados_anos.json")
    .then(res => res.json())
    .then(data => {
      if (!data[ano]) return;

      const evento = data[ano];

      document.getElementById("nome_evento").innerHTML =
        `${evento.nome_evento}<br>FEST > ${evento.ano}`;

      document.getElementById("logotipo_evento_ano").src = evento.logotipo_evento_ano;

      const video = document.getElementById("video_ano");
      video.src = evento.video_ano;

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

          html += `
            <div class="premiado">
              <div class="premiado-card ${lugar}" style="background-image:url('${p.imagem}'); border: 10px solid ${jam.cor};">
                <div class="texto_lugar" style="background-color: ${jam.cor};">${p.lugar}</div>
              </div>
              <p class="nome_projeto">${p.nome_projeto}</p>
            </div>
          `;
        });

        html += `</div>`;

        //if (jam.download_arquivos) {
          html += `
            <div class="row justify-content-center">
              <a href="${jam.download}" class="textbutton_download btn" style="--btn-cor: ${jam.cor};">
                descarregar arquivos >
              </a>
            </div>
          `;
        //}

        premiadosJAMS.innerHTML += html;
      });

      
      const galeria = document.getElementById("galeria_container");
      galeria.innerHTML = "";
      evento.galeria.forEach(img => {
        galeria.innerHTML += `<img src="${img}">`;
      });

      
      const equipa = document.getElementById("equipa_container");
      equipa.innerHTML = "";
      evento.equipa_organizadora.forEach(m => {
        equipa.innerHTML += `
          <div class="organizacao">
            <img src="${m.foto}" class="elemento_equipa" alt="">
            <p class="nome_elemento_equipa">${m.nome}</p>
          </div>
        `;
      });
    });
});
