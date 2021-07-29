window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'BQA4iSRsPl_PJ6UUeoaD6ciPgP_dlFXC8bMXeLYAP_QRlg3DP5jEzN1ALwd4Z8RAoXYP15j1JUxmB9C-Xx0ocxs9L2eSEGT21b9NxEokpalXE1ARp6ka05owYKsDgsgSk4twvTsainPlpOKW_NK6zP61Ovj3GQ9Mw3ZJ';
    const player = new Spotify.Player({
      name: 'MiClone',
      getOAuthToken: cb => { cb(token); }
    });
  
    // Error handling
    player.addListener('initialization_error', ({ message }) => { console.error(message); });
    player.addListener('authentication_error', ({ message }) => { console.error(message); });
    player.addListener('account_error', ({ message }) => { console.error(message); });
    player.addListener('playback_error', ({ message }) => { console.error(message); });
  
    // Playback status updates
    player.addListener('player_state_changed', state => { console.log(state); });
  
    // Ready
    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
    });
  
    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });
  
    // Connect to the player!
    player.connect();
  };