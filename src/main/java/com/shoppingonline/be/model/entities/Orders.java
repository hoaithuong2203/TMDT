package com.shoppingonline.be.model.entities;

import com.shoppingonline.be.model.enums.StatusOrders;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "orders")
@Setter
@Getter
@RequiredArgsConstructor
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long productId;
    private Date orderDate;
    private int count;
    private double currentPrice;
    @ManyToOne
    private Transaction transaction;
}
