export const state = {
    vm: "",
    state: "",
    actionPath: [],
    hash: "",
    option: ""
}

const baseOption = {
    click: {
        query: []
    },
    input: {
        query: []
    },
    copy: {
        query: []
    },
    hash: {
        query: []
    },
    scroll: {
        query: []
    }
}

export const initData = function (vm, params) {
    state.option = {
        ...baseOption,
        ...params
    }
    state.vm = vm
    let allEls = Array.from(document.querySelectorAll("*"))
    while (allEls.length > 0) {
        let current = allEls.pop()
        if (current.attributes.length === 0) continue
        if (current.attributes[0].nodeName.indexOf("data-v") > -1) {
            state.hash = current.attributes[0].nodeName
            break
        }
    }
}