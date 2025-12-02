// Cần Node.js + express
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors()); // cho phép mọi trình duyệt gọi proxy
app.use(express.json());

app.get("/vote", async (req, res) => {
    const cookie = req.headers.cookie || "";
    const url = "https://api.fchoice.vn/vote-token.htm" +
        "?callback=jQuery3510026807873160589635_1764507964293&m=set-vote&sign=27_82&award=27&member=82&typeId=1&_=1764507964296";

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "*/*",
                "Referer": "https://fchoice.vn/",
                "Cookie": cookie,
                "User-Agent": req.headers["user-agent"] || "Mozilla/5.0"
            }
        });
        const text = await response.text();
        res.send(text);
    } catch (err) {
        res.status(500).send("Proxy Error: " + err.message);
    }
});

app.listen(3000, () => console.log("Proxy chạy ở http://localhost:3000"));
