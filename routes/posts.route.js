const express = require("express");
const { Posts } = require("../models");
const router = express.Router();

// 게시글 생성
router.post("/posts", async (req, res) => {

    const { id, title, content } = req.body;

    const post = await Posts.create({
        id: id,
        title,
        content,
    });

    return res.status(201).json({ data: post });
});


// 게시글 전체 조회
router.get("/posts", async (req, res) => {
    const posts = await Posts.findAll({
        attributes: ["id", "title", "content"]
    });

    return res.status(200).json({ data: posts });
});

// 게시글 수정
router.put("/posts/:id", async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    
    try {
        // 게시물을 찾고 수정
        const updatedPost = await Posts.update(
            { title, content },
            { where: { id: id } }
        );

        if (updatedPost[0] === 1) {
            res.status(200).json({ message: "게시물 수정 완료." });
        } else {
            res.status(404).json({ error: "찾는 게시물 없음." });
        }
    } catch (error) {
        res.status(500).json({ error: "게시물 수정 중 오류 발생" });
    }
});

router.delete("/posts/:id", async (req, res) => {
    const { id } = req.params;
    
    try {
        // 게시물을 찾고 삭제
        const deletedPostCount = await Posts.destroy({
            where: { id: id }
        });

        if (deletedPostCount === 1) {
            res.status(200).json({ message: "success" });
        } else {
            res.status(404).json({ error: "찾는 게시물 없음" });
        }
    } catch (error) {
        res.status(500).json({ error: "게시물 삭제 중 오류가 발생" });
    }
});




module.exports = router;