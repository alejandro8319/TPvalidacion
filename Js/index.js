const articlesList = document.getElementById('articles-list');

// Función para obtener la lista de artículos del backend
function getAllArticles() {
    fetch('http://localhost:8080/article')
        .then(response => response.json())
        .then(articles => {
            articlesList.innerHTML = ''; // Limpiamos la lista de artículos
            articles.forEach(article => {
                const articleElement = document.createElement('div');
                articleElement.classList.add('article');
                const titleElement = document.createElement('h2');
                titleElement.textContent = article.title;
                const contentElement = document.createElement('p');
                contentElement.textContent = article.content;
                articleElement.appendChild(titleElement);
                articleElement.appendChild(contentElement);
                articlesList.appendChild(articleElement);
            });
        })
        .catch(error => {
            console.error('Error al obtener la lista de artículos:', error);
        });
}

// Función para enviar un nuevo artículo al backend
function createArticle(title, content) {
    const article = { title, content };
    fetch('http://localhost:8080/article', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(article)
    })
        .then(response => response.json())
        .then(createdArticle => {
            console.log('Artículo creado:', createdArticle);
            getArticles(); // Actualizamos la lista de artículos después de crear uno nuevo
        })
        .catch(error => {
            console.error('Error al crear el artículo:', error);
        });
}

// Llamamos a la función getArticles al cargar la página para obtener la lista inicial de artículos
getAllArticles();