import { initApi } from './api.js'

const data = {
    vm: "",
    state: "",
    actionPath: [],
}

export const init = function (vm) {
    data.vm = vm
    initApi(data)
}