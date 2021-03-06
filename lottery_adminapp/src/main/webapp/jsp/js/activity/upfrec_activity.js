$(document).ready(function() {
	var ue = UE.getEditor('editor');
	ue.addListener("ready", function () {
        ue.setContent($("#content").val());
	});
	var ss=$("#activityType").val();
	if(ss!="NO"){
		if(ss=="FRC"){
			$("#frist_recharge_menu").addClass("active");
		}
		if(ss=="REG"){
			$("#reg_menu").addClass("active");
		}
		if(ss=="TRC" || ss=="BET" || ss=="AWA"){
			$("#bet_menu").addClass("active");
		}
	}else{
		$("#frist_recharge_menu").addClass("active");
	}
	$("#activityType").attr("value","");
	$("#updateActivity").on('click',function(){
		frcActivity.createActivity(this);
	});
	
	$("#startTime").bind("click",function(){
		WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',minDate:'%y-%M-%d'});
	});
	$("#endTime").bind("click",function(){
		WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',minDate:'%y-%M-%d'});
	});
	 $.checkFrom.initBind(".checkedAttr", true, true,true);
});

var frcActivity = function(){
	
	return {
		createActivity:function(obj){
			var check = $.checkFrom.checkAllType("#cretaActivity");
			if(!check){
				return;
			}
			
			var attrs = new Array();
			var vals = new Array();
			$("#cretaActivity").find("input[type='text']").each(function(){
				var name = $(this).attr("name");
				var val = $(this).val();
				if(name=="minGameAmount"||name=="maxAwardAmount"||name=="rateAmount"){
					attrs.push("frecTemp."+name);
					vals.push(val);
				}else if(name!="summary"){
					attrs.push(name);
					vals.push(val);
				}
				
			});
			
			attrs.push("type");
			attrs.push("model");
			var model = $("#awardType").val();
			vals.push("FRC");
			vals.push(model);
			
			attrs.push("sourceType");
			var sourceType = $("#sourceType").val();
			vals.push(sourceType);
			
			var ue = UE.getEditor('editor');
			var content = ue.getContent();
			attrs.push("summary");
			vals.push(content);
			
			attrs.push("id");
			var id = $("#id").val();
			vals.push(id);
			
			formPost.submitAjaxForm("activity/addUpefrecTempl.do",attrs,vals,this.saveSuccess);
		},
		saveSuccess:function(data){
			var info= data.success;
			formPost.showErrorMessage(info);
		}
	};
}();