"use strict";

function el(name, all) {
    if (all) {
        return document.querySelectorAll(name);
    } else
        return document.querySelector(name);
}

function isChecked(name, get) {
    el(name, get).forEach(function(e) {
        if (e.checked) {
            console.log(e.value);
        }
    });
}

function getSelectedOption(name) {
    var s = el(name);

    return parseInt(s.options[s.selectedIndex].value);
}

function addListener(name, action, callback) {
    el(name).addEventListener(action, callback);
}

// RETURNS HTML
// TABLE ROW / DATA COMMENTED
function createRow(cols) {
    return `<div class="row"> ${cols} </div>`;
    //return "<tr>" + "<td>" + (++row) + "</td>" + cols + "</tr>";
}

// RETURNS HTML
// TABLE ROW / DATA COMMENTED
function createCol(name) {

    return `<div class="col-sm-8 col-md-3 col-lg-3">${++row}.  ${name} </div>`;
    //return "<td>" + name + "</td>";
}

function updateHTML(name, content) {
    el(name).innerHTML = content;
}


function createSelectMenuFromArray(arr, starterText) {
    var html = "<option>" + starterText + "</option>";
    arr.forEach(function(item, idx) {
        html += "<option value='" + idx + "'>" + item + "</option>";
    });
    return html;
}

function addNewItem(arr, obj = {}, model) {
    var f = [];
    arr.forEach(function(itm, idx) {

        if (el(itm).type === "select-one") {
            console.log("Drop Down Menu");
            var e = el(itm),
                val = e.options[e.selectedIndex].value;
            if (val === "") {
                f.push(0);
            } else {
                f.push(parseInt(val));
            }
        } else {
            f.push(el(itm).value);
        }

        obj[Object.keys(obj)[idx]] = f[idx];
    });
    // JSON.stringify(obj);
    model.push(obj);
}

function other(name, inputName){
    addListener(name, "change", function(){
        if(this.selectedIndex === this.length - 1 && typeof(this.selectedIndex) === "number"){
            el(inputName).style.display = "block";
        } else {
            el(inputName).style.display = "none";
        }
    });
}

// TESTING
function reset(args) {
    //args.forEach(function(elem) {
    el("[name]", 1).forEach(function(elem) {
        if (el(elem).type === "text") {
            el(elem).value = "";
        } else if (el(elem).type === "select-one") {
            // el(elem).value = "";
            var e = el(elem);
            e.selectedIndex = 0;
        }
    });
}
