import { Action } from './action'

export const watchHover = function (state) {
    let lastEl = ""
    let hoverHandler = e => {
        if (lastEl === e.target) return

        state.state = "HOVER"
        let lastAction = state.actionPath[state.actionPath.length - 1]
        if (lastAction.EVENT === "HOVER") state.actionPath.pop()
        state.actionPath.push(new Action("HOVER", e, state))

        if (e.target.className) {
            if (lastEl) lastEl.setAttribute("class", lastEl.className.replace(" mouseover", ""))
            e.target.setAttribute("class", `${e.target.className} mouseover`)
        }

        lastEl = e.target
        // logTable(state.actionPath)
    }

    document.addEventListener("mouseover", hoverHandler)
    return () => {
        document.removeEventListener("mouseover", hoverHandler)
    }
}

export const watchClick = function (state) {
    let lastTimeStamp = ""
    let clickHandler = e => {
        console.log(e)
        let timeStamp = new Date().getTime()
        state.state = "CLICK"
        let lastAction = state.actionPath[state.actionPath.length - 1]
        let clicked = lastAction.EVENT === "CLICK" && (timeStamp - lastTimeStamp) < 10
        if (!clicked) {
            if (lastAction.EVENT === "HOVER") {
                let copyAction = Object.assign(Object.create(lastAction), lastAction)
                copyAction.setEvent("CLICK")
                state.actionPath.push(copyAction)
            }
            else state.actionPath.push(new Action("CLICK", e, state))
        }

        logTable(state.actionPath)
        lastTimeStamp = timeStamp
    }
    document.addEventListener("click", clickHandler)
    return () => document.removeEventListener("click", clickHandler)
}

export const watchCopy = function (state) {
    let copyHandler = e => {
        state.state = "ASSERT"
        state.actionPath.push(new Action("ASSERT", e, state))
        logTable(state.actionPath)
    }
    document.addEventListener("copy", copyHandler)
    return () => document.removeEventListener("copy", copyHandler)
}

export const watchInput = function (state) {
    let inputHandler = e => {
        if (e.target.type !== "text") return
        state.state = "INPUT"
        let lastAction = state.actionPath[state.actionPath.length - 1]
        if (lastAction.target === e.target && lastAction.EVENT === "INPUT") state.actionPath.pop()
        state.actionPath.push(new Action("INPUT", e, state))
        logTable(state.actionPath)
    }
    document.addEventListener("input", inputHandler)
    return () => document.removeEventListener("input", inputHandler)
}

export const watchScroll = function (state) {
    let scrollHandler = e => {
        state.state = "SCROLL"
        let lastAction = state.actionPath[state.actionPath.length - 1]
        if (lastAction.target === e.target && lastAction.EVENT === "SCROLL") state.actionPath.pop()
        state.actionPath.push(new Action("SCROLL", e, state))
        logTable(state.actionPath)
    }
    document.addEventListener("scroll", scrollHandler)

    return () => document.removeEventListener("scroll", scrollHandler)
}

export const watchSelect = function (state) {
    let selectHandler = e => {
        console.log(e)
        state.state = "CLICK"
        state.actionPath.push(new Action("CLICK", e, state))
        logTable(state.actionPath)
    }
    document.addEventListener("optionclick", selectHandler)

    return () => document.removeEventListener("optionclick", selectHandler)
}

export const watchHash = function (state) {
    let hashHandler = e => {
        console.log(e)
    }
    document.addEventListener("hashchange", hashHandler)
    return () => document.removeEventListener("hashchange", hashHandler)
}

export const watchClickElement = function (state) {
    let els = []

    const updateEls = query => {
        let el = Array.from(document.querySelectorAll(query))
        els = [...new Set(els.concat(el))]
    }

    updateEls(".el-cascader-node__label")
    updateEls(".el-select")
    updateEls(".el-select-dropdown__item")

    const clickElementHandler = e => {
        state.state = "CLICK"
        state.actionPath.push(new Action("CLICK", e, state))
        logTable(state.actionPath)

        updateEls(".el-cascader-node__label")
        updateEls(".el-select")
        updateEls(".el-select-dropdown__item")

        els.forEach((item, index) => {
            item.removeEventListener("click", clickElementHandler)
            item.addEventListener("click", clickElementHandler)
        })
    }

    els.forEach((item, index) => {
        item.addEventListener("click", clickElementHandler)
    })

    return () => {
        els.forEach((item, index) => {
            item.removeEventListener("click", clickElementHandler)
        })
    }
}

const logTable = function (data) {
    // console.clear()
    console.table(data)
}