import express from "express"

const app = express();

app.use(express.json());

// 포트 설정
app.listen(3000, function(){
    console.log("server opened port : 3000");
    console.log("http://localhost:3000/helloWorld");
});

// GET METHOD로 된 링크 설정
app.get('/helloWorld', function(requset, response){
    return response.send("hello world");
});

/*** user API 정의(시작)  ***/

// GET Method : 유저 조회
const users = [{name:"test1", email:"test1@naver.com"}];
app.get("/user", function(request, response){
    let data = {users};
    response.send(data);
});

// POST Method : 유저 추가
app.post("/user", function(request, response){
    users.push(request.body);
    let data = {success:true};
    response.send(data);
});

/*** user API 정의(끝)  ***/