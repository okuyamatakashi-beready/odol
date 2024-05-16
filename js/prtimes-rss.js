document.addEventListener("DOMContentLoaded", function() {
    const RSS_URL = 'https://prtimes.jp/companyrdf.php?company_id=124292'; // PR TIMESのRSSフィードURL

    async function fetchRSS() {
        try {
            const CORS_PROXY = "https://api.allorigins.win/raw?url=";
            const response = await fetch(CORS_PROXY + encodeURIComponent(RSS_URL));
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const text = await response.text();
            console.log("RSS Feed Text:", text); // フィードの内容をコンソールに出力

            const parser = new DOMParser();
            const xml = parser.parseFromString(text, "application/xml");
            const items = xml.querySelectorAll("item");
            console.log("Parsed Items:", items); // 解析されたアイテムをコンソールに出力

            const container = document.getElementById('prtimes-rss');
            items.forEach((item, index) => {
                if (index >= 5) return; // 最新5件の記事を表示

                const titleElement = item.querySelector("title");
                const linkElement = item.querySelector("link");
                const descriptionElement = item.querySelector("description");
                const dateElement = item.querySelector("dc\\:date") || item.querySelector("date");

                const title = titleElement ? titleElement.textContent : 'No title';
                const link = linkElement ? linkElement.textContent : '#';
                const pubDate = dateElement ? new Date(dateElement.textContent).toLocaleDateString() : 'No date';
                const description = descriptionElement ? descriptionElement.textContent : 'No description';

                const article = document.createElement('li');
                article.className = 'rss-article';

                article.innerHTML = `
                    <a href="${link}" target="_blank" class="flex">
                        <p>${pubDate}</p>
                        <h3>${title}</h3>
                        
                        
                    </a>
                    <img src="/images/common/blank_white.svg" alt="">
                `;
                container.appendChild(article);
            });
        } catch (error) {
            console.error('Error fetching or parsing RSS feed:', error);
        }
    }

    fetchRSS();
});