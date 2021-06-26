import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { blueGrey } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import StoreIcon from '@material-ui/icons/Store';
import ClientOrderProductItem from './ClientOrderProductItem';
import fa from '../../../translation/fa';
import moment from "jalali-moment";
import { HOST } from '../../../service/api';
import converEnglishNumToPersian from '../../../utils/EnglishNumToPersianNum';

moment.locale('fa', { useGregorianParser: true });

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    marginTop: 16
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: blueGrey[500],
  },
  description: {
    marginTop: "16px"
  }
}));

function ClientOrderItem({order}) {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        onClick={handleExpandClick}
        avatar={
                <Avatar src={HOST + order.business.avatar } aria-label="recipe" className={classes.avatar}>
                  <StoreIcon/>
                </Avatar>
              }
        title={order.business.name}
        subheader={converEnglishNumToPersian(moment(new Date(order.created_at)).format('YYYY/MM/DD  hh:mm  a'))}
        align={"right"}
        action={
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon/>
          </IconButton>
        }
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {order.products.map(product=>(
            <ClientOrderProductItem key={product._id} product={product} />
          ))}
          {order.comment && <Typography className={classes.description} align={"left"} >
            {fa["description"]} :
          </Typography>}
          <Typography paragraph align={"left"} >
            {order.comment}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default ClientOrderItem