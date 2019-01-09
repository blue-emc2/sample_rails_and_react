import React from 'react';
import PropTypes from 'prop-types'
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dropzone from 'react-dropzone'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: 282,  // TODO: あとで可変にする
    width: 400    // TODO: あとで可変にする
  },
})

class ImageDropZone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUploading: false,
      images: []
    };

    this.handleOnDrop = this.handleOnDrop.bind(this);
  }

  handleOnDrop(files) {
  }

  render() {
    return (
      <div>
        <h1>React S3 Image Uploader Sample</h1>
        <Dropzone onDrop={this.handleOnDrop} accept="image/*">
           {({getRootProps, getInputProps}) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
                <p>Drop files here, or click to select files</p>
            </div>
          )}
        </Dropzone>
        {this.state.isUploading ?
          <div>ファイルをアップロードしています</div> :
          <div>ここに画像をドラックまたはクリック</div>}
        {this.state.images.length > 0 &&
          <div style={{margin: 30}}>
            {this.state.images.map(({name, url}) =>
              <img key={name} src={url} style={{width: 200, height: 200}}/>)}
          </div>}
      </div>
    );
  }
}

class TabContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  renderTextOrImage(type) {
    if (type === 'text') {
      return <TextField
        id="standard-name"
        multiline
        rowsMax="10"
        margin="normal"
      />
    } else {
      return <ImageDropZone />
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.renderTextOrImage(this.props.type)}
      </React.Fragment>
    )
  }
}

TabContainer.propTypes = {
  type: PropTypes.string.isRequired,
};

class WhitePaper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'text'};
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render () {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <main>
          <div className={classNames(classes.layout, classes.cardGrid)}>
            <Grid container spacing={40} >
              <Grid item xs={6} container alignItems="center" justify="center">
                <Tabs value={value} onChange={this.handleChange}>
                  <Tab value='text' label="文章に入力する" />
                  <Tab value='image' label="画像をアップロードする" />
                </Tabs>
                <Card className={classes.card}>
                  <TabContainer type={value} />
                </Card>
              </Grid>
              <Grid item xs={6} container alignItems="center" justify="center">
                <Card className={classes.card}>
                </Card>
              </Grid>
            </Grid>
          </div>
        </main>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(WhitePaper)
