(() => {
  "use strict";
  const config = window.EVENT_GUIDE_CONFIG || {};
  const link = document.getElementById("open-search");
  const closed = document.getElementById("closed");
  const status = document.getElementById("status-text");
  const note = document.getElementById("note");
  const updated = document.getElementById("link-updated-at");
  const timestamp = new Date(config.linkUpdatedAt);
  if (config.linkUpdatedAt && !Number.isNaN(timestamp.getTime())) {
    updated.dateTime = timestamp.toISOString();
    updated.textContent = new Intl.DateTimeFormat('ja-JP', {
      timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    }).format(timestamp);
  }
  let url = null;
  try {
    const candidate = new URL(config.publicUrl);
    if (candidate.protocol === "https:" && !candidate.username && !candidate.password) url = candidate;
  } catch (_) {
    // 未設定や不正なURLの場合は、公開停止中の案内を表示します。
  }
  const online = config.published === true && url !== null;
  document.querySelector(".entry").classList.toggle("is-online", online);
  link.hidden = !online;
  closed.hidden = online;
  if (online) {
    link.href = url.href;
    status.textContent = "イベント検索ページは公開中です";
    note.textContent = "検索サイトへ移動します。";
  } else {
    link.removeAttribute("href");
    status.textContent = "イベント検索ページは公開停止中です";
    note.textContent = "時間をおいて、もう一度お越しください。";
  }
})();
