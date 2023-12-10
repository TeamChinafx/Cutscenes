// script.js

// 定义一个变量，用于存储当前选中的标签
var currentTab = "Mondstadt";

// 定义一个函数，用于切换标签
function switchTab(tab) {
    // 如果点击的标签和当前选中的标签不同，才进行切换
    if (tab != currentTab) {
        // 获取当前选中的标签元素，将其样式设置为非选中状态
        var currentTabElement = document.getElementById(currentTab);
        currentTabElement.classList.remove("active");

        // 获取点击的标签元素，将其样式设置为选中状态
        var tabElement = document.getElementById(tab);
        tabElement.classList.add("active");

        // 更新当前选中的标签变量
        currentTab = tab;

        // 调用loadVideos函数，加载对应的视频列表
        loadVideos(tab);
    }
}

// 定义一个函数，用于加载视频列表
function loadVideos(tab) {

    // 获取页面中的视频列表元素
    var videoList = document.getElementById("video-list");

    //清空
    videoList.innerHTML = "";

    // 根据标签名拼接json文件的路径
    var jsonPath = "./" + tab + "/list.json";

    // 创建一个XMLHttpRequest对象，用于发送请求和接收响应
    var xhr = new XMLHttpRequest();

    // 设置请求的方法和路径
    xhr.open("GET", jsonPath);

    // 设置请求的响应类型为json
    xhr.responseType = "json";

    // 设置请求的回调函数，当请求完成时执行
    xhr.onload = function() {
        // 如果请求成功，状态码为200
        if (xhr.status == 200) {
            // 获取响应的json数据
            var data = xhr.response;

            // 遍历json数据中的每一项
            for (var i = 0; i < data.length; i++) {
                // 获取当前项的视频标题和视频链接
                var title = data[i].title;
                var url = data[i].url;

            // 创建一个视频项元素，设置其样式和内容
            var videoItem = document.createElement("div");
            videoItem.className = "video-item";
            videoItem.innerHTML = "<h3>" + title + "</h3>";

            // 创建一个视频元素，设置其属性和事件监听器
            var video = document.createElement("video");
            video.src = url;
            video.width = 720;
            video.height = 480;
            video.controls = true;
            video.addEventListener("click", function() {
                // 点击视频时，暂停或播放视频
                if (this.paused) {
                    this.play();
                } else {
                    this.pause();
                }
            });
            videoItem.appendChild(video);

            // 将视频项元素添加到视频列表元素中
            videoList.appendChild(videoItem);
        }
    } else {
            // 如果请求失败，显示错误信息
            videoList.innerHTML = "<p>加载失败，请检查json文件是否存在或格式是否正确</p>";
        }
    };

    // 发送请求
    xhr.send();
}

// 调用loadVideos函数，加载默认的视频列表
loadVideos(currentTab);
