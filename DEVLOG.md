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

## 2026-07-24

### Done

* GitHub IssueのHTMLをMarkdown構造へ変換する処理を改善
* 見出し、番号付きリスト、箇条書き、テーブル、`details`要素などの変換に対応
* GitHub Issueの内容をAIへ渡すためのMarkdown形式への変換を確認
* 複数のAIに同じIssueを渡して分析結果を比較
* AIへ渡すIssue形式について、現時点の懸念点を整理
* `CLOSING_WORKFLOW.md`を作成し、開発終了時の締め作業を定義

### Learned

* GitHub IssueのHTML構造はページによって異なる
* HTMLを単純なテキストへ変換するより、Markdown構造を保持した方がAIに渡しやすい
* Issueの変換処理とAI分析処理を分けてテストすると問題を切り分けやすい
* 複数のAIに同じIssueを渡して分析結果を比較することで、変換形式の品質を確認できる
* 開発終了時の作業を定義ファイル化すると、締め作業の漏れを防ぎやすい

### Next

* GitHub Issue以外のページでも変換処理を確認
* AI向けプロンプトの改善
* GitPromptAssistantのMVP完成に向けた機能整理

## 2026-07-27

### Done

* GitHub IssueをAIへ渡しやすいMarkdown形式へ変換する機能を確認
* 見出し、段落、箇条書き、番号付きリスト、テーブルの変換を確認
* コードブロックをMarkdownコードブロックとして保持するよう改善
* 変換後のIssueをGeminiで分析し、AIへ渡す形式として問題ないことを確認
* GitPromptAssistantのREADME.mdを新規作成
* GitPromptAssistantの概要をREADMEに追加
* GitPromptAssistantの機能をREADMEに整理
* GitPromptAssistantの使い方をREADMEに追加
* MVPの完成条件を整理
* 明日の作業として変換機能の最終確認、スクリーンショットまたはGIFの追加、GitHubリポジトリの整理を決定

### Learned

* AIにIssueを渡す場合、元のMarkdown構造を維持することが重要
* コードブロックは通常のテキストではなく、Markdownコードブロックとして保持する必要がある
* READMEにはプロジェクトの概要、機能、使い方を記載すると利用者が理解しやすい
* READMEは現在実装されている機能を中心に記載し、将来の計画とは分けて考える
* MVPではすべての機能に対応するのではなく、目的を達成するために必要な範囲を完成条件とすることが重要

### Next

* GitHub Issueの変換機能を最終確認する
* 必要に応じてスクリーンショットまたはGIFをREADMEに追加する
* GitHubリポジトリを最終整理する
* GitPromptAssistantのMVP完成を判断する

## 2026-08-10

### Done

* GitHub IssueのコメントをCopy for AIの出力に含める機能を実装
* コメント本文をIssue本文と同じMarkdown変換処理(`convertHtmlToMarkdown`)で再利用するよう実装
* コメント投稿者を`data-testid="github-avatar"`のalt属性から`@username`形式で特定する処理を実装
* コメントが非同期で読み込まれるため、ボタンクリック時にプロンプトを生成するよう`createCopyButton`を変更
* jsdomを用いた一時検証スクリプトでコメント抽出とMarkdown出力を確認
* 実ブラウザでコメント付きIssueページの動作を確認し、投稿者・本文・既存出力(URL/Title/Description)が維持されることを確認
* 変更を`content.js`のみに限定してコミット・push

### Learned

* GitHubの新しいIssue UIはReactベースで、コメントは初期HTMLに含まれず非同期に読み込まれる
* ボタン生成時にプロンプト文字列を固定すると、非同期ロードされる要素(コメント)が欠落したままコピーされる場合がある
* `data-testid`属性やアバターの`alt="@username"`など、GitHubの安定した属性を軸にDOM取得ロジックを組むと、CSSクラス名の変更に影響されにくい
* ブラウザを直接操作できない場合でも、jsdomで想定DOMを模擬することで変換ロジックの単体検証ができる

### Next

* Chrome Web Storeへのv0.2公開作業
* 公開後の利用状況・フィードバックを確認
* Bot投稿やTimelineイベントへの対応は、必要性が確認できた場合に将来候補として検討
* Custom prompt templatesなどの追加機能は、v0.2公開後の将来候補として検討

## 2026-08-13

### Done

* Claude Codeの承認ルールVersion 1を実タスクで検証
* 小規模リファクタリングとして不要な`console.log`を削除
* `node --check` / `git diff` / `git status`などのAllowルールが承認なしで機能することを確認
* `git commit` / `git push`がAskルールで確認されることを確認
* BLOCKQUOTEがMarkdown変換から欠落する不具合を発見・修正
* jsdomによる軽量検証を実施
* 実際のGitHub Issueで引用、ネスト引用、引用内コードがCopy for AIに保持されることを確認
* リファクタリングとBLOCKQUOTE修正をcommit・push済み
* Claude Codeで機能追加・リファクタリング・バグ修正の3種類の実タスクを完了

### Learned

* 承認ルールVersion 1は、実際の開発タスク(機能追加・リファクタリング・バグ修正)を通しても想定どおり機能した
* 軽量な自動検証(`node --check`、jsdomによる単体検証など)を基本とし、ブラウザ依存の挙動など必要な箇所のみ人間による実ブラウザ確認に絞る運用は、Claude Codeとの協働において有効だった

### Next

* Claude Code検証フェーズを終了できるか最終判断する
* 問題なければClaude Codeを検証用途から実運用へ移行する

