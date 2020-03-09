package pl.piokul.angulardb;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;
import java.lang.reflect.InvocationTargetException;
import java.sql.*;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class Kontroler {
    JdbcTemplate jdbcTemplate;

    @RequestMapping("/login")
    public String login() throws IllegalAccessException, InstantiationException, InvocationTargetException {
        try{
            jdbcTemplate = new JdbcTemplate(DataSourceBuilder.create().driverClassName("oracle.jdbc.driver.OracleDriver").url("jdbc:oracle:thin:@//155.158.112.45:1521/oltpstud").username("ziibd5").password("haslo1").build());
            jdbcTemplate.getDataSource().getConnection();
            return "Zalogowano";
        } catch(Exception ex) {
            return ex.toString();
        }
    }

    @RequestMapping("/getTable")
    public List<Map<String, Object>> getTable(@RequestBody String table) {
        return jdbcTemplate.queryForList("select * from " + table);
    }

    @RequestMapping("/getList")
    public List<Map<String, Object>> getList() {
        return jdbcTemplate.queryForList("select table_name from all_tables where owner = 'ZIIBD5'");
    }


}
