package sckj.soams.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sckj.soams.bean.MemoryLogsBean;
import sckj.soams.bean.MemorySwapBean;
import sckj.soams.mapping.MemoryLogsMapper;

@Service
public class HostMemoryService {
  
	@Autowired
	private MemoryLogsMapper mapper;
	
	public List<MemorySwapBean> getLastMemLogs(String hostid,int size){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("hostid", hostid);
		map.put("size",size);
		return mapper.getLastMemLogs(map);
	}
	
	public List<MemoryLogsBean> getLastMemLogsBean(String hostid,int size){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("hostid", hostid);
		map.put("size",size);
		return mapper.getLastMemLogsBean(map);
	}
}
