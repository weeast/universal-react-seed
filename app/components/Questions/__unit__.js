/**
 * 测试
 * @authors weeast (weeast.cd@gmail.com)
 * @date    2016-11-01 16:51:39
 */
import React from 'react'
import ReactDom from 'react-dom'

import Component from './index'

require('STYLE/layout.less');

ReactDom.render(
    <Component questions={[]} />,
    document.getElementById('container')
);
