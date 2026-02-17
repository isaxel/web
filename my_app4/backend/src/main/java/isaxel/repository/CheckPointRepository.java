package isaxel.repository;

import isaxel.entity.CheckPoint;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CheckPointRepository extends JpaRepository<CheckPoint, Long> {
    Page<CheckPoint> findByUserId(Long userId, Pageable pageable);
}
