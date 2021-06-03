import $ from 'jquery'

// 测试行为
export class Action {
    EVENT = ""
    el = ""
    position = {}
    visitUrl = ""
    assertUrl = ""
    assertValue = ""
    inputValue = ""
    target = ""

    constructor(EVENT, e, state) {
        this.EVENT = EVENT
        this.target = e.target
        this.position = {
            x: e.x,
            y: e.y
        }
        this.query = this.getQuery(e.target, e.path, state.hash)
        if (EVENT === "VISIT") this.visitUrl = window.location.href
        if (EVENT === "ASSERT") this.assertValue = e.target.textContent
        if (EVENT === "ASSERT") this.assertUrl = state.vm.$route.matched[0].regex
        if (EVENT === "INPUT") this.inputValue = e.target.value
        Object.freeze(this)
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
                if(attr.name==="class" && attr.value.indexOf("mouseover")>-1) value = value.replace("mouseover", "")
                return `${currentEl.tagName}[${attr.name}="${value}"]`
            }).join(",")
            query.push(attrStr)
        }
    }
    query = query.filter((item, index) => {
        return item
    })
    query = query.join(">")
    // console.log("queryByAttr", query)

    // 获取query的元素列表用于检查
    let queryByAttrNth = 0
    let queryBythNth = 0
    let preElsByAttr = Array.from(document.querySelectorAll(query))
    let preElsByth = Array.from(document.querySelectorAll(queryByth))
    // console.log(preElsByAttr)
    // console.log(preElsByth)

    if (preElsByAttr.length > 1) {
        preElsByAttr.forEach((item, index) => {
            if (item === el) return queryByAttrNth = index
        })
    }

    if (preElsByth.length > 1) {
        preElsByth.forEach((item, index) => {
            if (item === el) queryBythNth = index
        })
    }

    return {
        queryByAttr: {
            query: query,
            nth: queryByAttrNth
        },
        queryByth: {
            query: queryByth,
            nth: queryBythNth
        }
    }
}

// 行为元素
export class Element {
    el = ""
    elClass = []
    elPath = []
    elId = ""
    HTML = ""
    tagName = ""
    query = ""

    constructor(el, path) {
        if (el) {
            this.el = el
            this.elId = el.id
            this.elClass = el.className.split(" ")
            this.tagName = el.tagName
        }
        if (path) this.elPath = this.formatPath(path)
        if (this.elPath.length > 0) this.query = this.getQuery(this.elPath)

        Object.freeze(this)
    }
}

Element.prototype.formatPath = function (path) {
    let _path = path.filter((item, index) => {
        return item !== window && item !== document && item !== document.body && item.tagName !== "HTML"
    }).map((item, index) => {
        return new Element(item)
    })
    return _path
}

Element.prototype.getQuery = function (elPath) {
    let query = []
    while (elPath.length > 0) {
        let currentEl = elPath.pop()
        let elClass = this.getClass(currentEl.elClass)
        let elId = currentEl.elId ? `#${currentEl.elId}` : ""
        query.push(`${currentEl.tagName}${elClass}${elId}`)
    }
    query = query.join(">")

    let preEls = document.querySelectorAll(query)
    let preElsByth = this.getQueryByth()
    console.log(preEls)
    if (preEls.length === 1) return query


}

Element.prototype.getQueryByth = function (el) {
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

Element.prototype.getClass = function (elClass) {
    if (elClass.length > 0) {
        return elClass.reduce((total, item, index) => {
            if (item) return `${total}.${item}`
            return total
        }, "")
    }
}