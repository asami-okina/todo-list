# ビルドステージ
FROM node:21-alpine AS builder

WORKDIR /app

# パッケージファイルをコピー
COPY package*.json ./
COPY yarn.lock ./

# 依存関係のインストール
RUN yarn install --frozen-lockfile

# ソースコードをコピー
COPY . .

# ビルド時はデータベースアクセスをスキップ
ENV NODE_ENV=production

# Prismaクライアントの生成とアプリケーションのビルド
RUN npx prisma generate
RUN yarn build

# 実行ステージ
FROM node:21-alpine AS runner

WORKDIR /app

# 必要なファイルのみをビルドステージからコピー
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# 実行時の環境変数を設定
ENV NODE_ENV=production
ENV DATABASE_URL="postgresql://todouser:todopassword@db:5432/todo_db?schema=public"

# Prismaクライアントを生成
RUN npx prisma generate

# アプリケーションの起動
EXPOSE 3000
CMD ["yarn", "start"]
