// 获取cookie
let cookieData = document.cookie.split(";")
console.log(cookieData);
let userCookie;
for (let n of cookieData) {
	if (n.split("=")[0] === "userStorage") {
		userCookie = n.split("=")[1]
		break
	}
}
console.log(userCookie);
// 点击我的跳转
let my = document.querySelector("#my")
my.addEventListener("click",function(){
	if(userCookie === undefined) {
		my.childNodes[0].href = "login.html"
	} else {
		my.childNodes[0].href = "user.html"
	}
})
// 点击购物车跳转
let mynavigation = document.querySelector("#mynavigation")
mynavigation.addEventListener("click",function(){
	if(userCookie === undefined) {
		mynavigation.childNodes[0].href = "login_navigation.html"
	} else {
		mynavigation.childNodes[0].href = "category.html"
	}
})
// 右上角显示：登录或者Lucky
let header_btn = document.querySelector("#header_btn")
if (userCookie !== undefined){
	header_btn.innerHTML = "Lucky"
} else {
	header_btn.innerHTML = "登陆"
	header_btn.addEventListener("click",function(){
		location.href = "login.html"
	})
}
// 轮播图

let mySwiper = new Swiper('.swiper-container',{
autoplay : 3000,//可选选项，自动滑动秒数
loop : true,//可选选项，开启循环
// 还有其他参数，自己查官网文档
})
// 倒计时
let secTime = document.querySelector("#secTime")
let totalTime = 1 * 60 * 60
let timer = setInterval(function(){
	totalTime--
	if(totalTime == 0){
		clearInterval(timer)
	}
	let h = Math.floor(totalTime / 3600) < 10 ? `0${Math.floor(totalTime / 3600)}`:
		`${Math.floor(totalTime / 3600)}`
	let m = Math.floor(totalTime % 3600 / 60) < 10 ? `0${Math.floor(totalTime % 3600 / 60)}`:
		`${Math.floor(totalTime % 3600 / 60)}`
	let s = Math.floor(totalTime % 60) < 10 ? `0${Math.floor(totalTime % 60)}` : `${Math.floor(totalTime % 60)}`
	let str = `${h}:${m}:${s}`
	secTime.innerHTML = str
},1000)

// 渲染商品
let goodsObj 
axios({
	method:"get",
	url:"./json/goods.json",
}).then(function(resp) {
	let goodsData = JSON.stringify(resp.data)
	localStorage.setItem("goodsData",goodsData)
})
goodsObj = JSON.parse(localStorage.getItem("goodsData"))
console.log(goodsObj);

//2.for goodsObj
let goodsShowLeft = document.querySelector("#goodsShowLeft")
let goodsShowRight = document.querySelector("#goodsShowRight")
for(let i = 0; i < goodsObj.length; i++){
	let ele = `
		<div class="goodsBox" data-id="${goodsObj[i].id}" >
			<a href="#">
				<img src="${goodsObj[i].goodsImg}" class="goodsImg" id="goodsImg">
				<div id="goodsName" class="goodsName">${goodsObj[i].goodsName}</div>
				<div class="goodsPrice" id="goodsPrice">¥${goodsObj[i].goodsPrice}</div>
				<div class="goodsInfo" id="goodsInfo">${goodsObj[i].goodsInfo}</div>
				<div class="goodsFlag" id="goodsFlag" style="display:${goodsObj[i].goodsFlag == true ? "block" :"none"}">自营</div>
			</a>
		</div>
	`
	if(parseInt(goodsShowLeft.offsetHeight)<= parseInt(goodsShowRight.offsetHeight)){
		goodsShowLeft.innerHTML += ele
	}else {
		goodsShowRight.innerHTML += ele
	}
}