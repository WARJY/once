import { watchClick, watchCopy, watchInput, watchHash, watchScroll, watchClickElement, watchInputElement } from './event.js'
import { Action } from './action.js'
import { writeFile } from './server/index.js'

export const initApi = function (data, params) {

    const testCaseStop = []

    window.testCaseBegin = () => {
        data.actionPath.push(new Action("VISIT", {}, {}))

        let watchClickStop = watchClick(data)
        let watchCopyStop = watchCopy(data)
        let watchInputStop = watchInput(data)
        let watchHashStop = watchHash(data)
        let watchScrollStop = watchScroll(data)
        // let watchHoverStop = watchHover(data)
        // let watchSelectStop = watchSelect(data)
        

        testCaseStop.push(watchClickStop)
        testCaseStop.push(watchCopyStop)
        testCaseStop.push(watchInputStop)
        testCaseStop.push(watchHashStop)
        testCaseStop.push(watchScrollStop)
        // testCaseStop.push(watchHoverStop)
        // testCaseStop.push(watchSelectStop)

        if(params.element === true){
            let watchClickElementStop = watchClickElement(data)
            let watchInputElementStop = watchInputElement(data)
            testCaseStop.push(watchClickElementStop)
            testCaseStop.push(watchInputElementStop)
        }

        return console.log("testcase 开始！")
    }

    window.testCaseDetail = function () {
        console.table(data.actionPath)
    }

    window.testCaseClear = function () {
        testCaseStop.forEach((item, index) => {
            item()
        })
    }

    window.testCaseDone = function () {
        let actionPath = data.actionPath.map((item, index) => {
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
        //     data: actionPath,
        // }).then(data => {
        //     alert("用例生成成功！")
        // }).finally(()=>{
        //     window.testCaseClear()
        // })
    }
}