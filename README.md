# news-2026-11-25

[![make.fun · news-image-20261125](https://make.fun/badge/news-image-20261125.svg)](https://make.fun/bounty/news-image-20261125?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)
[![rank](https://make.fun/badge/news-image-20261125/myvivlos/news-2026-11-25/rank.svg)](https://make.fun/bounty/news-image-20261125/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)
[![reward](https://make.fun/badge/news-image-20261125/myvivlos/news-2026-11-25/reward.svg)](https://make.fun/bounty/news-image-20261125?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)

One front page for Wednesday 25 November 2026: twelve numbered regional stories, each with its own
flat illustration and beat, a six-figure statistics ticker, region tabs, a world map whose pins
carry the same numbers as the sections, thirty further headlines from the same day, and a date-check
plate that names the day. `main.ts` hands the finished 1024x1024 page in as `entry.png`.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

The program copies `entry.png` from the repository root into the output directory after checking the
PNG signature, the image dimensions (at most 1024x1024) and the 1 MiB cap. It makes no network
request, needs no dependencies, and writes the same bytes on every run.

## Licence

MIT, see `LICENSE`.
