package sckj.soams;

import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.mapper.MapperScannerConfigurer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;

@SpringBootApplication
public class SaomsApplication  implements EmbeddedServletContainerCustomizer {

    @Bean
    @ConfigurationProperties(prefix = "spring.datasource")
    public DataSource primaryDataSource() {
        System.out.println("-------------------- DataSource init ---------------------");
        return DataSourceBuilder.create().build();
    }

    @Bean
    MapperScannerConfigurer mpperScannnerConfigurer() {
        MapperScannerConfigurer msc = new MapperScannerConfigurer();
        msc.setBasePackage("sckj.soams.mapping");
        return msc;
    }

    @Bean(name = "sqlSessionFactory")
    SqlSessionFactoryBean sqlSessionFactory(DataSource dataSource) {
        SqlSessionFactoryBean ssfb = new SqlSessionFactoryBean();
        ssfb.setDataSource(dataSource);
        ssfb.setTypeAliasesPackage("sckj.soams.entity");
        return ssfb;
    }

    @Bean
    PlatformTransactionManager transactionManager(DataSource dataSource) {
        DataSourceTransactionManager transactionManager = new DataSourceTransactionManager();
        transactionManager.setDataSource(dataSource);
        return transactionManager;
    }

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(SaomsApplication.class);
        app.setWebEnvironment(true);
        app.setShowBanner(false);
        app.run(args);
    }

	@Override
	public void customize(ConfigurableEmbeddedServletContainer container) {
		// TODO Auto-generated method stub
		container.setPort(8088); 
	}
}
