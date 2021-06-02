import axios from 'axios'
import { devServer } from '../vue.config.js'
import { watchClick, watchCopy, watchInput } from './event.js'
import { Action } from './action.js'

export const initApi = function (data) {

    const testCaseStop = []

    window.testCaseBegin = function () {
        data.actionPath.push(new Action("VISIT", {}, {}))

        let watchClickStop = watchClick(data)
        let watchCopyStop = watchCopy(data)
        let watchInputStop = watchInput(data)

        testCaseStop.push(watchClickStop)
        testCaseStop.push(watchCopyStop)
        testCaseStop.push(watchInputStop)

        return console.log("testcase 开始！")
    }

    window.testCaseDetail = function () {
        console.table(data.actionPath)
    }

    window.testCaseClear = function(){
        testCaseStop.forEach((item,index)=>{
            item()
        })
    }

    window.testCaseDone = async function () {
        let actionPath = data.actionPath.map((item, index) => {
            let current = Object.assign({}, item)
            delete current.target
            return current
        })
        await axios({
            url: `http://127.0.0.1:${devServer.port}/generate/cases`,
            method: "post",
            data: actionPath,
        }).then(data => {
            alert("用例生成成功！")
        }).finally(()=>{
            window.testCaseClear()
        })
    }
}