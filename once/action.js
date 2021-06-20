import $, { css } from 'jquery'
import 'selector-generator'

const generator = new SelectorGenerator();

// 测试行为
export class Action {
    constructor(EVENT, e, state) {
        this.timeStamp = new Date().getTime()
        this.EVENT = EVENT
        this.target = e.target
        this.position = {
            x: e.pageX,
            y: e.pageY
        }
        this.text = e.target ? e.target.innerText : ""
        if (e.target !== document) this.query = this.getQuery(e.target, e.path, state.hash)

        if (EVENT === "VISIT") {
            this.visitUrl = window.location.href
            this.viewPort = {
                width: window.innerWidth,
                height: window.innerHeight
            }
        }
        if (EVENT === "ASSERT") this.assertValue = e.target.innerText
        if (EVENT === "ASSERT") this.assertUrl = this.getRouter(state.vm)
        if (EVENT === "INPUT") this.inputValue = e.target.value
        if (EVENT === "SELECT") this.selectValue = e.value
        if (EVENT === "SCROLL") this.scroll = {
            x: window.pageXOffset,
            y: window.pageYOffset,
        }
        // Object.freeze(this)
    }
}

Action.prototype.getClass = function (elClass) {
    if (!elClass) return
    let classList = elClass.split(" ")
    if (classList.length > 0) {
        return classList.reduce((total, item, index) => {
            if (item) return `${total}.${item}`
            return total
        }, "")
    }
}

Action.prototype.formatPath = function (path) {
    let _path = path.filter((item, index) => {
        return item !== window && item !== document && item !== document.body && item.tagName !== "HTML"
    })
    return _path
}

Action.prototype.getQueryByth = function (el) {
    let tag, index, stack = [];

    for (; el.parentNode; el = el.parentNode) {
        tag = el.tagName;
        if (tag != "HTML") {
            index = $(el).prevAll().length + 1;
            if (tag == "BODY") {
                stack.unshift(tag);
            } else {
                stack.unshift(tag + ':nth-child(' + index + ')');
            }
        }
    }
    return stack.join(' > ');
}

Action.prototype.getQuery = function (el, path, hash) {
    if (!path) return

    let path2 = generator.getSelector(el)
    // let path2 = generator.getPath(el)

    path2 = path2.replace(/.mouseover/g, "")
    path2 = path2.replace(".hover", "")

    let queryNth = 0
    let preEls = Array.from(document.querySelectorAll(path2))

    if (preEls.length > 1) {
        preEls.forEach((item, index) => {
            if (item === el) return queryNth = index
        })
    }

    return {
        tagName: el.tagName,
        query: path2,
        nth: queryNth
    }

    // 通过:nth层级获取的元素query
    let queryByth = this.getQueryByth(el)
    // console.log("queryByth", query)

    // 通过attr获取的元素query
    let query = []
    path = this.formatPath(path)
    while (path.length > 0) {
        let currentEl = path.pop()
        let elAttr = Array.from(currentEl.attributes)
        if (!elAttr) query.push(`${currentEl.tagName}`)
        else {
            let attrStr = elAttr.filter((attr, index) => {
                return attr.name !== hash
            }).map((attr, index) => {
                let value = attr.value
                if (attr.name === "class" && attr.value.indexOf("mouseover") > -1) value = value.replace(" mouseover", "")
                if (value) return `${currentEl.tagName}[${attr.name}="${value}"]`
                return `${currentEl.tagName}`
            }).join(",")
            // let currentQuery = [...query, attrStr].join(">")
            // let preSelect = Array.from(document.querySelectorAll(currentQuery))
            // if (preSelect.length === 1) query.push(attrStr)
            // else {
            //     console.log(preSelect)
            //     let nth = 0
            //     preSelect.forEach((item, index) => {
            //         if (item === currentEl) nth = index
            //     })
            //     attrStr += `:nth-of-type(${nth + 1})`
            //     query.push(attrStr)
            // }
            query.push(attrStr)
        }
    }
    query = query.filter((item, index) => {
        return item
    })
    query = query.join(">")
    console.log("queryByAttr", query)

    // 获取query的元素列表用于检查
    let queryByAttrNth = 0
    let preElsByAttr = Array.from(document.querySelectorAll(query))
    console.log(preElsByAttr)

    if (preElsByAttr.length > 1) {
        preElsByAttr.forEach((item, index) => {
            if (item === el) return queryByAttrNth = index
        })
    }

    return {
        tagName: el.tagName,
        query: query,
        nth: queryByAttrNth
    }
}

Action.prototype.getRouter = function (vm) {
    return vm.$route.matched[0].regex
}

Action.prototype.setEvent = function (EVENT) {
    return this.EVENT = EVENT
}
