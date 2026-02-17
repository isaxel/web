package isaxel.service;


import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.util.Pair;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import isaxel.dto.CheckRequestDTO;
import isaxel.dto.ResultResponseDTO;
import isaxel.entity.CheckPoint;
import isaxel.entity.User;
import isaxel.exceptions.custom.CheckPointNotExists;
import isaxel.exceptions.custom.UserNotFound;
import isaxel.repository.CheckPointRepository;
import isaxel.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CheckService {
    private final CheckPointRepository checkPointRepository;
    private final UserRepository userRepository;

    @Transactional
    public ResultResponseDTO check(CheckRequestDTO request) {
        long startTime = System.nanoTime();
        boolean hit = checkHit(request.x(), request.y(), request.r());
        long endTime = System.nanoTime();
        double executionTime = (endTime - startTime) / 1e6;
        CheckPoint result = new CheckPoint();
        result.setX(request.x());
        result.setY(request.y());
        result.setR(request.r());
        result.setHit(hit);
        result.setExecutionTime(executionTime);
        result.setClientTimestamp(request.clientTimestamp());
        result.setClientTimeZone(request.clientTimezone());
        result.setUser(getCurrentUser());
        CheckPoint savedResult = checkPointRepository.save(result);
        return new ResultResponseDTO(savedResult);
    }

    private User getCurrentUser() {
        User user = userRepository.findByUsername(
                SecurityContextHolder.getContext().getAuthentication().getName());
        if(user == null) {
            throw new UserNotFound();
        }
        return user;
    }

    public Pair<Integer, List<ResultResponseDTO>> getResults(int page, int pageSize) {
        User currentUser = getCurrentUser();
        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.Direction.DESC, "clientTimestamp");
        Page<CheckPoint> results = checkPointRepository.findByUserId(
                currentUser.getId(),
                pageable);

        List<ResultResponseDTO> list = new ArrayList<>();
        for (CheckPoint result : results.toList()) {
            list.add(new ResultResponseDTO(result));
        }
        return Pair.of(results.getTotalPages(), list);
    }

    @Transactional
    public void deleteResult(Long id) {
        if(!checkPointRepository.existsById(id)) {
            throw new CheckPointNotExists();
        }
        checkPointRepository.deleteById(id);
    }

    private boolean checkHit(Double x, Double y, Double r) {
        if(x == 0) {
            return y >= -r && y <= r;
        }
        if(y == 0) {
            return x >= -r/2 && x <= r;
        }

        if (x >= 0 && y >= 0 && x * x + y * y <= r * r) {
            return true;
        }

        if (x <= 0 && y >= 0 && x >= -r/2 && y <= r) {
            return true;
        }

        if (x >= 0 && y <= 0 && y >= x - r) {
            return true;
        }
        return false;
    }
}
