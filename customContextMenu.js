(function() {
    function getScriptParams() {
        var scripts = document.getElementsByTagName('script');
        var lastScript = scripts[scripts.length - 1];
        var src = lastScript.getAttribute('src');
        var params = {};
        var paramStr = src.split('?')[1];
        if (paramStr) {
            var pairs = paramStr.split('&');
            pairs.forEach(function(pair) {
                var parts = pair.split('=');
                params[parts[0]] = parts[1];
            });
        }
        params.id = params.id || 'default'; 
        return params;
    }

    var scriptParams = getScriptParams();
    var id = scriptParams.id;
    var configPath = scriptParams.config;
    var options = [];

    // 读取 config 文件
    function fetchConfig() {
        return new Promise((resolve, reject) => {
            if (!configPath) {
                // 如果没有 config 路径，直接使用硬编码菜单项
                options = [
                    { text: '硬编码选项 1', action: '#' },
                    { text: '硬编码选项 2', action: '#' },
                    { text: '硬编码选项 3', action: '#' }
                ];
                resolve(options);
                return;
            }
            var xhr = new XMLHttpRequest();
            xhr.open('GET', configPath, true);
            xhr.onload = function() {
                if (xhr.status >= 200 && xhr.status < 300) {
                    var config = JSON.parse(xhr.responseText);
                    // 解析菜单项
                    options = config.options || [];
                    // 检查是否有 style 部分，进行样式添加
                    if (config.style) {
                        var style = document.createElement('style');
                        style.textContent = config.style;
                        document.head.appendChild(style);
                    } else {
                        // 没有 style 部分，使用硬编码样式
                        var style = document.createElement('style');
                        style.textContent = `
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
                        `;
                        document.head.appendChild(style);
                    }
                    resolve(options);
                } else {
                    reject(xhr.statusText);
                }
            };
            xhr.onerror = function() {
                reject(xhr.statusText);
            };
            xhr.send();
        });
    }


    // 创建自定义菜单并添加到页面
    var menu = document.createElement('ul');
    menu.id = 'customContextMenu';
    document.body.appendChild(menu);

    // 显示菜单
    function showMenu(event) {
        event.preventDefault();
        menu.style.left = event.pageX + 'px';
        menu.style.top = event.pageY + 'px';
        menu.style.display = 'block';
        menu.style.opacity = 1; 
    }

    // 隐藏菜单
    function hideMenu() {
        menu.style.opacity = 0; 
        setTimeout(() => {
            menu.style.display = 'none'; 
        }, 300); 
    }

    // 事件委托处理菜单项的点击
    menu.addEventListener('click', function(event) {
        if (event.target.tagName === 'LI') {
            var index = Array.from(menu.children).indexOf(event.target);
            var option = options[index];
            if (option && option.action) {
                if (option.action.startsWith('http://') || option.action.startsWith('https://')) {
                    window.location.href = option.action;
                } else if (typeof option.action === 'function') {
                    option.action();
                } else {
                    alert('点击了：' + option.text);
                }
            } else {
                console.warn('右键菜单：无效的菜单项操作');
            }
            hideMenu();
        }
    });

    // 绑定右键事件
    document.addEventListener('contextmenu', function(event) {
        showMenu(event);
    });

    // 点击页面其他地方时隐藏菜单
    document.addEventListener('click', hideMenu);

    // 初始化
    fetchConfig().then(() => {
        // 创建菜单项
        options.forEach(function(option) {
            var li = document.createElement('li');
            li.textContent = option.text;
            menu.appendChild(li);
        });
    }).catch(error => {
        console.error('右键菜单：读取配置文件失败:', error);
        // 使用硬编码菜单项
        options = [
            { text: '硬编码选项 1', action: '#' },
            { text: '硬编码选项 2', action: '#' },
            { text: '硬编码选项 3', action: '#' }
        ];
        options.forEach(function(option) {
            var li = document.createElement('li');
            li.textContent = option.text;
            menu.appendChild(li);
        });
    });
})();
