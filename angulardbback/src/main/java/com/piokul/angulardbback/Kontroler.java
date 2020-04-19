package com.piokul.angulardbback;

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

    JdbcTemplate jdbc;

    @RequestMapping("/login")
    public String login() {
        try {
            jdbc = new JdbcTemplate(DataSourceBuilder.create().driverClassName("oracle.jdbc.driver.OracleDriver").url("jdbc:oracle:thin:@//localhost:1521/praca").username("uzytkownik").password("haslo2").build());
            jdbc.getDataSource().getConnection();
            return "Zalogowano";
        } catch(Exception ex) {
            return ex.toString();
        }
    }

    @RequestMapping("/getTable")
    public List<Map<String,Object>> getTable() {
        return jdbc.queryForList("Select * from employees");
    }

}
