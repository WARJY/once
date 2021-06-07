import { initApi } from './api.js'
import Select from './components/select/index'

const initData = function (data, vm) {
    data.vm = vm
    let allEls = Array.from(document.querySelectorAll("*"))
    while (allEls.length > 0) {
        let current = allEls.pop()
        if (current.attributes.length === 0) continue
        if (current.attributes[0].nodeName.indexOf("data-v") > -1) {
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

const init = function (vm) {
    if(data.vm) return
    initData(data, vm)
    initApi(data)
}

const Once = {
    install(Vue, params, options ) {
        Vue.component("ElSelect", Select)
        Vue.mixin({
            mounted: function () {
                init(this)
            }
        })
    }
}

export default Once