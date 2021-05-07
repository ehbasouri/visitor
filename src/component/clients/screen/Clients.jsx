import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ClientHeader from '../items/ClientHeader';
import ClientItem from '../items/ClientItem';
import AddButton from '../../common/AddButton';
import SceneWrapper from '../../../SceneWrapper/SceneWrapper';


const useStyles = makeStyles((theme) => ({
  root: {
    // width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  }
}));

function Clients() {
  const classes = useStyles();

  return (
    <div className={"mainScreen"} >
        <ClientHeader/>
        <ClientItem/>
        <ClientItem/>
        <ClientItem/>
        <ClientItem/>
        <ClientItem/>
        <ClientItem/>
        <ClientItem/>
        <ClientItem/>
        <ClientItem/>
        <ClientItem/>
        <ClientItem/>
        <ClientItem/>
        <AddButton link={"addclient"} />
    </div>
  );
}

export default SceneWrapper(Clients);

