import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

export class MyModal extends Component {
  state = { 
    open: false
   }


  // const [open, setOpen] = React.useState(false);

  handleOpen = (open = false) => {
      this.setState({open});
  };

  render() {
  
    const {
      title,
      content
    } = this.props
  
  return (
    <div>
        <Button 
              type="submit"
              fullWidth
              variant="contained"
              color="primary" 
              onClick={()=>this.handleOpen(true)} 
              size={"large"} 
              >
            {title}
        </Button>
        <Modal
            open={this.state.open}
            onClose={this.handleOpen}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            // className={classes.container}
        >
            <div >
                {content}
            </div>
        </Modal>
    </div>
  );
  }
}

