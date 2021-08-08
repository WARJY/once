import { watchClick, watchCopy, watchInput, watchHash, watchScroll } from './event.js'
import { Action } from './action.js'
import { writeFile } from './server/index.js'
import { state } from './store'

// 初始化API
export const initApi = function () {

    const testCaseStop = []

    // 开始录制
    window.testCaseBegin = () => {
        state.actionPath.push(new Action("VISIT", {}))
        
        const eventList = [watchClick, watchCopy, watchInput, watchHash, watchScroll]
        eventList.forEach((item, index) => {
            testCaseStop.push(item())
        })
        return console.log("testcase 开始！")
    }

    // 用例详情
    window.testCaseDetail = function () {
        console.table(state.actionPath)
    }

    // 清除录制
    window.testCaseClear = function () {
        testCaseStop.forEach((item, index) => {
            item()
        })
    }

    // 结束录制
    window.testCaseDone = function () {
        let actionPath = state.actionPath.map((item, index) => {
            let current = Object.assign({}, item)
            delete current.target
            return current
        })
        let content = writeFile(actionPath)

        const urlObject = window.URL || window.webkitURL || window;
        const export_blob = new Blob([content]);
        const url = urlObject.createObjectURL(export_blob);

        let aLink = document.createElement('a');
        aLink.href = url;
        aLink.download = "case.js" || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
        let event;
        if (window.MouseEvent) event = new MouseEvent('click');
        else {
            event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        }
        aLink.dispatchEvent(event);

        // await axios({
        //     url: `http://127.0.0.1:${devServer.port}/generate/cases`,
        //     method: "post",
        //     state: actionPath,
        // }).then(state => {
        //     alert("用例生成成功！")
        // }).finally(()=>{
        //     window.testCaseClear()
        // })
    }
}