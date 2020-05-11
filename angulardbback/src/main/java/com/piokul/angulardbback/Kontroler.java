package com.piokul.angulardbback;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.web.bind.annotation.*;

import java.sql.*;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class Kontroler {

    JdbcTemplate jdbc;
    Connection con;

    @RequestMapping("/isOpen")
    public boolean isOpen() throws SQLException {
        if (con != null) {
            if (!con.isClosed()) {
                return true;
            }
        }
        return false;
    }

    @RequestMapping("/login")
    public boolean login(@RequestBody String[] data) {
        try {
            jdbc = new JdbcTemplate(DataSourceBuilder.create().driverClassName("oracle.jdbc.driver.OracleDriver").url("jdbc:oracle:thin:@//" + data[0]).username(data[1]).password(data[2]).build());
            con = jdbc.getDataSource().getConnection();
            while (con.isClosed()) {
                Thread.sleep(300);
            }
            return true;
        } catch(Exception ex) { }
        return false;
    }

    @RequestMapping("/getTable")
    public List<Map<String,Object>> getTable(@RequestBody String tableName) {
        return jdbc.queryForList("Select * from " + tableName);
    }

    @RequestMapping("/edit")
    public void edit(@RequestBody String dane) {
        System.out.println(dane);
        jdbc.execute(dane);
        jdbc.execute("commit");
    }

    @RequestMapping("/logout")
    public void logout() throws SQLException {
        con.close();
        jdbc = null;
    }

    @RequestMapping("/getPrimaryKey")
    public List<String> getPrimaryKey (@RequestBody String tableName) {
        String sql = "SELECT column_name FROM all_cons_columns WHERE constraint_name = (\n" +
                "  SELECT constraint_name FROM all_constraints \n" +
                "  WHERE UPPER(table_name) = UPPER('" + tableName + "') AND CONSTRAINT_TYPE = 'P'\n" +
                ")";
        System.out.println(sql);
        RowMapper rowMapper = (ResultSet rs, int rowNum) -> rs.getString(1);
        return jdbc.query(sql,rowMapper);
    }

    @RequestMapping("/getTableNames")
    public List<String> getTableNames() {
        String sql = "SELECT table_name FROM all_tables where owner = (select 'UZYTKOWNIK' from dual)";
        RowMapper rowMapper = (ResultSet rs, int rowNum) -> rs.getString(1);
        return jdbc.query(sql,rowMapper);
    }

}
