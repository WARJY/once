
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
        this.el = new Element(e.target, e.path)
        this.position = {
            x: e.x,
            y: e.y
        }
        if (EVENT === "VISIT") this.visitUrl = window.location.href
        if (EVENT === "ASSERT") this.assertValue = e.target.textContent
        if (EVENT === "ASSERT") this.assertUrl = state.vm.$route.matched[0].regex
        if (EVENT === "INPUT") this.inputValue = e.target.value
        Object.freeze(this)
    }
}

Action.prototype.getQuery = function (path) {
    let query = ""
    while (path.length > 0) {
        let currentEl = path.pop()
        let elClass = currentEl.className
        let currentQuery = ""
    }
}


// 行为元素
export class Element {
    elClass = []
    elPath = []
    elId = ""
    HTML = ""
    tagName = ""
    query = ""

    constructor(el, path) {
        if (el) {
            this.elId = el.id
            this.elClass = el.className.split(" ")
            this.tagName = el.tagName
        }
        if (path) this.elPath = this.formatPath(path)
        if (this.elPath.length > 0) this.query = this.getQuery(this.elPath)
        console.log(this.query)

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
    console.log(preEls)
    if(preEls.length === 1) return query

    
}

Element.prototype.getClass = function (elClass) {
    if (elClass.length > 0) {
        return elClass.reduce((total, item, index) => {
            if (item) return `${total}.${item}`
            return total
        }, "")
    }
}