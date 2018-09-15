import { Component } from '@angular/core';

import { SearchPage } from '../search/search';
import { BuzzPage } from '../buzz/buzz';
import { AccountPage } from '../account/account';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = SearchPage;
  tab2Root = BuzzPage;
  tab3Root = AccountPage;

  constructor() {

  }
}
