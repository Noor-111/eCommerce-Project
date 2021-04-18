package com.noor.ecommerce.dto;

import com.noor.ecommerce.entity.Address;
import com.noor.ecommerce.entity.Customer;
import com.noor.ecommerce.entity.Order;
import com.noor.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}
