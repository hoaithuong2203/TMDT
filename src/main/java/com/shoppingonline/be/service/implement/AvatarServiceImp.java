package com.shoppingonline.be.service.implement;

import com.shoppingonline.be.model.entities.Avatar;
import com.shoppingonline.be.repository.AvatarRepository;
import com.shoppingonline.be.service.interfaces.AvatarService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AvatarServiceImp implements AvatarService {

    @Value("${media.img_path}")
    private String imgPath;
    private final AvatarRepository repository;

    @Override
    public Optional<Avatar> getAvatar(long id) {
        return repository.findById(id);
    }

    @Override
    public String getPathImage(long id) {
        Avatar avatar = repository.findById(id).get();
        String path = "";
        if (avatar != null) {
            path = imgPath.concat(File.separator).concat(avatar.getName());
        }
        return path;
    }
}
