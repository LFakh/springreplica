package com.example.amazonreplica.dto;

import com.example.amazonreplica.model.Order;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateOrderStatusRequest {
    @NotNull
    private Order.OrderStatus status;
}