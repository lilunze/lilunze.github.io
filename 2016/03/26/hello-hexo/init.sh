function start(){
    echo "start!";

    npm init;

    echo "========================================";

    npm install hexo --save-dev;

    echo "========================================";

    npx hexo init blog;

    echo "========================================";

    cd ./blog;
    npm install;

    echo "========================================";

    cd ..

    rm -rf node_modules;

    rm -rf package.json;

    rm -rf package-lock.json;

    rm -rf npm-debug.log;

    echo "========================================";

    echo "success!";

    cd ./blog;

    npm run-script server;

}

start;