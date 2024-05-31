package com.shoppingonline.be.model.entities;

import com.shoppingonline.be.model.enums.EnumPaymentMethods;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "payment_methods")
@Setter
@Getter
@RequiredArgsConstructor
public class PaymentMethods {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Enumerated(EnumType.STRING)
    private EnumPaymentMethods paymentMethodName;
}
