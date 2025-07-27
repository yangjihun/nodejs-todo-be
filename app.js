const express = require("express");
const mongoose = require("mongoose");
const app = express();
const indexRouter = require("./routes/index");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", indexRouter);
const mongoURI = process.env.MONGODB_URI_PROD;

mongoose
    .connect(mongoURI, {useNewUrlParser:true})
    .then(() => {
        console.log('mongoose connected')
    })
    .catch((err) => {
        console.log('DB connection fail', err)
    });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("server on");
});

// 1. 회원가입
// 유저가 이메일, 패스워드, 유저이름 입력해서 보냄
// 받은 정보를 저장함 (데이터베이스 모델필요)
// 패스워드를 암호화 시켜서 저장

// 1. 라우터
// 2. 모델
// 3. 데이터를 저장 (이미 가입된 유저 유무, 패스워드 암호화)
// 4. 응답을 보낸다

// 2. 로그인
// 이메일 패스워드를 입력해서 보냄
// 데이터베이스에 해당 이메일과 패스워드를 가진 유저가 있는지 확인
// 없으면 로그인 실패
// 있으면 유저정보 + 토큰