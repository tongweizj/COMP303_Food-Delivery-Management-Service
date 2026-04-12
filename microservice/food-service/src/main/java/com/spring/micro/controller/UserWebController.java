package com.spring.micro;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.thymeleaf.spring6.context.webflux.IReactiveDataDriverContextVariable;
import org.thymeleaf.spring6.context.webflux.ReactiveDataDriverContextVariable;

import reactor.core.publisher.Mono;

@Controller
public class CustomerWebController {
	@Autowired
    private CustomerService customerService;
	
	@GetMapping("/customers")
	public String customers(Model model) {
		// 使用 ReactiveDataDriver 模式处理用户列表
        IReactiveDataDriverContextVariable reactiveData = 
                new ReactiveDataDriverContextVariable(customerService.getAllCustomers(), 1);
        model.addAttribute("customers", reactiveData);

		return "customer/list"; 
	}
	
	@GetMapping("/customer/create")
	public String createCustomer(Model model) {
		model.addAttribute("customer", new Customer());

		return "customer/form";
	}
	
	@GetMapping("/customer/{id}/edit")
	public Mono<String> editCustomer(@PathVariable String id,Model model) {

		return customerService.getCustomerById(id)
                .doOnNext(c -> model.addAttribute("customer", c))
                .thenReturn("customer/form");
	}
	
	@GetMapping("/customer/{id}")
	public Mono<String> detailCustomer(@PathVariable String id, Model model) {

		return customerService.getCustomerById(id)
                .doOnNext(c -> model.addAttribute("customer", c))
                .thenReturn("customer/detail");
	}
	@PostMapping("/customer/save")
	public Mono<String> saveCustomer(@ModelAttribute("customer") Customer customer) {
	    // 强制处理：如果 ID 是空字符串（创建模式下 Thymeleaf 可能会传 ""），设为 null 以便 MongoDB 生成新 ID
	    if (customer.getId() != null && customer.getId().isEmpty()) {
	        customer.setId(null);
	    }
	    
	    return customerService.save(customer)
	            .thenReturn("redirect:/customers");
	}
	
	@GetMapping("/customer/delete/{id}")
	public Mono<String> deleteCustomer(@PathVariable String id) {
	    // 调用 service 执行删除逻辑
	    return customerService.deleteCustomer(id)
	            .doOnSuccess(v -> System.out.println("Customer deleted: " + id))
	            .then(Mono.just("redirect:/customers"));
	}
}
