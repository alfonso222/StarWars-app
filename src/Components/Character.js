import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  card: {
    width: "20vh",
    height: "20vh",
    border: "1px solid grey",
    transitionDelay: "8s !important",
    margin: "10px"
  },
  media: {
    height: "100%",
    width: "22vh",
    paddingTop: "15vh"
  },
  content: {
    backgroundColor: "#000",
    height: "8vh",
    padding: "5px"
  },
  text: {
    color: "#ff6",
    fontSize: "1em"
  },
  dialogContent: {
    color: "#ff6",
    fontSize: "1em"
  },

  dialog: {
    backgroundColor: "#0e0d0d",
    minHeight: "300px",
    [theme.breakpoints.down("sm")]: {
      margin: 0
    }
  },
  progress: {
    color: "grey",
    position: "absolute",
    top: "50%",
    left: "45%"
  },
  date: {
    fontSize: "16px"
  }
});

class Character extends Component {
  constructor() {
    super();
    this.state = {
      characterData: {},
      moviesAppeared: [],
      open: false
    };
  }

  getCharacterData(url) {
    this.handleClickOpen();
    // Promise chain that gets the character data then iterates through the films and adds it to state
    axios
      .get(url)
      .then(res => {
        const persons = res.data;
        this.setState({ characterData: persons });
        console.log(res.data);

        return res.data.films;
      })
      .then(res => {
        console.log(res);

        let promises = [];
        let newArray = [];

        //Adds multiple api calls to an array of promises
        for (let i = 0; i < res.length; i++) {
          promises.push(axios.get(res[i]));
        }

        //executes every promise in array and runs code only after they all finish
        axios
          .all(promises)
          .then(
            axios.spread((...args) => {
              for (let i = 0; i < args.length; i++) {
                newArray.push(args[i].data);
              }

              return newArray;
            })
          )
          .then(res => {
            console.log(res);
            this.setState({ moviesAppeared: newArray });
          });
      })
      .catch(error => {
        //Logs error that occurs if initial api call fails
        console.log(error.response);
        alert(error);
        this.handleClose();
      });
  }

  formatDate(date) {
    let formattedDate = new Date(date);
    return formattedDate;
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, url, name, image } = this.props;
    const { moviesAppeared } = this.state;

    return (
      <div>
        <Fade in={true} timeout={5000}>
          <Card className={classes.card}>
            <CardActionArea
              onClick={() => {
                this.getCharacterData(url);
              }}
            >
              <CardMedia className={classes.media} image={image} />
              <CardContent className={classes.content}>
                <Typography gutterBottom className={classes.text}>
                  {name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Fade>

        <Dialog
          open={this.state.open}
          onClose={() => {
            this.handleClose();
          }}
          className={classes.dialog}
          fullWidth
          PaperProps={{
            classes: {
              root: classes.dialog
            }
          }}
        >
          <DialogContent>
            <Typography className={classes.dialogContent}>
              Movies {name} Appeared In{" "}
            </Typography>
            <hr />

            {moviesAppeared.length > 0 ? (
              moviesAppeared.map((film, index) => (
                <Typography key={index} className={classes.dialogContent}>
                  {film.title + " "}
                  <span className={classes.date}>
                    {"( " +
                      new Date(film.release_date).toLocaleString("en-us", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      }) +
                      " )"}
                  </span>
                </Typography>
              ))
            ) : (
              <CircularProgress size={50} className={classes.progress} />
            )}
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(Character);
