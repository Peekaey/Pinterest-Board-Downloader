# Pinterest-Board-Downloader [WIP]

Used to download automate the process of downloading all images of a pinterest board in original/high quality.   
Currently a work in progress, however single board downloads are working




To install dependencies:

```bash
bun install
```

To run:   
Paste the full URL of the board in the boardURL variable in index.ts then
```bash
bun run Index.ts
```


#### TO DO
- Add More Tests
- Add Docker Support
- Add Ability for Scheduled Downloads (Cronjobs)
- Add Support for Incremental Backups ()
- Add Support For Multiple Boards Simultaneously or entering of username
- Make fallback quality
- If downloading multiple folders, split into multiple folders for each board

- Possibly look at mapping image URL to pin Ids for better download validation as well as being able to grab source file type
without using fallback quality


- Fix Getting Board URLS