// 获取cookie
let cookieData = document.cookie.split(";")
console.log(cookieData);
let userCookie
for (let n of cookieData) {
	if (n.split("=")[0] === "userStorage") {
		userCookie = n.split("=")[1]
		break
	}
}
console.log(userCookie);
// 点击我的跳转
let my = document.querySelector("#my")
my.addEventListener("click", function() {
	if (userCookie === undefined) {
		my.childNodes[0].href = "login.html"
	} else {
		my.childNodes[0].href = "user.html"
	}
})
// 点击购物车跳转
let mynavigation = document.querySelector("#mynavigation")
mynavigation.addEventListener("click", function() {
	if (userCookie === undefined) {
		mynavigation.childNodes[0].href = "login_navigation.html"
	} else {
		mynavigation.childNodes[0].href = "category.html"
	}
})
// 右上角显示：登录或者Lucky
let header_btn = document.querySelector("#header_btn")
if (userCookie !== undefined) {
	header_btn.innerHTML = "Lucky"
} else {
	header_btn.innerHTML = "登陆"
	header_btn.addEventListener("click", function() {
		location.href = "login.html"
	})
}
// 获取导航栏的所有选项卡
var navItems = document.querySelectorAll('.aui-scroll-item');

// 获取内容项的父容器
var contentContainer = document.querySelector('.aui-scroll-content');

// 遍历导航栏选项卡
navItems.forEach(function(item, index) {
	// 监听点击事件
	item.addEventListener('click', function(event) {
		event.preventDefault();

		// 移除所有选项卡的激活状态
		navItems.forEach(function(navItem) {
			navItem.classList.remove('aui-crt');
		});

		// 添加当前选项卡的激活状态
		item.classList.add('aui-crt');

		// 获取对应的内容项
		var contentItem = contentContainer.children[index];

		// 将内容项滚动到可见区域
		contentItem.scrollIntoView({
			behavior: 'smooth'
		});
	});
});
// // 在页面加载完成后执行代码
// document.addEventListener("DOMContentLoaded", function() {
// 	// 获取滚动主体内容的容器元素
// 	var scrollContainer = document.querySelector(".aui-scroll-contents");

// 	// 获取侧边导航栏中的导航项
// 	var navItems = document.querySelectorAll(".aui-scroll-nav a");

// 	// 监听滚动事件
// 	scrollContainer.addEventListener("scroll", function() {
// 		// 获取当前滚动位置
// 		var scrollPosition = scrollContainer.scrollTop;

// 		// 遍历每个板块
// 		var contentItems = document.querySelectorAll(".aui-scroll-content-item");
// 		contentItems.forEach(function(item, index) {
// 			// 获取当前板块的位置信息
// 			var itemTop = item.offsetTop - 50; // 偏移量，可根据需要调整
// 			var itemHeight = item.offsetHeight;
// 			// 判断当前滚动位置是否在当前板块内
// 			if (scrollPosition >= itemTop && scrollPosition < itemTop + itemHeight) {
// 				// 移除所有导航项的选中样式
// 				navItems.forEach(function(navItem) {
// 					navItem.classList.remove("aui-crt");
// 				});

// 				// 将当前板块对应的导航项添加选中样式
// 				navItems[index].classList.add("aui-crt");
// 			}
// 		});
// 	});
// });