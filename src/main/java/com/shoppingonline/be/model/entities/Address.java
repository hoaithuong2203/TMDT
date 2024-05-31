package com.shoppingonline.be.model.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "address")
@Setter
@Getter
@RequiredArgsConstructor
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String deliveryAddress;
    private String billingAddress;
    @ManyToOne
    @JoinColumn(name = "users_id")
    private Users users;
}
