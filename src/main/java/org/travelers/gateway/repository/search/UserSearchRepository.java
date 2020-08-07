package org.travelers.gateway.repository.search;

import org.travelers.gateway.domain.User;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


public interface UserSearchRepository extends ElasticsearchRepository<User, String> {
}
