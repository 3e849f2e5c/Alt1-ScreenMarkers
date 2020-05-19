/**
 * Created by aneko on 5/16/16.
 */

// delay before the overlays disappear in milliseconds.
var delay = 1050;
// how long before the overlays are drawn again in milliseconds.
var tick = 1000;
// array of the overlays.
var markers = [];

var setareatimer = false;

// Mouse selection coordinates.
var pos1 = null;
var pos2 = null;

// if the current dialog is for rectangles.
var isRect = false;
// if the current dialog if for editing an existing overlay.
var isEditor = false;

var isCapturingMouse = false;

// called when the app is loaded.
function start()
{
    cancel();
    startTick();
    // noinspection JSUnresolvedVariable
    alt1.events.alt1pressed.push(alt1key);
    // noinspection JSUnresolvedVariable, JSUnresolvedFunction
    a1lib.identifyUrl("appconfig.json");
}

// Key listener for the Alt+1 key combination.
function alt1key(e)
{
    if (!pos1)
    {
        if (isRect)
        {
            // noinspection JSUnresolvedFunction, JSUnresolvedVariable
            alt1.setTooltip("Select the bottom right position and press Alt+1");
        }
        else
        {
            // noinspection JSUnresolvedFunction, JSUnresolvedVariable
            alt1.setTooltip("Select the second position and press Alt+1");
        }
        pos1 = a1lib.mousePosition();
    }
    else if (!pos2)
    {
        pos2 = a1lib.mousePosition();

        if (setareatimer)
        {
            clearInterval(setareatimer);
            clearOverlay("markerareaselect_" + (drawcounter - 1));
        }

        // noinspection JSUnresolvedFunction, JSUnresolvedVariable
        alt1.setTooltip("");
        enableAllButtons();

        if (isRect)
        {
            if (isEditor)
            {
                var x = document.getElementById("xInputE");
                var y = document.getElementById("yInputE");
                var w = document.getElementById("WidthInputE");
                var h = document.getElementById("HeightInputE");

                if ((pos2.x - pos1.x) < 0 || (pos2.y - pos1.y) < 0)
                {
                    return;
                }

                x.value = pos1.x;
                y.value = pos1.y;
                w.value = pos2.x - pos1.x;
                h.value = pos2.y - pos1.y;

                saveRect();
            }
            else
            {

                var x2 = document.getElementById("xInput");
                var y2 = document.getElementById("yInput");
                var w2 = document.getElementById("WidthInput");
                var h2 = document.getElementById("HeightInput");

                if ((pos2.x - pos1.x) < 0 || (pos2.y - pos1.y) < 0)
                {
                    return;
                }

                x2.value = pos1.x;
                y2.value = pos1.y;
                w2.value = pos2.x - pos1.x;
                h2.value = pos2.y - pos1.y;
            }
        }
        else
        {
            if (isEditor)
            {
                var x3 = document.getElementById("xInputE2");
                var y3 = document.getElementById("yInputE2");
                var x22 = document.getElementById("WidthInputE2");
                var y22 = document.getElementById("HeightInputE2");
                x3.value = pos1.x;
                y3.value = pos1.y;
                x22.value = pos2.x;
                y22.value = pos2.y;
                saveLine();
            }
            else
            {
                var x4 = document.getElementById("xInput2");
                var y4 = document.getElementById("yInput2");
                var x23 = document.getElementById("x2Input");
                var y23 = document.getElementById("y2Input");
                x4.value = pos1.x;
                y4.value = pos1.y;
                x23.value = pos2.x;
                y23.value = pos2.y;
                saveLine();
            }
        }
        clearOverlay("Markers");
        drawOverlays();
    }
}

// starts drawing the preview overlay.
function setarea()
{
    disableAllButtons();
    pos1 = pos2 = null;

    if (isRect)
    {
        // noinspection JSUnresolvedFunction, JSUnresolvedVariable
        alt1.setTooltip("Select the top left position and press Alt+1");
        setareatimer = setInterval(drawarea, 20);
    }
    else
    {
        // noinspection JSUnresolvedFunction, JSUnresolvedVariable
        alt1.setTooltip("Select the first position and press Alt+1");
        setareatimer = setInterval(drawarea2, 20);
    }
}

var drawcounter = 0;

// draws the preview overlay for rectangles.
function drawarea()
{
    //noinspection JSUnresolvedFunction, JSUnresolvedVariable
    setOverlayG("markerareaselect_" + drawcounter);
    if (pos1)
    {
        var p2 = pos2 || a1lib.mousePosition();
        //noinspection JSUnresolvedFunction, JSUnresolvedVariable
        alt1.overLayRect(colorMix(255, 0, 0, 255), pos1.x, pos1.y, p2.x - pos1.x, p2.y - pos1.y, 1000, 5);

    }

    //noinspection JSUnresolvedFunction, JSUnresolvedVariable
    clearOverlay("markerareaselect_" + (drawcounter - 1));
    drawcounter++;
}

// draws the preview overlay for lines.
function drawarea2()
{
    setOverlayG("markerareaselect_" + drawcounter);
    if (pos1)
    {
        var p2 = pos2 || a1lib.mousePosition();
        //noinspection JSUnresolvedFunction, JSUnresolvedVariable
        alt1.overLayLine(colorMix(255, 0, 0, 255), 5, pos1.x, pos1.y, p2.x, p2.y, 1000);
    }

    clearOverlay("markerareaselect_" + (drawcounter - 1));
    drawcounter++;
}

/**
 * Clears all overlays in the group.
 * @param {String} name - the group name.
 */
function clearOverlay(name)
{
    //noinspection JSUnresolvedFunction, JSUnresolvedVariable
    alt1.overLayClearGroup(name);
}

/**
 * Sets the current overlay group name.
 * @param {String} name - the group name.
 */
function setOverlayG(name)
{
    //noinspection JSUnresolvedFunction, JSUnresolvedVariable
    alt1.overLaySetGroup(name);
}

/**
 * Open the editor window for a marker
 * @param {String} name - name of the overlay.
 */
function openEditorFor(name)
{

    if (isCapturingMouse)
    {
        return;
    }

    for (var i = 0; i < markers.length; i++)
    {
        if (name == markers[i].name)
        {
            var r3 = document.getElementById("menu-rect");
            var l = document.getElementById("menu-line");
            var re = document.getElementById("edit-rect");
            var le = document.getElementById("edit-line");

            isEditor = true;

            // Rectangle.
            if (!markers[i].style)
            {
                var r = document.getElementById("colorRedE");
                var g = document.getElementById("colorGreenE");
                var b = document.getElementById("colorBlueE");
                var name2 = document.getElementById("nameE");
                var x = document.getElementById("xInputE");
                var y = document.getElementById("yInputE");
                var w = document.getElementById("WidthInputE");
                var h = document.getElementById("HeightInputE");
                var lw = document.getElementById("lineWidthE");

                r.value = markers[i].red;
                g.value = markers[i].green;
                b.value = markers[i].blue;
                name2.value = markers[i].name;
                x.value = markers[i].x;
                y.value = markers[i].y;
                w.value = markers[i].width;
                h.value = markers[i].height;
                lw.value = markers[i].lineWidth;

                r3.hidden = true;
                l.hidden = true;
                re.hidden = false;
                le.hidden = true;
                isRect = true;
                changeColorE();
                return;
            }
            else // Line.
            {
                var r2 = document.getElementById("colorRedE2");
                var g2 = document.getElementById("colorGreenE2");
                var b2 = document.getElementById("colorBlueE2");
                var name3 = document.getElementById("nameE2");
                var x2 = document.getElementById("xInputE2");
                var y2 = document.getElementById("yInputE2");
                var x22 = document.getElementById("WidthInputE2");
                var y22 = document.getElementById("HeightInputE2");
                var lw2 = document.getElementById("lineWidthE2");

                r2.value = markers[i].red;
                g2.value = markers[i].green;
                b2.value = markers[i].blue;
                name3.value = markers[i].name;
                x2.value = markers[i].x;
                y2.value = markers[i].y;
                x22.value = markers[i].x2;
                y22.value = markers[i].y2;
                lw2.value = markers[i].lineWidth;

                r3.hidden = true;
                l.hidden = true;
                re.hidden = true;
                le.hidden = false;
                isRect = false;
                changeColorE2();
                return;
            }
        }
    }
}

// writes the changes of the overlay.
function saveRect()
{
    var r = parseInt(document.getElementById("colorRedE").value);
    var g = parseInt(document.getElementById("colorGreenE").value);
    var b = parseInt(document.getElementById("colorBlueE").value);
    var name2 = document.getElementById("nameE").value;
    var x = parseInt(document.getElementById("xInputE").value);
    var y = parseInt(document.getElementById("yInputE").value);
    var w = parseInt(document.getElementById("WidthInputE").value);
    var h = parseInt(document.getElementById("HeightInputE").value);
    var lw = parseInt(document.getElementById("lineWidthE").value);

    for (var i = 0; i < markers.length; i++)
    {
        if (markers[i].name == name2)
        {
            markers[i].red = r;
            markers[i].green = g;
            markers[i].blue = b;
            markers[i].x = x;
            markers[i].y = y;
            markers[i].width = w;
            markers[i].height = h;
            markers[i].lineWidth = lw;
            updateHTMLColor(name2, r, g, b);
            return;
        }
    }
}

// writes the saved changes of the overlay.
function saveLine()
{
    var r = parseInt(document.getElementById("colorRedE2").value);
    var g = parseInt(document.getElementById("colorGreenE2").value);
    var b = parseInt(document.getElementById("colorBlueE2").value);
    var name2 = document.getElementById("nameE2").value;
    var x = parseInt(document.getElementById("xInputE2").value);
    var y = parseInt(document.getElementById("yInputE2").value);
    var x2 = parseInt(document.getElementById("WidthInputE2").value);
    var y2 = parseInt(document.getElementById("HeightInputE2").value);
    var lw = parseInt(document.getElementById("lineWidthE2").value);

    for (var i = 0; i < markers.length; i++)
    {
        if (markers[i].name == name2)
        {
            markers[i].red = r;
            markers[i].green = g;
            markers[i].blue = b;
            markers[i].x = x;
            markers[i].y = y;
            markers[i].x2 = x2;
            markers[i].y2 = y2;
            markers[i].lineWidth = lw;
            updateHTMLColor(name2, r, g, b);
            return;
        }
    }
}

// disables all buttons in the dialogs.
function disableAllButtons()
{
    for (var i = 1; i < 13; i++)
    {
        document.getElementById("button" + i).disabled = true;
    }
    isCapturingMouse = true;
}

// enables all buttons in the dialogs.
function enableAllButtons()
{
    for (var i = 1; i < 13; i++)
    {
        document.getElementById("button" + i).disabled = false;
    }

    isCapturingMouse = false;
}

// called when the app is loaded and then continues to loop.
function startTick()
{
    setTimeout(function ()
    {
        drawOverlays();
        update();
        startTick();
    }, tick);
}

// called every X milliseconds defined by the tick variable.
function update()
{

}

// called when the add rect button is pressed.
function buttonFuncRect()
{
    if (isCapturingMouse)
    {
        return;
    }

    var r = document.getElementById("menu-rect");
    var l = document.getElementById("menu-line");
    var re = document.getElementById("edit-rect");
    var le = document.getElementById("edit-line");
    var ee = document.getElementById("inputexport");

    r.hidden = false;
    l.hidden = true;
    re.hidden = true;
    le.hidden = true;
    ee.hidden = true;
    isRect = true;
    isEditor = false;
}

// called when the input/export button is pressed.
function buttonFuncIE()
{
    if (isCapturingMouse)
    {
        return;
    }

    var r = document.getElementById("menu-rect");
    var l = document.getElementById("menu-line");
    var re = document.getElementById("edit-rect");
    var le = document.getElementById("edit-line");
    var ee = document.getElementById("inputexport");

    r.hidden = true;
    l.hidden = true;
    re.hidden = true;
    le.hidden = true;
    ee.hidden = false;
}

// called when the add line button is pressed.
function buttonFuncLine()
{

    if (isCapturingMouse)
    {
        return;
    }

    var r = document.getElementById("menu-rect");
    var l = document.getElementById("menu-line");
    var re = document.getElementById("edit-rect");
    var le = document.getElementById("edit-line");
    var ee = document.getElementById("inputexport");

    l.hidden = false;
    r.hidden = true;
    re.hidden = true;
    le.hidden = true;
    ee.hidden = true;
    isRect = false;
    isEditor = false;
}

// changes color of the rectangle adding menu.
function changeColor()
{
    var e = document.getElementById("menu-rect");
    var r = document.getElementById("colorRed").value;
    var g = document.getElementById("colorGreen").value;
    var b = document.getElementById("colorBlue").value;
    e.style.backgroundColor = "rgba(" + r + ", " + g + ", " + b + ",0.7)";
}

// changes color of the line adding menu.
function changeColor2()
{
    var e = document.getElementById("menu-line");
    var r = document.getElementById("colorRed2").value;
    var g = document.getElementById("colorGreen2").value;
    var b = document.getElementById("colorBlue2").value;
    e.style.backgroundColor = "rgba(" + r + ", " + g + ", " + b + ",0.7)";
}

// Changes the color of the rectangle editor.
function changeColorE()
{
    var e = document.getElementById("edit-rect");
    var r = document.getElementById("colorRedE").value;
    var g = document.getElementById("colorGreenE").value;
    var b = document.getElementById("colorBlueE").value;
    e.style.backgroundColor = "rgba(" + r + ", " + g + ", " + b + ",0.7)";
}

// Changes the color of the line editor.
function changeColorE2()
{
    var e = document.getElementById("edit-line");
    var r = document.getElementById("colorRedE2").value;
    var g = document.getElementById("colorGreenE2").value;
    var b = document.getElementById("colorBlueE2").value;
    e.style.backgroundColor = "rgba(" + r + ", " + g + ", " + b + ",0.7)";
}

// adds a rectangle to the array when the button is pressed.
function addRectBtn()
{
    var r = parseInt(document.getElementById("colorRed").value);
    var g = parseInt(document.getElementById("colorGreen").value);
    var b = parseInt(document.getElementById("colorBlue").value);
    var name = document.getElementById("name").value;
    var x = parseInt(document.getElementById("xInput").value);
    var y = parseInt(document.getElementById("yInput").value);
    var w = parseInt(document.getElementById("WidthInput").value);
    var h = parseInt(document.getElementById("HeightInput").value);
    var lw = parseInt(document.getElementById("lineWidth").value);

    if (!isNameValid(name, "name"))
    {
        return;
    }

    addRect(name, r, g, b, 255, x, y, w, h, lw);
    cancel();
}

// Add a line by pressing the button.
function addLineBtn()
{
    var r = parseInt(document.getElementById("colorRed2").value);
    var g = parseInt(document.getElementById("colorGreen2").value);
    var b = parseInt(document.getElementById("colorBlue2").value);
    var name = document.getElementById("name2").value;
    var x = parseInt(document.getElementById("xInput2").value);
    var y = parseInt(document.getElementById("yInput2").value);
    var x2 = parseInt(document.getElementById("x2Input").value);
    var y2 = parseInt(document.getElementById("y2Input").value);
    var lw = parseInt(document.getElementById("lineWidth2").value);

    if (!isNameValid(name, "name2"))
    {
        return;
    }

    addLine(name, r, g, b, 255, x, y, x2, y2, lw);
    cancel();
}

/**
 * Check if the given name is valid.
 * @param {String} name - name that the user has given
 * @param {String} name2 - name of the menu's name input
 * @return {boolean} true if the name is valid, false if not.
 */
function isNameValid(name, name2)
{
    var e = document.getElementById(name2);

    if (name == "Name already in use!")
    {
        return false;
    }

    if (name == "Name cannot contain \"|\" or \"&\"!")
    {
        return false;
    }

    if (name == "")
    {
        return false;
    }

    for (var i = 0; i < markers.length; i++)
    {
        if (markers[i].name == name)
        {
            e.value = "Name already in use!";
            return false;
        }
    }

    if (name.indexOf("|") == -1 && name.indexOf("&") == -1)
    {
        return true;
    }
    else
    {
        e.value = "Name can't contain \"|\" or \"&\"!";
        return false;
    }
}

// exports the settings to a string.
function exportToString()
{
    var s = "";

    if (markers.length == 0)
    {
        return;
    }

    for (var i = 0; i < markers.length; i++)
    {
        var marker = markers[i];

        if (markers[i].style) // Line
        {
            s += "&true|" + marker.name + "|" + marker.red + "|" + marker.green + "|" + marker.blue + "|" + marker.x + "|" + marker.y + "|" + marker.x2 + "|" + marker.y2 + "|" + marker.lineWidth;
        }
        else // Rect
        {
            s += "&false|" + marker.name + "|" + marker.red + "|" + marker.green + "|" + marker.blue + "|" + marker.x + "|" + marker.y + "|" + marker.width + "|" + marker.height + "|" + marker.lineWidth;
        }
    }

    s = s.substr(1);
    document.getElementById("IEField").value = s;
}

// Loads a preset from a string.
function applyImport()
{
    var imp = document.getElementById("IEField").value;

    if (imp == "")
    {
        return;
    }

    var splits = imp.split("&");

    for (var i = 0; i < splits.length; i++)
    {
        var split2 = splits[i].split("|");

        var name = split2[1];
        var red = parseInt(split2[2]);
        var green = parseInt(split2[3]);
        var blue = parseInt(split2[4]);
        var x = parseInt(split2[5]);
        var y = parseInt(split2[6]);
        var w = parseInt(split2[7]);
        var h = parseInt(split2[8]);
        var lw = parseInt(split2[9]);

        if (split2[0] == "true") // Line
        {
            addLine(name, red, green, blue, 255, x, y, w, h, lw);
        }
        else // Rect
        {
            addRect(name, red, green, blue, 255, x, y, w, h, lw);
        }
    }
}

// Removes all the menus on screen.
function cancel()
{
    var r = document.getElementById("menu-rect");
    var l = document.getElementById("menu-line");
    var re = document.getElementById("edit-rect");
    var le = document.getElementById("edit-line");
    var ee = document.getElementById("inputexport");

    l.hidden = true;
    r.hidden = true;
    le.hidden = true;
    re.hidden = true;
    ee.hidden = true;

    document.getElementById("colorRed2").value = 255;
    document.getElementById("colorGreen2").value = 255;
    document.getElementById("colorBlue2").value = 255;
    document.getElementById("name2").value = "";
    document.getElementById("xInput2").value = 0;
    document.getElementById("yInput2").value = 0;
    document.getElementById("x2Input").value = 0;
    document.getElementById("y2Input").value = 0;
    document.getElementById("lineWidth2").value = 0;

    document.getElementById("colorRed").value = 255;
    document.getElementById("colorGreen").value = 255;
    document.getElementById("colorBlue").value = 255;
    document.getElementById("name").value = "";
    document.getElementById("xInput").value = 0;
    document.getElementById("yInput").value = 0;
    document.getElementById("WidthInput").value = 0;
    document.getElementById("HeightInput").value = 0;
    document.getElementById("lineWidth").value = 0;
    changeColor();
    changeColor2();
}

// called every X milliseconds defined bu the tick variable; used for drawing overlays.
function drawOverlays()
{
    for (var i = 0; i < markers.length; i++)
    {
        var red = markers[i].red;
        var green = markers[i].green;
        var blue = markers[i].blue;
        var alpha = markers[i].alpha;

        var x = markers[i].x;
        var y = markers[i].y;
        var lineWidth = markers[i].lineWidth;

        // noinspection JSUnresolvedVariable, JSUnresolvedFunction

        // Rectangle
        if (!markers[i].style)
        {
            var width = markers[i].width;
            var height = markers[i].height;

            setOverlayG("Markers");
            drawRect(colorMix(red, green, blue, alpha), x, y, width, height, lineWidth);
        }
        else // Line
        {
            var x2 = markers[i].x2;
            var y2 = markers[i].y2;

            setOverlayG("Markers");
            drawLine(colorMix(red, green, blue, alpha), x, y, x2, y2, lineWidth);
        }
    }
}

/**
 * Remove an overlay from the array using the overlay's name.
 * @param {String} name - name of the overlay.
 */
function removeMarkerString(name)
{
    if (markers.length == 0)
    {
        return;
    }

    for (var i = 0; i < markers.length; i++)
    {
        if (markers[i].name == name)
        {
            removeMarkerInt(i);
        }
    }
}

/**
 * Remove an overlay from the array using a number.
 * @param {int} number - the index to remove from the array.
 */
function removeMarkerInt(number)
{
    markers.splice(number, 1);
}

/**
 * Add a rectangle to the screen marker array.
 * @param {String} name - name of the overlay for the dropdown menu.
 * @param {int} red - rgba red. (0-255)
 * @param {int} green - rgba green. (0-255)
 * @param {int} blue - rgba blue. (0-255)
 * @param {int} alpha - overlay transparency. (0-255) (Has somme issues when not 255 or 0)
 * @param {int} x - x position of the rectangle.
 * @param {int} y - y position of the rectangle.
 * @param {int} width - rectangle width.
 * @param {int} height - rectangle height.
 * @param {int} lineWidth - the line width of the rectangle. (0-10)
 */
function addRect(name, red, green, blue, alpha, x, y, width, height, lineWidth)
{
    markers.push({
        style: false,
        name: name,
        red: red,
        green: green,
        blue: blue,
        alpha: alpha,
        x: x,
        y: y,
        width: width,
        height: height,
        lineWidth: lineWidth
    });

    addToHTML(red, green, blue, name);
}

/**
 * Adds the HTML elements for a user interactions.
 * @param {int} red
 * @param {int} green
 * @param {int} blue
 * @param {String} name - name of the overlay.
 */
function addToHTML(red, green, blue, name)
{
    var btn = document.createElement("div");
    var t = document.createTextNode(name);
    var b1 = document.createElement("BUTTON");
    var t1 = document.createTextNode("Remove");

    var b2 = document.createElement("BUTTON");
    var t2 = document.createTextNode("Edit");

    b1.setAttribute("style", "float: right;");
    b1.appendChild(t1);
    b2.setAttribute("style", "float: right; margin-right: 2px;");
    b2.appendChild(t2);

    btn.setAttribute("class", "overlayList");
    btn.setAttribute("id", "list" + name.replace(" ", ""));
    b1.setAttribute("onclick", "removeOverlay(\"" + name + "\", \"" + btn.id + "\")");
    b2.setAttribute("onclick", "openEditorFor(\"" + name + "\")");
    btn.appendChild(b1);
    btn.appendChild(b2);
    btn.appendChild(t);

    btn.style.backgroundColor = "rgba(" + red + ", " + green + ", " + blue + ",1)";
    var e = document.getElementById("overList");
    e.appendChild(btn);
}

// updates the colors in the HTML list.
function updateHTMLColor(name, r, g, b)
{
    var e = document.getElementById("list" + name.replace(" ", ""));
    e.style.backgroundColor = "rgba(" + r + ", " + g + ", " + b + ",1)";
}

// removes the overlay from the HTML and array.
function removeOverlay(name, btn)
{
    document.getElementById("overList").removeChild(document.getElementById(btn));
    removeMarkerString(name);

    var re = document.getElementById("edit-rect");
    var le = document.getElementById("edit-line");

    le.hidden = true;
    re.hidden = true;
}

/**
 * Add a line to the screen marker array
 * @param {String} name - name of the overlay for the dropdown menu.
 * @param {int} red - rgba red. (0-255)
 * @param {int} green - rgba green. (0-255)
 * @param {int} blue - rgba blue. (0-255)
 * @param {int} alpha - overlay transparency. (0-255) (Has some issues when not 255 or 0)
 * @param {int} x - first x position of the line.
 * @param {int} y - first y position of the line.
 * @param {int} x2 - second x position of the line.
 * @param {int} y2 - second y position of the line.
 * @param {int} lineWidth - the line width of the line. (0-10)
 */
function addLine(name, red, green, blue, alpha, x, y, x2, y2, lineWidth)
{
    markers.push({
        style: true,
        name: name,
        red: red,
        green: green,
        blue: blue,
        alpha: alpha,
        x: x,
        y: y,
        x2: x2,
        y2: y2,
        lineWidth: lineWidth
    });

    addToHTML(red, green, blue, name);
}

/**
 *  Draw a rectangle.
 *  @param {int} color - the 8bpp color of the rectangle; use colorMix(red, green, blue, alpha) to convert rgba.
 *  @param {int} x - x position of the rectangle.
 *  @param {int} y - y position of the rectangle.
 *  @param {int} width - rectangle width.
 *  @param {int} height - rectangle height.
 *  @param {int} lineWidth - the line width of the rectangle. (0-10)
 */
function drawRect(color, x, y, width, height, lineWidth)
{
    //noinspection JSUnresolvedFunction,JSUnresolvedVariable
    alt1.overLayRect(color, x, y, width, height, delay, lineWidth);
}

/**
 *  Draw a line.
 *  @param {int} color - the 8bpp color of the line; use colorMix(red, green, blue, alpha) to convert rgba.
 *  @param {int} x - first x position of the line.
 *  @param {int} y - first y position of the line.
 *  @param {int} x2 - second x position of the line.
 *  @param {int} y2 - second y position of the line.
 *  @param {int} lineWidth - the line width of the rectangle (0-10).
 */
function drawLine(color, x, y, x2, y2, lineWidth)
{
    //noinspection JSUnresolvedFunction,JSUnresolvedVariable,Used
    alt1.overLayLine(color, lineWidth, x, y, x2, y2, delay);
}

/**
 * Used to convert rgba to 8bpp color.
 * @param {int} r - red. (0-255)
 * @param {int} g - green. (0-255)
 * @param {int} b - blue. (0-255)
 * @param {int} a - alpha. (0-255)
 * @returns {int} returns the 8bpp color from rgba.
 */
function colorMix(r, g, b, a)
{
    return a1lib.mixcolor(r, g, b, a);
}