const URL = "https://api.fchoice.vn/vote-token.htm?callback=jQuery3510026807873160589635_1764507964293&m=set-vote&sign=27_82&award=27&member=82&typeId=1&_=1764507964296";

// Tạo UI hiển thị cookie và trạng thái
function createCookieBlocks(cookies) {
    const container = document.getElementById('cookieList');
    container.innerHTML = '';
    cookies.forEach((ck, i) => {
        const div = document.createElement('div');
        div.className = 'cookie-block';
        div.id = 'cookie-' + i;
        div.innerHTML = `<h4>Cookie ${i+1}: <span class="status pending"></span></h4><pre>${ck}</pre>`;
        container.appendChild(div);
    });
}

// Gửi request vote cho 1 cookie
async function voteWithCookie(cookie, index) {
    const statusEl = document.querySelector(`#cookie-${index} .status`);
    statusEl.className = 'status pending';
    
    try {
        const res = await fetch(URL, {
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'Referer': 'https://fchoice.vn/',
                'User-Agent': navigator.userAgent,
                'Cookie': cookie
            },
            credentials: 'include'
        });
        const text = await res.text();
        console.log(`Cookie ${index+1} response:`, text);
        
        if (text.includes('"Success":true') || text.includes("Bình chọn thành công")) {
            statusEl.className = 'status success';
        } else {
            statusEl.className = 'status failed';
        }
    } catch (err) {
        console.error(err);
        statusEl.className = 'status failed';
    }
}

// Main: gửi vote tuần tự cho từng cookie
async function startAutoVote() {
    const cookieText = document.getElementById('cookiesBox').value.trim();
    if (!cookieText) return alert('Nhập ít nhất 1 cookie');
    
    const cookies = cookieText.split('\n').map(c => c.trim()).filter(c => c);
    createCookieBlocks(cookies);

    for (let i = 0; i < cookies.length; i++) {
        await voteWithCookie(cookies[i], i);
        await new Promise(r => setTimeout(r, 1000)); // delay 1s giữa các cookie
    }

    alert('Đã hoàn tất gửi vote cho tất cả cookies');
}

// Gắn sự kiện nút
document.getElementById('startBtn').addEventListener('click', startAutoVote);
