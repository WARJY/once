import { initApi } from './api.js'

const initData = function(data, vm){
    data.vm = vm
    let allEls = Array.from(document.querySelectorAll("*"))
    while(allEls.length > 0){
        let current = allEls.pop()
        if(current.attributes.length===0) continue
        if(current.attributes[0].nodeName.indexOf("data-v") > -1){
            data.hash = current.attributes[0].nodeName
            return
        }
    }
}

const data = {
    vm: "",
    state: "",
    actionPath: [],
    hash: ""
}

export const init = function (vm) {
    initData(data, vm)
    initApi(data)
}