package com.spring.micro.repository;

/* Author: Wei Tong 301034450
 * COMP 303 - Enterprise App Development
 * Assign 3
 */

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import org.springframework.stereotype.Repository;

import com.spring.micro.entity.MenuItem;

import reactor.core.publisher.Flux;

@Repository
public interface MenuItemRepository  extends ReactiveMongoRepository< MenuItem, String> {

	   Flux<MenuItem> findByRestId(String restId);

}
