package com.spring.micro;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class CustomerService {

	@Autowired
    private CustomerRepository customerRepository;

    public Flux<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Mono<Customer> getCustomerById(String id) {
        return customerRepository.findById(id);
    }

    public Mono<Customer> save(Customer customer) {
        return customerRepository.save(customer);
    }

    public Mono<Customer> updateCustomer(String id, Customer customerDetails) {
    	customerDetails.setId(id);
    	Mono<Customer> updated = customerRepository.save(customerDetails);
    	if (updated == null) {
			throw new RuntimeException("Customer not found: " + id);
		}
		return updated;
    }

    public Mono<Void> deleteCustomer(String id) {
        return customerRepository.deleteById(id);
    }
}
