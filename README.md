<h1 align="center">KawAnime</h1>

<p align="center">
  <a href="http://forthebadge.com/" target="_blank">
    <img src="http://forthebadge.com/images/badges/built-with-love.svg"/>
  </a>
</p>

<p align="center">
  <a href="https://standardjs.com/" target="_blank">
    <img src="https://cdn.rawgit.com/feross/standard/master/badge.svg" />
  </a>
</p>

<p align="center">
  <a href="https://travis-ci.org/Kylart/KawAnime" target="_blank">
    <img src="https://travis-ci.org/Kylart/KawAnime.svg?branch=master" alt="Build Status">
  </a>
  <a href="https://codecov.io/gh/Kylart/KawAnime" target="_blank">
    <img src="https://codecov.io/gh/Kylart/KawAnime/branch/master/graph/badge.svg" alt="Codecov" />
  </a>
  <a href="https://opensource.org/licenses/MIT" target="_blank">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License">
  </a>
  <a href="https://discord.gg/sdArN2Z" target="_blank">
    <img src="https://img.shields.io/badge/chat-on%20discord-7289da.svg" alt="Chat">
  </a>
</p>

<p align="center"><img src="https://i.imgur.com/TQAyUlD.png"/></p>

# Features
Disclaimer : This is a software for otaku/anime-fans. Do not try if you're not prepared.

This software allows one to:
* Be aware of the latest anime release.
* Download an anime (from ep X to ep Y) via Torrent (one would need a torrent client atm). One can also only get a
list of torrent magnets to paste in a torrent client on a distant server.
* Get information from any anime (those come from myanimelist.net).
* Get anime-related news from MyAnimeList.net.
* Get seasonal releases information MyAnimeList.net.
* Manage your anime files (watch and delete on click)
* Manage watch lists.
* More features are to come.

## About OS
_KawAnime_ is completely cross-platform.

Yet, if you find any problem, you can tell me anytime in the `issues` section.

## Installation
Be sure that you have Npm installed. You can find how to install npm (node) [here](https://nodejs.org/en/).
```
git clone https://github.com/Kylart/KawAnime
```
```
cd KawAnime/
```
```
npm install
```

## Start
```
npm run build && npm start
```
Or
```
npm run bstart
```

## Run in dev

##### Start all app
```
npm run dev
```

##### Lint
```
npm run lint
```

#### Testing
##### Server
```
npm run test:server
```

##### Front
```
npm run test:front
```

##### Full tests
```
npm run test
```

##### To know the number of line of code
```
npm run cloc
```

## Generating distributable apps
This feature uses [electron-builder](https://github.com/electron-userland/electron-builder).

You can find help to use it on your platform
[here](https://github.com/electron-userland/electron-builder/wiki/Multi-Platform-Build).

#### For every OS
```
npm run build && npm run dist:all
```

#### For Mac OS only
```
npm run build && npm run dist:mac
```

#### For Linux platforms only
```
npm run build && npm run dist:linux
```

#### For Windows platforms
```
npm run build && npm run dist:win
```

Distributable will then be in the `dist` folder.

## Contributing
Any contribution is appreciated.

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request.

## Thanks
This software is being developped with the following technologies, many thanks to
* [Electron](https://electron.atom.io)
* [Vuetify](https://vuetifyjs.com)

_It is still in development_.

## License
MIT License

Copyright (c) Kylart
