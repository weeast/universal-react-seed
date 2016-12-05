/**
 * user controller
 * @authors weeast (weeast.cd@gmail.com)
 * @date    2016-10-31 15:14:06
 */

import { getUser } from '../mock_api'

export function detail (req, res) {
	res.send(getUser(req.params.id))
}