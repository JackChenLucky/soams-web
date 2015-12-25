package sckj.soams.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sckj.soams.entity.HostCpuLogs;
import sckj.soams.mapping.HostCpuLogsMapper;

/**
 * 
 * @author 龙
 *
 */
@Service
public class HostCpuLogsService {
	
	@Autowired
	private HostCpuLogsMapper mapper;
	
	public List<HostCpuLogs> getLastCpuLogs(String hostid,Integer size){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("hostid", hostid);
		map.put("size",size);
		return mapper.getLastCpuLogs(map);
	}
	
	public List<HostCpuLogs> getLastCpuLogsDTO(String hostid,Integer size){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("hostid", hostid);
		map.put("size",size);
		return mapper.getLastCpuLogsDTO(map);
	}
}
