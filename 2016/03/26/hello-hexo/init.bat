@echo off
echo ============ Start ============
call npm init
call npm install hexo

echo ============================

call npx hexo init blog

echo ============================

cd blog

call npm install

echo ============ Success ============

echo =====Delete install dependences =======

cd ..
del package.json
del package-lock.json
rd/s/q node_modules

echo ======== Delete Success ===========

echo ======= Launch blog server ==========
cd blog 
call npm run-script server

