import express from 'express';

const app = express();
const port = 3000;

// app.get() = 특정 주소로 들어오는 HTTP GET 요청을 처리하는 메서드
app.get('/', (req, res) => {res.send('Littl Home 서버 실행 성공');});
// app.listen() = 서버 실행
app.listen(port, ()=>{console.log('서버가 실행되었습니다.');});
