let btn = document.getElementById("btn")
let systemInfoTbody = document.getElementById("system-info-tbody")
let infoInnerWrapper = document.getElementById("info-inner-wrapper")
let info = document.getElementById("info")
let logSettingsEventSettings = document.getElementById("log-settings-event-settings")
let checkVerboseLogging = document.getElementById("check-verbose-logging")
let checkMouseDeviceLogging = document.getElementById("check-mousedevice-logging")
let checkPenDeviceLogging = document.getElementById("check-pendevice-logging")
let events = document.getElementById("events-inner-wrapper")
let eventsInfo = document.getElementById("events-info")
let eventsPropertyInfo = document.getElementById("events-property-info")

let eventsInfoTimeout
let eventsPropertyInfoTimeout



// Event title info source: https://developer.mozilla.org/ with some slight personal modifications/additions.
// Additionally, event data will contain 'pointer' and 'category'.
//      'pointer': The pointer type that's capable of triggering the event. For example; I could assume that mouse events wouldn't be triggered by touch/pen pointer types, but that's not always the case. While functionality cross devices may differ from expectations, it's technically possible.
//     'category': The pointer type for which the event is primarily recommended. Unlike 'pointer', this doesn't mean you wouldn't be able to trigger the event with a different pointer type.

let eventsData = [
    {
        type: "click", // Personal experience: Chrome cancels click event if RMB has been released before LMB has, Firefox does not. Chrome has e.pointerType, while FireFox does not.
        title: "An element receives a click event when a pointing device button (such as a mouse's primary mouse button) is both pressed and released while the pointer is located inside the element. Event property 'pointerType' for this event is not available on Firefox. If you need to check the device type which triggered the event, you may want to use pointerup instead for the pointerType event property.",
        pointer: "general",
        category: "general"
    },
    {
        type: "contextmenu",
        title: "The contextmenu event fires when the user attempts to open a context menu. This event is typically triggered by clicking the right mouse button, or by pressing the context menu key.",
        pointer: "general",
        category: "general",
    },
    {
        type: "focus",
        title: "The focus event fires when an element has received focus. The event does not bubble, but the related focusin event that follows does bubble.",
        pointer: "general",
        category: "general",
    },
    {
        type: "blur",
        title: "The blur event fires when an element has lost focus.",
        pointer: "general",
        category: "general",
    },
    {
        type: "mousedown",
        title: "The mousedown event is fired at an Element when a pointing device button is pressed while the pointer is inside the element.",
        pointer: "general",
        category: "mouse",
    },
    {
        type: "mouseup",
        title: "The mouseup event is fired at an Element when a button on a pointing device (such as a mouse or trackpad) is released while the pointer is located inside it.",
        pointer: "general",
        category: "mouse",
    },
    {
        type: "mousemove",
        title: "The mousemove event is fired at an element when a pointing device (usually a mouse) is moved while the cursor's hotspot is inside it.",
        pointer: "general",
        category: "mouse",
    },
    {
        type: "mouseover",
        title: "The mouseover event is fired at an Element when a pointing device (such as a mouse or trackpad) is used to move the cursor onto the element or one of its child elements.",
        pointer: "general",
        category: "mouse",
    },
    {
        type: "mouseenter",
        title: "The mouseenter event is fired at an Element when a pointing device (usually a mouse) is initially moved so that its hotspot is within the element at which the event was fired.",
        pointer: "general",
        category: "mouse",
    },
    {
        type: "mouseout",
        title: "The mouseout event is fired at an Element when a pointing device (usually a mouse) is used to move the cursor so that it is no longer contained within the element or one of its children.",
        pointer: "general",
        category: "mouse",
    },
    {
        type: "mouseleave",
        title: "The mouseleave event is fired at an Element when the cursor of a pointing device (usually a mouse) is moved out of it. Unlike 'mouseout' this does not bubble.",
        pointer: "general",
        category: "mouse",
    },
    {
        type: "pointerdown",
        title: "The pointerdown event is fired when a pointer becomes active. For mouse, it is fired when the device transitions from no buttons pressed to at least one button pressed. For touch, it is fired when physical contact is made with the digitizer. For pen, it is fired when the stylus makes physical contact with the digitizer.",
        pointer: "general",
        category: "general",
    },
    {
        type: "pointerup",
        title: "The pointerup event is fired when a pointer is no longer active.",
        pointer: "general",
        category: "general",
    },
    {
        type: "pointermove",
        title: "The pointermove event is fired when a pointer changes coordinates, and the pointer has not been canceled by a browser touch-action.",
        pointer: "general",
        category: "general",
    },
    {
        type: "pointerover",
        title: "The pointerover event is fired when a pointing device is moved into an element's hit test boundaries.",
        pointer: "general",
        category: "general",
    },
    {
        type: "pointerenter",
        title: "The pointerenter event fires when a pointing device is moved into the hit test boundaries of an element or one of its descendants, including as a result of a pointerdown event from a device that does not support hover.",
        pointer: "general",
        category: "general",
    },
    {
        type: "pointerout",
        title: "The pointerout event is fired for several reasons including: pointing device is moved out of the hit test boundaries of an element; firing the pointerup event for a device that does not support hover (see pointerup); after firing the pointercancel event (see pointercancel); when a pen stylus leaves the hover range detectable by the digitizer.",
        pointer: "general",
        category: "general",
    },
    {
        type: "pointerleave",
        title: "The pointerleave event is fired when a pointing device is moved out of the hit test boundaries of an element. For pen devices, this event is fired when the stylus leaves the hover range detectable by the digitizer.",
        pointer: "general",
        category: "general",
    },
    {
        type: "pointercancel",
        title: "The pointercancel event is fired when the browser determines that there are unlikely to be any more pointer events, or if after the pointerdown event is fired, the pointer is then used to manipulate the viewport by panning, zooming, or scrolling. Usually triggered on touch devices.",
        pointer: "touch", // Among other pointer events, I'd presume this would be aimed and supported to generally any device, but that's apparently not the case.
        category: "touch",
    },

    {
        type: "dblclick",
        title: "The dblclick event fires when a pointing device button (such as a mouse's primary button) is double-clicked; that is, when it's rapidly clicked twice on a single element within a very short span of time.",
        pointer: "mouse", // A double-tap on touch/pen devices will zoom the page in and won't trigger dblclick.
        category: "mouse",
    },
    {
        type: "auxclick",
        title: "The auxclick event is fired at an Element when a non-primary pointing device button (any mouse button other than the primary???usually leftmost???button) has been pressed and released both within the same element.",
        pointer: "mouse",
        category: "mouse"
    },
    {
        type: "wheel",
        title: "The wheel event fires when the user rotates a wheel button on a pointing device (typically a mouse).",
        pointer: "mouse",
        category: "mouse",
    },

    {
        type: "touchstart",
        title: "The touchstart event is fired when one or more touch points are placed on the touch surface.",
        pointer: "touch",
        category: "touch",
    },
    {
        type: "touchend",
        title: "The touchend event fires when one or more touch points are removed from the touch surface.",
        pointer: "touch",
        category: "touch",
    },
    {
        type: "touchmove",
        title: "The touchmove event is fired when one or more touch points are moved along the touch surface.",
        pointer: "touch",
        category: "touch",
    },
    {
        type: "touchcancel",
        title: "The touchcancel event is fired when one or more touch points have been disrupted in an implementation-specific manner (for example, too many touch points are created).",
        pointer: "touch",
        category: "touch",
    },
    {
        type: "gotpointercapture",
        title: "The gotpointercapture event is fired when an element captures a pointer using setPointerCapture().",
        pointer: "touch",
        category: "touch",
    },
    {
        type: "lostpointercapture",
        title: "The lostpointercapture event is fired when a captured pointer is released. Similar to the 'pointercancel' event. Usually triggered on touch devices if a touch either leaves an element or turns into a multi-touch pinch-zoom.",
        pointer: "touch",
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


// These events won't be logged by default, but could be enabled manually in the log settings.
let defaultIgnoredEventLogs = [
    "wheel",
    "mousemove",   "mouseover",   "mouseenter",   "mouseout",   "mouseleave",
    "pointermove", "pointerover", "pointerenter", "pointerout", "pointerleave",
    "touchmove",
    "focus", "blur"
]





for (let evt of eventsData) {
    addEvent(evt.type, evt.title, evt.pointer, evt.category)
}



function addEvent(type, title, pointer, category) {
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
    if (evt.button || evt.button === 0) {
        loggingInfoList.push({text: `button: ${evt.button}`, title: `The button number that was pressed (if applicable) when the mouse event was fired.`}) // Seems to be -1 for contextmenu, pointermove and gotpointercapture events on mobile
    }
    if (evt.buttons || evt.buttons === 0) {
        loggingInfoList.push({text: `buttons: ${evt.buttons}`, title: `The buttons being pressed (if any) when the mouse event was fired.`})
    }
    if (evt.isPrimary || (checkVerboseLogging.checked === true && typeof evt.isPrimary === "boolean")) {
        loggingInfoList.push({text: `isPrimary: ${evt.isPrimary}`, title: `Indicates if the pointer represents the primary pointer of this pointer type in a multi-pointer scenario (such as a touch screen that supports more than one touch point)`})
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
    if (checkMouseDeviceLogging.checked === true && (evt.metaKey || (checkVerboseLogging.checked === true && typeof evt.metaKey === "boolean"))) {
        loggingInfoList.push({text: `metaKey: ${evt.metaKey}`, title: `Returns true if the meta key was down when the mouse event was fired. On Windows keyboards, this key is the Windows key (???). On Macintosh keyboards, this key is the command key (???). Be aware that many operating systems bind special functionality to the meta key, so this property may be false even when the key is actually pressed. On Windows, for example, this key may open the Start menu.`})
    }
    if (checkPenDeviceLogging.checked === true && typeof evt.pressure === "number") { // Pressure of a stylus (interestingly defaulted to 0.5 for PC and 1.0 for mobile).
        loggingInfoList.push({text: `pressure: ${evt.pressure}`, title: `The normalized pressure of the pointer input in the range of 0 to 1, where 0 and 1 represent the minimum and maximum pressure the hardware is capable of detecting, respectively.`})
    }
    if (checkPenDeviceLogging.checked === true && (typeof evt.tiltX === "number" && typeof evt.tiltY === "number")) {
        loggingInfoList.push({text: `tiltX: ${evt.tiltX} tiltY: ${evt.tiltY}`, title: 'The tiltX and tiltY read-only properties of the PointerEvent interface are the angle (in degrees) between the X-Z and Y-Z plane of the pointer and the screen. This property is typically only useful for a pen/stylus pointer type. The angle in degrees between the Y-Z plane of the pointer (stylus) and the screen. The range of values is -90 to 90, inclusive, where a positive value is a tilt to the right. For devices that do not support this property, the value is 0.'}) // Personal experience: According to mozilla docs this has a range from -90 to 90, but the maximum I've managed is -60 to 60. This may depend on the stylus/device
    }
    if (checkPenDeviceLogging.checked === true && typeof evt.twist === "number") {
        loggingInfoList.push({text: `twist: ${evt.twist}`, title: `The clockwise rotation of the pointer (e.g. pen stylus) around its major axis in degrees, with a value in the range 0 to 359.`})
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
    el.classList.toggle("hidden")
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

    // Hides system info when clicking away
    if (!document.querySelector("#system-info-wrapper").classList.contains("hidden") && (!evt.target.closest("#system-info-wrapper") && !evt.target.closest("#btn-system-info"))) {
        toggleVisibility('system-info-wrapper')
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
        case "??":
            return "%81"
        case "???":
            return "%82"
        case "??":
            return "%83"
        case "???":
            return "%84"
        case "???":
            return "%85"
        case "???":
            return "%86"
        case "???":
            return "%87"
        case "??":
            return "%88"
        case "???":
            return "%89"
        case "??":
            return "%8A"
        case "???":
            return "%8B"
        case "??":
            return "%8C"
        case "??":
            return "%8D"
        case "??":
            return "%8E"
        case "??":
            return "%8F"
        case "??":
            return "%90"
        case "???":
            return "%91"
        case "???":
            return "%92"
        case "???":
            return "%93"
        case "???":
            return "%94"
        case "???":
            return "%95"
        case "???":
            return "%96"
        case "???":
            return "%97"
        case "??":
            return "%98"
        case "???":
            return "%99"
        case "??":
            return "%9A"
        case "???":
            return "%9B"
        case "??":
            return "%9C"
        case "??":
            return "%9D"
        case "??":
            return "%9E"
        case "??":
            return "%9F"
        case "??":
            return "%A1"
        case "??":
            return "%A2"
        case "??":
            return "%A3"
        case "??":
            return "%A4"
        case "??":
            return "%A5"
        case "??":
            return "%A6"
        case "??":
            return "%A7"
        case "??":
            return "%A8"
        case "??":
            return "%A9"
        case "??":
            return "%AA"
        case "??":
            return "%AB"
        case "??":
            return "%AC"
        case "??":
            return "%AD"
        case "??":
            return "%AE"
        case "??":
            return "%AF"
        case "??":
            return "%B0"
        case "??":
            return "%B1"
        case "??":
            return "%B2"
        case "??":
            return "%B3"
        case "??":
            return "%B4"
        case "??":
            return "%B5"
        case "??":
            return "%B6"
        case "??":
            return "%B7"
        case "??":
            return "%B8"
        case "??":
            return "%B9"
        case "??":
            return "%BA"
        case "??":
            return "%BB"
        case "??":
            return "%BC"
        case "??":
            return "%BD"
        case "??":
            return "%BE"
        case "??":
            return "%BF"
        case "??":
            return "%C0"
        case "??":
            return "%C1"
        case "??":
            return "%C2"
        case "??":
            return "%C3"
        case "??":
            return "%C4"
        case "??":
            return "%C5"
        case "??":
            return "%C6"
        case "??":
            return "%C7"
        case "??":
            return "%C8"
        case "??":
            return "%C9"
        case "??":
            return "%CA"
        case "??":
            return "%CB"
        case "??":
            return "%CC"
        case "??":
            return "%CD"
        case "??":
            return "%CE"
        case "??":
            return "%CF"
        case "??":
            return "%D0"
        case "??":
            return "%D1"
        case "??":
            return "%D2"
        case "??":
            return "%D3"
        case "??":
            return "%D4"
        case "??":
            return "%D5"
        case "??":
            return "%D6"
        case "??":
            return "%D7"
        case "??":
            return "%D8"
        case "??":
            return "%D9"
        case "??":
            return "%DA"
        case "??":
            return "%DB"
        case "??":
            return "%DC"
        case "??":
            return "%DD"
        case "??":
            return "%DE"
        case "??":
            return "%DF"
        case "??":
            return "%E0"
        case "??":
            return "%E1"
        case "??":
            return "%E2"
        case "??":
            return "%E3"
        case "??":
            return "%E4"
        case "??":
            return "%E5"
        case "??":
            return "%E6"
        case "??":
            return "%E7"
        case "??":
            return "%E8"
        case "??":
            return "%E9"
        case "??":
            return "%EA"
        case "??":
            return "%EB"
        case "??":
            return "%EC"
        case "??":
            return "%ED"
        case "??":
            return "%EE"
        case "??":
            return "%EF"
        case "??":
            return "%F0"
        case "??":
            return "%F1"
        case "??":
            return "%F2"
        case "??":
            return "%F3"
        case "??":
            return "%F4"
        case "??":
            return "%F5"
        case "??":
            return "%F6"
        case "??":
            return "%F7"
        case "??":
            return "%F8"
        case "??":
            return "%F9"
        case "??":
            return "%FA"
        case "??":
            return "%FB"
        case "??":
            return "%FC"
        case "??":
            return "%FD"
        case "??":
            return "%FE"
        case "??":
            return "%FF"
        case "???":
            return "?????????"
        case "???":
            return "?????????"
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
            return "??"
        case "%82":
            return "???"
        case "%83":
            return "??"
        case "%84":
            return "???"
        case "%85":
            return "???"
        case "%86":
            return "???"
        case "%87":
            return "???"
        case "%88":
            return "??"
        case "%89":
            return "???"
        case "%8A":
            return "??"
        case "%8B":
            return "???"
        case "%8C":
            return "??"
        case "%8D":
            return "??"
        case "%8E":
            return "??"
        case "%8F":
            return "??"
        case "%90":
            return "??"
        case "%91":
            return "???"
        case "%92":
            return "???"
        case "%93":
            return "???"
        case "%94":
            return "???"
        case "%95":
            return "???"
        case "%96":
            return "???"
        case "%97":
            return "???"
        case "%98":
            return "??"
        case "%99":
            return "???"
        case "%9A":
            return "??"
        case "%9B":
            return "???"
        case "%9C":
            return "??"
        case "%9D":
            return "??"
        case "%9E":
            return "??"
        case "%9F":
            return "??"
        case "%A1":
            return "??"
        case "%A2":
            return "??"
        case "%A3":
            return "??"
        case "%A4":
            return "??"
        case "%A5":
            return "??"
        case "%A6":
            return "??"
        case "%A7":
            return "??"
        case "%A8":
            return "??"
        case "%A9":
            return "??"
        case "%AA":
            return "??"
        case "%AB":
            return "??"
        case "%AC":
            return "??"
        case "%AD":
            return "??"
        case "%AE":
            return "??"
        case "%AF":
            return "??"
        case "%B0":
            return "??"
        case "%B1":
            return "??"
        case "%B2":
            return "??"
        case "%B3":
            return "??"
        case "%B4":
            return "??"
        case "%B5":
            return "??"
        case "%B6":
            return "??"
        case "%B7":
            return "??"
        case "%B8":
            return "??"
        case "%B9":
            return "??"
        case "%BA":
            return "??"
        case "%BB":
            return "??"
        case "%BC":
            return "??"
        case "%BD":
            return "??"
        case "%BE":
            return "??"
        case "%BF":
            return "??"
        case "%C0":
            return "??"
        case "%C1":
            return "??"
        case "%C2":
            return "??"
        case "%C3":
            return "??"
        case "%C4":
            return "??"
        case "%C5":
            return "??"
        case "%C6":
            return "??"
        case "%C7":
            return "??"
        case "%C8":
            return "??"
        case "%C9":
            return "??"
        case "%CA":
            return "??"
        case "%CB":
            return "??"
        case "%CC":
            return "??"
        case "%CD":
            return "??"
        case "%CE":
            return "??"
        case "%CF":
            return "??"
        case "%D0":
            return "??"
        case "%D1":
            return "??"
        case "%D2":
            return "??"
        case "%D3":
            return "??"
        case "%D4":
            return "??"
        case "%D5":
            return "??"
        case "%D6":
            return "??"
        case "%D7":
            return "??"
        case "%D8":
            return "??"
        case "%D9":
            return "??"
        case "%DA":
            return "??"
        case "%DB":
            return "??"
        case "%DC":
            return "??"
        case "%DD":
            return "??"
        case "%DE":
            return "??"
        case "%DF":
            return "??"
        case "%E0":
            return "??"
        case "%E1":
            return "??"
        case "%E2":
            return "??"
        case "%E3":
            return "??"
        case "%E4":
            return "??"
        case "%E5":
            return "??"
        case "%E6":
            return "??"
        case "%E7":
            return "??"
        case "%E8":
            return "??"
        case "%E9":
            return "??"
        case "%EA":
            return "??"
        case "%EB":
            return "??"
        case "%EC":
            return "??"
        case "%ED":
            return "??"
        case "%EE":
            return "??"
        case "%EF":
            return "??"
        case "%F0":
            return "??"
        case "%F1":
            return "??"
        case "%F2":
            return "??"
        case "%F3":
            return "??"
        case "%F4":
            return "??"
        case "%F5":
            return "??"
        case "%F6":
            return "??"
        case "%F7":
            return "??"
        case "%F8":
            return "??"
        case "%F9":
            return "??"
        case "%FA":
            return "??"
        case "%FB":
            return "??"
        case "%FC":
            return "??"
        case "%FD":
            return "??"
        case "%FE":
            return "??"
        case "%FF":
            return "??"
        case "?????????":
            return "???"
        case "?????????":
            return "???"
        default:
            return "UNSUPPORTED"
    }
}


function init() {
    addBrowserNavigatorData()
}

// The Navigator interface represents the state and the identity of the user agent. It allows scripts to query it and to register themselves to carry on some activities.
function addBrowserNavigatorData() {
    let usefulNavigatorKeysCompatible = ["userAgent", "cookieEnabled", "language", "maxTouchPoints", "onLine", "hardwareConcurrency", "pdfViewerEnabled", "webdriver"]
    let usefulNavigatorKeysDeprecated = ["appCodeName", "appName", "appVersion", "vendor", "vendorSub", "platform", "product", "productSub", "doNotTrack", "oscpu"]
    let usefulNavigatorKeysNonstandard = ["buildID"]

    let addBrowserNavigatorDataRow = (navigatorKey, compatibility) => {
        let navigatorKeyValue = eval(`navigator.${navigatorKey}`)
        if (navigatorKeyValue !== undefined && navigatorKeyValue !== "" && navigatorKeyValue !== null) {
            let systemInfoTr = document.createElement("tr")
            systemInfoTr.classList.add(`navigator-compatibility-${compatibility}`)
            if (compatibility !== "compatible") {
                systemInfoTr.classList.add("hidden")
            }
            systemInfoTr.style.background = (compatibility === "compatible") ? "none" : (compatibility === "deprecated") ? "#F002" : (compatibility === "nonstandard") ? "#0FF2" : (compatibility === "experimental") ? "#FF02" : "none"
            // systemInfoTr.title = `navigator compatibility: ${compatibility}`
            let systemInfoTdKey = document.createElement("td")
            systemInfoTdKey.innerText = navigatorKey
            let systemInfoTdValue = document.createElement("td")
            systemInfoTdValue.innerText = navigatorKeyValue
            systemInfoTr.appendChild(systemInfoTdKey)
            systemInfoTr.appendChild(systemInfoTdValue)
            systemInfoTbody.appendChild(systemInfoTr)
        }
    }


    // Compatible navigator properties
    for (let navigatorKey of usefulNavigatorKeysCompatible) addBrowserNavigatorDataRow(navigatorKey, "compatible")

    // Deprecated navigator properties
    for (let navigatorKey of usefulNavigatorKeysDeprecated) addBrowserNavigatorDataRow(navigatorKey, "deprecated")

    // Non-standard navigator properties
    for (let navigatorKey of usefulNavigatorKeysNonstandard) addBrowserNavigatorDataRow(navigatorKey, "nonstandard")


    //*/ userAgentData (experimental)
    let userAgentData = navigator.userAgentData
    if (userAgentData) {
        if (userAgentData.brands) {
            let systemInfoTr = document.createElement("tr")
            let systemInfoTdKey = document.createElement("td")
            let systemInfoTdValue = document.createElement("td")
            systemInfoTr.classList.add("navigator-experimental")
            systemInfoTr.classList.add("hidden")
            systemInfoTr.style.background = "#FF02"
            systemInfoTr.title = "navigator compatibility: experimental"

            systemInfoTdKey.innerText = "userAgentData brands"
            Array.from(userAgentData.brands).forEach((x) => {
                systemInfoTdValue.innerHTML += `brand: ${x.brand}, version: ${x.version}<br>`
            })

            systemInfoTr.appendChild(systemInfoTdKey)
            systemInfoTr.appendChild(systemInfoTdValue)
            systemInfoTbody.appendChild(systemInfoTr)
        }
        if (typeof userAgentData.mobile === "boolean") {
            let systemInfoTr = document.createElement("tr")
            let systemInfoTdKey = document.createElement("td")
            let systemInfoTdValue = document.createElement("td")

            systemInfoTdKey.innerText = "userAgentData mobile"
            systemInfoTdValue.innerText = userAgentData.mobile

            systemInfoTr.appendChild(systemInfoTdKey)
            systemInfoTr.appendChild(systemInfoTdValue)
            systemInfoTbody.appendChild(systemInfoTr)
        }
        if (userAgentData.platform) {
            let systemInfoTr = document.createElement("tr")
            let systemInfoTdKey = document.createElement("td")
            let systemInfoTdValue = document.createElement("td")

            systemInfoTdKey.innerText = "userAgentData platform"
            systemInfoTdValue.innerText = userAgentData.platform

            systemInfoTr.appendChild(systemInfoTdKey)
            systemInfoTr.appendChild(systemInfoTdValue)
            systemInfoTbody.appendChild(systemInfoTr)
        }
    }
    //*/
}

// Toggles visibility of the navigator data rows of a specific compatibility (compatible/deprecated/experimental/nonstandard).
function toggleNavigatorDataRow(compatibility) {
    for (let navigatorDataRow of document.querySelectorAll(`.navigator-compatibility-${compatibility}`)) {
        navigatorDataRow.classList.toggle("hidden")
    }
}

init()

/*
    TODO:
        Test a pen-device that supports the twist pointerevent property
 */