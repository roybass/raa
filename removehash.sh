mv build/static/js/main.*.js build/static/js/main.js
mv build/static/js/main.*.js.map build/static/js/main.js.map
mv build/static/css/main.*.css build/static/css/main.css
mv build/static/css/main.*.css.map build/static/css/main.css.map

head -n 1 build/static/js/main.js > tmp.tmp && mv tmp.tmp build/static/js/main.js
echo "
//# sourceMappingURL=main.js.map" >> build/static/js/main.js
