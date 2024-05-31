package com.shoppingonline.be.model.entities;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "used_voucher")
@Setter
@Getter
@RequiredArgsConstructor
public class UsedVoucher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long userId;
    private long voucherId;
}
