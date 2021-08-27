import { initApi } from './api.js'
import initModal from './modal'
import { state, initData } from './store'

const init = function (vm, params) {
    if (state.vm) {
        if (!vm.$route) return
        return state.vm = vm
    }
    initData(vm, params)
    initApi()
    initModal()
}

const Once = {
    install(Vue, params, options) {
        if (process.env.NODE_ENV === "development") {
            Vue.mixin({
                mounted: function () {
                    init(this, params)
                }
            })
        }
    }
}

export default Once