CREATE TABLE `reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `movie_id` int(11) NOT NULL,
  `movie_image` varchar(255) NOT NULL,
  `movie_title` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_avatar` varchar(255) NOT NULL,
  `is_audio` BIT NOT NULL,
  `text` varchar(255) DEFAULT NULL,
  `audio` varchar(255) DEFAULT NULL,
  `duration` int(4) NOT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `favorite_reviews` (
  `user_id` varchar(255) NOT NULL,
  `review_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`, `review_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `reviews` (`id`, `movie_id`, `movie_image`, `movie_title`, `user_id`, `user_name`, `user_avatar`, `is_audio`, `text`, `audio`, `duration`, `create_time`) VALUES
(1, 14, 'https://posters-1256869807.cos.ap-shanghai.myqcloud.com/p1910824340.jpg', '死亡诗社', 'another_fake_id', 'Ydna', 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoWXVpKatLHsqciclh7pNLzlaD0tjaDhynTYPiafBYoLvez4cXLIVmX0zpPuvdhlZ38b3Wq67AVpO3w/132', b'1', '', 'https://audio-reviews-1256869807-1256869807.cos.ap-shanghai.myqcloud.com/1531554042794-cHaGhW1j6.webm', 3, '2018-07-14 15:40:43'),
(2, 14, 'https://posters-1256869807.cos.ap-shanghai.myqcloud.com/p1910824340.jpg', '死亡诗社', 'fake_id', 'Andy', 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoWXVpKatLHsqciclh7pNLzlaD0tjaDhynTYPiafBYoLvez4cXLIVmX0zpPuvdhlZ38b3Wq67AVpO3w/132', b'0', 'O Captain! my Captain! our fearful trip is done, The ship has weather’d every rack, the prize we sought is won, The port is near, the bells', '', 0, '2018-07-14 15:42:54');