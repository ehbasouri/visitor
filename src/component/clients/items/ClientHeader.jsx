import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { SearchInput } from '../../../common/SearchInput';


export default function ClientHeader() {

  return (
      <AppBar >
        <Toolbar>
          <SearchInput/>
        </Toolbar>
      </AppBar>
  );
}
