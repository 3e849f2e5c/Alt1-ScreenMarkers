/**
 * Created by aneko on 5/16/16.
 */

// delay before the overlays disappear in milliseconds.
var delay = 1050;
// how long before the overlays are drawn again in milliseconds.
var tick = 1000;
// array of the overlays.
var markers = [];

// called when the app is loaded.
function start()
{
    test();
    cancel();
    print("Loaded successfully!");
    startTick();
}

// used for testing; please don't include in final build.
function test()
{
    addRect("Rect 1", 255, 0, 255, 255, 20, 40, 50, 50, 8);
    addLine("Line 1", 255, 255, 0, 255, 80, 40, 120, 40, 4)
}

/**
 * Open the editor window for a marker
 * @param {String} name - name of the overlay.
 */
function openEditorFor(name)
{
    print("started editing for: " + name);
    for (var i = 0; i < markers.length; i++)
    {
        if (name == markers[i].name)
        {

            var r3 = document.getElementById("menu-rect");
            var l = document.getElementById("menu-line");
            var re = document.getElementById("edit-rect");
            var le = document.getElementById("edit-line");

            print(markers[i].name + " mached " + name + "!");
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

                changeColorE2();
                return;
            }
        }
        else
        {
            print(markers[i].name + " did not match " + name + " continuing...")
        }
    }
}

// writes the changes of the overlay.
function saveRect()
{
    print("saving...");
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
    print("saving...");
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


// called when the app is loaded and then continues to loop.
function startTick()
{
    setTimeout(function ()
    {
        print("tick");
        update();
        drawOverlays();
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
    var r = document.getElementById("menu-rect");
    var l = document.getElementById("menu-line");
    var re = document.getElementById("edit-rect");
    var le = document.getElementById("edit-line");

    r.hidden = false;
    l.hidden = true;
    re.hidden = true;
    le.hidden = true;
}

// called when the add line button is pressed.
function buttonFuncLine()
{
    var r = document.getElementById("menu-rect");
    var l = document.getElementById("menu-line");
    var re = document.getElementById("edit-rect");
    var le = document.getElementById("edit-line");

    l.hidden = false;
    r.hidden = true;
    re.hidden = true;
    le.hidden = true;
}

// changes color of the rectangle adding menu.
function changeColor()
{
    var e = document.getElementById("menu-rect");
    var r = document.getElementById("colorRed").value;
    var g = document.getElementById("colorGreen").value;
    var b = document.getElementById("colorBlue").value;
    e.style.backgroundColor = "rgba(" + r + ", " + g + ", " + b + ",0.5)";
}

// changes color of the line adding menu.
function changeColor2()
{
    var e = document.getElementById("menu-line");
    var r = document.getElementById("colorRed2").value;
    var g = document.getElementById("colorGreen2").value;
    var b = document.getElementById("colorBlue2").value;
    e.style.backgroundColor = "rgba(" + r + ", " + g + ", " + b + ",0.5)";
}

// Changes the color of the rectangle editor.
function changeColorE()
{
    var e = document.getElementById("edit-rect");
    var r = document.getElementById("colorRedE").value;
    var g = document.getElementById("colorGreenE").value;
    var b = document.getElementById("colorBlueE").value;
    e.style.backgroundColor = "rgba(" + r + ", " + g + ", " + b + ",0.5)";
}

// Changes the color of the line editor.
function changeColorE2()
{
    var e = document.getElementById("edit-line");
    var r = document.getElementById("colorRedE2").value;
    var g = document.getElementById("colorGreenE2").value;
    var b = document.getElementById("colorBlueE2").value;
    e.style.backgroundColor = "rgba(" + r + ", " + g + ", " + b + ",0.5)";
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

    // if you're a derp and actually press add 2 times with invalid name...
    if (name != "Name already in use!")
    {
        for (var i = 0; i < markers.length; i++)
        {
            // if name is already in use
            if (markers[i].name == name)
            {
                document.getElementById("name").value = "Name already in use!";
                return;
            }
        }
        if (name == "") // if name is empty.
        {
            return;
        }
    }
    else
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

    // if you're a derp and actually press add 2 times with invalid name...
    if (name != "Name already in use!")
    {
        for (var i = 0; i < markers.length; i++)
        {
            // if name is already in use
            if (markers[i].name == name)
            {
                document.getElementById("name").value = "Name already in use!";
                return;
            }
        }
        if (name == "") // if name is empty
        {
            return;
        }
    }
    else
    {
        return;
    }

    addLine(name, r, g, b, 255, x, y, x2, y2, lw);
    cancel();
}

// Removes all the menus on screen.
function cancel()
{
    var r = document.getElementById("menu-rect");
    var l = document.getElementById("menu-line");
    var re = document.getElementById("edit-rect");
    var le = document.getElementById("edit-line");

    l.hidden = true;
    r.hidden = true;
    le.hidden = true;
    re.hidden = true;

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

        // Rectangle
        if (!markers[i].style)
        {
            var width = markers[i].width;
            var height = markers[i].height;

            drawRect(colorMix(red, green, blue, alpha), x, y, width, height, lineWidth);
        }
        else // Line
        {
            var x2 = markers[i].x2;
            var y2 = markers[i].y2;

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
        print("The array is empty, aborting.");
        return;
    }

    for (var i = 0; i < markers.length; i++)
    {
        if (markers[i].name == name)
        {
            print(markers[i].name + " matches the string! removing!");
            removeMarkerInt(i);
        }
        else
        {
            print(markers[i].name + " does not match the string, continuing...");
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
    print("Removed " + number + " from the array!");
    print("Marker length now: " + markers.length);
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

    print("Added a rectangle with the name " + name + " to the list!");
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

    print("Added a line with the name " + name + " to the list!");
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
    //noinspection JSUnresolvedFunction,JSUnresolvedVariable
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

/**
 * Print to dev console.
 * @param text
 */
function print(text)
{
    console.log(text);
}