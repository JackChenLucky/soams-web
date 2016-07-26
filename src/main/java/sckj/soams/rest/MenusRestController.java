package sckj.soams.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sckj.soams.bean.MenuBean;
import sckj.soams.service.MenusService;

import com.alibaba.fastjson.JSON;

@RestController
public class MenusRestController {
	
	@Autowired
	private MenusService service;
	
	@RequestMapping("/menuslogs")
	public String menusInfoLogs(){
		List<MenuBean> menusLogs = service.generateMenus();
		return JSON.toJSONString(menusLogs);
	}
}
