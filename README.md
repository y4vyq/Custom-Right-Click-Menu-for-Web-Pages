**一、概述**

`customContextMenu.js` 是一个用于创建自定义上下文菜单的 JavaScript 文件。它允许用户在页面上通过右键点击触发自定义的上下文菜单，菜单的内容和行为可以通过外部配置文件或硬编码的菜单项进行定制。同时，该文件支持通过 `script` 元素的 `src` 属性传递 `id` 和 `config` 参数，以实现不同的配置和功能。
# 图：![当你看到这段文字时，应该是网络不好图片没加载出来](http://www.ziyoufh.top/static/img/th.png)
**二、使用方法**
1. **引入文件**：
    - 将 `customContextMenu.js` 文件引入到 HTML 文件中,确保可以正常使用，例如：
    ```
    <script src="/static/js/customContextMenu.js"></script>
    ```
    可以在 `script` 元素的 `src` 属性中传递 `id` 和 `config` 参数，例如：
    ```
    <script src="path/customContextMenu.js?id=1&config=/path/config.txt"></script>
    ```
    或
    ```
    <script src="/static/js/customContextMenu.js?id=1&config=/path/config.txt"></script>
    ```
    其中，`id` 是一个可选参数，可用于对菜单进行标识；`config` 是一个可选参数，用于指定配置文件的路径。如果未提供 `config` 参数，将使用硬编码的菜单项作为备选方案。
   

3. **配置文件（可选）**：
    - 配置文件应为 JSON 格式，示例如下：
    ```
    [
        {"text":"选项1","action":"http://example.com/option1"},
        {"text":"选项2","action":"http://example.com/option2"},
        {"text":"选项3","action":"http://example.com/option3"}
    ]
    ```
    其中，`text` 表示菜单项的显示文本，`action` 表示菜单项的操作，可以是一个 URL 或自定义函数。如果 `action` 以 `http://` 或 `https://` 开头，点击菜单项将跳转到相应的 URL；如果 `action` 是一个函数，点击菜单项将执行该函数；对于其他情况，将显示一个包含 `text` 的提示信息。

4. **默认配置**：
    - 当未提供 `config` 参数或读取配置文件失败时，将使用硬编码的菜单项，默认的硬编码菜单项如下：
    ```
    [
        { text: '硬编码选项 1', action: '#' },
        { text: '硬编码选项 2', action: '#' },
        { text: '硬编码选项 3', action: '#' }
    ]
    ```


**三、功能特性**
1. **自定义菜单显示和隐藏**：
    - 当用户在页面上右键点击时，会在鼠标位置显示自定义的上下文菜单，鼠标悬停在菜单项上会有背景色变化。
    - 点击页面其他位置或点击菜单项后，菜单会自动隐藏，隐藏时具有过渡效果（通过设置 `opacity` 实现）。

2. **菜单项的操作处理**：
    - 点击菜单项会根据 `action` 属性执行相应操作，如页面跳转、执行自定义函数或显示提示信息。
    - 对于 `action` 为函数的情况，确保函数在配置文件中正确定义和绑定，或者在代码中根据需要添加相应的函数逻辑。

3. **错误处理和默认配置**：
    - 当读取配置文件失败时，会使用硬编码菜单项。
    - 在菜单项点击事件处理中，会检查 `option` 及其 `action` 属性的有效性，对于无效操作会输出警告信息。


**四、性能优化**
- 对于可能耗时的操作，如 `option.action` 为函数的情况，使用 `setTimeout` 将函数调用延迟到下一个事件循环，避免阻塞主线程，减少 `click` 事件处理程序的执行时间。


**五、注意事项**
1. 确保配置文件的路径正确，且文件内容符合 JSON 格式，否则可能导致文件读取失败。
2. 对于 `option.action` 为函数的情况，需谨慎处理函数的定义和执行，避免出现安全隐患。
3. 可根据需要修改硬编码菜单项的内容、`id` 的默认值，以及进一步完善错误处理逻辑，以满足不同的需求。
4. 若配置文件位于不同的域或需要特殊的请求头，可能需要使用 `fetch` API 并设置相应的请求头，以确保文件的正常读取。


**六、示例代码**
以下是一个简单的 `index.html` 文件示例：
```
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>改进后的自定义上下文菜单</title>
</head>
<body>
    <script src="path/customContextMenu.js"></script>
</body>
</html>
```


**七、依赖关系**
- 该文件依赖于浏览器原生的 DOM API，如 `document.createElement`、`document.addEventListener` 等，无需额外的第三方库。


**八、更新日志**
- 初始版本：创建基本的自定义上下文菜单功能。
- 后续更新：添加从配置文件读取菜单项的功能，支持通过 `script` 元素的 `src` 参数传递配置信息，实现默认配置和硬编码菜单项的功能，优化菜单项点击处理逻辑，以及处理性能问题。
