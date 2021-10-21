
/*
 * 
 *  array  cn   => 標號一、二、三
 * 
 */


var cn = ['\u4E00','\u4E8C','\u4E09','\u56DB','\u4E94','\u516D','\u4E03','\u516B','\u4E5D','\u5341','']; //一二三
var cn2 = ['\u7532','\u4E59','\u4E19','\u4E01','\u620A','\u5DF1','\u5E9A','\u8F9B','\u58EC','\u7678',''];//甲乙丙
var cn3 = ['\u5b50','\u4e11','\u5bc5','\u536f','\u8fb0','\u5df3','\u5348','\u672a','\u7533','\u9149','\u620c','\u4ea5'];//子丑寅
var num = ['\uff11','\uff12','\uff13','\uff14','\uff15','\uff16','\uff17','\uff18','\uff19','\uff11','']; //(全型)數字標號/甲乙丙/子丑寅大於10/12轉換用
var num2 = ['\uff11','\uff12','\uff13','\uff14','\uff15','\uff16','\uff17','\uff18','\uff19','','']; //(全型)數字標號/甲乙丙/子丑寅大於10/12轉換用
var labelall = [cn,cn2,cn3,num]; //標號陣列

var symbol_1 = ['','\u3001']; //頓號
var symbol_2 = ['(',')']; //括號
var symbolall = [symbol_1,symbol_2]; //符號陣列
var count = 1; //計數器

/*
 * 呼叫改變標號函數(setol)，改變各層標號
 *
 * 輸入參數 :
 * @param object  editornum   => 編輯器
 * 
 */
 
var changecnnum = function(editornum){ //editornum編輯器編號(第幾個編輯器)
	setTimeout(function(){
		editorcontent = $( editornum.window.getFrame().$ ).contents();
		editorcontent.find('.cke_editable > ol').each(function(){
			setol($(this),symbolall[0],labelall[0]);
		});
		editorcontent.find('.cke_editable > ol > li > ol').each(function(){
			setol($(this),symbolall[1],labelall[0]);
		});
		editorcontent.find('.cke_editable > ol > li > ol > li > ol').each(function(){
			setol($(this),symbolall[0],labelall[3]);
		});		
		editorcontent.find('.cke_editable > ol > li > ol > li > ol > li > ol').each(function(){
			setol($(this),symbolall[1],labelall[3]);
		});
		editorcontent.find('.cke_editable > ol > li > ol > li > ol > li > ol > li > ol').each(function(){
			setol($(this),symbolall[0],labelall[1]);
		});		
		editorcontent.find('.cke_editable > ol > li > ol > li > ol > li > ol > li > ol > li > ol').each(function(){
			setol($(this),symbolall[1],labelall[1]);
		});
		editorcontent.find('.cke_editable > ol > li > ol > li > ol > li > ol > li > ol > li > ol > li > ol').each(function(){
			setol($(this),symbolall[0],labelall[2]);
		});		
		editorcontent.find('.cke_editable > ol > li > ol > li > ol > li > ol > li > ol > li > ol > li > ol > li > ol').each(function(){
			setol($(this),symbolall[1],labelall[2]);
		});		
		
	},10);
}


$(window).load(function(){	

	setTimeout(function(){

	/*
	 * 點擊「插入/移除清單鍵」、「增加縮排鍵」、「減少縮排鍵」時觸發changecnnum()
	 *
	 * 輸入參數 :
	 * @param object  editornum   => 編輯器
	 * 
	 */
 
		var clickevent = function(editornum){
			//點擊插入/移除清單鍵
			$('.cke_button__numberedlist').unbind('click').bind('click',function(){
				changecnnum(editornum);
			});
			//點擊增加縮排鍵
			$('.cke_button__indent').unbind('click').bind('click',function(){
				changecnnum(editornum);
			});
			//點擊增減少縮排鍵
			$('.cke_button__outdent').unbind('click').bind('click',function(){
				changecnnum(editornum);
			});
		};

		/*
		 * 按鍵事件，按任意鍵觸發changecnnum()。
		 *
		 */

		//編輯器一按鍵事件
		CKEDITOR.instances['ckcontent1'].on('key', function (e) {
			changecnnum(this);
		});

		/*
		 * 載入事件，js載入完成時呼叫編輯器點擊事件，當點擊到編輯器時呼叫clickevent()。
		 * 
		 */

		//編輯器一呼叫點擊事件
		CKEDITOR.instances['ckcontent1'].on('instanceReady', function(e){
			var editornum = this;
			$( this.window.getFrame().$ ).contents().on('mousedown', function (event) {
				console.log("DD");
				clickevent(editornum);
			});
		});
	},15);

});

/*
 * 設定標號，將li的data-content屬性改成標號。
 *
 * @param object  e      => 第幾層ol
 * @param array   symbol => 標號要用哪個符號
 * @param array   label  => 要用哪個標號
 */
var setol = function(e,symbol,label){
	count = 1;
	var a = 0; //個
	var b = 0; //十
	//ol下的每一個li
	$(e).children().each(function(){
		//標號小於10時
		if ( 10 >= count ){
			//改變data-content屬性
			if(label==num && 10 == count){
				$(this).attr('data-content',''+symbol[0]+'\uff11'+'\uff10'+symbol[1]+'');
			}
			else{
				$(this).attr('data-content',''+symbol[0]+label[a]+symbol[1]+'');
			}
			a++;
		}
		//標號小於100時
		else if ( 100 > count ){
			if ( 9 <= a ){
				a=0;
			}
			//標號為10的倍數時
			if ( 0 == count%10 ){
				//如果是甲乙丙，大於10時會轉為數字
				if(label==num || label==num2){
					num2[9] = '\uff10';
					label = num2;
				}
				$(this).attr('data-content',''+symbol[0]+label[count/10-1]+label[9]+symbol[1]+'');
				b++;
			}
			//標號小於20時
			else if ( 20 > count ){
				if(label==cn2){
					label = num;
				}
				//如果是子丑寅，大於12時會轉為數字
				if(label==cn3){
					if(12 >= count){
						$(this).attr('data-content',''+symbol[0]+label[count-1]+symbol[1]+'');
					}
					else{
						label = num;
						$(this).attr('data-content',''+symbol[0]+label[9]+label[a]+symbol[1]+'');
					}
				}
				//其他
				else{
					$(this).attr('data-content',''+symbol[0]+label[9]+label[a]+symbol[1]+'');
				}
				a++;
			}
			//標號大於20時
			else if ( 20 <= count ){
				if(label==num2){
					num2[9] = '';
					label = num2;
				}
				$(this).attr('data-content',''+symbol[0]+label[b]+label[9]+label[a]+symbol[1]+'');
				a++;
			}
		}		
		count++;
	});
};