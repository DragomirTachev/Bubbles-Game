$(document).ready(() => {
    const MAX_ALLOWED_BUBBLES = 200;
    const BUBBLE_DIMENSION = 200;
    const pallettes = [];
    let nextZIndex = 0;
    let redValue = 0;
    let greenValue = 0;
    let blueValue = 0;
    let currentDiameter = 100;

    function createNewCircle(xPos, yPos) {
        let DOMElem = $('<div></div>');

        if (nextZIndex > MAX_ALLOWED_BUBBLES) {
            nextZIndex = 0;
            $('body').html('');
        }

        let opacity = Math.random().toFixed(1);
        opacity = opacity < 0.5 ? 0.5 : opacity;

        DOMElem.addClass('sphere');
        DOMElem.css('z-index', ++nextZIndex);
        DOMElem.css('height', `${currentDiameter}px`);
        DOMElem.css('width', `${currentDiameter}px`);
        DOMElem.css('left', Math.round(xPos - (currentDiameter / 2)) + 'px');
        DOMElem.css('top', Math.round(yPos - (currentDiameter / 2)) + 'px');
        DOMElem.css('background-color', 'rgba(' +
            redValue + ',' +
            greenValue + ',' +
            blueValue + ',' + '1)');
        $('body').append(DOMElem);
    }

    function calculateColor() {
        $('.color-demo').css('background-color', 'rgb(' + redValue + ',' + greenValue + ',' + blueValue + ')');
    }

    function resetPallettes() {
        $('body .recent-colors-container').html('');
        pallettes.forEach((pallette, ind) => {
            if (ind < 5) {
                let newPallete = $('<div class="pallette-cube"></div>');
                newPallete.css('background-color', 'rgba(' + pallette.red
                    + ',' + pallette.green + ',' + pallette.blue + ',1)');

                $('body .recent-colors-container').append(newPallete);



            }
        })
    }

    $('body').on('mousedown', (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        ev.cancelBubble = true;
        createNewCircle(ev.offsetX, ev.offsetY);
    });

    $('body #shape-diameter').on('change', (ev) => {
        currentDiameter = ev.target.value;
        $('body .diameter-value').text(currentDiameter);
    });


    $('body').on('mousedown', '.helper-panel', (ev) => {
        ev.stopPropagation();
    });

    $('body').on('contextmenu', () => {
        return false;
    });

    $('body').on('mousedown', '.sphere', (ev) => {
        createNewCircle(ev.offsetX + ev.target.offsetLeft, ev.offsetY + ev.target.offsetTop);
        ev.preventDefault();
        ev.stopPropagation();
    });

    $('body input#red-value').on('mouseup', (ev) => {
        redValue = ev.target.value;
        $('.red-value').text(redValue);
        calculateColor();
    });

    $('body input#green-value').on('mouseup', (ev) => {
        greenValue = ev.target.value;
        $('.green-value').text(greenValue);
        calculateColor();
    });

    $('body input#blue-value').on('mouseup', (ev) => {
        blueValue = ev.target.value;
        $('.blue-value').text(blueValue);
        calculateColor();
    });


    $('body .clear').on('mousedown', () => {
        $('body input#red-value').val(0);
        $('body input#green-value').val(0);
        $('body input#blue-value').val(0);
        redValue = 0;
        $('.red-value').text(redValue);
        greenValue = 0;
        $('.green-value').text(greenValue);
        blueValue = 0;
        $('.blue-value').text(blueValue);
        calculateColor();
    });

    $('body .add-pallette').on('mousedown', () => {
        pallettes.unshift({
            red: redValue,
            green: greenValue,
            blue: blueValue
        });

        resetPallettes();
    });

    $('body .recent-colors-container').on('mousedown', '.pallette-cube', (ev) => {
        const $target = $(ev.target);
        const rgbOfSelected = $target.css('background-color');
        const indexOfOpening = rgbOfSelected.indexOf('(');
        const indexOfClosing = rgbOfSelected.indexOf(')');
        const colorValueString = rgbOfSelected.substring(indexOfOpening + 1, indexOfClosing);
        const colorValuesArr = colorValueString.split(',');
        redValue = colorValuesArr[0];
        greenValue = colorValuesArr[1];
        blueValue = colorValuesArr[2];
        $('body input#red-value').val(redValue);
        $('body input#green-value').val(greenValue);
        $('body input#blue-value').val(blueValue);
        $('.red-value').text(redValue);
        $('.green-value').text(greenValue);
        $('.blue-value').text(blueValue);
    });
})