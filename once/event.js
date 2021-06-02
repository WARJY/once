import { Action } from './action'

export const watchClick = function (state) {
    let clickHandler = e => {
        state.state = "CLICK"
        state.actionPath.push(new Action("CLICK", e, state))
        console.table(state.actionPath)
    }
    document.addEventListener("click", clickHandler)
    return () => document.removeEventListener("click", clickHandler)
}

export const watchCopy = function (state) {
    let copyHandler = e => {
        state.state = "ASSERT"
        state.actionPath.push(new Action("ASSERT", e, state))
        console.table(state.actionPath)
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
        console.table(state.actionPath)
    }
    document.addEventListener("input", inputHandler)
    return () => document.removeEventListener("input", inputHandler)
}