$(document).ready(() => {
    let nextZIndex = 0;

    function createNewShape() {
        let screenWidth = $('html').width();
        let screenHeight = $('html').height();
        let DOMElem = $('<div></div>');

        if (nextZIndex > 150) {
            nextZIndex = 0;
            $('body').html('');
        }

        DOMElem.addClass('sphere');
        DOMElem.css('z-index', ++nextZIndex);
        DOMElem.css('left', Math.round(Math.random() * screenWidth - 50) + 'px');
        DOMElem.css('top', Math.round(Math.random() * screenHeight - 50) + 'px');
        DOMElem.css('background-color', 'rgba(' +
            Math.round(Math.random() * 256) + ',' +
            Math.round(Math.random() * 256) + ',' +
            Math.round(Math.random() * 256) + ',' +
            Math.random().toFixed(1) + ')');
        $('body').append(DOMElem);
    }

    $('body').on('click', () => {
        createNewShape();
    });

    $('body').on('click', '.sphere', (ev) => {
        ev.target.remove();
        ev.preventDefault();
        ev.stopPropagation();
    });
})