# 引き継ぎメモ

新しいセッションで作業を再開するときは、このファイルを読めば経緯が分かります。

## これは何か

MBTI診断のような形式で20問に答えると、価値観に合いそうな企業をおすすめしてくれるReact Native(Expo)アプリ兼Webサイト。就活生向け。272社のデータベースからTOP5をマッチングし、企業ごとに「求める人物像」も表示する。

## 公開URL

- **本番（更新対象）**: https://mbti-company-diagnosis.vercel.app
- GitHub Pages版: https://suzushun-stack.github.io/mbti-company-diagnosis/ （**今後は更新不要とユーザーから指示済み**。放置でよい）

## リポジトリ

- パス: `/Users/shunya/cluade code/アプリ開発/company-match-app`
- GitHub: https://github.com/suzushun-stack/mbti-company-diagnosis （public）
- コミット時のgit identity: `user.name = suzushun-stack`, `user.email = 319943835+suzushun-stack@users.noreply.github.com`（本名やPC名がpublicリポジトリに漏れないよう、noreplyメールに設定済み。ローカルのrepo設定のみ、グローバル設定は変更していない）

## 技術構成

- Expo (React Native + TypeScript)。`App.tsx` が全画面のロジック・UIを持つ単一ファイル構成
- 画面遷移: `intro`(トップ) → `quiz`(20問) → `ad`(広告インタースティシャル、5秒カウントダウン) → `result`(タイプ診断+企業TOP5+アフィリエイトリンク)
- データ: `data/questions.ts`(20問・4軸)、`data/companies.ts`(272社)、`data/types.ts`(16タイプの性格診断文)、`data/affiliates.ts`(ASPリンク3枠)、`data/ads.ts`(広告バナー1枠)
- スコアリングロジック: `lib/scoring.ts`
- デザインテーマ: `theme.ts`（黄色×黒×白、Zen Kaku Gothic New フォント。mijikana.jp参考、直接コピーはしていない）
- Node.jsは `~/.local/nodejs/bin` にインストール済み（このMacにbrewでは入れられなかったため、公式バイナリを手動配置）。新しいターミナルでは`.zshrc`/`.bash_profile`のPATH設定で有効

## Webサイトのビルド・デプロイ方法（重要）

このアプリはExpoのWeb書き出し機能で静的サイト化し、Vercelにデプロイしている。**2つの罠があるので必ず以下の手順を守ること**:

1. **baseUrl**: `app.json`の`experiments.baseUrl`は、GitHub Pages用は`"/mbti-company-diagnosis"`、Vercel用は`""`（空文字）が必要。値が違うとアセットパスが壊れて真っ白画面になる。
2. **node_modulesフォルダ問題**: Expoの書き出しは `dist/assets/node_modules/...` にフォントファイルを配置するが、**Vercelは`node_modules`という名前のフォルダを自動的にデプロイから除外してしまう**。そのため書き出し後に必ず以下を行う:
   ```bash
   cd dist
   mv assets/node_modules assets/vendor
   sed -i '' 's/assets\/node_modules/assets\/vendor/g' _expo/static/js/web/*.js
   ```

### Vercelへのデプロイ手順（今後はこれだけでOK。GitHub Pagesは更新不要）

```bash
export PATH="$HOME/.local/nodejs/bin:$PATH"
cd "/Users/shunya/cluade code/アプリ開発/company-match-app"

# 1. baseUrlを空にする
sed -i '' 's#"baseUrl": "/mbti-company-diagnosis"#"baseUrl": ""#' app.json

# 2. 書き出し
rm -rf dist
npx expo export -p web

# 3. node_modules回避策
cd dist
mv assets/node_modules assets/vendor
sed -i '' 's/assets\/node_modules/assets\/vendor/g' _expo/static/js/web/*.js

# 4. プロジェクトリンク（誤って新規プロジェクトが作られるのを防ぐ）
mkdir -p .vercel
cat > .vercel/project.json << 'EOF'
{"projectId":"prj_bpXanPpUJhuQgtXLohPwoenlQe0x","orgId":"shukatsu1","projectName":"mbti-company-diagnosis"}
EOF

# 5. デプロイ（VERCEL_TOKENはユーザーが発行したもの。会話履歴に残っているが、切れていたら再発行を依頼する）
export VERCEL_TOKEN="（ユーザーのトークン）"
npx --yes vercel@latest deploy dist --prod --token="$VERCEL_TOKEN" --yes

# 6. app.jsonを元に戻す（gitにはGitHub Pages用の値でコミットする）
cd ..
sed -i '' 's#"baseUrl": ""#"baseUrl": "/mbti-company-diagnosis"#' app.json
```

Vercelプロジェクト名: `mbti-company-diagnosis`（チーム: `shukatsu1`、Vercelアカウント: `shukaryu1999-2692`）。

## 広告・アフィリエイト収益化の状況

- **A8.net**: 登録完了済み。「キミスカ」（早期内定スカウトサービス）の広告バナーを広告インタースティシャル画面（`ad`画面）に実装済み（`data/ads.ts`）
- **ASPアフィリエイトリンク**（結果画面下部「こんなサービスもチェック」）: `data/affiliates.ts` に3カテゴリ（自己分析ツール・SPI対策・就活エージェント）を用意しているが、**現在は`href: '#'`のプレースホルダーのまま**。ユーザーが個別案件の提携申請を進めており、承認されたトラッキングURLが届き次第、このファイルに反映してデプロイし直す必要がある
- Google AdSenseは未登録（今後登録するかは未定）

## 開発サーバーでの動作確認方法

```bash
export PATH="$HOME/.local/nodejs/bin:$PATH"
cd "/Users/shunya/cluade code/アプリ開発/company-match-app"
npx expo start --web --port 8081
```
ブラウザ確認にはPlaywright(`playwright-core`パッケージ、Chromeの実行ファイルを指定して使用)でスクリーンショット・console errorチェックを行っている。過去のテストスクリプトはスクラッチパッド配下（セッションごとに変わるため保存されていない）にあったので、必要なら都度書き直す。

## 今後のTODO候補

- A8.netの提携が承認され次第、`data/affiliates.ts`の`href`を実URLに更新してVercel再デプロイ
- Google AdSense登録の要否を検討
- デプロイ手順（上記5ステップ）のスクリプト化（`scripts/deploy-vercel.sh`のようなもの）※未着手
- モバイルアプリとしてのApp Store/Google Play公開は未着手（現状はExpo Go経由の実機確認のみ）
