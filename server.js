import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/vote", async (req, res) => {
    const { cookie, award, member, typeId, sign } = req.body;

    try {
        const url = `https://api.fchoice.vn/vote-token.htm?m=set-vote&sign=${sign}&award=${award}&member=${member}&typeId=${typeId}&g-recaptcha-response=`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Host": "api.fchoice.vn",
                "Accept": "*/*",
                "Cookie": cookie,
                "Sec-Fetch-Site": "same-site",
                "Referer": "https://fchoice.vn/",
                "Sec-Fetch-Dest": "script",
                "Sec-Fetch-Mode": "no-cors",
                "Accept-Language": "vi-VN,vi;q=0.9",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive",
                "Priority": "u=1, i",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131 Safari/537.36"
            }
        });

        res.json({ status: response.status == 200 ? "OK" : "FAIL" });

    } catch (err) {
        res.json({ status: "ERROR", message: err.toString() });
    }
});

app.listen(3000, () => console.log("Server chạy tại port 3000"));
