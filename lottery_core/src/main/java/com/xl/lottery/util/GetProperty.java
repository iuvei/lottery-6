package com.xl.lottery.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import com.xl.lottery.exception.LotteryExceptionLog;

public class GetProperty {
	
	 // 方法一：通过java.util.ResourceBundle读取资源属性文件  
    public static String getPropertyByName(String path, String name) {  
        String result = "";  
  
        try {  
            // 方法一：通过java.util.ResourceBundle读取资源属性文件  
            result = java.util.ResourceBundle.getBundle(path).getString(name);  
        } catch (Exception e) {  
            LotteryExceptionLog.wirteLog(e);
        }  
        return result;  
    }  
  
    // 方法二：通过类加载目录getClassLoader()加载属性文件  
    public static String getPropertyByName2(String path, String name) {  
        String result = "";  
  
        // 方法二：通过类加载目录getClassLoader()加载属性文件  
        InputStream in = GetProperty.class.getClassLoader()  
                .getResourceAsStream(path);  
        // InputStream in =  
        // this.getClass().getClassLoader().getResourceAsStream("mailServer.properties");  
  
        // 注：Object.class.getResourceAsStream在action中调用报错，在普通java工程中可用  
        // InputStream in =  
        // Object.class.getResourceAsStream("/mailServer.properties");  
        Properties prop = new Properties();  
        try {  
            prop.load(in);  
            result = prop.getProperty(name).trim();  
        } catch (IOException e) {  
        	  LotteryExceptionLog.wirteLog(e);
        }  
        return result;  
    }  
}
