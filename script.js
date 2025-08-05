let notebooksData = [];

    document.addEventListener('DOMContentLoaded', () => {
      fetch('./data/notebooks.json')
        .then(response => response.json())
        .then(data => {
          notebooksData = data;
          exibirNotebooks(data);
        })
        .catch(error => console.error("Erro ao carregar JSON:", error));
    });

    function exibirNotebooks(notebooks) {
      const container = document.getElementById('notebooks-container');
      container.innerHTML = ''; // Limpa tudo
      notebooks.forEach((nb, index) => {
        const card = document.createElement('div'); //cria a div dos cards contendo o notebook
        card.className = 'card';
        card.style.animationDelay = `${index * 0.1}s`;
        card.innerHTML = `
          <img src="${nb.imagem}" alt="${nb.nome}">
          <div class="card-content">
            <h2>${nb.nome}</h2>
            <ul class="lista">
              <li><strong>CPU:</strong> ${nb.cpu}</li>
              <li><strong>GPU:</strong> ${nb.gpu}</li>
              <li><strong>RAM:</strong> ${nb.ram}</li>
              <li><strong>Armazenamento:</strong> ${nb.armazenamento}</li>
              <li><strong>Sistema Operacional:</strong> ${nb.sis_operacional}</li>
              <li><strong>Tela:</strong> ${nb.tela}</li>
            </ul>
            <hr>
            <p><strong>Uso Indicado:</strong></p>
            <ul>${nb.uso_indicado.map(u => `<li>${u}</li>`).join('')}</ul>
          </div>
        `;
        container.appendChild(card);
      });
    }

    function filtrarNotebooks() {
      const checkboxes = document.querySelectorAll('.filtro input[type="checkbox"]:checked');
      const filtrosSelecionados = Array.from(checkboxes).map(cb => cb.value);

      if (filtrosSelecionados.length === 0) {
        exibirNotebooks(notebooksData); // mostra tudo se não tiver nenhum filtro selecionado
        return;
      }

      const notebooksFiltrados = notebooksData.filter(nb =>
        filtrosSelecionados.every(filtro => nb.uso_indicado.includes(filtro)) //filtra o notebooksData pra incluir apenas os notebooks que tem todos os filtros selecionados
      );
      exibirNotebooks(notebooksFiltrados);
    }