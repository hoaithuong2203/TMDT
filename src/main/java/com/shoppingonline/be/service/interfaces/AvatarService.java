package com.shoppingonline.be.service.interfaces;

import com.shoppingonline.be.model.entities.Avatar;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface AvatarService {
    Optional<Avatar> getAvatar(long id);

    String getPathImage(long id);
}
