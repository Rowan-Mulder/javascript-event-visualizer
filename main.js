let btn = document.getElementById("btn")
let infoInnerWrapper = document.getElementById("info-inner-wrapper")
let info = document.getElementById("info")
let logSettingsEventSettings = document.getElementById("log-settings-event-settings")
let checkVerboseLogging = document.getElementById("check-verbose-logging")
let checkPenDeviceLogging = document.getElementById("check-pendevice-logging")
let checkMouseDeviceLogging = document.getElementById("check-mousedevice-logging")
let events = document.getElementById("events-inner-wrapper")
let eventsInfo = document.getElementById("events-info")
let eventsPropertyInfo = document.getElementById("events-property-info")

let eventsInfoTimeout
let eventsPropertyInfoTimeout



// Event title info source: https://developer.mozilla.org/

let eventsMouse = [
    {
        type: "click", // Personal experience: Chrome cancels click event if RMB has been released before LMB has, Firefox does not. Chrome has e.pointerType, while FireFox does not.
        title: "An element receives a click event when a pointing device button (such as a mouse's primary mouse button) is both pressed and released while the pointer is located inside the element. Event property 'pointerType' for this event is not available on Firefox. When you need to check the device type, you could use pointerup instead.",
        category: "mouse"
    },
    {
        type: "wheel",
        title: "The wheel event fires when the user rotates a wheel button on a pointing device (typically a mouse).",
        category: "mouse",
    },
    {
        type: "mousedown",
        title: "The mousedown event is fired at an Element when a pointing device button is pressed while the pointer is inside the element.",
        category: "mouse",
    },
    {
        type: "mouseup",
        title: "The mouseup event is fired at an Element when a button on a pointing device (such as a mouse or trackpad) is released while the pointer is located inside it.",
        category: "mouse",
    },
    {
        type: "mousemove",
        title: "The mousemove event is fired at an element when a pointing device (usually a mouse) is moved while the cursor's hotspot is inside it.",
        category: "mouse",
    },
    {
        type: "mouseover",
        title: "The mouseover event is fired at an Element when a pointing device (such as a mouse or trackpad) is used to move the cursor onto the element or one of its child elements.",
        category: "mouse",
    },
    {
        type: "mouseenter",
        title: "The mouseenter event is fired at an Element when a pointing device (usually a mouse) is initially moved so that its hotspot is within the element at which the event was fired.",
        category: "mouse",
    },
    {
        type: "mouseout",
        title: "The mouseout event is fired at an Element when a pointing device (usually a mouse) is used to move the cursor so that it is no longer contained within the element or one of its children.",
        category: "mouse",
    },
    {
        type: "mouseleave",
        title: "The mouseleave event is fired at an Element when the cursor of a pointing device (usually a mouse) is moved out of it. Unlike 'mouseout' this does not bubble.",
        category: "mouse",
    },
]

let eventsGeneral = [
    {
        type: "contextmenu",
        title: "The contextmenu event fires when the user attempts to open a context menu. This event is typically triggered by clicking the right mouse button, or by pressing the context menu key.",
        category: "general",
    },
    {
        type: "dblclick",
        title: "The dblclick event fires when a pointing device button (such as a mouse's primary button) is double-clicked; that is, when it's rapidly clicked twice on a single element within a very short span of time.",
        category: "general",
    },
    {
        type: "focus",
        title: "The focus event fires when an element has received focus. The event does not bubble, but the related focusin event that follows does bubble.",
        category: "general",
    },
    {
        type: "blur",
        title: "The blur event fires when an element has lost focus.",
        category: "general",
    },
    {
        type: "pointerdown",
        title: "The pointerdown event is fired when a pointer becomes active. For mouse, it is fired when the device transitions from no buttons pressed to at least one button pressed. For touch, it is fired when physical contact is made with the digitizer. For pen, it is fired when the stylus makes physical contact with the digitizer.",
        category: "pointer",
    },
    {
        type: "pointerup",
        title: "The pointerup event is fired when a pointer is no longer active.",
        category: "pointer",
    },
    {
        type: "pointermove",
        title: "The pointermove event is fired when a pointer changes coordinates, and the pointer has not been canceled by a browser touch-action.",
        category: "pointer",
    },
    {
        type: "pointerover",
        title: "The pointerover event is fired when a pointing device is moved into an element's hit test boundaries.",
        category: "pointer",
    },
    {
        type: "pointerenter",
        title: "The pointerenter event fires when a pointing device is moved into the hit test boundaries of an element or one of its descendants, including as a result of a pointerdown event from a device that does not support hover",
        category: "pointer",
    },
    {
        type: "pointerout",
        title: "The pointerout event is fired for several reasons including: pointing device is moved out of the hit test boundaries of an element; firing the pointerup event for a device that does not support hover (see pointerup); after firing the pointercancel event (see pointercancel); when a pen stylus leaves the hover range detectable by the digitizer.",
        category: "pointer",
    },
    {
        type: "pointerleave",
        title: "The pointerleave event is fired when a pointing device is moved out of the hit test boundaries of an element. For pen devices, this event is fired when the stylus leaves the hover range detectable by the digitizer.",
        category: "pointer",
    },
    {
        type: "pointercancel",
        title: "The pointercancel event is fired when the browser determines that there are unlikely to be any more pointer events, or if after the pointerdown event is fired, the pointer is then used to manipulate the viewport by panning, zooming, or scrolling. Usually triggered on touch devices.",
        category: "touch",
    },
]

let eventsTouchDevices = [
    {
        type: "touchstart",
        title: "The touchstart event is fired when one or more touch points are placed on the touch surface.",
        category: "touch",
    },
    {
        type: "touchend",
        title: "The touchend event fires when one or more touch points are removed from the touch surface.",
        category: "touch",
    },
    {
        type: "touchmove",
        title: "The touchmove event is fired when one or more touch points are moved along the touch surface.",
        category: "touch",
    },
    {
        type: "touchcancel",
        title: "The touchcancel event is fired when one or more touch points have been disrupted in an implementation-specific manner (for example, too many touch points are created).",
        category: "touch",
    },
    {
        type: "gotpointercapture",
        title: "The gotpointercapture event is fired when an element captures a pointer using setPointerCapture().",
        category: "touch",
    },
    {
        type: "lostpointercapture",
        title: "The lostpointercapture event is fired when a captured pointer is released. Similar to the 'pointercancel' event. Usually triggered on touch devices if a touch either leaves an element or turns into a multi-touch pinch-zoom",
        category: "touch",
    },
]

// Niche events
// drag: The drag event is fired every few hundred milliseconds as an element or text selection is being dragged by the user.
// dragstart: The dragstart event is fired when the user starts dragging an element or text selection.
//     personal experience: Doesn't trigger when the element is a button
// dragend: The dragend event is fired when a drag operation is being ended (by releasing a mouse button or hitting the escape key).
//     personal experience: Doesn't trigger when the element is a button, unless specifically when selection is allowed by CSS property 'user-select' and a selection starting from any text contains at least part of the button text.
// dragenter: The dragenter event is fired when a dragged element or text selection enters a valid drop target.
// dragleave: The dragleave event is fired when a dragged element or text selection leaves a valid drop target.
// dragover: The dragover event is fired when an element or text selection is being dragged over a valid drop target (every few hundred milliseconds).
// drop: The drop event is fired when an element or text selection is dropped on a valid drop target.


let defaultIgnoredEventLogs = [
    "wheel",
    "mousemove",   "mouseover",   "mouseenter",   "mouseout",   "mouseleave",
    "pointermove", "pointerover", "pointerenter", "pointerout", "pointerleave",
    "touchmove",
    "focus", "blur"
]





for (let evt of eventsMouse) {
    addEvent(evt.type, evt.title, evt.category)
}
for (let evt of eventsGeneral) {
    addEvent(evt.type, evt.title, evt.category)
}
for (let evt of eventsTouchDevices) {
    addEvent(evt.type, evt.title, evt.category)
}



function addEvent(type, title, category) {
    btn.addEventListener(type, (evt) => {
        markEvent(evt, title)
    })

    // Events
    // Events overview
    let evt = document.createElement("button")
    evt.setAttribute("name", type)
    evt.classList.add("event")
    evt.title = title
    evt.innerText = type
    events.appendChild(evt)
    // Event popup-info
    evt.onclick = () => {showEventInfo(type, title)}

    // Log settings
    let row = document.createElement("tr")

    let cellInputContainer = document.createElement("td")
    let check = document.createElement("input")
    check.id = `type-${type}`
    check.type = "checkbox"
    check.checked = defaultIgnoredEventLogs.indexOf(type) === -1
    check.onchange = () => {toggleArrayItem(defaultIgnoredEventLogs, type)}
    cellInputContainer.appendChild(check)

    let cellLabelContainer = document.createElement("td")
    let cellLabel = document.createElement("label")
    cellLabel.innerText = type
    cellLabel.setAttribute("for", `type-${type}`)
    cellLabelContainer.appendChild(cellLabel)

    row.appendChild(cellInputContainer)
    row.appendChild(cellLabelContainer)
    logSettingsEventSettings.appendChild(row)
}


function showEventInfo(type, title, isEncoded = false) {
    // Shows/hides the general event info in a popup
    showPopupInfo(title, eventsInfo, eventsInfoTimeout, isEncoded)

    // Highlights matching event (similar to focus-visible, also triggered when clicking an event in the log)
    highlightEvent(type)
}

function showEventPropertyInfo(title, isEncoded = false) {
    // Shows/hides the event property info in a popup
    showPopupInfo(title, eventsPropertyInfo, eventsPropertyInfoTimeout, isEncoded)
}

function highlightEvent(type) {
    let matchingEvent = events.querySelector(`[name=${type}]`)
    if (matchingEvent) {
        for (let evt of events.children) {
            evt.classList.remove("event-selected")
        }
        matchingEvent.classList.add("event-selected")
    }
}

function showPopupInfo(title, popupElement, popupTimer, isEncoded) {
    // Fades in popup info
    clearTimeout(popupTimer)
    popupElement.innerText = (isEncoded) ? extremeCharacterDecoder(title) : title
    popupElement.classList.add("popup-info-visible")
}


function markEvent(evt, title) {
    let loggingInfoList = []
    if (evt.pointerType) {
        loggingInfoList.push({text: `pointerType: ${(evt.pointerType) ? evt.pointerType : "undefined (triggered programmatically)"}`, title: `Indicates the device type that caused the event (mouse, pen, touch, or "" if the device type cannot be detected by the browser).`}) // mouse/pen/touch (javascript triggered: "" for .click(), undefined for .dispatchEvent())
    }
    if (evt.button || (checkVerboseLogging.checked === true && evt.button === 0)) {
        loggingInfoList.push({text: `button: ${evt.button}`, title: `The button number that was pressed (if applicable) when the mouse event was fired.`}) // Seems to be -1 for contextmenu, pointermove and gotpointercapture events on mobile
    }
    if (evt.buttons || (checkVerboseLogging.checked === true && evt.buttons === 0)) {
        loggingInfoList.push({text: `buttons: ${evt.buttons}`, title: `The buttons being pressed (if any) when the mouse event was fired.`})
    }
    if (evt.isPrimary || (checkVerboseLogging.checked === true && typeof evt.isPrimary === "boolean")) {
        loggingInfoList.push({text: `isPrimary: ${evt.isPrimary}`, title: `Indicates if the pointer represents the primary pointer of this pointer type in a multi-pointer scenario (such as a touch screen that supports more than one touch point)`})
    }
    if (typeof evt.pressure === "number" && checkPenDeviceLogging.checked === true) { // Pressure of a stylus (interestingly defaulted to 0.5 for PC and 1.0 for mobile).
        loggingInfoList.push({text: `pressure: ${evt.pressure}`, title: `The normalized pressure of the pointer input in the range of 0 to 1, where 0 and 1 represent the minimum and maximum pressure the hardware is capable of detecting, respectively.`})
    }
    if (typeof evt.twist === "number" && checkPenDeviceLogging.checked === true) {
        loggingInfoList.push({text: `twist: ${evt.twist}`, title: `The clockwise rotation of the pointer (e.g. pen stylus) around its major axis in degrees, with a value in the range 0 to 359.`})
    }
    if (evt.isTrusted === false || (checkVerboseLogging.checked === true && evt.isTrusted)) {
        loggingInfoList.push({text: `isTrusted: ${evt.isTrusted}`, title: `The isTrusted read-only property of the Event interface is a boolean value that is true when the event was generated by a user action, and false when the event was created or modified by a script or dispatched via EventTarget.dispatchEvent().`})
    }
    if (checkMouseDeviceLogging.checked === true && (evt.ctrlKey || (checkVerboseLogging.checked === true && typeof evt.ctrlKey === "boolean"))) {
        loggingInfoList.push({text: `ctrlKey: ${evt.ctrlKey}`, title: `Returns true if the ctrl key was down when the mouse event was fired.`})
    }
    if (checkMouseDeviceLogging.checked === true && (evt.altKey || (checkVerboseLogging.checked === true && typeof evt.altKey === "boolean"))) {
        loggingInfoList.push({text: `altKey: ${evt.altKey}`, title: `Returns true if the alt key was down when the mouse event was fired.`})
    }
    if (checkMouseDeviceLogging.checked === true && (evt.shiftKey || (checkVerboseLogging.checked === true && typeof evt.shiftKey === "boolean"))) {
        loggingInfoList.push({text: `shiftKey: ${evt.shiftKey}`, title: `Returns true if the shift key was down when the mouse event was fired.`})
    }

    // Logging
    if (defaultIgnoredEventLogs.indexOf(evt.type) === -1) {
        let div = document.createElement("div")
        div.classList.add("highlight")

        if (!title) {
            console.error(`Missing title for event ${evt.type}`)
        }
        let encodedTitle = extremeCharacterEncoder(title)
        div.innerHTML = `<button class="logging-info logging-info-type" onclick="showEventInfo('${evt.type}', '${encodedTitle}', true)">type: <b>${evt.type}</b></button>`
        for (let loggingInfo of loggingInfoList) {
            let encodedLoggingInfoTitle = extremeCharacterEncoder(loggingInfo.title)
            div.innerHTML += `, <button class="logging-info logging-info-additional" title="${loggingInfo.title.replaceAll('"', "&quot;")}" onclick="showEventPropertyInfo('${encodedLoggingInfoTitle}', true)">${loggingInfo.text}</button>`
        }
        div.title = title

        info.appendChild(div)
        infoInnerWrapper.scrollTo(0, infoInnerWrapper.scrollHeight)

        console.log({event: evt})
    }

    // Highlighting tile
    if (events.querySelector(`[name=${evt.type}]`)) {
        let eventTile = events.querySelector(`[name=${evt.type}]`)
        if (eventTile.classList.contains("highlight")) {
            eventTile.classList.remove("highlight")
            setTimeout(() => {eventTile.classList.add("highlight")}, 50)
        } else {
            eventTile.classList.add("highlight")
        }
    }
}


function clearLog() {
    info.innerHTML = ""
}





function toggleVisibility(id) {
    let el = document.getElementById(id)
    if (!el) {
        console.error(`element ${id} couldn't be found`)
        return
    }
    if (el.classList.contains("hidden")) {
        el.classList.remove("hidden")
    } else {
        el.classList.add("hidden")
    }
}

function toggleArrayItem(array, item) {
    let index = array.indexOf(item)
    if (index !== -1) {
        array.splice(index, 1)
    } else {
        array.push(item)
    }
}





// Global events
document.addEventListener("click", (evt) => {
    // Hides event info popup when clicking away
    if (eventsInfo.innerText !== "" && (!evt.target.closest(".event") && !evt.target.closest("#events-info") && !evt.target.closest(".logging-info-type")) && eventsInfo.classList.contains("popup-info-visible")) {
        eventsInfo.classList.remove("popup-info-visible")
        clearTimeout(eventsInfoTimeout)
        eventsInfoTimeout = setTimeout(() => {
            eventsInfo.innerText = ""
        }, 500)

        for (let evt of events.children) {
            evt.classList.remove("event-selected")
        }
    }

    // Hides event property info popup when clicking away
    if (eventsPropertyInfo.innerText !== "" && (!evt.target.closest("#events-property-info") && !evt.target.closest(".logging-info-additional")) && eventsPropertyInfo.classList.contains("popup-info-visible")) {
        eventsPropertyInfo.classList.remove("popup-info-visible")
        clearTimeout(eventsPropertyInfoTimeout)
        eventsPropertyInfoTimeout = setTimeout(() => {
            eventsPropertyInfo.innerText = ""
        }, 500)
    }

    // Hides log settings when clicking away
    if (!document.querySelector("#log-settings").classList.contains("hidden") && (!evt.target.closest("#log-settings") && !evt.target.closest("#btn-log-settings"))) {
        toggleVisibility('log-settings')
    }
})

// Removes contextmenu for button
document.addEventListener(("contextmenu"), (evt) => {
    if (evt.target.id === "btn") {
        evt.preventDefault()
    }
})

function extremeCharacterEncoder(inputString) {
    let convertedString = ""
    for (let i = 0; i < inputString.length; i++) {
        convertedString += encodeCharacter(inputString[i])
    }
    return convertedString
}

function extremeCharacterDecoder(inputString) {
    let convertedString = ""
    for (let i = 0; i < inputString.length; i += 3) {
        convertedString += decodeCharacter(inputString.substr(i, 3))
    }
    return convertedString
}

function encodeCharacter(character) {
    switch (character) {
        case " ":
            return "%20"
        case "!":
            return "%21"
        case "\"":
            return "%22"
        case "#":
            return "%23"
        case "$":
            return "%24"
        case "%":
            return "%25"
        case "&":
            return "%26"
        case "'":
            return "%27"
        case "(":
            return "%28"
        case ")":
            return "%29"
        case "*":
            return "%2A"
        case "+":
            return "%2B"
        case ",":
            return "%2C"
        case "-":
            return "%2D"
        case ".":
            return "%2E"
        case "/":
            return "%2F"
        case "0":
            return "%30"
        case "1":
            return "%31"
        case "2":
            return "%32"
        case "3":
            return "%33"
        case "4":
            return "%34"
        case "5":
            return "%35"
        case "6":
            return "%36"
        case "7":
            return "%37"
        case "8":
            return "%38"
        case "9":
            return "%39"
        case ":":
            return "%3A"
        case ";":
            return "%3B"
        case "<":
            return "%3C"
        case "=":
            return "%3D"
        case ">":
            return "%3E"
        case "?":
            return "%3F"
        case "@":
            return "%40"
        case "A":
            return "%41"
        case "B":
            return "%42"
        case "C":
            return "%43"
        case "D":
            return "%44"
        case "E":
            return "%45"
        case "F":
            return "%46"
        case "G":
            return "%47"
        case "H":
            return "%48"
        case "I":
            return "%49"
        case "J":
            return "%4A"
        case "K":
            return "%4B"
        case "L":
            return "%4C"
        case "M":
            return "%4D"
        case "N":
            return "%4E"
        case "O":
            return "%4F"
        case "P":
            return "%50"
        case "Q":
            return "%51"
        case "R":
            return "%52"
        case "S":
            return "%53"
        case "T":
            return "%54"
        case "U":
            return "%55"
        case "V":
            return "%56"
        case "W":
            return "%57"
        case "X":
            return "%58"
        case "Y":
            return "%59"
        case "Z":
            return "%5A"
        case "[":
            return "%5B"
        case "\\":
            return "%5C"
        case "]":
            return "%5D"
        case "^":
            return "%5E"
        case "_":
            return "%5F"
        case "`":
            return "%60"
        case "a":
            return "%61"
        case "b":
            return "%62"
        case "c":
            return "%63"
        case "d":
            return "%64"
        case "e":
            return "%65"
        case "f":
            return "%66"
        case "g":
            return "%67"
        case "h":
            return "%68"
        case "i":
            return "%69"
        case "j":
            return "%6A"
        case "k":
            return "%6B"
        case "l":
            return "%6C"
        case "m":
            return "%6D"
        case "n":
            return "%6E"
        case "o":
            return "%6F"
        case "p":
            return "%70"
        case "q":
            return "%71"
        case "r":
            return "%72"
        case "s":
            return "%73"
        case "t":
            return "%74"
        case "u":
            return "%75"
        case "v":
            return "%76"
        case "w":
            return "%77"
        case "x":
            return "%78"
        case "y":
            return "%79"
        case "z":
            return "%7A"
        case "{":
            return "%7B"
        case "|":
            return "%7C"
        case "}":
            return "%7D"
        case "~":
            return "%7E"
        case "":
            return "%81"
        case "‚":
            return "%82"
        case "ƒ":
            return "%83"
        case "„":
            return "%84"
        case "…":
            return "%85"
        case "†":
            return "%86"
        case "‡":
            return "%87"
        case "ˆ":
            return "%88"
        case "‰":
            return "%89"
        case "Š":
            return "%8A"
        case "‹":
            return "%8B"
        case "Œ":
            return "%8C"
        case "":
            return "%8D"
        case "Ž":
            return "%8E"
        case "":
            return "%8F"
        case "":
            return "%90"
        case "‘":
            return "%91"
        case "’":
            return "%92"
        case "“":
            return "%93"
        case "”":
            return "%94"
        case "•":
            return "%95"
        case "–":
            return "%96"
        case "—":
            return "%97"
        case "˜":
            return "%98"
        case "™":
            return "%99"
        case "š":
            return "%9A"
        case "›":
            return "%9B"
        case "œ":
            return "%9C"
        case "":
            return "%9D"
        case "ž":
            return "%9E"
        case "Ÿ":
            return "%9F"
        case "¡":
            return "%A1"
        case "¢":
            return "%A2"
        case "£":
            return "%A3"
        case "¤":
            return "%A4"
        case "¥":
            return "%A5"
        case "¦":
            return "%A6"
        case "§":
            return "%A7"
        case "¨":
            return "%A8"
        case "©":
            return "%A9"
        case "ª":
            return "%AA"
        case "«":
            return "%AB"
        case "¬":
            return "%AC"
        case "­":
            return "%AD"
        case "®":
            return "%AE"
        case "¯":
            return "%AF"
        case "°":
            return "%B0"
        case "±":
            return "%B1"
        case "²":
            return "%B2"
        case "³":
            return "%B3"
        case "´":
            return "%B4"
        case "µ":
            return "%B5"
        case "¶":
            return "%B6"
        case "·":
            return "%B7"
        case "¸":
            return "%B8"
        case "¹":
            return "%B9"
        case "º":
            return "%BA"
        case "»":
            return "%BB"
        case "¼":
            return "%BC"
        case "½":
            return "%BD"
        case "¾":
            return "%BE"
        case "¿":
            return "%BF"
        case "À":
            return "%C0"
        case "Á":
            return "%C1"
        case "Â":
            return "%C2"
        case "Ã":
            return "%C3"
        case "Ä":
            return "%C4"
        case "Å":
            return "%C5"
        case "Æ":
            return "%C6"
        case "Ç":
            return "%C7"
        case "È":
            return "%C8"
        case "É":
            return "%C9"
        case "Ê":
            return "%CA"
        case "Ë":
            return "%CB"
        case "Ì":
            return "%CC"
        case "Í":
            return "%CD"
        case "Î":
            return "%CE"
        case "Ï":
            return "%CF"
        case "Ð":
            return "%D0"
        case "Ñ":
            return "%D1"
        case "Ò":
            return "%D2"
        case "Ó":
            return "%D3"
        case "Ô":
            return "%D4"
        case "Õ":
            return "%D5"
        case "Ö":
            return "%D6"
        case "×":
            return "%D7"
        case "Ø":
            return "%D8"
        case "Ù":
            return "%D9"
        case "Ú":
            return "%DA"
        case "Û":
            return "%DB"
        case "Ü":
            return "%DC"
        case "Ý":
            return "%DD"
        case "Þ":
            return "%DE"
        case "ß":
            return "%DF"
        case "à":
            return "%E0"
        case "á":
            return "%E1"
        case "â":
            return "%E2"
        case "ã":
            return "%E3"
        case "ä":
            return "%E4"
        case "å":
            return "%E5"
        case "æ":
            return "%E6"
        case "ç":
            return "%E7"
        case "è":
            return "%E8"
        case "é":
            return "%E9"
        case "ê":
            return "%EA"
        case "ë":
            return "%EB"
        case "ì":
            return "%EC"
        case "í":
            return "%ED"
        case "î":
            return "%EE"
        case "ï":
            return "%EF"
        case "ð":
            return "%F0"
        case "ñ":
            return "%F1"
        case "ò":
            return "%F2"
        case "ó":
            return "%F3"
        case "ô":
            return "%F4"
        case "õ":
            return "%F5"
        case "ö":
            return "%F6"
        case "÷":
            return "%F7"
        case "ø":
            return "%F8"
        case "ù":
            return "%F9"
        case "ú":
            return "%FA"
        case "û":
            return "%FB"
        case "ü":
            return "%FC"
        case "ý":
            return "%FD"
        case "þ":
            return "%FE"
        case "ÿ":
            return "%FF"
        default:
            return "UNSUPPORTED"
    }
}

function decodeCharacter(character) {
    switch (character) {
        case "%20":
            return " "
        case "%21":
            return "!"
        case "%22":
            return "\""
        case "%23":
            return "#"
        case "%24":
            return "$"
        case "%25":
            return "%"
        case "%26":
            return "&"
        case "%27":
            return "'"
        case "%28":
            return "("
        case "%29":
            return ")"
        case "%2A":
            return "*"
        case "%2B":
            return "+"
        case "%2C":
            return ","
        case "%2D":
            return "-"
        case "%2E":
            return "."
        case "%2F":
            return "/"
        case "%30":
            return "0"
        case "%31":
            return "1"
        case "%32":
            return "2"
        case "%33":
            return "3"
        case "%34":
            return "4"
        case "%35":
            return "5"
        case "%36":
            return "6"
        case "%37":
            return "7"
        case "%38":
            return "8"
        case "%39":
            return "9"
        case "%3A":
            return ":"
        case "%3B":
            return ";"
        case "%3C":
            return "<"
        case "%3D":
            return "="
        case "%3E":
            return ">"
        case "%3F":
            return "?"
        case "%40":
            return "@"
        case "%41":
            return "A"
        case "%42":
            return "B"
        case "%43":
            return "C"
        case "%44":
            return "D"
        case "%45":
            return "E"
        case "%46":
            return "F"
        case "%47":
            return "G"
        case "%48":
            return "H"
        case "%49":
            return "I"
        case "%4A":
            return "J"
        case "%4B":
            return "K"
        case "%4C":
            return "L"
        case "%4D":
            return "M"
        case "%4E":
            return "N"
        case "%4F":
            return "O"
        case "%50":
            return "P"
        case "%51":
            return "Q"
        case "%52":
            return "R"
        case "%53":
            return "S"
        case "%54":
            return "T"
        case "%55":
            return "U"
        case "%56":
            return "V"
        case "%57":
            return "W"
        case "%58":
            return "X"
        case "%59":
            return "Y"
        case "%5A":
            return "Z"
        case "%5B":
            return "["
        case "%5C":
            return "\\"
        case "%5D":
            return "]"
        case "%5E":
            return "^"
        case "%5F":
            return "_"
        case "%60":
            return "`"
        case "%61":
            return "a"
        case "%62":
            return "b"
        case "%63":
            return "c"
        case "%64":
            return "d"
        case "%65":
            return "e"
        case "%66":
            return "f"
        case "%67":
            return "g"
        case "%68":
            return "h"
        case "%69":
            return "i"
        case "%6A":
            return "j"
        case "%6B":
            return "k"
        case "%6C":
            return "l"
        case "%6D":
            return "m"
        case "%6E":
            return "n"
        case "%6F":
            return "o"
        case "%70":
            return "p"
        case "%71":
            return "q"
        case "%72":
            return "r"
        case "%73":
            return "s"
        case "%74":
            return "t"
        case "%75":
            return "u"
        case "%76":
            return "v"
        case "%77":
            return "w"
        case "%78":
            return "x"
        case "%79":
            return "y"
        case "%7A":
            return "z"
        case "%7B":
            return "{"
        case "%7C":
            return "|"
        case "%7D":
            return "}"
        case "%7E":
            return "~"
        case "%81":
            return ""
        case "%82":
            return "‚"
        case "%83":
            return "ƒ"
        case "%84":
            return "„"
        case "%85":
            return "…"
        case "%86":
            return "†"
        case "%87":
            return "‡"
        case "%88":
            return "ˆ"
        case "%89":
            return "‰"
        case "%8A":
            return "Š"
        case "%8B":
            return "‹"
        case "%8C":
            return "Œ"
        case "%8D":
            return ""
        case "%8E":
            return "Ž"
        case "%8F":
            return ""
        case "%90":
            return ""
        case "%91":
            return "‘"
        case "%92":
            return "’"
        case "%93":
            return "“"
        case "%94":
            return "”"
        case "%95":
            return "•"
        case "%96":
            return "–"
        case "%97":
            return "—"
        case "%98":
            return "˜"
        case "%99":
            return "™"
        case "%9A":
            return "š"
        case "%9B":
            return "›"
        case "%9C":
            return "œ"
        case "%9D":
            return ""
        case "%9E":
            return "ž"
        case "%9F":
            return "Ÿ"
        case "%A1":
            return "¡"
        case "%A2":
            return "¢"
        case "%A3":
            return "£"
        case "%A4":
            return "¤"
        case "%A5":
            return "¥"
        case "%A6":
            return "¦"
        case "%A7":
            return "§"
        case "%A8":
            return "¨"
        case "%A9":
            return "©"
        case "%AA":
            return "ª"
        case "%AB":
            return "«"
        case "%AC":
            return "¬"
        case "%AD":
            return "­"
        case "%AE":
            return "®"
        case "%AF":
            return "¯"
        case "%B0":
            return "°"
        case "%B1":
            return "±"
        case "%B2":
            return "²"
        case "%B3":
            return "³"
        case "%B4":
            return "´"
        case "%B5":
            return "µ"
        case "%B6":
            return "¶"
        case "%B7":
            return "·"
        case "%B8":
            return "¸"
        case "%B9":
            return "¹"
        case "%BA":
            return "º"
        case "%BB":
            return "»"
        case "%BC":
            return "¼"
        case "%BD":
            return "½"
        case "%BE":
            return "¾"
        case "%BF":
            return "¿"
        case "%C0":
            return "À"
        case "%C1":
            return "Á"
        case "%C2":
            return "Â"
        case "%C3":
            return "Ã"
        case "%C4":
            return "Ä"
        case "%C5":
            return "Å"
        case "%C6":
            return "Æ"
        case "%C7":
            return "Ç"
        case "%C8":
            return "È"
        case "%C9":
            return "É"
        case "%CA":
            return "Ê"
        case "%CB":
            return "Ë"
        case "%CC":
            return "Ì"
        case "%CD":
            return "Í"
        case "%CE":
            return "Î"
        case "%CF":
            return "Ï"
        case "%D0":
            return "Ð"
        case "%D1":
            return "Ñ"
        case "%D2":
            return "Ò"
        case "%D3":
            return "Ó"
        case "%D4":
            return "Ô"
        case "%D5":
            return "Õ"
        case "%D6":
            return "Ö"
        case "%D7":
            return "×"
        case "%D8":
            return "Ø"
        case "%D9":
            return "Ù"
        case "%DA":
            return "Ú"
        case "%DB":
            return "Û"
        case "%DC":
            return "Ü"
        case "%DD":
            return "Ý"
        case "%DE":
            return "Þ"
        case "%DF":
            return "ß"
        case "%E0":
            return "à"
        case "%E1":
            return "á"
        case "%E2":
            return "â"
        case "%E3":
            return "ã"
        case "%E4":
            return "ä"
        case "%E5":
            return "å"
        case "%E6":
            return "æ"
        case "%E7":
            return "ç"
        case "%E8":
            return "è"
        case "%E9":
            return "é"
        case "%EA":
            return "ê"
        case "%EB":
            return "ë"
        case "%EC":
            return "ì"
        case "%ED":
            return "í"
        case "%EE":
            return "î"
        case "%EF":
            return "ï"
        case "%F0":
            return "ð"
        case "%F1":
            return "ñ"
        case "%F2":
            return "ò"
        case "%F3":
            return "ó"
        case "%F4":
            return "ô"
        case "%F5":
            return "õ"
        case "%F6":
            return "ö"
        case "%F7":
            return "÷"
        case "%F8":
            return "ø"
        case "%F9":
            return "ù"
        case "%FA":
            return "ú"
        case "%FB":
            return "û"
        case "%FC":
            return "ü"
        case "%FD":
            return "ý"
        case "%FE":
            return "þ"
        case "%FF":
            return "ÿ"
        default:
            return "UNSUPPORTED"
    }
}

/*
    TODO:
        Event property toggle for mouse-devices (ctrlKey, altKey, shiftKey.)
        Testing on pen-devices
*/
