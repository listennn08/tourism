pnpm build
cd dist
git add .
git commit -m 'deploy'
git push origin master:gh-pages