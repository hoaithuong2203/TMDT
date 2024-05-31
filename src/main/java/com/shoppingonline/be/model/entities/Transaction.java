package com.shoppingonline.be.model.entities;

import com.shoppingonline.be.model.enums.StatusOrders;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "transaction")
@Setter
@Getter
@RequiredArgsConstructor
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private StatusOrders status;
    private long userId;
    private long addressId;
    private long voucherId;
    @OneToOne
    private Payments payments;
    @OneToMany (mappedBy = "transaction")
    private List<Orders> ordersList = new ArrayList<>();
}
