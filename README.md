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

cargo test (this generates the typescript definitions for the rust types)

cd ./app && npm run dev

cd .. && cargo run

## run prod

cargo test (this generates the typescript definitions for the rust types)

cd ./app && npm run build

cd .. && cargo run --release

## TODO


- [ ] create a how-to for running both dev and prod
- [x] create actual react pages for each element
- [x] hook up router so I don't need to create separate entry points for each page
- [ ] allow combo submission
- [ ] add navigation menu to the side
- [ ] make it responsive
- [ ] Make combo view page prettier
    - [ ] Sidebox with metadata
    - [ ] combo notation above embedded youtube
    - [ ] centralized box with embedded youtube