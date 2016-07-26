package sckj.soams.rest;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sckj.soams.bean.EchartData;
import sckj.soams.bean.Series;
import sckj.soams.entity.HostCpuLogs;
import sckj.soams.entity.HostNetLogs;
import sckj.soams.service.HostNetLogsService;

@RestController
public class NetRestController {
	
	@Autowired
	private HostNetLogsService service;
	
	@RequestMapping("/netlogs")
	public EchartData netLogs(String hostid,String type){
		EchartData data = null;
		List<String> legend = new ArrayList<String>(Arrays.asList(new String[]{"Rxbps","Txbps"}));//数据分组
		List<String> categorys = new ArrayList<String>();
		List<Series> series = new ArrayList<Series>();//纵坐标
		List<Double> seriesIn = new ArrayList<Double>();
		List<Double> seriesOut = new ArrayList<Double>();
		SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
		List<HostNetLogs> netLogs = service.getNetLogs(hostid,30);
		int i = 0;
		for(i=0;i<netLogs.size();i++){
			HostNetLogs hnl = netLogs.get(i);
			categorys.add(sdf.format(hnl.getRecdt()));
			seriesIn.add(Double.valueOf(Long.parseLong(hnl.getRxbps())/1024));
			seriesOut.add(Double.valueOf(Long.parseLong(hnl.getTxbps())/1024));
		}
		series.add(new Series("Rxbps", "line", seriesIn));
		
		series.add(new Series("Txbps", "line",seriesOut));
		
		data=new EchartData(legend, categorys, series);
		
		return data;
	}
}
