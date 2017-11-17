var datbase=require('./datbase');
var datbase=new datbase();

module.exports = function main(items) {
	"use strict";	
	//创建数组itemsAndnumAndpromotion（包含商品编号，商品数量，商品优惠默认为值为0）
	function CreatitemsAndnumAndpromiton(arr){
		let creat=[];
		let temp=[];
		for(let i=0;i<arr.length;i++){
			if(i===arr.indexOf(arr[i])){
				if(arr[i].match('-')){
					var s=arr[i].split('-');
					creat.push({itemBarcode:s[0],count:Number(s[1]),promotion:0});
					temp.push(arr[i]);
				}
				else{
					creat.push({itemBarcode:arr[i],count:1,promotion:0});
					temp.push(arr[i]);
				}
			}
			else{
				creat[temp.indexOf(arr[i])].count++;
			}
		}
		return creat;
	}
	
	//判断优惠
	function judgepromotion(arr,promotions){
	for(let i=0;i<arr.length;i++){
		for(let j=0;j<promotions[0].barcodes.length;j++){
				if(arr[i].itemBarcode===promotions[0].barcodes[j]){//判断是否有优惠
					arr[i].promotion=1;    //有优惠，置优惠promotion=1
				}	
			}
		}
	}
	
	//打印结果
	function output(arr,AllItems){
		var result='';
		var shoppingList='***<没钱赚商店>购物清单***\n';
		var saleList= '挥泪赠送商品：\n';
		var sumPrice=0; //所有商品金额
		var cutPrice=0;  //优惠的金额
		for(let i=0;i<arr.length;i++){
			for(let n=0;n<AllItems.length;n++){
			if(arr[i].itemBarcode===AllItems[n].barcode){
					shoppingList+='名称：'+AllItems[n].name+'，'+'数量：'+arr[i].count+AllItems[n].unit+'，'+'单价：'+AllItems[n].price.toFixed(2)+'(元)'+'，'+'小计：'+((arr[i].count-arr[i].promotion)*AllItems[n].price).toFixed(2)+'(元)'+'\n';
					//名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n
					if(arr[i].promotion===1){
						saleList+='名称：'+AllItems[n].name+'，'+'数量：'+arr[i].promotion+AllItems[n].unit+'\n';
					//'名称：雪碧，数量：1瓶\n'
					}
					 
					sumPrice+=(arr[i].count-arr[i].promotion)*AllItems[n].price;  //所有商品金额
					cutPrice+=arr[i].promotion*AllItems[n].price;   //优惠的金额
				}
			}
		}
		//清单内容的打印
		sumPrice=sumPrice.toFixed(2);
		cutPrice=cutPrice.toFixed(2);
	
		//清单内容的拼合
		result=shoppingList+'----------------------\n'+saleList+ '----------------------\n' + '总计：'+sumPrice+'(元)\n'+ '节省：'+cutPrice+'(元)\n' + '**********************';
		return result;
	}
	
	var AllItems=datbase.loadAllItems();
	var promotions=datbase.loadPromotions();
	var itemsAndnumAndpromotion =CreatitemsAndnumAndpromiton(items);
	judgepromotion(itemsAndnumAndpromotion,promotions);
	console.log(output(itemsAndnumAndpromotion,AllItems));
};
