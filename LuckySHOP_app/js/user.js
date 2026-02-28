//读取user.json,根据cookie获取已登录的账户的对象信息
//(1)axios框架读取json
let ax
axios({
	method:"get",
	url:"./json/user.json",
}).then(function(resp){
	let jsonData = JSON.stringify(resp.data)
	localStorage.setItem("jsonData",jsonData)
})
ax = JSON.parse(localStorage.getItem("jsonData"))
console.log(ax)
//(2)已登录cookie
let userCookie
let cookieData = document.cookie.split(";")
for(let i = 0; i<cookieData.length;i++){
	if(cookieData[i].split("=")[0] === "userStorage") {
		userCookie = cookieData[i].split("=")[1]
	}
}
console.log(userCookie);
//(3)根据cookie找到对应的对象
let userObj = {
	tel:userCookie,
	userName:`${userCookie}新用户`,
	img:"../img/touxiang/5.jpg",
	vipGrade: 1,
	youhuiNum:0,
	jifenNum:0,
	zujiNum:0,
	focusNum:0
}
for (let n of ax){
	if(n.tel == userCookie){
		userObj= n
		console.log(n)
		break
	}
}
//渲染账户信息
let userTouxiang = document.querySelector("#userTouxiang")
let userName = document.querySelector("#userName")
let vipGrade = document.querySelector("#vipGrade")
userTouxiang.src = userObj.img
userName.innerHTML = userObj.userName
vipGrade.innerHTML = `LV.${userObj.vipGrade}`
//渲染优惠劵
let youhuiNum = document.querySelector("#youhuiNum")
let jifenNum = document.querySelector("#jifenNum")
let zujiNum = document.querySelector("#zujiNum")
let focusNum = document.querySelector("#focusNum")
youhuiNum.innerHTML = userObj.youhuiNum
jifenNum.innerHTML = userObj.jifenNum
zujiNum.innerHTML = userObj.zujiNum
focusNum.innerHTML = userObj.focusNum