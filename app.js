const express = require("express");
const app = express();
const PORT = 3018;

const postsRouter = require("./routes/posts.route");

app.use(express.json());
app.use('/api', postsRouter);

app.listen(PORT, () => {
  console.log(PORT, '포트 번호로 서버가 실행되었습니다.');
})


