package sckj.soams.bean;

import java.util.HashMap;
import java.util.Map;

import sckj.soams.entity.Hosts;

public class HostsBean extends Hosts{
	
	private Map<String, Object> map = new HashMap<String, Object>();

	
	public Map<String, Object> getMap() {
		return map;
	}

	public void setMap(Map<String, Object> map) {
		this.map = map;
	}
	
}
