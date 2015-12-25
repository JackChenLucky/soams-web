package sckj.soams.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sckj.soams.Constants;
import sckj.soams.bean.HostsBean;
import sckj.soams.bean.MenuBean;
import sckj.soams.entity.Hosts;
import sckj.soams.entity.Menus;
import sckj.soams.mapping.HostsMapper;
import sckj.soams.mapping.MenusMapper;

@Service
public class MenusService {
	
	@Autowired
	private MenusMapper menusMapper;

	@Autowired
	private HostsMapper hostsMapper;
	
    public List<MenuBean> generateMenus(){
    	List<MenuBean> menuList = new ArrayList<MenuBean>();
    	List<Menus> menus = menusMapper.selectAll();
    	//先取第一级菜单，只允许三级菜单
    	for(Menus menu:menus){
    		if(menu.getParentid()==0){
	    		MenuBean mb = new MenuBean();
	    		mb.setMenuId(menu.getMenuid().toString());
	    		mb.setMenuText(menu.getMenutext());
	    		mb.setMenuUrl(menu.getMenuurl());
	    		mb.setMenuIcon(menu.getIcon());
	    		if(menu.getMenuid()==Constants.HOST_MENU_ID){
	    			mb.setChildMenus(getHostMenus());
	    		}else{
	    			mb.setChildMenus(getChildMenus(menu.getMenuid(),menus));
	    		}
	    		menuList.add(mb);
    		}
    	}
    	return menuList;
    }
    
    private List<MenuBean> getChildMenus(int menuid,List<Menus> menus){
    	List<MenuBean> menuList = new ArrayList<MenuBean>();
    	//先取第一级菜单，只允许三级菜单
    	for(Menus menu:menus){
    		if(menu.getMenuid()!=0 && menu.getParentid()==menuid){
	    		MenuBean mb = new MenuBean();
	    		mb.setMenuId(menu.getMenuid().toString());
	    		mb.setMenuText(menu.getMenutext());
	    		mb.setMenuUrl(menu.getMenuurl());
	    		mb.setMenuIcon(menu.getIcon());
	    		mb.setChildMenus(getChildMenus(menu.getMenuid(),menus));
	    		menuList.add(mb);
    		}
    	}
    	return menuList;
    }
    
    private List<MenuBean> getHostMenus(){
    	List<MenuBean> menuList = new ArrayList<MenuBean>();
    	List<HostsBean> hosts = hostsMapper.selectAll();
    	//先取第一级菜单，只允许三级菜单
    	for(Hosts host:hosts){
    		MenuBean mb = new MenuBean();
    		mb.setMenuId(host.getHostid());
    		mb.setMenuText(host.getIp());
    		mb.setMenuUrl("/hosts?hostid="+host.getHostid());
    		mb.setMenuIcon(null);
    		mb.setChildMenus(null);
    		menuList.add(mb);
    	}
    	return menuList;
    }
}
