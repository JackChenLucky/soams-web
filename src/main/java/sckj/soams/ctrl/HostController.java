package sckj.soams.ctrl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

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
		return mv;
	}
	
}
