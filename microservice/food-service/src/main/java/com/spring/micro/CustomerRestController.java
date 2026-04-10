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
@RequestMapping("/api/customer")
public class CustomerRestController {
	@Autowired
    private CustomerService customerService;

    @GetMapping
    public Flux<Customer> getAllUsers() {
        return customerService.getAllCustomers();
    }

    @GetMapping("/{id}")
    public  Mono<Customer> getUserById(@PathVariable Long id) {
        return customerService.getCustomerById(id);
    }

    @PostMapping
    public  Mono<Customer> createUser(@RequestBody Customer customer) {
        return customerService.createCustomer(customer);
    }

    @PutMapping("/{id}")
    public  Mono<Customer> updateUser(@PathVariable Long id, @RequestBody Customer customer) {
        return customerService.updateCustomer(id, customer);
    }

    @DeleteMapping("/{id}")
    public String deleteCustomer(@PathVariable Long id) {
    	customerService.deleteCustomer(id);
        return "User deleted successfully with id: " + id;
    }
}
