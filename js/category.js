// 获取cookie
let cookieData = document.cookie.split(";")
let userCookie;
for (let n of cookieData) {
	if (n.split("=")[0] === "userStorage") {
		userCookie = n.split("=")[1]
		break
	}
}
// 没有登陆的话,就跳转到登陆页
if (userCookie === undefined) {
	location.href = "login.html"
}

// 获取需要数据category.json,user.json,goods.json
let cartData;
axios({
	method: "get",
	url: "./json/category.json",
}).then(function(resp) {
	localStorage.setItem("cartData", JSON.stringify(resp.data))
})
cartData = JSON.parse(localStorage.getItem("cartData"))
console.log(cartData);

let goodsData;
axios({
	method: "get",
	url: "./json/goods.json",
}).then(function(resp) {
	localStorage.setItem("goodsData", JSON.stringify(resp.data))
})
goodsData = JSON.parse(localStorage.getItem("goodsData"))
console.log(goodsData);

let userData;
axios({
	method: "get",
	url: "./json/user.json",
}).then(function(resp) {
	localStorage.setItem("userData", JSON.stringify(resp.data))
})
userData = JSON.parse(localStorage.getItem("userData"))
console.log(userData);
// 1.获取当前登陆用户的userID
let userID;
for (let i = 0; i < userData.length; i++) {
	if (userCookie === userData[i].tel) {
		userID = userData[i].id;
		console.log(userID);
		break;
	}
}
// 2.找到这个userID所有购物车goods
let goods;
for (let i = 0; i < cartData.length; i++) {
	if (userID === cartData[i].userID) {
		goods = cartData[i].goods;
		console.log(goods);
		break;
	}
}
// 3.拿goods去找到完整的商品信息
let goodsObj = [];
for (let i = 0; i < goods.length; i++) {
	for (let j = 0; j < goodsData.length; j++) {
		if (goods[i].goodsID === goodsData[j].id) {
			let obj = {
				goodsImg: goodsData[j].goodsImg,
				goodsName: goodsData[j].goodsName,
				goodsPrice: goodsData[j].goodsPrice,
				goodsNum: goods[i].num
			}
			goodsObj.push(obj)
		}
	}
}
console.log(goodsObj);
// 渲染商品
let cartShow = document.querySelector("#product")
for (let i = 0; i < goodsObj.length; i++) {
	let ele = `
		<div id="product-box" class="product-box">
			<div class="product-ckb"><em class="product-em"></em></div>
			<div class="product-sx">
				<a href="###">
					<img src="${goodsObj[i].goodsImg}" class="product-img" />
					<span class="product-name">${goodsObj[i].goodsName}</span>
				</a>
				<span class="product-price">¥&thinsp;<span class="price">${goodsObj[i].goodsPrice}</span></span>
				<div class="product-amount">
					<div class="product_gw">
						<em class="product-jian">-</em>
						<input type="text" value="${goodsObj[i].goodsNum}" class="product-num" />
						<em class="product-add">+</em>
					</div>
				</div>
				<div class="product-del"><img src="img/categoty/deleteico.png" /></div>
			</div>
		</div>
	`
	cartShow.innerHTML += ele;
}
// // 5.点击勾勾:合计,结算数量
// let cartChecks = document.querySelectorAll(".product-ckb")
// let goodsPrices = document.querySelectorAll(".product-price")
// let n = 0;
// let p = 0;
// // 结算按钮
// let payBtn = document.querySelector(".product-sett")
// // 合计
// let payMoney = document.querySelector(".all-price")
// // 全选按钮
// let checkAll = document.querySelector(".product-all")
// for (let i = 0; i < cartChecks.length; i++) {
// 	cartChecks[i].addEventListener("click",()=>{
// 		if(cartChecks[i].checked ===true){
// 			let goodsNum = parseInt(nums[i].innerHTML)
// 			let goodsPrice = parseFloat(goodsPrices[i].innerHTML.split("￥")[1])
// 			n += goodsNum;
// 			p += goodsNum * goodsPrice
// 			if(n > 0){
// 				payBtn.style.display = "block"
// 				payBtn.innerHTML = `去结算(${n})`
// 				payMoney.style.display = "block"
// 				payMoney.innerHTML = `合计:(￥${p})`
// 			}
// 			let checkNum = 0;
// 			for (let i = 0; i < cartChecks.length; i++) {
// 				if(cartChecks[i].checked === true){
// 					checkNum++;
// 				}
// 				if(checkNum === cartChecks.length){
// 					checkAll.checked = true;
// 				}
// 			}
// 		}else{
// 			let goodsNum = parseInt(nums[i].innerHTML)
// 			let goodsPrice = parseFloat(goodsPrices[i].innerHTML.split("￥")[1])
// 			n += goodsNum;
// 			p += goodsNum * goodsPrice
// 			if(n > 0){
// 				payBtn.style.display = "block"
// 				payBtn.innerHTML = `去结算(${n})`
// 				payMoney.style.display = "block"
// 				payMoney.innerHTML = `合计:(￥${p})`
// 			} else if(n == 0){
// 				payBtn.style.display = "none"
// 				payMoney.style.display = "none"
// 			}
// 			checkAll.checked = false;
// 		}
// 	})
// }
// // 6.点击+
// let adds = document.querySelectorAll(".product-num")
// let nums = document.querySelectorAll(".product-add")
// for (let i = 0; i < adds.length; i++) {
// 	adds[i].addEventListener("click",()=>{
// 		nums[i].innerHTML++
// 		n = 0;
// 		p = 0;
// 		for (let i = 0; i < cartChecks.length; i++) {
// 			if(cartChecks[i].checked === true){
// 				let goodsNum = parseInt(nums[i].innerHTML)
// 				let goodsPrice = parseFloat(goodsPrices[i].innerHTML.split("￥")[1])
// 				n += goodsNum
// 				p += goodsNum * goodsPrice
// 				if(n > 0){
// 					payBtn.style.display = "block"
// 					payBtn.innerHTML = `去结算(${n})`
// 					payMoney.style.display = "block"
// 					payMoney.innerHTML = `合计:￥${p}`
// 				}
// 			}
// 		}
// 	})
// }
// // 7.点击-
// let subtracts = document.querySelectorAll(".product-jian")
// for (let i = 0; i < subtracts.length; i++) {
// 	subtracts[i].addEventListener("click",()=>{
// 		nums[i].innerHTML++
// 		n = 0;
// 		p = 0;
// 		for (let i = 0; i < cartChecks.length; i++) {
// 			if(cartChecks[i].checked === true){
// 				let goodsNum = parseInt(nums[i].innerHTML)
// 				let goodsPrice = parseFloat(goodsPrices[i].innerHTML.split("￥")[1])
// 				n += goodsNum
// 				p += goodsNum * goodsPrice
// 				if(n > 0){
// 					payBtn.style.display = "block"
// 					payBtn.innerHTML = `去结算(${n})`
// 					payMoney.style.display = "block"
// 					payMoney.innerHTML = `合计:￥${p}`
// 				}
// 			}
// 		}
// 	})
// }
// // 全选
// checkAll.addEventListener("clich",()=>{
// 	if(checkAll.checked === true){
// 		n = 0
// 		p = 0
// 		for (let i = 0; i < cartChecks.length; i++) {
// 			cartChecks[i].checked = true
// 			let goodsNum = parseInt(nums[i].innerHTML)
// 			let goodsPrice = parseFloat(goodsPrices[i].innerHTML.split("￥")[1])
// 			n += goodsNum
// 			p += goodsNum * goodsPrice
// 			if(n > 0){
// 				payBtn.style.display = "block"
// 				payBtn.innerHTML = `去结算(${n})`
// 				payMoney.style.display = "block"
// 				payMoney.innerHTML = `合计:￥${p}`
// 			}else{
// 				n = 0
// 				p = 0
// 				for(let i = 0; i < cartChecks.length; i++) {
// 					cartChecks[i].checked = false
// 					payBtn.style.display = "none"
// 					payMoney.style.display = "none"
// 				}
// 			}
// 		}
// 	}
// })
document.addEventListener('DOMContentLoaded', function() {
	//加的效果
	let productAddButtons = document.querySelectorAll('.product-add');
	productAddButtons.forEach(function(button) {
		button.addEventListener('click', function() {
			let input = this.previousElementSibling;
			let n = parseInt(input.value);
			let num = n + 1;
			if (num === 99) {
				return;
			}
			input.value = num;
			TotalPrice();
		});
	});

	//减的效果
	let productJianButtons = document.querySelectorAll('.product-jian');
	productJianButtons.forEach(function(button) {
		button.addEventListener('click', function() {
			let input = this.nextElementSibling;
			let n = parseInt(input.value);
			let num = n - 1;
			if (num === 0) {
				return;
			}
			input.value = num;
			TotalPrice();
		});
	});

	let productCkbItems = document.querySelectorAll('.product-ckb');
	productCkbItems.forEach(function(item) {
		item.addEventListener('click', function() {
			this.children[0].classList.toggle('product-xz');
			TotalPrice();
			productxz();
		});
	});

	//全选产品
	let productAlButton = document.querySelector('.product-al');
	productAlButton.addEventListener('click', function() {
		let fxk = document.querySelectorAll('.product-em');
		let qx = document.querySelector('.product-all em');
		qx.classList.toggle('product-all-on');
		if (qx.classList.contains('product-all-on')) {
			fxk.forEach(function(item) {
				item.classList.add('product-xz');
			});
		} else {
			fxk.forEach(function(item) {
				item.classList.remove('product-xz');
			});
		}
		TotalPrice();
		shuliang();
	});

	//删除产品
	let productDelButtons = document.querySelectorAll('.product-del');
	productDelButtons.forEach(function(button) {
		button.addEventListener('click', function() {
			if (confirm("您确定要删除当前商品？")) {
				this.closest('.product-box').remove();
			}
			koncat();
			TotalPrice();
		});
	});

	TotalPrice();
	shuliang();
	koncat();
});
// 选中产品
function productxz() {
	let xz = document.querySelectorAll('.product-em');
	let xz1 = document.querySelectorAll('.product-xz');
	if (xz1.length === xz.length) {
		document.querySelector('.product-all em').classList.add('product-all-on');
	} else {
		document.querySelector('.product-all em').classList.remove('product-all-on');
	}
	shuliang();
	TotalPrice();
}
// 计算产品价格
function TotalPrice() {
	//总价
	let total = 0;
	let productEmItems = document.querySelectorAll('.product-em');
	productEmItems.forEach(function(item) {
		if (item.classList.contains('product-xz')) {
			let price = parseInt(item.closest('.product-ckb').nextElementSibling.querySelector('.price')
				.textContent);
			let quantity = parseInt(item.closest('.product-ckb').nextElementSibling.querySelector(
				'.product-num').value);
			let subtotal = price * quantity;
			total += subtotal;
		}
		document.querySelector('.all-price').textContent = total.toFixed(2); //输出全部总价
	});
}
// 获取选择产品数量
function shuliang() {
	let productAllSl = document.querySelector('.product-all-sl');
	productAllSl.textContent = "";
	let cd = document.querySelectorAll('.product-xz').length;
	productAllSl.textContent = cd;

	if (cd > 0) {
		document.querySelector('.product-all-qx').textContent = "已选";
		document.querySelector('.all-sl').style.display = "inline-block";
		document.querySelector('.product-sett').classList.remove('product-sett-a');
	} else {
		document.querySelector('.product-all-qx').textContent = "全选";
		document.querySelector('.all-sl').style.display = "none";
		document.querySelector('.product-sett').classList.add('product-sett-a');
	}
}
//购物车空
function koncat() {
	let productBoxItems = document.querySelectorAll('.product-box');
	if (productBoxItems.length <= 0) {
		document.querySelector('.all-price').textContent = "0.00";
		document.querySelector('.product-all-qx').textContent = "全选";
		document.querySelector('.all-sl').style.display = "none";
		document.querySelector('.product-sett').classList.add('product-sett-a');
		document.querySelector('.product-all em').classList.remove('product-all-on');
		document.querySelector('.kon-cat').style.display = "block";
	} else {
		document.querySelector('.kon-cat').style.display = "none";
	}
}
//显示商品数量
let productboxcd = document.querySelector("#boxcd");
let cd = document.querySelectorAll("#product-box").length;
productboxcd.innerHTML = "(" + cd + ")";

// $(function(){
// 	//加的效果
// 	$(".product-add").click(function(){
// 		var n=$(this).prev().val();
// 		var num=parseInt(n)+1;
// 		if(num==99){ return;}
// 			$(this).prev().val(num);
// 		TotalPrice();
// 	});
// 	//减的效果
// 	$(".product-jian").click(function(){
// 		var n=$(this).next().val();
// 		var num=parseInt(n)-1;
// 		if(num==0){ return;}
// 			$(this).next().val(num);
// 		TotalPrice();
// 	});
	
// 	$(".product-ckb").click(function(){
// 		$(this).children("em").toggleClass("product-xz");
// 		TotalPrice();
// 		productxz();
// 	});
// 	//全选产品
// 	$(".product-al").click(function(){
// 		var fxk = $(".product-em");
// 		var qx = $(".product-all em");
// 		qx.toggleClass("product-all-on");
// 		if($(this).find(".product-all em").is(".product-all-on")){
// 			fxk.addClass("product-xz");
// 		}else{
// 			fxk.removeClass("product-xz");
// 		}
// 		TotalPrice();
// 		shuliang()
// 	});
// 	//删除产品
// 	$(".product-del").click(function(){
// 		if(confirm("您确定要删除当前商品？")){
// 			$(this).closest(".product-box").remove();
// 		}
		
// 		koncat();
// 		TotalPrice();
// 	});
	
	
// 	TotalPrice();
// 	shuliang();
// 	koncat();
// });

// function productxz(){
// 	var xz=$(".product-em");
// 	var xz1=$(".product-xz");
// 	if(xz1.length==xz.length){
// 		$(".product-all em").addClass("product-all-on");
// 	}else{
// 		$(".product-all em").removeClass("product-all-on");
// 	}
// 	shuliang();
// 	TotalPrice();
	
// }

// // 计算产品价格
// function TotalPrice(){
// 	//总价
// 	var total = 0;
// 	$(".product-em").each(function(){
		
// 		if($(this).is(".product-xz")){
// 			var price = parseInt($(this).parents(".product-ckb").siblings().find(".price").text());//得到产品单价
// 			var slproice = parseInt($(this).parents(".product-ckb").siblings().find(".product-num").val());//得到产品数量
// 			var dgtotal = price * slproice;
// 			total+=dgtotal;
// 		}
// 		$(".all-price").text(total.toFixed(2)); //输出全部总价
// 	});
	
// }

// // 获取选择产品数量
// function shuliang(){
// 	$(".product-all-sl").text("");
// 	var cd = $(".product-xz").length;
// 	$(".product-all-sl").text(cd);
	
// 	if(cd>0){
// 		$(".product-all-qx").text("已选");
// 		$(".all-sl").css("display","inline-block");
// 		$(".product-sett").removeClass("product-sett-a");
// 	}else{
// 		$(".product-all-qx").text("全选");
// 		$(".all-sl").css("display","none");
// 		$(".product-sett").addClass("product-sett-a");
// 	}
// }

// //购物车空
// function koncat(){
// 	var pic = $(".product-box").length;
// 	if(pic<=0){
// 		$(".all-price").text("0.00");
// 		$(".product-all-qx").text("全选");
// 		$(".all-sl").css("display","none");
// 		$(".product-sett").addClass("product-sett-a");
// 		$(".product-all em").removeClass("product-all-on");
// 		$(".kon-cat").css("display","block");
// 	}else{
// 		$(".kon-cat").css("display","none");
// 	}
// }