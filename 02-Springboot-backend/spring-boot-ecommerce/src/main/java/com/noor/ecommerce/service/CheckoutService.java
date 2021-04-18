package com.noor.ecommerce.service;

import com.noor.ecommerce.dto.Purchase;
import com.noor.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
