# Picture Frame Script

## Requirements

- PHP (for image finding script)
- Some web server
- A browser with fullscreen mode (I use Google Chrome in the `start.sh` script, but you can use anything)
- *(Optional)* wmctrl - this is Linux-specific and only necessary if you want to use the `start.sh` script.

## Setup

- `git submodule update --init --recursive`
- Put the images you want to show in the `images/` folder
- `php imgs.php` to generate JSON list of image files. If your images can change (e.g. you sync with Dropbox), rerun this every once in a while to update the images.
- If you have Google Chrome and wmctrl, run `start.sh`. Otherwise, just point your browser at `index.html` and fullscreen it.
