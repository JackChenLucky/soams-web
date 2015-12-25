package sckj.soams;

import java.util.HashMap;
import java.util.Map;

public class Constants {
	public static final Map<Integer,String> WEB_INVOKE_CHAIN;
	
	public static final Map<Integer,String> SERVICE_INVOKE_CHAIN;
	
	public static final Map<String,String> HOST_STATUS; //服务器状态
	
	public static final String CHART_INTERVAL_REAL = "1";//实时
	
	public static final String CHART_INTERVAL_DAY = "2";//24小时之内
	
	public static final Integer HOST_MENU_ID=2;//主机监控菜单Id
	
	public static final String HOST_STATUS_OUTLINE="0";//服务器离线
	
	public static final String HOST_STATUS_ONLINE="1";//服务器在线
	
	public static final String HOST_STATUS_REPAIR="2";//服务器需维护，机器在线，监控服务未启动
	
	public static Map<Integer, String> invokeOrder(String application) {
		switch (application) {
		case "EBS":
			return WEB_INVOKE_CHAIN;
		case "ERP-SERVICE-USER":
			return SERVICE_INVOKE_CHAIN;
		case "ERP-SERVICE-STOCK":
			return SERVICE_INVOKE_CHAIN;
		case "ERP-SERVICE-ORDER":
			return SERVICE_INVOKE_CHAIN;
		default:
			return WEB_INVOKE_CHAIN;
		}
	}
	
	static{
		WEB_INVOKE_CHAIN = new HashMap<Integer,String>();
		WEB_INVOKE_CHAIN.put( 1, "CONTROLLER");
		WEB_INVOKE_CHAIN.put( 2, "SERVICE");
		WEB_INVOKE_CHAIN.put( 3, "DAO");
		
		SERVICE_INVOKE_CHAIN = new HashMap<Integer,String>();
		SERVICE_INVOKE_CHAIN.put( 1, "FACADEIMPL");
		SERVICE_INVOKE_CHAIN.put( 2, "BIZ");
		SERVICE_INVOKE_CHAIN.put( 3, "DAO");
		
		HOST_STATUS = new HashMap<String,String>();
		HOST_STATUS.put( HOST_STATUS_OUTLINE, "离线");
		HOST_STATUS.put( HOST_STATUS_ONLINE, "在线");
		HOST_STATUS.put( HOST_STATUS_REPAIR, "服务器需维护，机器在线，监控服务未启动");
	}
}
