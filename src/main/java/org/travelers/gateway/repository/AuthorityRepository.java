package org.travelers.gateway.repository;

import org.travelers.gateway.domain.Authority;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AuthorityRepository extends MongoRepository<Authority, String> {
}
