import React, { Component } from "react";
import "../StyleSheets/text.css";

class ScrollingText extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }

  render() {
    return (
      <div>
        <div id="startContainer">
          <p id="start">A short time ago in a browser very close&hellip;</p>
        </div>

        <div id="introContainer">
          <h1 id="intro">
            STAR
            <br />
            WARS
            <sub>The Api</sub>
          </h1>
        </div>

        <div id="titles">
          <div id="titlecontent">
            <p>
              Welcome to the Star Wars api coding challenge. Click on one of the
              characters to see what movies they were in. I used react and
              Material Ui for front end and axios to make api calls. The fancy
              scrolly text was borrowed from codepen. I need more text to fill
              up this div so im just going to copy and paste the instructions to
              the project. Thank you for visiting :)
            </p>
            <p>
              Submit an application that accomplishes the objectives below.
              Hosting is up to you, we only need a link to a working deployment
              of your project, and a link to your source code. We reccomend js
              bin and Plunker for free, all-in-one solutions.
            </p>
            <p>Allow users to choose a character from the provided JSON file</p>
            <p>
              Upon selection of a character, the UI should update to display
              information about each of the films that that character
            </p>
            <p>
              Do this with any js framework, and some kind of component-based
              pattern
            </p>
            <p>
              You can only use the API routes found the provided
              'characters.json' file, and the data returned from those calls
            </p>
            <p>Don't load the movie data until the character is clicked</p>
            <p>
              Don't show any movie information until all of the character's
              movies have loaded
            </p>
            <p>Handle HTTP errors</p>
            <p>
              Make it pretty! You're encouraged to use bootstrap or another css
              framework
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ScrollingText;
