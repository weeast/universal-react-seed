/**
 * questions controller
 * @authors weeast (weeast.cd@gmail.com)
 * @date    2016-10-31 15:14:06
 */

import { questions, getQuestion } from '../mock_api'

export function list (req, res) {
	res.send(questions)
}

export function detail (req, res) {
	res.send(getQuestion(req.params.id))
}