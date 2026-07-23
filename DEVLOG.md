# 2026-07-21

## Sprint3: GitPromptAssistant

### Done

- GitPromptAssistantの開発を開始
- Chrome拡張の基本構成を作成
- GitHub Issueページからタイトルを取得
- GitHub Issueページから本文を取得
- Issue内容をAI向けのテキストに整形
- `Copy for AI`ボタンを追加
- ボタンクリックを検知
- クリップボードへのコピーを実装
- コピー成功時に`Copied!`と表示する機能を実装
- `MutationObserver`で動的なDOMの読み込みに対応
- GitHub風のボタンデザインを実装
- Gitリポジトリを初期化
- 最初の機能をコミット

### Learned

- `querySelector()`でWebページ内の要素を取得できる
- `createElement()`で新しいHTML要素を作成できる
- `addEventListener()`でクリックイベントを処理できる
- `MutationObserver`でDOMの変更を監視できる
- `navigator.clipboard.writeText()`でテキストをクリップボードへコピーできる
- Chrome拡張の`content.js`からWebページのDOMを操作できる
- GitHubのような動的なWebページでは、固定時間待機よりDOMの変化を監視する方が適している

### Next

- GitHubのページ遷移時にボタンが消える問題を確認・改善
- Issue内容をよりAIに渡しやすいプロンプトへ改善
- UIをさらに調整
- GitPromptAssistantのMVPを完成させる

# DEVLOG

## 2026-07-22

### Done

* `manifest.json`の`matches`を`https://github.com/*/issues/*`から`https://github.com/*`へ変更
* GitHub内のページ遷移後もGitPromptAssistantが動作するよう改善
* MicrosoftのページからGitHubへ移動し、Issueを開いた場合でも動作することを確認
* Issueページを直接リロードしなくても`Copy for AI`ボタンが表示されることを確認
* Issue内容のコピーが正常に動作することを確認

### Learned

* GitHubはSPAとして動作しているため、GitHub内のページ遷移ではページ全体がリロードされない場合がある
* `content_scripts`の`matches`をIssueページだけに限定すると、GitHub内のページ遷移後に`content.js`が実行されない場合がある
* GitHub全体に`content.js`を注入し、`MutationObserver`でDOMの変化を監視することで、Issueページへの遷移に対応できる
* `run_at: "document_idle"`はcontent scriptの実行タイミングを指定する設定であり、SPA遷移そのものへの対応とは別の問題である

### Next

* Issue間を移動した際に、ボタンが正しく更新されるか確認
* ボタンの重複表示が発生しないか確認
* Issue以外のGitHubページで不要な処理を抑制する
* `content.js`の処理を整理する

## 2026-07-23

### Done

* Issueページ以外ではIssue処理を実行しないよう整理
* Issue間を移動しても、対象Issueの情報を正しく取得できることを確認
* Issueのタイトルと本文を`issue`オブジェクトにまとめた
* プロンプト生成処理を`createPrompt()`に分離
* コピー用ボタン生成処理を`createCopyButton()`に分離
* リファクタリング後もIssue情報のコピーが正常に動作することを確認
* Issue間を移動してもボタンが重複しないことを確認

### Learned

* JavaScriptでは、関数の外で`return`を使用すると`Illegal return statement`になる
* SPAでは、content scriptをGitHub全体に読み込んだうえで、処理対象のページかどうかを関数内で判定する必要がある
* 取得した複数の関連データはオブジェクトにまとめることで、後続処理に渡しやすくなる
* リファクタリングでは、処理を関数ごとに分けても動作確認を行うことが重要

### Next

* Issue情報の取得処理をさらに整理する
* 必要に応じてIssueのコメント取得を検討する
* AI向けプロンプトの内容を改善する
