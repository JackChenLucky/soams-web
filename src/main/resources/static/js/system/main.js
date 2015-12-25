$(function(){
	
})

function initChart(obj){
	var myChart;
	var eCharts;
	require.config({
		paths : {
			'echarts' : '/js/plugins/echarts'
		}
	});

	require(
		[ 'echarts', 
		  'echarts/chart/gauge'
		], DrawEChart // 异步加载的回调函数绘制图表
	);
	// 创建ECharts图表方法
	function DrawEChart(ec) {
		eCharts = ec;
		myChart = eCharts.init(document.getElementById(obj.id));
		// 定义图表options
		var options = {
			    tooltip : {
			        formatter: "{b}:{c}%"
			    },
			    toolbox: {
			        show : false
			    },
			    series : [
			        {
			            name:'业务指标',
			            type:'gauge',
			            splitNumber: 5,       // 分割段数，默认为5
			            axisLine: {            // 坐标轴线
			                lineStyle: {       // 属性lineStyle控制线条样式
			                    color: [[0.2, '#228b22'],[0.8, '#48b'],[1, '#ff4500']], 
			                    width: 8
			                }
			            },
			            center:['50%', '50%'],
			            axisTick: {            // 坐标轴小标记
			                splitNumber: 1,   // 每份split细分多少段
			                length :12,        // 属性length控制线长
			                lineStyle: {       // 属性lineStyle控制线条样式
			                    color: 'auto'
			                }
			            },
			            axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
			            	show: false,
			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
			                    color: 'auto'
			                }
			            },
			            splitLine: {           // 分隔线
			                show: false,        // 默认显示，属性show控制显示与否
			                length :1,         // 属性length控制线长
			                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
			                    color: 'auto'
			                }
			            },
			            pointer : {
			                width : 5
			            },
			            title : {
			                show : true,
			                offsetCenter: [0, '50%'],       // x, y，单位px
			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
			                    fontWeight: 'normal',
			                    color:'blue'
			                }
			            },
			            detail : {
			            	show : true,
			            	offsetCenter: [0, '60%'],
			                formatter:'{value}%',
			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
			                    color: 'auto',
			                    fontSize : 15,
			                    fontWeight: 'bold'
			                }
			            },
			            data:[{value: obj.val, name: obj.name}]
			        }
			    ]
			};

		myChart.setOption(options); // 先把可选项注入myChart中
		window.onresize = myChart.resize;
//		getChartData();
//		setInterval(getChartData,60000);
	}
}