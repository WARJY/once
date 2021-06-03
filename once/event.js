import { Action } from './action'

export const watchHover = function (state) {
    let lastEl = ""
    let hoverHandler = e => {
        if(lastEl === e.target) return
        if(lastEl) lastEl.className = lastEl.className.replace("mouseover", "")
        e.target.className = `${e.target.className} mouseover`
        lastEl = e.target
    }

    document.addEventListener("mouseover", hoverHandler)
    return () => {
        document.removeEventListener("mouseover", hoverHandler)
    }
}

export const watchClick = function (state) {
    let clickHandler = e => {
        state.state = "CLICK"
        state.actionPath.push(new Action("CLICK", e, state))
        logTable(state.actionPath)
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
        state.state = "INPUT"
        let lastAction = state.actionPath[state.actionPath.length - 1]
        if (lastAction.target === e.target && lastAction.EVENT === "INPUT") state.actionPath.pop()
        state.actionPath.push(new Action("INPUT", e, state))
        logTable(state.actionPath)
    }
    document.addEventListener("input", inputHandler)
    return () => document.removeEventListener("input", inputHandler)
}

export const watchHash = function (state) {
    let hashHandler = e => {
        console.log(e)
    }
    document.addEventListener("hashchange", hashHandler)
    return () => document.removeEventListener("hashchange", hashHandler)
}

const logTable = function(data){
    console.clear()
    console.table(data)
}