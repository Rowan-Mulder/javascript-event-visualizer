let btn = document.getElementById("btn")
let infoInnerWrapper = document.getElementById("info-inner-wrapper")
let info = document.getElementById("info")
let infoMenuEventSettings = document.getElementById("info-menu-event-settings")
let events = document.getElementById("events")
let eventsInfo = document.getElementById("events-info")

let eventsInfoTimeout;



// Event title info source: https://developer.mozilla.org/

let eventsTouchDevices = [
    {
        type: "touchstart",
        title: "The touchstart event is fired when one or more touch points are placed on the touch surface.",
        category: "touchdevice",
    },
    {
        type: "touchend",
        title: "The touchend event fires when one or more touch points are removed from the touch surface.",
        category: "touchdevice",
    },
    {
        type: "touchmove",
        title: "The touchmove event is fired when one or more touch points are moved along the touch surface.",
        category: "touchdevice",
    },
    {
        type: "touchcancel",
        title: "The touchcancel event is fired when one or more touch points have been disrupted in an implementation-specific manner (for example, too many touch points are created).",
        category: "touchdevice",
    },
]

let eventsMouse = [
    {
        type: "click", // Only sometimes contains evt.pointerType?
        title: "An element receives a click event when a pointing device button (such as a mouse's primary mouse button) is both pressed and released while the pointer is located inside the element.",
        category: "mouse"
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
        title: "The mousemove event is fired at an element when a pointing device (usually a mouse) is moved while the cursor's hotspot is inside it.",
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
        type: "blur",
        title: "The blur event fires when an element has lost focus.",
        category: "general",
    },
    {
        type: "dblclick",
        title: "The dblclick event fires when a pointing device button (such as a mouse's primary button) is double-clicked; that is, when it's rapidly clicked twice on a single element within a very short span of time.",
        category: "general  ",
    },
    {
        type: "pointerdown",
        title: "The pointerdown event is fired when a pointer becomes active. For mouse, it is fired when the device transitions from no buttons pressed to at least one button pressed. For touch, it is fired when physical contact is made with the digitizer. For pen, it is fired when the stylus makes physical contact with the digitizer.",
        category: "",
    },
    {
        type: "pointerup",
        title: "The pointerup event is fired when a pointer is no longer active.",
        category: "",
    },
    {
        type: "pointercancel",
        title: "The pointercancel event is fired when the browser determines that there are unlikely to be any more pointer events, or if after the pointerdown event is fired, the pointer is then used to manipulate the viewport by panning, zooming, or scrolling.",
        category: "",
    },
    {
        type: "pointermove",
        title: "The pointermove event is fired when a pointer changes coordinates, and the pointer has not been canceled by a browser touch-action.",
        category: "",
    },
    {
        type: "pointerover",
        title: "The pointerover event is fired when a pointing device is moved into an element's hit test boundaries.",
        category: "",
    },
    {
        type: "pointerenter",
        title: "(slightly different than pointerover) The pointerenter event fires when a pointing device is moved into the hit test boundaries of an element or one of its descendants, including as a result of a pointerdown event from a device that does not support hover",
        category: "",
    },
    {
        type: "pointerout",
        title: "The pointerout event is fired for several reasons including: pointing device is moved out of the hit test boundaries of an element; firing the pointerup event for a device that does not support hover (see pointerup); after firing the pointercancel event (see pointercancel); when a pen stylus leaves the hover range detectable by the digitizer.",
        category: "",
    },
    {
        type: "pointerleave",
        title: "The pointerleave event is fired when a pointing device is moved out of the hit test boundaries of an element. For pen devices, this event is fired when the stylus leaves the hover range detectable by the digitizer.",
        category: "",
    },
]

// let eventsPenDevices = [
//     {
//         type: "",
//         title: "",
//         category: "",
//     },
// ]


let ignoredEventLogs = [
    "mousemove",   "mouseover",   "mouseenter",   "mouseout",   "mouseleave",
    "pointermove", "pointerover", "pointerenter", "pointerout", "pointerleave",
]





for (let evt of eventsTouchDevices) {
    addEvent(evt.type, evt.title, evt.category)
}
for (let evt of eventsMouse) {
    addEvent(evt.type, evt.title, evt.category)
}
for (let evt of eventsGeneral) {
    addEvent(evt.type, evt.title, evt.category)
}



function addEvent(type, title, category) {
    btn.addEventListener(type, (evt) => {
        markEvent(evt, title)
    })

    // Events
    // Events overview
    let evt = document.createElement("div")
    evt.setAttribute("name", type)
    evt.classList.add("event")
    evt.title = title
    evt.innerText = type
    events.appendChild(evt)
    // Event popup-info
    evt.onclick = () => {showEventInfo(type, title)}

    // Log settings
    let row = document.createElement("tr")

    let cellInput = document.createElement("td")
    let check = document.createElement("input")
    check.type = "checkbox"
    check.checked = ignoredEventLogs.indexOf(type) === -1
    check.onchange = () => {toggleArrayItem(ignoredEventLogs, type)}
    cellInput.appendChild(check)

    let cellLabel = document.createElement("td")
    cellLabel.innerText = type

    row.appendChild(cellInput)
    row.appendChild(cellLabel)
    infoMenuEventSettings.appendChild(row)
}


function showEventInfo(type, title) {
    // Shows/hides the info in a pop-up
    if (eventsInfo.innerText === title && eventsInfo.classList.contains("events-info-visible")) {
        eventsInfo.classList.remove("events-info-visible")
        clearTimeout(eventsInfoTimeout)
        eventsInfoTimeout = setTimeout(() => {
            eventsInfo.innerText = ""
        }, 500)
    } else {
        clearTimeout(eventsInfoTimeout)
        eventsInfo.innerText = title
        eventsInfo.classList.add("events-info-visible")
    }

    let matchingEvent = events.querySelector(`[name=${type}]`)
    if (matchingEvent) {
        let alreadyHighlighted = false
        if (matchingEvent.classList.contains("event-highlighted")) {
            alreadyHighlighted = true
        }

        for (let evt of events.children) {
            evt.classList.remove("event-highlighted")
        }

        if (!alreadyHighlighted) {
            matchingEvent.classList.add("event-highlighted")
        }
    }
}


function markEvent(evt, title) {
    let additionalInfoList = []
    if (evt.pointerType) {
        additionalInfoList.push(`pointerType: ${(evt.pointerType) ? evt.pointerType : "undefined (triggered programmatically)"}`) // mouse/pen/touch (javascript triggered: "" for .click(), undefined for .dispatchEvent())
    }
    if (evt.button || evt.button === 0) {
        additionalInfoList.push(`button: ${evt.button}`)
    }
    if (evt.buttons || evt.button === 0) {
        additionalInfoList.push(`buttons: ${evt.buttons}`)
    }

    // Logging
    if (ignoredEventLogs.indexOf(evt.type) === -1) {
        let div = document.createElement("div")
        div.classList.add("highlight")

        div.innerText = `type: ${evt.type}`
        if (title) {
            div.title = title
        }
        for (let additionalInfo of additionalInfoList) {
            div.innerText += `, ${additionalInfo}`
        }

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
// Hides event info popup
document.addEventListener("click", (evt) => {
    if (!(eventsInfo.innerText !== "" && !evt.target.closest(".event") && eventsInfo.classList.contains("events-info-visible"))) {
        return
    }

    eventsInfo.classList.remove("events-info-visible")
    clearTimeout(eventsInfoTimeout)
    eventsInfoTimeout = setTimeout(() => {
        eventsInfo.innerText = ""
    }, 500)

    for (let evt of events.children) {
        evt.classList.remove("event-highlighted")
    }
})

// Removes contextmenu
document.addEventListener(("contextmenu"), (evt) => {
    evt.preventDefault()
})