# Combo Repo

A work in progress web server + simple frontend for saving and searching combos for fighting games.


## Pages

### Home

Just a browse all combos view.

### Create a combo

Text field for combos, text field for metadata:
Character, position, damage, meter, video link

### Combo Page

Display the combo text and the meta data


## run dev
```
cargo test (this generates the typescript definitions for the rust types)
cd ./app && npm run dev
cd .. && cargo run
```

## run prod

```
cargo test (this generates the typescript definitions for the rust types)
cd ./app && npm run build
cd .. && cargo run --release
```

## TODO


- [ ] create a how-to for running both dev and prod
- [x] create actual react pages for each element
- [x] hook up router so I don't need to create separate entry points for each page
- [x] allow combo submission
    - [x] create a combo submission page
    - [x] create a combo submission end point
    - [x] hook frontend up to backend 
- [x] add navigation menu to the side
- [ ] make it responsive
- [ ] expanded combo data model
    - [ ] tags
        - [ ] positional tags
        - [ ] ch/non ch AA/non AA tags
    - [ ] rich combo syntax
        - [ ] separate object for each move
        - [ ] separate data vs rendered text
        - [ ] parsing for quick fill
    - [ ] metadata
        - [x] video link
        - [x] description
        - [ ] uploader
- [x] Make combo view page prettier
    - [x] Sidebox with metadata
    - [x] combo notation
    - [ ] centralized box with embedded youtube
- [ ] work on XSS issues
    - [ ] move window.{dataName} = JSON.parse lines into each react page
    - [ ] disable inline scripts
    - [ ] disable loading scripts from other domains
    - [ ] read this https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP