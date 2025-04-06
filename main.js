/**
 * Galería de fotos con jQuery
 * Script principal para manejar la funcionalidad de la galería
 */
(function ($) {
  "use strict";

  // Almacena referencias a elementos DOM
  const DOM = {
    btnNovaImagem: $("#btn-nova-imagem"),
    formAdicionar: $("#form-adicionar-imagem"),
    inputUrl: $("#endereco-imagem-nova"),
    btnCancelar: $("#botao-cancelar"),
    listaImagens: $(".lista-imagens"),
  };

  /**
   * Inicializa todos los eventos de la aplicación
   */
  function inicializarEventos() {
    // Mostrar formulario de agregar imagen
    DOM.btnNovaImagem.on("click", toggleFormulario);

    // Ocultar formulario al cancelar
    DOM.btnCancelar.on("click", toggleFormulario);

    // Manejar envío del formulario
    DOM.formAdicionar.on("submit", adicionarNovaImagem);

    // Prevenir el comportamiento por defecto en los enlaces de la galería
    $(".overlay-imagem-link a").on("click", function (e) {
      e.stopPropagation();
    });
  }

  /**
   * Muestra/oculta el formulario para añadir imágenes
   */
  function toggleFormulario() {
    DOM.formAdicionar.toggleClass("hidden");

    if (!DOM.formAdicionar.hasClass("hidden")) {
      // Focus en el campo de URL cuando se muestra el formulario
      DOM.inputUrl.focus();
    }
  }

  /**
   * Añade una nueva imagen a la galería
   * @param {Event} e - Evento de envío del formulario
   */
  function adicionarNovaImagem(e) {
    e.preventDefault();

    const urlImagem = DOM.inputUrl.val().trim();

    if (!urlImagem) {
      mostrarMensaje("Por favor, insira uma URL válida", "error");
      return;
    }

    // Verificar que la URL es válida
    if (!isValidUrl(urlImagem)) {
      mostrarMensaje("A URL fornecida não é válida", "error");
      return;
    }

    // Crear nuevo elemento de la galería
    const novoItem = criarItemGaleria(urlImagem);

    // Añadir el nuevo elemento a la galería con animación
    novoItem.hide();
    DOM.listaImagens.prepend(novoItem);
    novoItem.fadeIn(300);

    // Resetear el formulario
    DOM.formAdicionar[0].reset();
    toggleFormulario();

    mostrarMensaje("Imagem adicionada com sucesso!", "success");
  }

  /**
   * Crea un nuevo elemento de la galería
   * @param {string} url - URL de la imagen
   * @returns {jQuery} Elemento jQuery del nuevo item
   */
  function criarItemGaleria(url) {
    return $(`
      <li class="item-galeria">
        <figure>
          <img src="${url}" alt="Imagem da galeria" loading="lazy" onerror="this.onerror=null; this.src='./images/erro.jpg'; this.alt='Erro ao carregar imagem';" />
          <figcaption class="overlay-imagem-link">
            <a href="${url}" title="Ver imagem em tamanho real" target="_blank" rel="noopener">
              Ver imagem em tamanho real
            </a>
          </figcaption>
        </figure>
      </li>
    `);
  }

  /**
   * Muestra un mensaje temporal al usuario
   * @param {string} mensagem - Texto del mensaje
   * @param {string} tipo - Tipo de mensaje ('success' o 'error')
   */
  function mostrarMensagem(mensagem, tipo = "success") {
    // Eliminar mensajes anteriores
    $(".mensagem-feedback").remove();

    // Crear el elemento de mensaje
    const mensagemElement = $(`
      <div class="mensagem-feedback mensagem-${tipo}">
        <p>${mensagem}</p>
      </div>
    `);

    // Añadir estilos inline temporales
    mensagemElement.css({
      position: "fixed",
      bottom: "20px",
      right: "20px",
      padding: "10px 20px",
      "border-radius": "4px",
      color: "#fff",
      "max-width": "300px",
      "box-shadow": "0 2px 10px rgba(0,0,0,0.2)",
      "background-color": tipo === "success" ? "#2ecc71" : "#e74c3c",
      "z-index": "1000",
    });

    // Añadir a la página
    $("body").append(mensagemElement);

    // Eliminar después de 3 segundos
    setTimeout(() => {
      mensagemElement.fadeOut(300, function () {
        $(this).remove();
      });
    }, 3000);
  }

  /**
   * Valida si una cadena es una URL válida
   * @param {string} url - URL a validar
   * @returns {boolean} - True si es válida, false en caso contrario
   */
  function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  }

  // Al cargar el documento, inicializar eventos
  $(document).ready(function () {
    inicializarEventos();

    // Comprobar soporte para funcionalidades modernas
    checkBrowserSupport();
  });

  /**
   * Comprueba si el navegador soporta funcionalidades modernas
   */
  function checkBrowserSupport() {
    // Comprobar soporte para lazy loading
    if (!("loading" in HTMLImageElement.prototype)) {
      // Polyfill o alternativa para navegadores antiguos
      document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
        img.setAttribute("loading", "eager");
      });
    }
  }
})(jQuery);
