var datbase=require('./datbase');
var datbase=new datbase();

module.exports = function main() {
	"use strict";

	var AllItems=datbase.loadAllItems();
	var promotions=datbase.loadPromotions();
	
	var expectText='';
	var shoppingList='***<没钱赚商店>购物清单***\n';
	var saleList= '挥泪赠送商品：\n';
	var sumPrice=0.00; //所有商品金额
	var cutPrice=0.00;  //优惠的金额
	
	printInventory(AllItems);
	
	function printInventory(items){
		var itemsAndnum = [];
	
		//创建数组itemsAndnum（包含商品编号，商品数量，商品优惠默认为值为0）
		for(let i=0;i<AllItems.length;){
			if(AllItems[i].indexOf("-") !== -1){
				var split=AllItems[i].split("-");
				itemsAndnum.push({
				itemBarcode:split[0],
				count:split[1],
				promotion:0
				});
			i+=1;
		}
		else{
			var itemsCount=0;
			for(let j=i;j<AllItems.length;j++){
				if(AllItems[i]===AllItems[j]){
					itemsCount++;
				}
			}
			itemsAndnum.push({
				itemBarcode:AllItems[i],
				count:itemsCount,
				promotion:0
			});
				i+=itemsCount;
		}
	}//创建itemsAndnum数组结束
		
	
		for(let i=0;i<itemsAndnum.length;i++){
			for(let j=0;j<promotions.barcodes.length;j++){
				if(itemsAndnum[i].itemBarcode===promotions.barcodes[j]){//判断是否有优惠
					itemsAndnum.promotion=1;    //有优惠，置优惠promotion=1
				}	
			}
			
			
		for(var n=0;n<items.length;n++){
			if(itemsAndnum[i].itemBarcode===items[n].barcode){
					shoppingList+='名称：'+items[n].name+'，'+'数量：'+itemsAndnum[i].count+'，'+'单			价：'+items[n].price+'(元)'+'，'+'小计：'+(itemsAndnum[i].count-itemsAndnum[i].promotion)*items[n].price+'元'+'\n';
					//名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n
					saleList+='名称：'+items[n].name+'，'+'数量：'+itemsAndnum[i].promotion+items[n].unit+'\n';
					//'名称：雪碧，数量：1瓶\n' 
					sumPrice+=(itemsAndnum[i].count-itemsAndnum[i].promotion)*items[n].price;  //所有商品金额
					cutPrice+=itemsAndnum[i].promotion*items[n].price;   //优惠的金额
			}
		}
			
			expectText=shoppingList+'----------------------\n'+saleList+ '----------------------\n' + '总计：'+sumPrice+'(元)\n'+ '节省：'+cutPrice+'(元)\n' + '**********************';
		}
	
}//print end
	
	
	
	
	
	console.log(expectText);
	//console.log("Debug Info");
    return 'Hello World!';
};