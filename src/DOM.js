/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    const body = document.body;

    while (count) {
        body.insertAdjacentHTML('beforeend', `<${tag}>${content}</${tag}>`);
        count--;
    }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
    const classPrefix = 'item_';
    let currentLevel = 1;
    let rootDiv = document.createElement('div');
    rootDiv.className = classPrefix + currentLevel;

    while (currentLevel !== level) {
        currentLevel++;

        if (currentLevel === 2) {
            for (let j = 0; j < childrenCount; j++) {
                rootDiv.insertAdjacentHTML(
                    'beforeend',
                    `<div class="${classPrefix}${currentLevel}"></div>`,
                );
            }
        } else {
            let divs = rootDiv.getElementsByClassName(
                `${classPrefix}${currentLevel - 1}`,
            );

            for (let i = 0; i < divs.length; i++) {
                for (let j = 0; j < childrenCount; j++) {
                    divs[i].insertAdjacentHTML(
                        'beforeend',
                        `<div class="${classPrefix}${currentLevel}"></div>`,
                    );
                }
            }
        }
    }

    return rootDiv;
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
    let rootDiv = generateTree(2, 3);
    const classLevel2 = 'item_2';

    let divs = rootDiv.getElementsByClassName(classLevel2);
    for (let i = 0; i < 2; i++) {
        let section = document.createElement('section');
        section.className = classLevel2;
        section.innerHTML = divs[i].innerHTML;
        divs[i].after(section);
        divs[i].remove();
    }

    return rootDiv;
}
