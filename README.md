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
- Add More Error Handling (Collect Errored Pins and Retry)
- Add Docker Support
- Add Ability for Scheduled Downloads (Cronjobs)
- Add Support for Incremental Backups ()
- Add Support For Multiple Boards Simultaneously or entering of username

- Fix JPG / PNG File Type Identification (PNG as source - maybe fallback to jpg as 3x quality instead of 4x)