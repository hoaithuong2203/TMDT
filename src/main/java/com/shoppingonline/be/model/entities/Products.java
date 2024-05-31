package com.shoppingonline.be.model.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.*;

@Entity
@Table(name = "products")
@Setter
@Getter
@RequiredArgsConstructor
public class Products {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String productName;
    private String description;
    private double price;
    private Date createBy;
    private boolean deleted;
    private int status;
    private int view;
    private int sales;
    @ManyToOne
    private Categories categories;
    @OneToMany(mappedBy = "products")
    private List<Media> mediaList = new ArrayList<>();
}
