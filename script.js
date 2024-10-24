pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@3.9.179/build/pdf.worker.min.js';
const url = 'assets/cardapio.pdf'; // Certifique-se de que o PDF está no local correto

let pdfDoc = null;
let currentPage = 1;

const loadingTask = pdfjsLib.getDocument(url);
loadingTask.promise.then(function(pdf) {
    pdfDoc = pdf;
    console.log('PDF carregado');
    renderPage(currentPage);
}, function (reason) {
    console.error('Erro ao carregar o PDF: ', reason);
});

function renderPage(num) {
    pdfDoc.getPage(num).then(function(page) {
        console.log('Página ' + num + ' carregada');

        const scale = 1.5;
        const viewport = page.getViewport({ scale: scale });

        const canvas = document.getElementById('pdf-viewer');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Renderizar a página no canvas
        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        page.render(renderContext);
    });
}

document.getElementById('next').addEventListener('click', function() {
    if (pdfDoc && currentPage < pdfDoc.numPages) {
        currentPage++;
        renderPage(currentPage);
    }
});

document.getElementById('prev').addEventListener('click', function() {
    if (pdfDoc && currentPage > 1) {
        currentPage--;
        renderPage(currentPage);
    }
});