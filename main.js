/*
 ** Electron app
 */
const startServer = require('./server')
const {BrowserWindow, dialog, Menu, Tray} = require('electron')
const Electron = require('electron').app
const url = require('url')
const localConfig = require(path.join(homedir(), '.KawAnime', 'config.json')).config

const menuFile = require(path.join(__dirname, 'assets', 'menu.js'))
const menu = Menu.buildFromTemplate(menuFile.menu)

process.win = null // Current window
let tray = null
let server

const pollServer = () => {
  http.get(process.appURL, ({statusCode}) => {
    statusCode !== 200
      ? setTimeout(pollServer, 300)
      : process.win.loadURL(process.appURL)
  })
    .on('error', pollServer)
}

// Disable error dialogs by overriding
dialog.showErrorBox = (title, content) => {
  console.log(`${title}\n${content}`)
}

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception occurred in main process.\n', err)
})

const newWin = () => {
  server = startServer()

  process.win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: false
    },
    width: 1200,
    height: 800,
    titleBarStyle: 'hidden',
    frame: process.platform === 'darwin',
    show: false
  })

  process.win.once('ready-to-show', () => {
    process.win.show()
  })

  process.win.on('closed', () => {
    process.win = null
    if (server.address()) {
      server.close()
    }
  })

  process.win.webContents.on('crashed', (event) => {
    console.error('Main window crashed')
    console.error('Event is ', event)
  })

  process.win.on('unresponsive', () => {
    console.warn('Main window is unresponsive...')
  })

  process.win.on('session-end', () => {
    console.info('Session logged off.')
  })

  if (!isDev) {
    return process.win.loadURL(process.appURL)
  } else {
    process.win.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }))
  }

  pollServer()
}

Electron.on('ready', () => {
  if (isDev) {
    require('vue-devtools').install()
  }

  const currentSettings = Electron.getLoginItemSettings()
  Menu.setApplicationMenu(menu)

  if (localConfig.system.toTray) {
    if (process.platform === 'darwin') {
      Electron.dock.hide()
    }
    tray = new Tray(path.join(__dirname, 'static', 'images', 'tray.png'))
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'New window',
        click: () => {
          process.win === null
            ? newWin()
            : process.win.show()
        },
        accelerator: 'CommandOrControl+N'
      },
      {label: 'Show current window', click: () => { process.win.show() }},
      {label: 'Close current window', role: 'close', accelerator: 'CommandOrControl+W'},
      {type: 'separator'},
      {label: 'Quit', role: 'quit', accelerator: 'CommandOrControl+Q'}
    ])
    tray.setToolTip('The ultimate otaku software.')
    tray.setContextMenu(contextMenu)
  }

  if (localConfig.system.autoStart) {
    Electron.setLoginItemSettings({
      openAtLogin: true
    })
  } else {
    if (currentSettings.openAtLogin) {
      Electron.setLoginItemSettings({
        openAtLogin: false
      })
    }
  }

  newWin()

  // Let's send some data to kawanime.com/_api
  const {username} = require('os').userInfo()
  const tokenPath = path.join(require('os').homedir(), '.KawAnime', '_token')
  const token = fs.readFileSync(tokenPath, 'utf-8')
  axios.post('https://kawanime.com/_api', {
    id: `${username}/${token}`
  })
    .catch((err) => { console.error('Couldn\'t reach KawAnime.com\'s api:', err.message) })
})

// Quit when all windows are closed.
Electron.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    if (!tray) {
      server.close()
      Electron.quit()
    }
  }
})

Electron.on('activate', () => {
  process.win === null
    ? newWin()
    : process.win.show()
})
