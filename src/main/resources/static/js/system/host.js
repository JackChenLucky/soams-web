$(function(){
	$('#tab-1').append("<div id=\"cpumain\" style=\"height:300px\" />");
	initCpuChart();
	$('#tab-1').append("<div id=\"memmain\" style=\"height:300px\" />");
	initMemChart();
	$('#tab-1').append("<div id=\"netmain\" style=\"height:300px\" />");
	initNetChart();
	$('#tab-1').append("<div class=\"row\" style=\"margin:0px;\">" +
							"<div class=\"col-sm-3\" style='padding-left: 0px;padding-right: 0px;'>" +
								"<div id=\"diskmain\" style=\"height:200px\"></div>" +
							"</div>" +
							"<div class=\"col-sm-9\" id=\"diskdtl\">" +
							"</div>" +
							"</div>" +
						"</div>");
	DiskChart();
})

function initNetChart(){
	var netChart;
	var eCharts;
	require.config({
		paths : {
			'echarts' : '/js/plugins/echarts'
		}
	});

	require(
		[ 'echarts', 
		  'echarts/theme/macarons',
		  'echarts/chart/line'
		], DrawEChart // 异步加载的回调函数绘制图表
	);
	// 创建ECharts图表方法
	function DrawEChart(ec) {
		eCharts = ec;
		netChart = eCharts.init(document.getElementById('netmain'),'macarons');
		netChart.showLoading({
			text : "图表数据正在努力加载..."
		});
		// 定义图表options
		var options = {
			title:{
				text:"网络",
				textStyle:{
					fontSize: 18,
				    fontWeight: 'normal',
				    color: '#333'
				}
			},
			tooltip : {
				trigger : 'axis'
			},
			legend : {
				data : ["Rxbps","Txbps"]
			},
			toolbox : {
				show : true,
				feature : {
					mark : {
						show : false
					},
					dataView : {
						show : true,
						readOnly : false
					},
					magicType : {
						show : false,
						type : [ 'line', 'bar' ]
					},
					restore : {
						show : true
					},
					saveAsImage : {
						show : true
					}
				}
			},
			calculable : true,
			xAxis : [ {
				type : 'category',
				boundaryGap : false,
				data : [ '1', '2', '3', '4', '5', '6', '7' ]
			} ],
			yAxis : [ {
				type : 'value',
				axisLabel : {
					formatter : '{value} %'
				}
			} ],
			grid : {
				x:60,
				x2:40
			},
			series : [ {
				name : 'Rxbps',
				type : 'line',
				smooth : true,
				itemStyle: {normal: {areaStyle: {type: 'default'}}},
				data : [ 0, 0, 0, 0, 0, 0, 0 ]// 必须是Integer类型的,String计算平均值会出错
			},
			{
				name : 'Txbps',
				type : 'line',
				smooth : true,
				itemStyle: {normal: {areaStyle: {type: 'default'}}},
				data : [ 0, 0, 0, 0, 0, 0, 0 ]// 必须是Integer类型的,String计算平均值会出错
			}
			]
		};

		netChart.setOption(options); // 先把可选项注入cpuChart中
		window.onresize = netChart.resize;
		getChartData();
		setInterval(getChartData,60000);
	}

function getChartData() {
	//获得图表的options对象
	var options = netChart.getOption();
	//通过Ajax获取数据
	$.ajax({
		type : "get",
		url : "/netlogs",
		data : {hostid:$('#hostid').val()},
		dataType : "json", //返回数据形式为json
		success : function(result) {
			if (result) {
				options.legend.data = result.legend;
				options.xAxis[0].data = result.category;
				options.series[0].data = result.series[0].data;
				options.series[1].data = result.series[1].data;
				netChart.hideLoading();
				netChart.setOption(options);
			}
		},
		error : function(errorMsg) {
			toastr.options = {
	                closeButton: true,
	                progressBar: true,
	                showMethod: 'slideDown',
	                timeOut: 4000
	            };
            toastr.error('您最后一次登录：2015-12-01 14:23', '陈龙，欢迎使用 SOA+管理系统 ');
			cpuChart.hideLoading();
		}
	});
	}
}

function DiskChart(){
	//通过Ajax获取数据
	$.ajax({
		type : "get",
		url : "/diskinfo",
		data : {hostid:$('#hostid').val()},
		dataType : "json", //返回数据形式为json
		success : function(result) {
			initDiskChart(result);
			initDiskDtl(result);
		},
		error : function(errorMsg) {
			toastr.options = {
	                closeButton: true,
	                progressBar: true,
	                showMethod: 'slideDown',
	                timeOut: 4000
	            };
            toastr.error('您最后一次登录：2015-12-01 14:23', '陈龙，欢迎使用 SOA+管理系统 ');
		}
	});
}

function initDiskDtl(rslt){
	var shtm = '';
	$.each(rslt.hdiList,function(i,data){
		shtm = shtm+gethtmlTempalte(data);
	});
	$('#diskdtl').append(shtm);
}

function gethtmlTempalte(data){
	var usaged = parseFloat(data.usaged.replace('%',''));
	var barstyle="progress-bar-info";
	if(usaged>80){
		barstyle = "progress-bar-danger";
	}else if(usaged>30){
		barstyle = "progress-bar-success";
	}else{
		barstyle = "progress-bar-dange";
	}
	var dtlhtml = "<span class=\"ng-binding\">"+data.dirname+
	            " (<strong class=\"ng-binding\">"+data.used+"</strong><span class=\"text-disabled ng-binding\"> of "+data.total+"</span> )</span>" +
			    "<div class=\"progress progress-striped active\">" +
				"<div style=\"width: "+data.usaged+"\" aria-valuemax=\"100\" aria-valuemin=\"0\" aria-valuenow=\""+usaged+
				"\" role=\"progressbar\" class=\"progress-bar "+barstyle+"\">"+
				"<span class=\"sr-only2\">"+data.usaged+"</span> "+
				"</div></div>";
	return dtlhtml;
}


function initCpuChart(){
	var cpuChart;
	var eCharts;
	require.config({
		paths : {
			'echarts' : '/js/plugins/echarts'
		}
	});

	require(
		[ 'echarts', 
		  'echarts/theme/macarons',
		  'echarts/chart/line'
		], DrawEChart // 异步加载的回调函数绘制图表
	);
	// 创建ECharts图表方法
	function DrawEChart(ec) {
		eCharts = ec;
		cpuChart = eCharts.init(document.getElementById('cpumain'),'macarons');
		cpuChart.showLoading({
			text : "图表数据正在努力加载..."
		});
		// 定义图表options
		var options = {
			title:{
				text:"CPU",
				textStyle:{
					fontSize: 18,
				    fontWeight: 'normal',
				    color: '#333'
				}
			},
			tooltip : {
				trigger : 'axis'
			},
			legend : {
				data : ["System","Wait IO","User"]
			},
			toolbox : {
				show : true,
				feature : {
					mark : {
						show : false
					},
					dataView : {
						show : true,
						readOnly : false
					},
					magicType : {
						show : false,
						type : [ 'line', 'bar' ]
					},
					restore : {
						show : true
					},
					saveAsImage : {
						show : true
					}
				}
			},
			calculable : true,
			xAxis : [ {
				type : 'category',
				boundaryGap : false,
				data : [ '1', '2', '3', '4', '5', '6', '7' ]
			} ],
			yAxis : [ {
				type : 'value',
				axisLabel : {
					formatter : '{value} %'
				}
			} ],
			grid : {
				x:60,
				x2:40
			},
			series : [ {
				name : 'System',
				type : 'line',
				stack: '总量',
				smooth : true,
				itemStyle: {normal: {areaStyle: {type: 'default'}}},
				data : [ 0, 0, 0, 0, 0, 0, 0 ]// 必须是Integer类型的,String计算平均值会出错
			},
			{
				name : 'Wait IO',
				type : 'line',
				smooth : true,
				stack: '总量',
				itemStyle: {normal: {areaStyle: {type: 'default'}}},
				data : [ 0, 0, 0, 0, 0, 0, 0 ]// 必须是Integer类型的,String计算平均值会出错
			},
			{
				name : 'User',
				type : 'line',
				smooth : true,
				stack: '总量',
				itemStyle: {normal: {areaStyle: {type: 'default'}}},
				data : [ 0, 0, 0, 0, 0, 0, 0 ]// 必须是Integer类型的,String计算平均值会出错
			}
			]
		};

		cpuChart.setOption(options); // 先把可选项注入cpuChart中
		window.onresize = cpuChart.resize;
		getChartData();
		setInterval(getChartData,60000);
	}

function getChartData() {
	//获得图表的options对象
	var options = cpuChart.getOption();
	//通过Ajax获取数据
	$.ajax({
		type : "get",
		url : "/cpulogs",
		data : {hostid:$('#hostid').val()},
		dataType : "json", //返回数据形式为json
		success : function(result) {
			if (result) {
				options.legend.data = result.legend;
				options.xAxis[0].data = result.category;
				options.series[0].data = result.series[0].data;
				options.series[1].data = result.series[1].data;
				options.series[2].data = result.series[2].data;
				cpuChart.hideLoading();
				cpuChart.setOption(options);
			}
		},
		error : function(errorMsg) {
			toastr.options = {
	                closeButton: true,
	                progressBar: true,
	                showMethod: 'slideDown',
	                timeOut: 4000
	            };
            toastr.error('您最后一次登录：2015-12-01 14:23', '陈龙，欢迎使用 SOA+管理系统 ');
			cpuChart.hideLoading();
		}
	});
	}
}


function initMemChart(){
	var memChart;
	var memeCharts;
	var labs;
	require.config({
		paths : {
			'echarts' : '/js/plugins/echarts'
		}
	});

	require(
		[ 'echarts', 
		  'echarts/theme/macarons',
		  'echarts/chart/line'
		], DrawEChart // 异步加载的回调函数绘制图表
	);
	// 创建ECharts图表方法
	function DrawEChart(ec) {
		memeCharts = ec;
		memChart = memeCharts.init(document.getElementById('memmain'),'macarons');
		memChart.showLoading({
			text : "图表数据正在努力加载..."
		});
		// 定义图表options
		var options = {
			title:{
				text:"内存",
				textStyle:{
					fontSize: 18,
				    fontWeight: 'normal',
				    color: '#333'
				}
			},
			tooltip : {
				trigger : 'axis',
				formatter: function (params,ticket,callback) {
		            return labs[params[0].dataIndex];
		        }
			},
			legend : {
				data : ["Memory","Swap"]
			},
			toolbox : {
				show : true,
				feature : {
					mark : {
						show : false
					},
					dataView : {
						show : true,
						readOnly : false
					},
					magicType : {
						show : false,
						type : [ 'line', 'bar' ]
					},
					restore : {
						show : true
					},
					saveAsImage : {
						show : true
					}
				}
			},
			calculable : true,
			xAxis : [ {
				type : 'category',
				boundaryGap : false,
				data : [ '1', '2', '3', '4', '5', '6', '7' ]
			} ],
			yAxis : [ {
				type : 'value',
				axisLabel : {
					formatter : '{value}%'
				}
			} ],
			grid : {
				x:60,
				x2:40
			},
			series : [ {
				name : 'Memory',
				type : 'line',
				smooth : true,
				itemStyle: {normal: {areaStyle: {type: 'default'}}},
				data : [ 0, 0, 0, 0, 0, 0, 0 ]// 必须是Integer类型的,String计算平均值会出错
			},
			{
				name : 'Swap',
				type : 'line',
				smooth : true,
				itemStyle: {normal: {areaStyle: {type: 'default'}}},
				data : [ 0, 0, 0, 0, 0, 0, 0 ]// 必须是Integer类型的,String计算平均值会出错
			}
			]
		};

		memChart.setOption(options); // 先把可选项注入memChart中
		window.onresize = memChart.resize;
		getChartData();
		setInterval(getChartData,60000);
	}

function getChartData() {
	//获得图表的options对象
	var options = memChart.getOption();
	//通过Ajax获取数据
	$.ajax({
		type : "get",
		url : "/memorylogs",
		data : {hostid:$('#hostid').val()},
		dataType : "json", //返回数据形式为json
		success : function(result) {
			if (result) {
				options.legend.data = result.legend;
				options.xAxis[0].data = result.category;
				options.series[0].data = result.series[0].data;
				options.series[1].data = result.series[1].data;
				labs = result.labels;
				memChart.hideLoading();
				memChart.setOption(options);
			}
		},
		error : function(errorMsg) {
			toastr.options = {
	                closeButton: true,
	                progressBar: true,
	                showMethod: 'slideDown',
	                timeOut: 4000
	            };
            toastr.error('您最后一次登录：2015-12-01 14:23', '陈龙，欢迎使用 SOA+管理系统 ');
			memChart.hideLoading();
		}
	});
	}
}

function initDiskChart(rslt){
	
	var diskmainChart;
	var eCharts;
	require.config({
		paths : {
			'echarts' : '/js/plugins/echarts'
		}
	});
	
	require(
		[ 'echarts', 
		  'echarts/chart/pie'
		], DrawEChart // 异步加载的回调函数绘制图表
	);
	// 创建ECharts图表方法
	function DrawEChart(ec) {
		eCharts = ec;
		diskmainChart = eCharts.init(document.getElementById("diskmain"));
		var radius = ['65%', '80%'];
		var labelTop = {
			    normal : {
			        label : {
			            show : true,
			            position : 'center',
			            formatter : '{b}',
			            textStyle: {
			                baseline : 'bottom',
			                fontSize: 18,
							fontFamily:'微软雅黑',
						    fontWeight: 'normal'
			            }
			        },
			        labelLine : {
			            show : false
			        }
			    }
			};
		var labelBottom = {
			    normal : {
			        color: '#ccc',
			        label : {
			            show : true,
			            position : 'center'
			        },
			        labelLine : {
			            show : false
			        }
			    },
			    emphasis: {
			        color: 'rgba(0,0,0,0)'
			    }
			};
		// 定义图表options
		var labelFromatter = {
			    normal : {
			        label : {
			            formatter : function (params){
			                return 100 - params.value + '%'
			            },
			            textStyle: {
			                baseline : 'top',
		                	fontSize: 18,
							fontFamily:'微软雅黑',
						    fontWeight: 'normal'
			            }
			        }
			    },
			}
		var options = {
				title:{
					text:"磁盘",
					textStyle:{
						fontSize: 18,
						fontFamily:'微软雅黑',
					    fontWeight: 'normal',
					    color: 'black'
					}
				},
			    tooltip : {
			        formatter: "{b}:{c}%"
			    },
			    toolbox: {
			        show : false
			    },
			    series : [
			              {
			                  type : 'pie',
			                  center : ['50%', '50%'],
			                  radius : radius,
			                  x: '0%', // for funnel
			                  itemStyle : labelFromatter,
			                  data : [
			                      {name:'剩余', value:100-rslt.usage, itemStyle : labelBottom},
			                      {name:'已使用', value:rslt.usage,itemStyle : labelTop}
			                  ]
			              }
			    ]
			};
		diskmainChart.setOption(options); // 先把可选项注入myChart中
		window.onresize = diskmainChart.resize;
	}
}

function savebq(){
	
	var bqys="",color="",bqmc="";
	color =$("#color").val();
	bqmc = $("#bqmc").val();
	if(kong(bqmc) === ""){
		alert("请填写标签名称");
		return;
	}
	var span="";
	span = '<span class="badge badge-'+color+'">'+bqmc+'<span name="bq_nr" value="'+color+"|"+bqmc+'"></span> <a class="chosen-a-close" onclick="delbq(this);"></a></span>';
	$("#bqyl").append(span);
}

function kong(val){
	var result = val;
	if (typeof val === 'undefined' || val === '' || val === 'undefined' || val === null) result = "";
	return result;
}

function delbq(_this){
	$(_this).parent().remove();
}

function save(){
	var str = $("span[name='bq_nr']");
	var labels ="";
	$.each(str,function(i,v){
		labels +=$(v).attr('value')+"@";
	});
	if(labels.length>0){
		labels = labels.substr(0,labels.length-1);
	}
	var othername ="";
	othername = $("#othername").val();
	if(kong(othername) === ""){
		alert("请填写服务器名称！");
		return;
	}
	var hostid = $("#hostid").val();
	var param ={};
	param.othername = othername;
	param.labels = labels;
	param.hostid = hostid;
	
	$.ajax({
        async: false,
        type : "post",
        url : '/hostslogsedit',
        data: param,
        dataType : 'json',
        complete: function(msg){
            //alert('complete');
        },
        success : function(data) {
	        if(data == 1){
	        	location.href = "hosts?hostid="+hostid;
	        }else{
	        	alert("保存失败！");
	        }
        },
        error: function(){
        	alert("保存失败！");
        }
    });
	
}

