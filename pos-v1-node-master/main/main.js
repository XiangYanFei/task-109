var datbase=require('./datbase');
var datbase=new datbase();

module.exports = function main(items) {
	"use strict";	
	//printInventory(AllItems);
	var result='';
	var AllItems=datbase.loadAllItems();
	var promotions=datbase.loadPromotions();

	var shoppingList='***<没钱赚商店>购物清单***\n';
	var saleList= '挥泪赠送商品：\n';
	var sumPrice=0.00; //所有商品金额
	var cutPrice=0.00;  //优惠的金额
		
	var itemsAndnum = [];
		//创建数组itemsAndnum（包含商品编号，商品数量，商品优惠默认为值为0）
	var temp=[];
		for(let i=0;i<items.length;i++){
			if(i===items.indexOf(items[i])){
				if(items[i].match('-')){
					var s=items[i].split('-');
					itemsAndnum.push({itemBarcode:s[0],count:Number(s[1]),promotion:0});
					temp.push(items[i]);
				}
				else{
					itemsAndnum.push({itemBarcode:items[i],count:1,promotion:0});
					temp.push(items[i]);
				}
			}
			else{
				itemsAndnum[temp.indexOf(items[i])].count++;
			}
		}
	 //判断优惠
	
	
	for(let i=0;i<itemsAndnum.length;i++){
			for(let j=0;j<promotions[0].barcodes.length;j++){
				if(itemsAndnum[i].itemBarcode===promotions[0].barcodes[j]){//判断是否有优惠
					itemsAndnum[i].promotion=1;    //有优惠，置优惠promotion=1
			}	
		}
	}
		
	for(let i=0;i<itemsAndnum.length;i++){
		for(let n=0;n<AllItems.length;n++){
			if(itemsAndnum[i].itemBarcode===AllItems[n].barcode){
		
					shoppingList+='名称：'+AllItems[n].name+'，'+'数量：'+itemsAndnum[i].count+AllItems[n].unit+'，'+'单价：'+AllItems[n].price.toFixed(2)+'(元)'+'，'+'小计：'+((itemsAndnum[i].count-itemsAndnum[i].promotion)*AllItems[n].price).toFixed(2)+'(元)'+'\n';
					//名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n
				if(itemsAndnum[i].promotion===1){
					saleList+='名称：'+AllItems[n].name+'，'+'数量：'+itemsAndnum[i].promotion+AllItems[n].unit+'\n';
					//'名称：雪碧，数量：1瓶\n'
				}
					 
					sumPrice+=(itemsAndnum[i].count-itemsAndnum[i].promotion)*AllItems[n].price;  //所有商品金额
					cutPrice+=itemsAndnum[i].promotion*AllItems[n].price;   //优惠的金额
			}
		}
	}//清单内容的打印
	
	sumPrice=sumPrice.toFixed(2);
	cutPrice=cutPrice.toFixed(2);
	
	//清单内容的拼合
	result=shoppingList+'----------------------\n'+saleList+ '----------------------\n' + '总计：'+sumPrice+'(元)\n'+ '节省：'+cutPrice+'(元)\n' + '**********************';
	
	console.log(result);
	//print end
	//printInventory(AllItems);	
	//console.log(result);
	//return expectText;
	//console.log("Debug Info");
    //return result;
};
