package com.spring.micro.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

import com.spring.micro.entity.User;

import reactor.core.publisher.Mono;

@Repository
public interface UserRepository extends ReactiveMongoRepository<User, String> {

	// Custom query method: find user by account, returns Mono<User>
	Mono<User> findByName(String rname);
	Mono<User> findByEmail(String email);
}
