# 企業診断アプリ (company-match-app)

MBTI診断のような形式で12個の質問に答えると、価値観に合いそうな企業をおすすめするReact Native(Expo)アプリ。新卒・就活生向け、業界横断で30社を収録。

## 使い方

```bash
npm install
npm run web      # ブラウザで確認
npm run ios      # iOSシミュレータ (要Xcode)
npm run android  # Androidエミュレータ (要Android Studio)
npm start        # Expo Goアプリでスマホ実機確認 (QRコード表示)
```

Node.jsは `~/.local/nodejs/bin` にインストール済み（PATHは `.zshrc` / `.bash_profile` に追加済み。新しいターミナルを開くか `source ~/.zshrc` で反映されます）。

## 仕組み

- `data/questions.ts`: 質問12問。4つの軸（安定⇔挑戦、チーム⇔個人、大手⇔スタートアップ、モノづくり⇔対人）を各3問で計測
- `data/companies.ts`: 企業30社のデータ。同じ4軸でスコア付け
- `lib/scoring.ts`: 回答から4軸のスコアを算出し、企業データとの距離が近い順にTOP3をマッチング
- `App.tsx`: イントロ→質問→結果の3画面構成

## 今後の拡張候補

- 企業データを増やす、または特定業界に絞る
- 診断結果のシェア機能
- 質問数や軸の調整
