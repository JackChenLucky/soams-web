package sckj.soams.rest;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;

import sckj.soams.bean.EchartData;
import sckj.soams.bean.MenuBean;
import sckj.soams.bean.Series;
import sckj.soams.entity.HostCpuLogs;
import sckj.soams.service.HostCpuLogsService;
import sckj.soams.service.MenusService;

@RestController
public class MenusRestController {
	
	@Autowired
	private MenusService service;
	
	@RequestMapping("/menuslogs")
	public String menusInfoLogs(){
//		EchartData data = null;
//		List<String> legend = new ArrayList<String>(Arrays.asList(new String[]{"System","Wait IO","User"}));//数据分组
//		List<String> categorys = new ArrayList<String>();
//		List<Series> series = new ArrayList<Series>();//纵坐标
//		List<Double> seriesSystem = new ArrayList<Double>();
//		List<Double> seriesWait = new ArrayList<Double>();
//		List<Double> seriesUser = new ArrayList<Double>();
//		SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
		List<MenuBean> menusLogs = service.generateMenus();
		String data = JSON.toJSONString(menusLogs);
//		int i = 0;
//		for(i=0;i<cpuLogs.size();i++){
//			HostCpuLogs hcl = cpuLogs.get(i);
//			categorys.add(sdf.format(hcl.getRecdt()));
//			seriesSystem.add(Double.valueOf(hcl.getSys().replace("%","")));
//			seriesWait.add(Double.valueOf(hcl.getWait().replace("%","")));
//			seriesUser.add(Double.valueOf(hcl.getUser().replace("%","")));
//		}
//		series.add(new Series("System", "line", seriesSystem));
//		
//		series.add(new Series("Wait IO", "line",seriesWait));
//		
//		series.add(new Series("User", "line",seriesUser));
//		
//		data=new EchartData(legend, categorys, series);
		System.out.println(data);
		
		return data;
	}
}
