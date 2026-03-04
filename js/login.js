let my=document.querySelector("#my")
my.disabled =true

//
let loginForm1 = document.querySelector("#loginForm1");
let loginForm2 = document.querySelector("#loginForm2");
let tologinForm1 = document.querySelector("#tologinForm1")
let tologinForm2 = document.querySelector("#tologinForm2")
tologinForm1.addEventListener("click",function(){
	loginForm2.style.display = "none"
	loginForm1.style.display = "block"
})
tologinForm2.addEventListener("click",function(){
	loginForm1.style.display = "none"
	loginForm2.style.display = "block"
})

let ax;
axios({
	method:"get",
	uel:"./json/user.json",
}).then(function (resp){
	let jsonData = JSON.stringify(resp.data)
	localStorage.setItem("jsonData",jsonData)
})
ax = JSON.parse(localStorage.getItem("jsonData"))
console.log(ax);

let code = NaN
let loginGetCode = document.querySelector("#loginGetCode")
loginGetCode.addEventListener("click",function(){
	code = ""
	for(let i = 0; i < 6; i++) {
		code += Math.round(Math.random() * 9 )
	}
	console.log(code)
	this.disabled = true
	this.style.border = "1px solid #c4c4c4"
	this.style.color = "#c4c4c4"
	let n = 60
	this.innerHTML = `${n}s`
	let time = setInterval(function (){
		n--
		loginGetCode.innerHTML = `${n}s`
		if (n == 0) {
			clearInterval(time)
			loginGetCode.innerHTML = `获取验证码`
			loginGetCode.style.border = "1px solid #888"
			loginGetCode.style.color = "#888"
			loginGetCode.disabled = false
			code = NaN
			console.log(`验证码失效`);
		}
	},1000)
})

//功能5验证码登陆
let loginTel = document.querySelector("#loginTel")
let loginTelCode = document.querySelector("#loginTelCode")
let agreeRadio = document.querySelector("#agreeRadio")
let loginBtn1 = document.querySelector("#loginBtn1")
let agree = document.querySelector("#agree")
let loginRead = document.querySelector("#loginRead")
loginBtn1.addEventListener("click",function(e){
	e.preventDefault()
	if(isNaN(code)){
		loginGetCode.style.border = "1px solid rgb(252, 74, 74)"
		loginGetCode.style.color = "rgb(252, 74, 74)"
		loginGetCode.style.animation = "code .5s"
	} else{
		if(agreeRadio.checked === false) {
			loginRead.style.display = "block"
			setTimeout(function (){
				loginRead.style.display = "none"
			},2000)
		}else {
			if(loginTel.value.length === 11 && loginTelCode.value === code) {
				console.log("登陆成功")
				loginSuccess.style.display = "block"
				document.cookie = "userStorage=" + loginTel.value
				setTimeout(function (){
					loginSuccess.style.display = "none"
					location.href = "index.html"
				},2000)
			}else {
				console.log("失败")
				loginFail.style.display = "block"
				setTimeout(function (){
					loginFail.style.display = "none"
					location.href = "login.html"
				},2000)
			}
		}
	}
})

let loginBtn2 = document.querySelector("#loginBtn2")
let loginSuccess = document.querySelector("#loginSuccess")
let loginFail = document.querySelector("#loginFail")
loginBtn2.addEventListener("click",function (e){
	e.preventDefault()
	for(let i = 0; i< ax.length; i++) {
		if(loginUser.value === ax[i].tel && loginPassword.value === ax[i].password){
			console.log("登陆成功")
			loginSuccess.style.display = "block"
			document.cookie = "userStorage=" + loginUser.value
			setTimeout(function (){
				loginSuccess.style.display = "none"
				location.href = "index.html"
			},2000)
			break
		}else {
			if (i === ax.length - 1) {
				console.log("失败")
				loginFail.style.display = "block"
				setTimeout(function (){
					loginFail.style.display = "none"
					location.href = "login.html"
				},2000)
			}
		}
	}
})