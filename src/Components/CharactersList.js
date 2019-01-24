import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Character from './Character.js';



// Including json file
const characterData = require('../characters.json')

const styles = theme => ({

    container: {
        display: 'flex',
        fleXDirection: 'row',
        justifyContent: 'center',
        marginTop: '10px',
        zIndex: 100000
    }

});

class CharactersList extends Component {

    constructor() {
        super()
        this.state = {
            charactersArray: characterData,
            characterImageLinks: [
                require('../Images/luke.jpg'),
                require('../Images/darth.jpeg'),
                require('../Images/obi.jpg'),
                require('../Images/r2d2.png')
            ]
        };
    }


    render() {

        const { classes } = this.props

        return (
            <div className={classes.container}>
                {this.state.charactersArray.characters.map((character, index) => (
                    <Character
                        key={index}
                        name={character.name}
                        url={character.url}
                        image={this.state.characterImageLinks[index]}
                    />
                ))}


            </div>
        );
    }
}

export default withStyles(styles)(CharactersList);
