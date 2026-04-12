package com.spring.micro.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

import com.spring.micro.entity.User;

import reactor.core.publisher.Mono;

@Repository
public interface UserRepository extends ReactiveMongoRepository<User, String> {

	// 自訂查詢方法：透過帳號尋找使用者，回傳 Mono<User>
	Mono<User> findByName(String rname);
	Mono<User> findByEmail(String email);
}
