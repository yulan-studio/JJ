# 从自己的 GitHub 部署到自己的 Cloudflare

这个仓库面向 Cloudflare Workers。主分支可以通过 Cloudflare Workers Builds 自动部署。

## 1. 上传 GitHub

新建一个私有仓库，在本目录设置远程仓库并推送。依赖、构建目录、缓存和本地密钥已被 .gitignore 排除。

## 2. 连接 Cloudflare

登录 Cloudflare Dashboard，进入 Workers & Pages → Create application → GitHub，授权 Cloudflare GitHub App 读取该私有仓库。

构建配置：

- Production branch: main
- Build command: pnpm build
- Deploy command: pnpm run deploy
- Root directory: /communication_portal

项目使用 wrangler.jsonc 中的无 ID 绑定。首次部署时，Wrangler 会在当前 Cloudflare 账户中自动配置 DB（D1）和 BUCKET（R2）。

## 3. 初始化数据库

首次部署后，在本地登录同一个 Cloudflare 账户并执行：

```powershell
pnpm wrangler login
pnpm wrangler d1 migrations apply DB --remote
```

随后重新部署一次，确认消息接口可以访问。

## 4. 配置 Cloudflare Access

在 Zero Trust → Access controls → Applications 中创建 Self-hosted application，把 Worker 的域名加入应用，并创建只允许你与 JJ 邮箱的 Allow 策略。

在 Worker 的变量或 Builds 环境变量中设置：

```text
CF_ACCESS_TEAM_DOMAIN=你的团队名.cloudflareaccess.com
CF_ACCESS_AUD=Access Application 的 AUD 标签
```

这两个变量不是密码，但必须与 Access 应用一致。服务端会验证 Cf-Access-Jwt-Assertion 的签名、签发者与 Audience，再使用 JWT 中的 sub 和 email 识别用户。

## 5. 日常更新

以后每次向主分支推送代码，Cloudflare Workers Builds 都会自动构建并部署。功能分支会生成 Preview，适合合并前检查。

## 安全事项

- 仓库保持 Private。
- 不要提交 .dev.vars、API Token 或任何密码。
- GitHub 仓库权限、Cloudflare 管理权限和网站访问权限彼此独立。
- D1 和 R2 位于你的 Cloudflare 账户中，聊天数据也由你的账户管理。
