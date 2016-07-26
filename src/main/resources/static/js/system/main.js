function initym() {
	var param = {};
	$.ajax({
				async : false,
				type : "post",
				url : '/hostslogs',
				data : param,
				dataType : 'json',
				complete : function(msg) {
					//alert('complete');
				},
				success : function(data) {
					console.log(data);
					var str = "";
					var len = 0;
					if (data) {
						len = data.length;
						for (var i = 0; i < len; i++) {
							var src = kong(data[i].osversion) === "" ? ""
									: getOsImg(data[i].osname);
							var sclass = "";
							if (kong(data[i].status) === "1") {
								sclass = "fa fa-circle online";
							} else if (kong(data[i].status) === "0") {
								sclass = "fa fa-circle outline";
							} else if (kong(data[i].status) === "2") {
								sclass = "fa fa-circle";
							} else {
								sclass = "";
							}
							var div1 = "", div2 = "";

							div1 += '<div class="ibox-host-title"><div class="feed-element">'
									+ '<a href="'
									+ "hosts?hostid="
									+ data[i].hostid
									+ '" class="pull-left"><img alt="image" class="img-circle" src="'
									+ src
									+ '">'
									+ '</a><div class="media-body"><div><h2 style="margin-top:0px;margin-bottom:5px;">'
									+ '<a href="'
									+ "hosts?hostid="
									+ data[i].hostid
									+ '">'
									+ kong(data[i].othername)
									+ '</a></h2>'
									+ '</div><i class="'
									+ sclass
									+ '"></i><small class="text-muted">'
									+ kong(data[i].ip)
									+ '</small></div></div></div>';

							div2 += '<div class="ibox-content"><div class="row">'
									+ '<div class="col-sm-4" style="padding:0px;"><div id="main'
									+ i
									+ '_1" class="main" style="height:100px;"></div></div>'
									+ '<div class="col-sm-4" style="padding:0px;"><div id="main'
									+ i
									+ '_2" class="main" style="height:100px;"></div></div>'
									+ '<div class="col-sm-4" style="padding:0px;"><div id="main'
									+ i
									+ '_3" class="main" style="height:100px;"></div></div></div></div>';

							str += '<div class="col-sm-4"><div class="ibox " style="hover:">'
									+ div1 + div2 + '</div></div>';

						}
						$("#zyfwq").append(str);
						setmenu(data);
					}
				}
			});
}

function getOsImg(osname){
	var img = "other";
	if(osname.indexOf('Windows')>=0){
		img = "windows";
	}else if(osname.indexOf('Ubuntu')>=0){
		img = "ubuntu";
	}else if(osname.indexOf('Centos')>=0){
		img = "centos";
	}
	return "img/" + img + ".png";
}

function kong(val) {
	var result = val;
	if (typeof val === 'undefined' || val === '' || val === 'undefined'
			|| val === null)
		result = "";
	return result;
}

function setmenu(data) {
	for (var i = 0, len = data.length; i < len; i++) {
		initChart({
			id : 'main' + i + '_1',
			name : 'cpu',
			val : data[i].map.cpu
		});
		initChart({
			id : 'main' + i + '_2',
			name : '内存',
			val : data[i].map.memory
		});
		initChart({
			id : 'main' + i + '_3',
			name : '磁盘',
			val : data[i].map.disk
		});
	}
}

function initChart(obj) {
	var myChart;
	var eCharts;
	require.config({
		paths : {
			'echarts' : '/js/plugins/echarts'
		}
	});

	require([ 'echarts', 'echarts/chart/gauge' ], DrawEChart // 异步加载的回调函数绘制图表
	);
	// 创建ECharts图表方法
	function DrawEChart(ec) {
		eCharts = ec;
		myChart = eCharts.init(document.getElementById(obj.id));
		// 定义图表options
		var options = {
			tooltip : {
				formatter : "{b}:{c}%"
			},
			toolbox : {
				show : false
			},
			series : [ {
				name : '业务指标',
				type : 'gauge',
				splitNumber : 5, // 分割段数，默认为5
				axisLine : { // 坐标轴线
					lineStyle : { // 属性lineStyle控制线条样式
						color : [ [ 0.2, '#228b22' ], [ 0.8, '#48b' ],
								[ 1, '#ff4500' ] ],
						width : 8
					}
				},
				center : [ '50%', '50%' ],
				axisTick : { // 坐标轴小标记
					splitNumber : 1, // 每份split细分多少段
					length : 12, // 属性length控制线长
					lineStyle : { // 属性lineStyle控制线条样式
						color : 'auto'
					}
				},
				axisLabel : { // 坐标轴文本标签，详见axis.axisLabel
					show : false,
					textStyle : { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
						color : 'auto'
					}
				},
				splitLine : { // 分隔线
					show : false, // 默认显示，属性show控制显示与否
					length : 1, // 属性length控制线长
					lineStyle : { // 属性lineStyle（详见lineStyle）控制线条样式
						color : 'auto'
					}
				},
				pointer : {
					width : 5
				},
				title : {
					show : true,
					offsetCenter : [ 0, '50%' ], // x, y，单位px
					textStyle : { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
						fontWeight : 'normal',
						color : 'blue'
					}
				},
				detail : {
					show : true,
					offsetCenter : [ 0, '60%' ],
					formatter : '{value}%',
					textStyle : { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
						color : 'auto',
						fontSize : 15,
						fontWeight : 'bold'
					}
				},
				data : [ {
					value : obj.val,
					name : obj.name
				} ]
			} ]
		};

		myChart.setOption(options); // 先把可选项注入myChart中
		window.onresize = myChart.resize;
		//		getChartData();
		//		setInterval(getChartData,60000);
	}
}