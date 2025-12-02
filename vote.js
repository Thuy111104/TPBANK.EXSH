document.getElementById("startBtn").onclick = async () => {
    const cookies = document.getElementById("cookiesBox").value.trim().split("\n");
    document.getElementById("result").innerHTML = "=== Bắt đầu Auto Vote ===<br>";

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (!cookie) continue;

        const res = await fetch("https://YOUR-SERVER.com/vote", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                cookie: cookie,
                award: 27,
                member: 82,
                typeId: 1,
                sign: "27_82"
            })
        });

        const json = await res.json();
        document.getElementById("result").innerHTML +=
            `[COOKIE ${i + 1}] → ${json.status}<br>`;
    }
};
