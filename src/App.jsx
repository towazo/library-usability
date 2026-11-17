import { useState } from "react";
import { BOOKS, BRANCHES } from "./data/books";

// 入力内容はこのページのメモリ上だけで扱い、外部へは送信しない。
const EMPTY_FORM = { userId: "", name: "", branch: "" };

function normalize(text) {
  return text.normalize("NFKC").toLowerCase().replace(/\s+/g, "");
}

function isValid(form) {
  return /^[0-9]{8}$/.test(form.userId) && form.name.trim() !== "" && BRANCHES.includes(form.branch);
}

export default function App() {
  // 検索
  const [keywordInput, setKeywordInput] = useState("");
  const [keyword, setKeyword] = useState("");
  // 選択中の本（1冊）
  const [selectedId, setSelectedId] = useState(null);
  // 申し込みフォーム
  const [form, setForm] = useState(EMPTY_FORM);
  const [errorCount, setErrorCount] = useState(0);
  const [completed, setCompleted] = useState(null);

  const q = normalize(keyword);
  const books = q ? BOOKS.filter((b) => normalize(b.title).includes(q)) : BOOKS;

  const onSearch = (e) => {
    e.preventDefault();
    setKeyword(keywordInput.trim());
  };

  const onResetSearch = () => {
    setKeywordInput("");
    setKeyword("");
  };

  const setField = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const book = BOOKS.find((b) => b.id === selectedId);
    if (!book || !isValid(form)) {
      setCompleted(null);
      setErrorCount((n) => n + 1);
      return;
    }
    setErrorCount(0);
    setCompleted({ title: book.title, branch: form.branch });
  };

  // 利用者番号・氏名・受取館・エラー・完了メッセージを初期化する（本の選択と検索条件は残す）
  const onClear = () => {
    setForm(EMPTY_FORM);
    setErrorCount(0);
    setCompleted(null);
  };

  return (
    <main className="page">
      <header className="page-head">
        <h1>まちの図書館</h1>
        <p>本を選んで、貸出を申し込めます。</p>
      </header>

      <section aria-labelledby="search-heading" className="section">
        <h2 id="search-heading">本を探す</h2>
        <form className="search" role="search" onSubmit={onSearch}>
          <label htmlFor="keyword">タイトル</label>
          <div className="search__row">
            <input
              id="keyword"
              type="search"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              autoComplete="off"
            />
            <button type="submit" className="btn btn-solid">
              検索する
            </button>
            <button type="button" className="btn btn-line" onClick={onResetSearch}>
              検索を解除
            </button>
          </div>
        </form>
      </section>

      <section aria-labelledby="list-heading" className="section">
        <h2 id="list-heading">本の一覧</h2>
        {books.length === 0 ? (
          <p className="empty" role="status">
            該当する本がありません
          </p>
        ) : (
          <ul className="books">
            {books.map((b) => (
              <li key={b.id} className="book">
                <div className="book__info">
                  <h3 id={`title-${b.id}`} className="book__title">
                    {b.title}
                  </h3>
                  <p className="book__author">{b.author}</p>
                  <p className="book__summary">{b.summary}</p>
                  <p className="book__loan">貸出期間：{b.loanPeriod}</p>
                </div>
                <button
                  type="button"
                  className="btn btn-line book__select"
                  aria-describedby={`title-${b.id}`}
                  onClick={() => setSelectedId(b.id)}
                >
                  この本を選ぶ
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="form-heading" className="section">
        <h2 id="form-heading">貸出申し込み</h2>
        <p className="note">入力には架空の情報を使用してください。</p>

        <form className="apply" noValidate onSubmit={onSubmit}>
          {errorCount > 0 && (
            <p className="error" role="alert" key={errorCount}>
              申し込み内容に誤りがあります
            </p>
          )}

          <div className="field">
            <label htmlFor="userId">利用者番号</label>
            <input
              id="userId"
              type="text"
              autoComplete="off"
              value={form.userId}
              onChange={(e) => setField("userId", e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="userName">氏名</label>
            <input
              id="userName"
              type="text"
              autoComplete="off"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
            />
          </div>

          <fieldset className="field">
            <legend>受取館</legend>
            <div className="radios">
              {BRANCHES.map((br) => (
                <label key={br} className="radio">
                  <input
                    type="radio"
                    name="branch"
                    value={br}
                    checked={form.branch === br}
                    onChange={() => setField("branch", br)}
                  />
                  {br}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="actions">
            <button type="button" className="btn btn-solid" onClick={onClear}>
              入力をクリア
            </button>
            <button type="submit" className="btn btn-line">
              申し込む
            </button>
          </div>
        </form>

        <div role="status">
          {completed && (
            <div className="done">
              <p className="done__title">申し込みを受け付けました</p>
              <dl>
                <div>
                  <dt>本</dt>
                  <dd>{completed.title}</dd>
                </div>
                <div>
                  <dt>受取館</dt>
                  <dd>{completed.branch}</dd>
                </div>
              </dl>
              <p className="done__note">デモのため、実際の貸出は行われません。</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
