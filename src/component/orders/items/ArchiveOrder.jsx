// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
// import Avatar from '@material-ui/core/Avatar';
// import { blueGrey } from '@material-ui/core/colors';
// import StoreIcon from '@material-ui/icons/Store';
// import SceneWrapper from '../../../SceneWrapper/SceneWrapper';
// import moment from "jalali-moment";
// import { Link } from "react-router-dom"
// import { HOST } from '../../../service/api';
// import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';
// import fa from '../../../translation/fa';
// import CancelIcon from '@material-ui/icons/Cancel';
// import CheckCircleIcon from '@material-ui/icons/CheckCircle';


// const useStyles = makeStyles((theme) => ({
//   root: {
//     maxWidth: "100%",
//     marginTop: 16
//   },
//   avatar: {
//     backgroundColor: blueGrey[500],
//   },
//   canceledIcon: {
//     color: "red"
//   },
//   doneIcon: {
//     color: "green"
//   }
// }));

// function ArchiveOrder({order}) {

//   const classes = useStyles();
  
//   return (
//     <Link to={"/admin/archiveorderdetail/" + order._id} >
//         <Card className={classes.root}>
//           <CardHeader
//               avatar={
//               <Avatar src={HOST + order.client.avatar} aria-label="recipe" className={classes.avatar}>
//                   <StoreIcon/>
//               </Avatar>
//               }
//               title={order.client.name}
//               subheader={moment(order.created_at).format('YYYY/MM/DD  hh:mm  a')}
//               header={"test"}
//               align={"right"}
//               action={
//                 order.status === "cancel" ?
//                   <CancelIcon className={classes.canceledIcon} /> : 
//                   <CheckCircleIcon className={classes.doneIcon} />
//               }
//           />
//         </Card>
//     </Link>
//   );
// }

// export default SceneWrapper(ArchiveOrder)


import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import { blueGrey } from '@material-ui/core/colors';
import { HOST } from '../../../service/api';
import moment from "jalali-moment";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

moment.locale('fa', { useGregorianParser: true });

const useStyles = makeStyles((theme) => ({
  inline: {
    display: 'inline',
  },
  avatar: {
    backgroundColor: blueGrey[500],
    borderRadius: 3
  },
  canceledIcon: {
    color: "red"
  },
  doneIcon: {
    color: "green"
  }
}));

export default function ArchiveOrder({order}) {
  
  const classes = useStyles();

  return (
      <Link to={"/admin/archiveorderdetail/" + order._id} >
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
            <Avatar src={HOST + order.client.avatar} className={classes.avatar} alt={order.client.name} />
            </ListItemAvatar>
            <ListItemText
              primary={order.client.name}
              secondary={
                  <React.Fragment>
                  <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                  >
                      {moment(order.created_at).format('YYYY/MM/DD  hh:mm  a')}
                  </Typography>
                  </React.Fragment>
              }
            />
              {order.status === "cancel" ?
                  <CancelIcon className={classes.canceledIcon} /> : 
                  <CheckCircleIcon className={classes.doneIcon} />
              }
        </ListItem>
        <Divider />
      </Link>

  );
}
