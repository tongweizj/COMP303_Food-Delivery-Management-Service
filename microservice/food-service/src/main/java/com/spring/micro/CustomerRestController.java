package com.spring.micro;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
public class CustomerRestController {
	@Autowired
    private CustomerService customerService;

    @GetMapping("/api/customers")
    public Flux<Customer> getAllUsers() {
        return customerService.getAllCustomers();
    }

    @GetMapping("/api/customer/{id}")
    public  Mono<Customer> getUserById(@PathVariable String id) {
        return customerService.getCustomerById(id);
    }

    @PostMapping("/api/auth/signup")
    public  Mono<Customer> createUser(@RequestBody Customer customer) {
        return customerService.save(customer);
    }

    @PutMapping("/api/customer/{id}")
    public  Mono<Customer> updateUser(@PathVariable String id, @RequestBody Customer customer) {
        return customerService.updateCustomer(id, customer);
    }

    @DeleteMapping("/api/customer/{id}")
    public String deleteCustomer(@PathVariable String id) {
    	customerService.deleteCustomer(id);
        return "User deleted successfully with id: " + id;
    }
}
