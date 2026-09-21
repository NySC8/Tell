TELL — GitHub Pages version

This version is deliberately plain HTML/CSS/JS.
No npm, Node.js, React or build step is required.

Upload index.html and 404.html to the root of the GitHub repository.
Then enable GitHub Pages from Settings > Pages > Deploy from branch > main > /(root).

The 404.html file makes unknown routes render the player, so Telegram links such as:
https://USERNAME.github.io/Tell/watch/abc123
can still open the player on GitHub Pages.

Replace DEMO_VIDEO inside index.html with your own HTTPS MP4 URL when ready.
