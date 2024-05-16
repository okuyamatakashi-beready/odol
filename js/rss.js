document.addEventListener("DOMContentLoaded", function() {
    const RSS_URL = 'https://note.com/odolkikaku/rss'; // NoteのRSSフィードURLを指定

    async function fetchRSS() {
        try {
            const CORS_PROXY = "https://api.allorigins.win/raw?url=";
            const response = await fetch(CORS_PROXY + encodeURIComponent(RSS_URL));
            const text = await response.text();
            console.log("RSS Feed Text:", text); // フィードの内容をコンソールに出力
            const parser = new DOMParser();
            const xml = parser.parseFromString(text, "text/xml");
            const items = xml.querySelectorAll("item");
            const container = document.getElementById('rss-feed-container');

            items.forEach((item, index) => {
                if (index >= 6) return; // 最新5件の記事を表示

                const title = item.querySelector("title").textContent;
                const link = item.querySelector("link").textContent;
                const pubDate = new Date(item.querySelector("pubDate").textContent).toLocaleDateString();
                const description = item.querySelector("description").textContent;

                // サムネイル画像の取得
                const thumbnailElement = item.getElementsByTagName("media:thumbnail")[0];
                let thumbnail = '';
                if (thumbnailElement) {
                    console.log('Thumbnail Element:', thumbnailElement); // デバッグ出力
                    thumbnail = thumbnailElement.getAttribute('url') || thumbnailElement.textContent;
                    console.log('Thumbnail URL:', thumbnail); // デバッグ出力
                } else {
                    console.log('Thumbnail Element not found');
                }

                const article = document.createElement('li');
                article.className = 'rss-article';

                article.innerHTML = `
                    
                    ${thumbnail ? `
                    <a href="${link}" target="_blank">
                    <div class="thumbnail" style="background-image: url(${thumbnail});"></div>` : ''}
                    <div class="note__inner">
                    <h3>${title}</h3>
                    <p>${pubDate}</p>
                    <img src="/images/common/blank.svg" alt="">
                    </div>
                    </a>
                `;
                container.appendChild(article);
            });
        } catch (error) {
            console.error('Error fetching RSS feed:', error);
        }
    }

    fetchRSS();
});


