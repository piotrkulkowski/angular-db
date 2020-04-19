package com.piokul.angulardbback;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootApplication
public class AngulardbbackApplication {

	public static void main(String[] args) {
		SpringApplication.run(AngulardbbackApplication.class, args);
		System.out.println("Hello, nurse!");
	}

}
