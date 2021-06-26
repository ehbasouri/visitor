import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { SearchInput } from '../../../common/SearchInput';


export default function ClientHeader({
  value,
  onChange
}) {

  return (
      <AppBar >
        <Toolbar>
          <SearchInput value={value} onChange={onChange} />
        </Toolbar>
      </AppBar>
  );
}
