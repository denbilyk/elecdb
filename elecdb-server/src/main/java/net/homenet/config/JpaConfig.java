package net.homenet.config;

/**
 * @author denbilyk
 * Created: 5/26/16
 */

import com.zaxxer.hikari.HikariDataSource;
import net.homenet.ElecdbApplication;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.TransactionManagementConfigurer;

import javax.sql.DataSource;
import java.util.Properties;

/**
 * @author denis.bilyk.
 */
@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(basePackageClasses = ElecdbApplication.class, entityManagerFactoryRef = "emf", transactionManagerRef = "tm")
public class JpaConfig implements TransactionManagementConfigurer {

    @Value("${hibernate.dialect}")
    private String dialect;
    @Value("${hibernate.hbm2ddl.auto}")
    private String hbm2ddlAuto;
    @Value("${datasource.url}")
    private String url;

    @Primary
    @Bean
    @ConfigurationProperties(prefix = "datasource")
    public DataSource configureDataSource() {
        return DataSourceBuilder.create().type(HikariDataSource.class)
                .url(url)
                .build();
    }

    @Bean(name = "emf")
    public LocalContainerEntityManagerFactoryBean configureEntityManagerFactory() {
        LocalContainerEntityManagerFactoryBean entityManagerFactoryBean = new LocalContainerEntityManagerFactoryBean();
        entityManagerFactoryBean.setDataSource(configureDataSource());
        entityManagerFactoryBean.setPackagesToScan("net.homenet");
        entityManagerFactoryBean.setJpaVendorAdapter(new HibernateJpaVendorAdapter());

        Properties jpaProperties = new Properties();
        jpaProperties.put(org.hibernate.cfg.Environment.DIALECT, dialect);
        jpaProperties.put(org.hibernate.cfg.Environment.HBM2DDL_AUTO, hbm2ddlAuto);
        entityManagerFactoryBean.setJpaProperties(jpaProperties);

        return entityManagerFactoryBean;
    }


    @Override
    @Bean(name = "tm")
    public PlatformTransactionManager annotationDrivenTransactionManager() {
        return new JpaTransactionManager();
    }
}
