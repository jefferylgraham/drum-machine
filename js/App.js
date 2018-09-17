//Display component retrieved from display state
class Display extends React.Component {
  render() {
    return (
      <div>
        <p id="display">{this.props.display}</p>
      </div>
    );
  }
}

//Drum pad components
class DrumPad extends React.Component {
  render() {
    return (
      <button
        id={this.props.soundID}
        onClick={this.props.onClick}
        className="drum-pad"
      >
        <audio id={this.props.id} className="clip" src={this.props.soundSrc} />
        {this.props.id}
      </button>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "Let's Rock!",
      //array of objects tying keyboard keys to sounds
      sounds: [
        { Q: "boom" },
        { W: "clap" },
        { E: "hihat" },
        { A: "kick" },
        { S: "openhat" },
        { D: "ride" },
        { Z: "snare" },
        { X: "tink" },
        { C: "tom" }
      ],
      keyCodes: {
        81: "boom",
        87: "clap",
        69: "hihat",
        65: "kick",
        83: "openhat",
        68: "ride",
        90: "snare",
        88: "tink",
        67: "tom"
      }
    };
    this.clickSound = this.clickSound.bind(this);
    this.pressSound = this.pressSound.bind(this);
  }

  //play sound depending on what object from this.state.sounds is clicked
  clickSound(index, audioID) {
    var displaying = this.state.sounds[index][audioID];
    this.setState({
      display: displaying.toUpperCase()
    });
    var x = document.getElementById(audioID);
    x.play();
  }

  //play sound depending on what key is pressed
  pressSound(event) {
    var audioID = event.keyCode;
    console.log(audioID);
    var displaying = this.state.keyCodes[audioID];
    this.setState({
      display: displaying.toUpperCase()
    });
    var x = document.getElementById(String.fromCharCode(audioID));
    x.play();
  }

  componentWillMount() {
    document.addEventListener("keydown", this.pressSound.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.pressSound.bind(this));
  }

  render() {
    return (
      <div
        // tabIndex="0"
        onKeyPress={this.pressSound}
      >
        <div>
          <div id="drum-machine">
            <Display display={this.state.display} />
            <div id="pads">
              {/* Iterate through this.state.sounds to build drum pads */}
              {this.state.sounds.map((sound, index) => {
                return (
                  <DrumPad
                    key={index}
                    id={Object.keys(sound)[0]}
                    onClick={() =>
                      this.clickSound(index, Object.keys(sound)[0])
                    }
                    soundID={sound[Object.keys(sound)[0]]}
                    soundSrc={"sounds/" + sound[Object.keys(sound)[0]] + ".wav"}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
