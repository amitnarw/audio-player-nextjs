"use client"

import React, { Component } from "react";
import { version } from "../../../package.json";
import ReactPlayer from "react-player";
import Duration from "./Duration";

class App extends Component {
  state = {
    url: null,
    pip: false,
    playing: true,
    controls: false,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
    isClient: false,
  };

  componentDidMount() {
    this.setState({ isClient: true });
  }

  load = (url) => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
      pip: false,
    });
  };

  handlePlayPause = () => {
    this.setState({ playing: !this.state.playing });
  };

  handleStop = () => {
    this.setState({ url: null, playing: false });
  };

  handleToggleControls = () => {
    const url = this.state.url;
    this.setState(
      {
        controls: !this.state.controls,
        url: null,
      },
      () => this.load(url)
    );
  };

  handleToggleLight = () => {
    this.setState({ light: !this.state.light });
  };

  handleToggleLoop = () => {
    this.setState({ loop: !this.state.loop });
  };

  handleVolumeChange = (e) => {
    this.setState({ volume: parseFloat(e.target.value) });
  };

  handleToggleMuted = () => {
    this.setState({ muted: !this.state.muted });
  };

  handleSetPlaybackRate = (e) => {
    this.setState({ playbackRate: parseFloat(e.target.value) });
  };

  handleOnPlaybackRateChange = (speed) => {
    this.setState({ playbackRate: parseFloat(speed) });
  };

  handleTogglePIP = () => {
    this.setState({ pip: !this.state.pip });
  };

  handlePlay = () => {
    console.log("onPlay");
    this.setState({ playing: true });
  };

  handleEnablePIP = () => {
    console.log("onEnablePIP");
    this.setState({ pip: true });
  };

  handleDisablePIP = () => {
    console.log("onDisablePIP");
    this.setState({ pip: false });
  };

  handlePause = () => {
    console.log("onPause");
    this.setState({ playing: false });
  };

  handleSeekMouseDown = (e) => {
    this.setState({ seeking: true });
  };

  handleSeekChange = (e) => {
    this.setState({ played: parseFloat(e.target.value) });
  };

  handleSeekMouseUp = (e) => {
    this.setState({ seeking: false });
    this.player.seekTo(parseFloat(e.target.value));
  };

  handleProgress = (state) => {
    console.log("onProgress", state);
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state);
    }
  };

  handleEnded = () => {
    console.log("onEnded");
    this.setState({ playing: this.state.loop });
  };

  handleDuration = (duration) => {
    console.log("onDuration", duration);
    this.setState({ duration });
  };

  renderLoadButton = (url, label) => {
    return <button onClick={() => this.load(url)}>{label}</button>;
  };

  ref = (player) => {
    this.player = player;
  };

  render() {
    const {
      url,
      playing,
      controls,
      light,
      volume,
      muted,
      loop,
      played,
      loaded,
      duration,
      playbackRate,
      pip,
      isClient,
    } = this.state;

    const SEPARATOR = " · ";

    return (
      <div className="app">
        <section className="section">
          <h1>ReactPlayer Demo</h1>
          <div className="player-wrapper">
            {isClient && (
              <ReactPlayer
                ref={this.ref}
                className="react-player"
                width="100%"
                height="100%"
                url={url}
                pip={pip}
                playing={playing}
                controls={controls}
                light={light}
                loop={loop}
                playbackRate={playbackRate}
                volume={volume}
                muted={muted}
                onReady={() => console.log("onReady")}
                onStart={() => console.log("onStart")}
                onPlay={this.handlePlay}
                onEnablePIP={this.handleEnablePIP}
                onDisablePIP={this.handleDisablePIP}
                onPause={this.handlePause}
                onBuffer={() => console.log("onBuffer")}
                onPlaybackRateChange={this.handleOnPlaybackRateChange}
                onSeek={(e) => console.log("onSeek", e)}
                onEnded={this.handleEnded}
                onError={(e) => console.log("onError", e)}
                onProgress={this.handleProgress}
                onDuration={this.handleDuration}
                onPlaybackQualityChange={(e) =>
                  console.log("onPlaybackQualityChange", e)
                }
              />
            )}
          </div>

          <table>
            <tbody>
              <tr>
                <th>Controls</th>
                <td>
                  <button onClick={this.handleStop}>Stop</button>
                  <button onClick={this.handlePlayPause}>
                    {playing ? "Pause" : "Play"}
                  </button>
                  {/* <button onClick={this.handleClickFullscreen}>
                    Fullscreen
                  </button> */}
                  {light && (
                    <button onClick={() => this.player.showPreview()}>
                      Show preview
                    </button>
                  )}
                  {ReactPlayer.canEnablePIP(url) && (
                    <button onClick={this.handleTogglePIP}>
                      {pip ? "Disable PiP" : "Enable PiP"}
                    </button>
                  )}
                </td>
              </tr>
              <tr>
                <th>Speed</th>
                <td>
                  <button onClick={() => this.handleSetPlaybackRate({ target: { value: 1 } })}>
                    1x
                  </button>
                  <button onClick={() => this.handleSetPlaybackRate({ target: { value: 1.5 } })}>
                    1.5x
                  </button>
                  <button onClick={() => this.handleSetPlaybackRate({ target: { value: 2 } })}>
                    2x
                  </button>
                </td>
              </tr>
              <tr>
                <th>Seek</th>
                <td>
                  <input
                    type="range"
                    min={0}
                    max={0.999999}
                    step="any"
                    value={played}
                    onMouseDown={this.handleSeekMouseDown}
                    onChange={this.handleSeekChange}
                    onMouseUp={this.handleSeekMouseUp}
                  />
                </td>
              </tr>
              <tr>
                <th>Volume</th>
                <td>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step="any"
                    value={volume}
                    onChange={this.handleVolumeChange}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="controls">Controls</label>
                </th>
                <td>
                  <input
                    id="controls"
                    type="checkbox"
                    checked={controls}
                    onChange={this.handleToggleControls}
                  />
                  <em>&nbsp; Requires player reload</em>
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="muted">Muted</label>
                </th>
                <td>
                  <input
                    id="muted"
                    type="checkbox"
                    checked={muted}
                    onChange={this.handleToggleMuted}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="loop">Loop</label>
                </th>
                <td>
                  <input
                    id="loop"
                    type="checkbox"
                    checked={loop}
                    onChange={this.handleToggleLoop}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="light">Light mode</label>
                </th>
                <td>
                  <input
                    id="light"
                    type="checkbox"
                    checked={light}
                    onChange={this.handleToggleLight}
                  />
                </td>
              </tr>
              <tr>
                <th>Played</th>
                <td>
                  <progress max={1} value={played} />
                </td>
              </tr>
              <tr>
                <th>Loaded</th>
                <td>
                  <progress max={1} value={loaded} />
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <section className="section">
          <table>
            <tbody>
              <tr>
                <th>YouTube</th>
                <td>
                  {this.renderLoadButton(
                    "https://www.youtube.com/watch?v=oUFJJNQGwhk",
                    "Test A"
                  )}
                  {this.renderLoadButton(
                    "https://www.youtube.com/watch?v=0k1WmRVQK3o",
                    "Test B"
                  )}
                </td>
              </tr>
              <tr>
                <th>Vimeo</th>
                <td>
                  {this.renderLoadButton(
                    "https://vimeo.com/174863056",
                    "Test A"
                  )}
                  {this.renderLoadButton(
                    "https://vimeo.com/340205214",
                    "Test B"
                  )}
                </td>
              </tr>
              <tr>
                <th>Twitch</th>
                <td>
                  {this.renderLoadButton(
                    "https://www.twitch.tv/videos/1331097042",
                    "Test A"
                  )}
                </td>
              </tr>
              <tr>
                <th>DailyMotion</th>
                <td>
                  {this.renderLoadButton(
                    "https://www.dailymotion.com/video/x7wihsh",
                    "Test A"
                  )}
                </td>
              </tr>
              <tr>
                <th>Facebook</th>
                <td>
                  {this.renderLoadButton(
                    "https://www.facebook.com/facebook/videos/10153231379946729/",
                    "Test A"
                  )}
                </td>
              </tr>
              <tr>
                <th>SoundCloud</th>
                <td>
                  {this.renderLoadButton(
                    "https://soundcloud.com/forss/flickermood",
                    "Test A"
                  )}
                </td>
              </tr>
              <tr>
                <th>Streamable</th>
                <td>
                  {this.renderLoadButton(
                    "https://streamable.com/7mh7x",
                    "Test A"
                  )}
                </td>
              </tr>
              <tr>
                <th>Wistia</th>
                <td>
                  {this.renderLoadButton(
                    "https://home.wistia.com/medias/oyq7b8e1i5",
                    "Test A"
                  )}
                </td>
              </tr>
              <tr>
                <th>Mixcloud</th>
                <td>
                  {this.renderLoadButton(
                    "https://www.mixcloud.com/rolandtape/9-hours-of-roland-tape/",
                    "Test A"
                  )}
                </td>
              </tr>
              <tr>
                <th>Vimeo (Live)</th>
                <td>
                  {this.renderLoadButton(
                    "https://vimeo.com/streaminglive",
                    "Test A"
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <footer className="footer">
          Version <strong>{version}</strong>
          {SEPARATOR}
          <a href="https://github.com/CookPete/react-player">GitHub</a>
          {SEPARATOR}
          <a href="https://www.npmjs.com/package/react-player">npm</a>
        </footer>
      </div>
    );
  }
}

export default App;
