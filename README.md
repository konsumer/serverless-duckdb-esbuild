This is an example of duckdb inside lambda that uses esbuild. It has access to your S3, so you query parquet files in your own S3.

It uses an api-key (in `x-api-key` header) which it will output when you deploy/start.

```
# install tolls & dependencies
npm i

# run local server
npm start

# deploy on lambda
npm run deploy

# test lambda locally
curl 'http://localhost:3000/dev?c=1' -H 'x-api-key: YOUR API KEY'
```