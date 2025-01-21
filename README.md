

# 自定义网页右键上下文菜单

这个 JavaScript 文件允许你在网页上实现自定义的右键上下文菜单，菜单的菜单项和样式可以通过配置文件进行定制，同时支持硬编码的菜单项和样式作为备用方案。

## 一、使用方法

### 1. 引入文件
将 `customContextMenu.js` 文件引入到你的 HTML 文件中，可以通过 `<script>` 标签添加：
```html
<script src="path/to/customContextMenu.js"></script>
```
你也可以在 `script` 元素的 `src` 属性中传递 `config` 参数，指定配置文件的路径：
```html
<script src="path/to/customContextMenu.js?config=path/to/config.json"></script>
```

### 2. 配置文件（可选）
你可以使用一个 JSON 格式的配置文件来自定义菜单的菜单项和样式。示例配置文件如下：
```json
{
    "style": "/* 自定义样式 */ #customContextMenu { background-color: #f9f9f9; border: 2px solid #ddd; } #customContextMenu li { color: #333; }",
    "options": [
        {"text":"自定义选项1", "action":"http://example.com/custom1"},
        {"text":"自定义选项2", "action":"http://example.com/custom2"}
    ]
}
```
- `style`（可选）：包含自定义的 CSS 样式代码，用于设置菜单的外观。如果不提供，将使用硬编码的默认样式。
- `options`（可选）：一个数组，包含菜单项对象。每个菜单项对象包含以下属性：
  - `text`：菜单项显示的文本。
  - `action`：菜单项的操作，可以是一个 URL（以 `http://` 或 `https://` 开头），点击后会跳转至该 URL；也可以是一个函数，点击后会执行该函数；对于其他情况，点击后会显示包含 `text` 的提示信息。

如果不使用配置文件，将使用以下硬编码的菜单项和样式：
```json
[
    { "text": "硬编码选项 1", "action": "#" },
    { "text": "硬编码选项 2", "action": "#" },
    { "text": "硬编码选项 3", "action": "#" }
]
```

### 3. 硬编码样式
当未在配置文件中提供 `style` 部分时，将使用以下默认样式：
```css
#customContextMenu {
    display: none;
    position: absolute;
    background-color: #fff;
    border: 1px solid #ccc;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    list-style: none;
    padding: 5px 0;
    width: 150px;
    z-index: 1000;
    transition: opacity 0.3s ease-in-out;
}
#customContextMenu li {
    padding: 8px 12px;
    cursor: pointer;
}
#customContextMenu li:hover {
    background-color: #f0f0f0;
}
```

## 二、功能实现

### 1. 菜单显示和隐藏
- 当用户在页面上右键点击时，会在鼠标位置显示自定义的上下文菜单，菜单的显示位置会根据鼠标位置动态调整。
- 点击页面其他位置或点击菜单项后，菜单会自动隐藏，隐藏时有过渡效果（通过设置 `opacity` 实现）。

### 2. 菜单项操作处理
- 点击菜单项会根据 `action` 属性执行相应操作：
  - 如果 `action` 以 `http://` 或 `https://` 开头，点击菜单项将跳转到相应的 URL。
  - 如果 `action` 是一个函数，点击菜单项将执行该函数。
  - 对于其他情况，将显示一个包含 `text` 的提示信息。

### 3. 配置文件读取
- 通过 `XMLHttpRequest` 读取配置文件，若配置文件读取成功且包含 `style` 部分，会将其添加到页面的 `<head>` 中；若读取失败或不包含 `style` 部分，将使用硬编码的样式。

### 4. 错误处理
- 当读取配置文件失败时，会使用硬编码菜单项和样式，并在控制台输出错误信息。

## 三、注意事项

- 确保配置文件的路径正确，且文件内容符合 JSON 格式，否则可能导致文件读取失败。
- 对于 `action` 为函数的情况，确保函数的定义和执行不会出现错误，可根据具体需求修改函数逻辑。
- 若配置文件位于不同的域或需要特殊的请求头，可能需要使用 `fetch` API 并设置相应的请求头，以确保文件的正常读取。


## 四、示例代码

以下是一个简单的 HTML 文件示例，使用 `customContextMenu.js` 并指定配置文件：
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>自定义右键菜单示例</title>
</head>
<body>
    <script src="path/to/customContextMenu.js?config=path/to/config.json"></script>
</body>
</html>
```

