package com.course.system.config;

import org.mybatis.spring.annotation.MapperScan;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.core.env.Environment;

//配置扫描从主包，或者直接配server包只是启动项目成功，但实际请求需要使用mapper时又报错了
@SpringBootApplication(scanBasePackages = {"com.course"})
//@SpringBootApplication(scanBasePackages = {"server"})
@EnableEurekaClient
@MapperScan("com.course.server.mapper")
public class SystemApplication {
	private static final Logger LOG = LoggerFactory.getLogger(SystemApplication.class);

	public static void main(String[] args) {

		SpringApplication app = new SpringApplication(SystemApplication.class);
		Environment env = app.run(args).getEnvironment();
		LOG.info("启动成功！！");
		LOG.info("System地址: \thttp://127.0.0.1:{}", env.getProperty("server.port"));
	}

}

