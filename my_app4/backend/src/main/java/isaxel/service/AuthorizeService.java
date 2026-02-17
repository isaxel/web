package isaxel.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import isaxel.entity.User;
import isaxel.exceptions.custom.UserAlreadyExists;
import isaxel.exceptions.custom.AuthorizeWrongCredentials;
import isaxel.repository.UserRepository;
import isaxel.utils.TokenManager;

@Service
@RequiredArgsConstructor
public class AuthorizeService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenManager tokenManager;

    @Transactional
    public void register(String username, String password) {
        if(userRepository.findByUsername(username) != null) {
            throw new UserAlreadyExists();
        }
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
    }

    public String login(String username, String password) {
        User user = userRepository.findByUsername(username);
        if(user == null || !passwordEncoder.matches(password, user.getPassword())) {
            throw new AuthorizeWrongCredentials();
        }
        return tokenManager.generateToken(username);
    }
}
