package sckj.soams.ctrl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import sckj.soams.Constants;
import sckj.soams.entity.HostCpuInfo;
import sckj.soams.entity.Hosts;
import sckj.soams.service.HostCpuInfoService;
import sckj.soams.service.HostsService;

@Controller
public class HostController {
	
	@Autowired
	private HostsService hostsService;
	
	@Autowired
	private HostCpuInfoService hostCpuInfoService; 
	
	@RequestMapping("/hosts")
	public ModelAndView hosts(String hostid){
		ModelAndView mv = new ModelAndView("views/host");
		mv.addObject("sysmenu", "hosts");
		Hosts host = hostsService.getHostsByHostId(hostid);
		mv.addObject("host", host);
		HostCpuInfo hci = hostCpuInfoService.getHostCpuInfo(hostid);
		mv.addObject("hostcpu", hci);
		mv.addObject("hostid", hostid);
		if(host != null){
			mv.addObject("statusmc", Constants.HOST_STATUS.get(host.getStatus()));
			if(host.getLabels() != null && !"".equals(host.getLabels())){
				String lables = host.getLabels();
				String[] lab = lables.split("@");
				List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
				for(int i=0,len=lab.length;i<len;i++){
					Map<String,Object> map = new HashMap<String,Object>();
					map.put("color", lab[i].split("\\|")[0]);
					map.put("bqmc", lab[i].split("\\|")[1]);
					list.add(map);
				}
				mv.addObject("bqmclist", list);
			}
		}
		return mv;
	}
	
}
