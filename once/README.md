## 简介

test-once是一款vue插件，他基于cypress实现，通过非侵入式地注入脚本以实现E2E自动化测试录制功能并生成cypress测试脚本

test-once共支持五种Action的录制，包括click，input，copy，scroll，hash

## 注意

1.因test-once是非侵入式地设计，需要手动计算和更新dom，应用内的异步函数及状态更新可能无法被准确感知，所以在每一次录制过后会出现灰色模态窗口，在异步更新完成后单机键盘F2，即可开始下一步的录制，中间的间隔时间也会被准确的记录和回放；

2.录制函数会自动处理浏览器窗口大小，action时间间隔等；

## 使用方法

1.安装依赖
```
npm install test-once cypress

vue add test-once cypress
```

2.引入脚本
```
import once from 'test-once'

let option = {

    // 关闭click录制监听
    // click: false    

    // 当某些事件被停止冒泡时，document无法录制到这些事件
    // 此时可通过传入元素的queryString来手动添加这些事件监听
    click: {
        query: ['.el-cascader:visible']
    },

    input: false,
    copy: false,
    scroll: false,
    hash: false
}

Vue.use(once, option)
```

```
// 脚本及API只有在开发环境下会被注入
process.env.NODE_ENV === "development"
```

3.开始录制

```
// 可通过浏览器控制台执行API

// 开始录制
window.testCaseBegin()

// 结束录制
// 调用后会发起下载任务，生成的测试脚本可自行组织
window.testCaseDone()
```

## Action

test-once共支持五种Action的录制，包括click，input，copy，scroll，hash

其中，click，input，scroll事件即为浏览器click，input，scroll事件

copy和hash事件通过监听Ctrl+C按键来进行录制，当选中并复制某段文本后，test-once会：
1.获取当前的页面定义在vue声明周期中urlPath的正则表达式
2.获取复制的元素和元素内容
3.在生成脚本时，断言当前窗口的url是否匹配获取到的正则表达式
4.在生成脚本时，断言复制元素的内容是否等于剪贴板复制的值



