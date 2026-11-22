import express from 'express';

const app = express();
const port = 3000;

// app.use : Express 애플리케이션에 미들웨어를 등록하는 함수
// express.static('public') : public 폴더의 파일을 브라우저에 제공하는 기능
app.use(express.static('public'));
// app.listen() = 서버 실행
app.listen(port, ()=>{console.log('서버가 실행되었습니다.');});

