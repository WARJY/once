import { Action } from './action'
import $ from 'jquery'
import { emitter } from 'cutil'
import { state } from './store'

const updateEls = querys => {
    let els = []
    querys.forEach((item, index) => {
        let el = Array.from($(`${item}`))
        els = [...new Set(els.concat(el))]
    })
    return els
}

export const watchClick = function () {

    // 记录上一次触发的时间戳
    let lastTimeStamp = ""

    // 判断是否需要注入特殊元素的事件监听
    let injextElClass = state.option.click.query
    let injectEls = []
    if (injextElClass.length > 0) injectEls = updateEls(injextElClass)

    // 模态框确认事件
    emitter.on("modal-confirm", () => {
        injectEls = updateEls(injextElClass)
        injectEls.forEach((item, index) => {
            item.removeEventListener("click", clickHandler)
            item.addEventListener("click", clickHandler)
        })
        emitter.emit("modal", false)
    })

    // 事件处理函数
    let clickHandler = e => {
        let timeStamp = new Date().getTime()
        state.state = "CLICK"
        let lastAction = state.actionPath[state.actionPath.length - 1]

        if (lastAction.EVENT === "CLICK" && lastAction.position.x === e.pageX && lastAction.position.y === e.pageY) return

        // 兼容多次触发的情况
        let clicked = lastAction.EVENT === "CLICK" && (timeStamp - lastTimeStamp) < 10
        if (!clicked) {
            if (lastAction.EVENT === "HOVER") {
                let copyAction = Object.assign(Object.create(lastAction), lastAction)
                copyAction.setEvent("CLICK")
                state.actionPath.push(copyAction)
            }
        }

        state.actionPath.push(new Action("CLICK", e, state))

        logTable(state.actionPath)
        lastTimeStamp = timeStamp

        emitter.emit("modal", true)
    }

    document.addEventListener("click", clickHandler)
    injectEls.forEach((item, index) => {
        item.addEventListener("click", clickHandler)
    })

    return () => {
        document.removeEventListener("click", clickHandler)
        injectEls.forEach((item, index) => {
            item.addEventListener("click", clickHandler)
        })
    }
}

export const watchCopy = function () {
    let copyHandler = e => {
        state.state = "ASSERT"
        state.actionPath.push(new Action("ASSERT", e, state))
        logTable(state.actionPath)
    }
    document.addEventListener("copy", copyHandler)
    return () => document.removeEventListener("copy", copyHandler)
}

export const watchInput = function () {

    // 判断是否需要注入特殊元素的事件监听
    let injextElClass = state.option.click.query
    let injectEls = []
    if (injextElClass.length > 0) injectEls = updateEls(injextElClass)

    let inputHandler = e => {
        if (e.target.type !== "text") return
        state.state = "INPUT"
        let lastAction = state.actionPath[state.actionPath.length - 1]
        if (lastAction.target === e.target && lastAction.EVENT === "INPUT") state.actionPath.pop()
        state.actionPath.push(new Action("INPUT", e, state))
        logTable(state.actionPath)
    }

    injectEls.forEach((item, index) => {
        item.addEventListener("input", inputHandler)
    })
    document.addEventListener("input", inputHandler)

    return () => {
        document.removeEventListener("input", inputHandler)
        injectEls.forEach((item, index) => {
            item.removeEventListener("input", inputHandler)
        })
    }
}

export const watchScroll = function () {

    // 判断是否需要注入特殊元素的事件监听
    let injextElClass = state.option.scroll.query
    let injectEls = []
    if (injextElClass.length > 0) injectEls = updateEls(injextElClass)

    let scrollHandler = e => {
        console.log(e)
        state.state = "SCROLL"
        let lastAction = state.actionPath[state.actionPath.length - 1]
        if (lastAction.target === e.target && lastAction.EVENT === "SCROLL") state.actionPath.pop()
        state.actionPath.push(new Action("SCROLL", e, state))
        logTable(state.actionPath)
    }

    injectEls.forEach((item, index) => {
        item.addEventListener("scroll", scrollHandler)
    })
    document.addEventListener("scroll", scrollHandler)

    return () => {
        injectEls.forEach((item, index) => {
            item.removeEventListener("scroll", scrollHandler)
        })
        document.removeEventListener("scroll", scrollHandler)
    }
}

export const watchHash = function () {
    let hashHandler = e => {
        console.log(e)
    }
    document.addEventListener("hashchange", hashHandler)
    return () => document.removeEventListener("hashchange", hashHandler)
}

const logTable = function (data) {
    console.clear()
    console.table(data)
}