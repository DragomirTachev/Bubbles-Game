$(document).ready(() => {
    const pallettes = [];
    let nextZIndex = 0;
    let redValue = 0;
    let greenValue = 0;
    let blueValue = 0;
    let currentDiameter = 100;
    let canWrite = false;
    let timer;

    function createNewCircle(xPos, yPos) {
        let DOMElem = $('<div></div>');

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

    function checkWriteConditions(ev) {
        if (canWrite) {
            createNewCircle(ev.clientX, ev.clientY);
            canWrite = false;
            timer = setTimeout(() => {
                canWrite = true;
            }, 5);
        }
    }

    $('body').on('mousedown', (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        createNewCircle(ev.clientX, ev.clientY);
        canWrite = true;
    });

    $('body').on('mouseup', (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        clearTimeout(timer);
        canWrite = false;
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
        ev.preventDefault();
        ev.stopPropagation();
        createNewCircle(ev.clientX, ev.clientY);
        canWrite = true;
    });

    $('body').on('mouseup', '.sphere', (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        clearTimeout(timer);
        canWrite = false;
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

    /** when having more than 1 monitor, when holding the mouse key and
     *  leaving the painting screen, avoid a bug when reentering, that cause the 
     * painting process to continue even if the mouse key is no longer being pressed
    */
    $('body').on('mouseleave', () => {
        canWrite = false;
        $('body').trigger('mouseup');
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

    $('body').on('mousemove', (ev) => {
        checkWriteConditions(ev);
    });

    $('body').on('mousemove', '.sphere', (ev) => {
        checkWriteConditions(ev)
    });
});
