<div style="text-align:center;">
  <img src="https://user-images.githubusercontent.com/4615775/51508153-4ffe6600-1db1-11e9-997a-b2d496effdbf.png" alt="Kapellmeister" style="width:450px;"/>
</div>

# Kapellmeister

[![Build Status](https://travis-ci.org/sghall/kapellmeister.svg?branch=master)](https://travis-ci.org/sghall/kapellmeister)
[![npm version](https://img.shields.io/npm/v/kapellmeister.svg)](https://www.npmjs.com/package/kapellmeister)
[![npm downloads](https://img.shields.io/npm/dm/kapellmeister.svg)](https://www.npmjs.com/package/kapellmeister)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](https://github.com/sghall/kapellmeister/blob/master/LICENSE)
![gzip size](http://img.badgesize.io/https://npmcdn.com/kapellmeister/dist/kapellmeister.min.js?compression=gzip)

Orchestration for animated transitions.  This is the code that powers react-move.

```
npm install kapellmeister
```

### Example Usage
```js
import { interpolateNumber } from 'd3-interpolate'
import { BaseNode } from 'kapellmeister'

class Node extends BaseNode {
  getInterpolator(attr, a, b) {
    return interpolateNumber(a, b)
  }
}

const data = {
  x: 0,
  y: 0
 }

const node = new Node(data)

node.transition({
  x: [1],
  y: [1]
})
```










Conductor Art by Arthur Shlain from the Noun Project
