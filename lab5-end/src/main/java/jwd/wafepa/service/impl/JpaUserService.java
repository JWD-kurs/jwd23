package jwd.wafepa.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import jwd.wafepa.model.User;
import jwd.wafepa.repository.UserRepository;
import jwd.wafepa.service.UserService;

@Service
public class JpaUserService implements UserService {
	@Autowired
	private UserRepository userRepository;

	@Override
	public User findOne(Long id) {
		return userRepository.findOne(id);
	}

	@Override
	public Page<User> findAll(int pageNum) {
		return userRepository.findAll(new PageRequest(pageNum, 10));
	}

	@Override
	public User save(User user) {
		return userRepository.save(user);
	}

	@Override
	public void delete(Long id) {
		userRepository.delete(id);
	}

}
