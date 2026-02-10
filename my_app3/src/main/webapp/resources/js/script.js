document.addEventListener("DOMContentLoaded", function () {

    // var rSpinnerInput = document.getElementById("main-form:rSpinner_input");
    // if (rSpinnerInput) {
    //     rSpinnerInput.addEventListener("change", function() {
    //         updateRValue();
    //     });
    // }

    const catcher = document.getElementById('click_catcher');
    if (!catcher) return;

    catcher.addEventListener('mousemove', function (evt) {
        const target = evt.target;

        const offset = getCoords(target);
        const width = offset.right - offset.left;
        const height = offset.bottom - offset.top;

        const x = (evt.pageX - offset.left - width / 2) / (width / 2) * (5 / 2 * 3);
        const y = -((evt.pageY - offset.top - height / 2) / (height / 2) * (5 / 2 * 3));

        drawOMarker(x, y);

        document.getElementById("hidden-form:graph-x").value = x;
        document.getElementById("hidden-form:graph-y").value = y;
        document.getElementById("hidden-form:graph-r").value = getR();
    });

    catcher.addEventListener('mouseleave', deleteOMarker);

    catcher.addEventListener('click', function () {
        document.getElementById("hidden-form:graph-send").click();
    });
});

// function getR() {
//     const rInput = document.getElementById("main-form:rSpinner_input");
//     if (rInput) {
//         return parseFloat(rInput.value) || 2.0;
//     }
//     return 2.0;
// }
function getR() {
    const spinner = document.getElementById("main-form:rSpinner_input");
    return spinner ? parseFloat(spinner.value) : null;
}

// function updateRValue() {
//     var r = getR();
//     redrawFigure(r);
//     document.getElementById("hidden-form:graph-r").value = r;
// }

function handleRChange() {
    const r = getR();
    if (r !== null) {
        redrawFigure(r);
    }
}

/* ===== Utils ===== */

function getCoords(elem) {
    const box = elem.getBoundingClientRect();

    return {
        top: box.top + window.pageYOffset,
        right: box.right + window.pageXOffset,
        bottom: box.bottom + window.pageYOffset,
        left: box.left + window.pageXOffset
    };
}

/* ===== SVG ===== */

function drawOMarker(x, y) {
    deleteOMarker();

    const svg = document.getElementById('graph');
    if (!svg) return;

    const circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    circle.setAttribute('cx', (x * 20 + 150).toString());
    circle.setAttribute('cy', (-y * 20 + 150).toString());
    circle.setAttribute('r', '6');
    circle.setAttribute('stroke', 'rgb(174, 193, 187)');
    circle.setAttribute('stroke-width', '5');
    circle.setAttribute('fill-opacity', '0');
    circle.id = "selected_pos";

    svg.appendChild(circle);
}

function deleteOMarker() {
    const circle = document.getElementById('selected_pos');
    if (circle && circle.parentNode) {
        circle.parentNode.removeChild(circle);
    }
}

function drawDot(x, y, checked) {
    const svg = document.getElementById('graph');
    if (!svg) return;

    const circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    circle.setAttribute('cx', (x * 20 + 150).toString());
    circle.setAttribute('cy', (-y * 20 + 150).toString());
    circle.setAttribute('r', '4');
    circle.classList.add("littleDot");
    circle.setAttribute('fill', checked ? 'mediumspringgreen' : 'palevioletred');

    svg.appendChild(circle);
}

function redrawFigure(scale) {
    const f1 = document.getElementById("figure1");
    const f2 = document.getElementById("figure2");
    const f3 = document.getElementById("figure3");

    if (!f1 || !f2 || !f3) return;

    f1.setAttribute(
        'points',
        "150,150 " + (150 + 10 * scale) + ", 150 150," + (150 + 20 * scale)
    );

    f2.setAttribute(
        'points',
        `150,150
        ${150 + 10 * scale},150
        ${150 + 10 * scale},${150 - 20 * scale}
        150,${150 - 20 * scale}`
    );

    f3.setAttribute(
        'd',
        `M ${150 - 20 * scale} 150
        L 150 150 
        L 150 ${150 - 20 * scale} 
        C ${150 - 10 * scale} ${150 - 20 * scale} 
        ${150 - 20 * scale} ${150 - 10 * scale}
        ${150 - 20 * scale} 150 
        Z`
    );
}
