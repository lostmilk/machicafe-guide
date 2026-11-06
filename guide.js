(() => {
  "use strict";
  const config = window.EVENT_GUIDE_CONFIG || {};
  const link = document.getElementById("open-search");
  const closed = document.getElementById("closed");
  const status = document.getElementById("status-text");
  const note = document.getElementById("note");
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
    status.textContent = "イベント検索を公開しています";
    note.textContent = "検索サイトへ移動します。";
  } else {
    link.removeAttribute("href");
    status.textContent = "イベント検索は公開停止中です";
    note.textContent = "時間をおいて、もう一度お越しください。";
  }
})();
