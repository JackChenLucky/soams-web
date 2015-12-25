package sckj.soams.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sckj.soams.bean.HostsBean;
import sckj.soams.entity.Hosts;
import sckj.soams.mapping.HostsMapper;

@Service
public class HostsService {
	
	@Autowired
	private HostsMapper mapper;
	
	public List<HostsBean> getAllHosts(){
		return mapper.selectAll();
	}
	
	public Hosts getHostsByHostId(String hostid){
		return mapper.selectByPrimaryKey(hostid);
	}
	
	public List<HostsBean> getAll(HostsBean dto){
		return mapper.getAll(dto);
	}
	
	public Integer updatebyhostid(HostsBean dto){
		return mapper.updatebyhostid(dto);
	}
}
