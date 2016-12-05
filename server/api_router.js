/**
 * api routes
 * @authors weeast (weeast.cd@gmail.com)
 * @date    2016-10-31 14:45:53
 */

import Express from 'express';

import * as questionController from './controllers/questions'
import * as userController from './controllers/users'

let router = Express.Router();

// 问题列表
router.get('/questions', questionController.list);

router.get('/questions/:id', questionController.detail);

// 用户
router.get('/users/:id', userController.detail);

export default router;