# URL Shortener

Url shortening service

use `api/shorturl/new` to post (body) with `{original_url: <orginal_url>}`  and receive back json response \
`{original_url: <orginal_url>, short_url: <short_url>}`

the new url will be at `host/api/shorturl/:input` will be `input = <short_url>`