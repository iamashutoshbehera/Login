package com.example.login.repository;

import com.example.login.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);

    // Optional: If you want to search by first name, last name, or full name
    Optional<User> findByFirstNameAndLastName(String firstName, String lastName);
}