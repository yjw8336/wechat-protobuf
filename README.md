# wechat-protobuf
一个在微信小程序里使用protobuf的demo
前端类库：protobuf.js，后端类库netty+google-protobuf。
今天下班后补全代码
---
proto编译脚本
```
  pbjs -t static-module   -o test.js test.proto --force-long
  pbts -o  test.d.ts test.js
```