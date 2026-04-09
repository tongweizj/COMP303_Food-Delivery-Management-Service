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

    public Mono<Customer> getCustomerById(Long id) {
        return customerRepository.findById(id);
    }

    public Mono<Customer> createCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public Mono<Customer> updateCustomer(Long id, Customer customerDetails) {
    	customerDetails.setId(id);
    	Mono<Customer> updated = customerRepository.save(customerDetails);
    	if (updated == null) {
			throw new RuntimeException("Customer not found: " + id);
		}
		return updated;
    }

    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }
}
