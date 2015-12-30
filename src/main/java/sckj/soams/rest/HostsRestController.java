package sckj.soams.rest;

import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;

import sckj.soams.bean.DiskInfoBean;
import sckj.soams.bean.HostsBean;
import sckj.soams.bean.MemoryLogsBean;
import sckj.soams.entity.HostCpuLogs;
import sckj.soams.service.HostCpuLogsService;
import sckj.soams.service.HostDiskInfoService;
import sckj.soams.service.HostMemoryService;
import sckj.soams.service.HostsService;

@RestController
public class HostsRestController {
	
	@Autowired
	private HostsService hostservice;
	
	@Autowired
	private HostCpuLogsService hostCpuservice;
	
	@Autowired
	private HostMemoryService hostMemoryService;
	
	@Autowired
	private HostDiskInfoService hostDiskInfoService;
	
	@RequestMapping("/hostslogs")
	public String hostsInfoLogs(HostsBean hostsbean){
		List<HostsBean> hostslogs;
		hostslogs = hostservice.getAll(hostsbean);
		if(hostslogs != null && hostslogs.size()>0){
			DecimalFormat df = new DecimalFormat("######0.00"); 
			for(HostsBean dto:hostslogs){
				Map<String, Object> map = new HashMap<String, Object>();
				String hostid = dto.getHostid();
				List<HostCpuLogs> hostcpulogs = hostCpuservice.getLastCpuLogsDTO(hostid, 1);
				double combined = 0;
				if(hostcpulogs !=null && hostcpulogs.size()>0){
					combined = Double.parseDouble(hostcpulogs.get(0).getCombined().split("%")[0]);
				}
				map.put("cpu", Double.valueOf(df.format(combined)));
				List<MemoryLogsBean> memoryLogsBean = hostMemoryService.getLastMemLogsBean(hostid,1);
				Double bfb = (double) 0;
				if(memoryLogsBean !=null && memoryLogsBean.size()>0){
					bfb = memoryLogsBean.get(0).getBfb()*100;
				}
				map.put("memory", Double.valueOf(df.format(bfb)));
				DiskInfoBean dib = hostDiskInfoService.getDiskInfo(hostid);
				double usage = 0;
				if(dib !=null){
					usage = dib.getUsage();
				}	
				map.put("disk", usage);
				dto.setMap(map);
			}
		}
		String data = JSON.toJSONString(hostslogs);
		System.out.println(data);
		return data;
	}
	
	@RequestMapping("/hostslogsedit")
	public Integer hostslogsedit(HostsBean hostsbean){
		Integer flag = 0;
		flag = hostservice.updatebyhostid(hostsbean);
		return flag;
	}
}
