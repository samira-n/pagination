// для получния данных json 
async function getData(){
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    return data;
}

async function main(){
    const postsData = await getData(); // массив с объектами
    let currentPage = 1;
    let rows = 10; // количество постов на одной странице

    function displayList(arrData, rowPerPage, page){
        const postsEl = document.querySelector(".posts"); // Находим контейнер для постов
        postsEl.innerHTML = "";
        page--;
        const start = rowPerPage * page; // Начальный индекс для текущей страницы
        const end = start + rowPerPage; // Конечный индекс для текущей страницы
        const paginatedData = arrData.slice(start, end); //Выбираем только те посты, которые относятся к текущей странице.

        paginatedData.forEach((el) => {
            const postEl = document.createElement("div"); // Создаем div для каждого поста
            postEl.classList.add("post"); // Добавляем класс "post" для стилизации
            postEl.innerText = `${el.title}`; // Вставляем в div заголовок поста
            postsEl.appendChild(postEl); // Добавляем div с постом в контейнер

        });

    }

    function displayPagination(arrData, rowPerPage){
        const paginationEl = document.querySelector(".pagination");
        paginationEl.innerHTML = ""; // Очищаем пагинацию перед добавлением новых кнопок

        // Рассчитываем количество страниц. Для этого делим общее количество элементов (длина массива arrData)
        // на количество элементов на одной странице (rowPerPage) и округляем результат вверх
        const pagesCount = Math.ceil(arrData.length / rowPerPage);
        const ulEl = document.createElement("ul");
        ulEl.classList.add("pagination__list");

        // Цикл for для создания каждой кнопки пагинации
        for(let i = 0; i < pagesCount; i++){
            // Создаем элемент "li" для конкретной кнопки пагинации, передавая номер страницы (i + 1)
            const liEl = displayPaginationBtn(i + 1);
            ulEl.appendChild(liEl);
        }
         // После того как все кнопки добавлены в "ul", добавляем весь список "ul" в контейнер ".pagination"
        paginationEl.appendChild(ulEl);
    }

    function displayPaginationBtn(page){
        const liEl = document.createElement("li");
        liEl.classList.add("pagination__item");
        liEl.innerText = page;

        if(currentPage === page) liEl.classList.add('pagination__item--active');

        liEl.addEventListener("click", () => {
            currentPage = page;
            displayList(postsData, rows, currentPage);

            // Находим текущий активный элемент пагинации (кнопку с классом 'pagination__item--active')
            let currentItemLi = document.querySelector("li.pagination__item--active");
            // Если активный элемент найден, удаляем у него класс 'pagination__item--active'
            if (currentItemLi) currentItemLi.classList.remove("pagination__item--active");
             // Добавляем класс 'pagination__item--active' к текущей кнопке, чтобы она стала активной
            liEl.classList.add("pagination__item--active")
        })
        // Возвращаем элемент "li", который представляет кнопку пагинации для определенной страницы
        return liEl;
    }

    displayList(postsData, rows, currentPage);
    displayPagination(postsData, rows);
    
}

main();