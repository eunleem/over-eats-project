import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth/services/auth.service';
import { CartService } from '../../core/cart.service';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCart } from '../../models/shopping-cart.model';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  template: `
  <div class="header-group">
  <header class="header constraint">
    <a routerLink="/home" class="logo">
      <svg width="80px" height="40px" viewBox="0 0 379 180" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs></defs>
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
          <g id="Group" transform="translate(1.000000, 1.000000)">
            <path d="M7,22.5083333 C7,19.0610939 7.57791089,15.9484861 8.73375,13.1704167 C9.88958911,10.3923472 11.4915175,8.03000973 13.5395833,6.08333333 C15.5876491,4.13665693 18.0209581,2.63611638 20.8395833,1.58166667 C23.6582085,0.52721695 26.7302612,0 30.0558333,0 C33.4219613,0 36.5244303,0.52721695 39.3633333,1.58166667 C42.2022364,2.63611638 44.655823,4.13665693 46.7241667,6.08333333 C48.7925103,8.03000973 50.4045776,10.3923472 51.5604167,13.1704167 C52.7162558,15.9484861 53.2941667,19.0610939 53.2941667,22.5083333 C53.2941667,25.8744613 52.7162558,28.9465139 51.5604167,31.7245833 C50.4045776,34.5026528 48.7925103,36.8954066 46.7241667,38.9029167 C44.655823,40.9104267 42.2022364,42.4718 39.3633333,43.5870833 C36.5244303,44.7023667 33.4219613,45.26 30.0558333,45.26 C26.7302612,45.26 23.6582085,44.7023667 20.8395833,43.5870833 C18.0209581,42.4718 15.5876491,40.9104267 13.5395833,38.9029167 C11.4915175,36.8954066 9.88958911,34.5026528 8.73375,31.7245833 C7.57791089,28.9465139 7,25.8744613 7,22.5083333 Z M15.3341667,22.5083333 C15.3341667,24.8200116 15.6890242,26.9390181 16.39875,28.8654167 C17.1084758,30.7918152 18.1223545,32.4647151 19.4404167,33.8841667 C20.7584788,35.3036182 22.3198521,36.408746 24.1245833,37.1995833 C25.9293146,37.9904206 27.9266557,38.3858333 30.1166667,38.3858333 C32.3066776,38.3858333 34.3141575,37.9904206 36.1391667,37.1995833 C37.9641758,36.408746 39.5356879,35.3036182 40.85375,33.8841667 C42.1718121,32.4647151 43.1856909,30.7918152 43.8954167,28.8654167 C44.6051424,26.9390181 44.96,24.8200116 44.96,22.5083333 C44.96,20.2777666 44.6051424,18.209454 43.8954167,16.3033333 C43.1856909,14.3972127 42.1819509,12.7344515 40.8841667,11.315 C39.5863824,9.89554846 38.0250091,8.78028183 36.2,7.96916667 C34.3749909,7.1580515 32.3472334,6.7525 30.1166667,6.7525 C27.8861,6.7525 25.8684812,7.1580515 24.06375,7.96916667 C22.2590188,8.78028183 20.7077843,9.89554846 19.41,11.315 C18.1122157,12.7344515 17.1084758,14.3972127 16.39875,16.3033333 C15.6890242,18.209454 15.3341667,20.2777666 15.3341667,22.5083333 Z M60.9505555,1.095 L69.5280555,1.095 L81.3905555,34.2491667 L81.6338889,34.2491667 L93.6180555,1.095 L101.891389,1.095 L84.6147222,44.165 L77.9838889,44.165 L60.9505555,1.095 Z M116.207774,1.095 L144.738607,1.095 L144.738607,7.78666667 L123.872774,7.78666667 L123.872774,18.7366667 L143.643607,18.7366667 L143.643607,25.185 L123.872774,25.185 L123.872774,37.3516667 L145.833607,37.3516667 L145.833607,44.165 L116.207774,44.165 L116.207774,1.095 Z M163.626778,1.095 L178.591778,1.095 C180.619566,1.095 182.586491,1.30791454 184.492612,1.73375 C186.398732,2.15958546 188.09191,2.8591618 189.572195,3.8325 C191.05248,4.8058382 192.238718,6.08332543 193.130945,7.665 C194.023172,9.24667457 194.469278,11.1730442 194.469278,13.4441667 C194.469278,16.5669601 193.587204,19.1117957 191.823028,21.07875 C190.058853,23.0457043 187.65596,24.3738854 184.614278,25.0633333 L196.111778,44.165 L186.865112,44.165 L176.888445,25.915 L171.291778,25.915 L171.291778,44.165 L163.626778,44.165 L163.626778,1.095 Z M177.557612,19.6491667 C178.652617,19.6491667 179.747606,19.5680564 180.842612,19.4058333 C181.937617,19.2436103 182.921079,18.9394467 183.793028,18.4933333 C184.664977,18.04722 185.384831,17.4084764 185.952612,16.5770833 C186.520392,15.7456903 186.804278,14.6811176 186.804278,13.3833333 C186.804278,12.2072163 186.54067,11.2440315 186.013445,10.49375 C185.48622,9.74346847 184.81706,9.14528001 184.005945,8.69916667 C183.19483,8.25305332 182.2722,7.9488897 181.238028,7.78666667 C180.203856,7.62444363 179.200116,7.54333333 178.226778,7.54333333 L171.291778,7.54333333 L171.291778,19.6491667 L177.557612,19.6491667 Z"
              id="OVER" stroke="#1D1D1D" fill="#1D1D1D"></path>
            <path d="M81.1935529,110.429142 C81.1935529,107.027574 80.7129037,103.773948 79.7515909,100.668169 C78.7902781,97.5623887 77.2743845,94.8263856 75.2038646,92.4600771 C73.1333447,90.0937687 70.5082606,88.2081449 67.3285336,86.8031493 C64.1488066,85.3981536 60.4145321,84.6956663 56.125598,84.6956663 C48.139307,84.6956663 41.3732453,87.0989123 35.8272098,91.9054763 C30.2811744,96.7120404 27.2124141,102.886534 26.620837,110.429142 L81.1935529,110.429142 Z M107.81439,122.408519 L107.81439,125.957964 C107.81439,127.141118 107.740444,128.324254 107.59255,129.507409 L26.620837,129.507409 C26.9166256,133.35266 27.914897,136.865096 29.6156812,140.044823 C31.3164654,143.22455 33.5718193,145.960553 36.3818106,148.252915 C39.1918019,150.545276 42.3714812,152.356954 45.9209439,153.688002 C49.4704065,155.019051 53.167708,155.684565 57.0129593,155.684565 C63.6682018,155.684565 69.2881001,154.464456 73.8728227,152.0242 C78.4575454,149.583944 82.2287929,146.2194 85.1866785,141.930466 L102.933903,156.128246 C92.4334094,170.326096 77.2005272,177.424915 57.2347996,177.424915 C48.95272,177.424915 41.3362789,176.13086 34.3852478,173.54271 C27.4342167,170.95456 21.4076153,167.294232 16.3052627,162.561615 C11.2029101,157.828998 7.20982445,152.024234 4.32588602,145.14715 C1.44194759,138.270066 0,130.46876 0,121.742998 C0,113.16513 1.44194759,105.363824 4.32588602,98.3388453 C7.20982445,91.3138671 11.1659371,85.3242386 16.1943425,80.3697803 C21.222748,75.415322 27.1754034,71.5701284 34.0524874,68.8340843 C40.9295713,66.0980401 48.3611473,64.7300386 56.3474384,64.7300386 C63.7421523,64.7300386 70.5821601,65.9501481 76.8676669,68.3904037 C83.1531737,70.8306592 88.5882069,74.4540147 93.1729296,79.2605788 C97.7576522,84.0671428 101.344035,90.0567712 103.932185,97.2296438 C106.520334,104.402516 107.81439,112.795391 107.81439,122.408519 Z M189.630622,160.786892 L188.965101,160.786892 C186.303004,165.519509 182.014135,169.401676 176.098363,172.433508 C170.182592,175.465341 163.453504,176.981235 155.910895,176.981235 C151.621961,176.981235 147.148226,176.426639 142.489557,175.317432 C137.830887,174.208225 133.542017,172.359574 129.622819,169.771425 C125.70362,167.183275 122.449995,163.781757 119.861845,159.56677 C117.273695,155.351784 115.97964,150.138588 115.97964,143.927029 C115.97964,135.940738 118.234994,129.581379 122.745769,124.848762 C127.256545,120.116145 133.061308,116.49279 140.160233,113.978587 C147.259159,111.464384 155.134411,109.800599 163.786226,108.98718 C172.438042,108.173762 180.904862,107.767058 189.186942,107.767058 L189.186942,105.104975 C189.186942,98.4497322 186.783696,93.5323212 181.977132,90.3525942 C177.170568,87.1728672 171.43975,85.5830276 164.784508,85.5830276 C159.164525,85.5830276 153.766465,86.766164 148.590165,89.1324725 C143.413865,91.4987809 139.124996,94.3826761 135.723427,97.7842445 L121.969328,81.589902 C128.032994,75.9699194 135.020893,71.7549957 142.933237,68.9450044 C150.845581,66.1350131 158.868725,64.7300386 167.002911,64.7300386 C176.468145,64.7300386 184.269451,66.0610671 190.407063,68.7231641 C196.544676,71.3852611 201.388141,74.8607245 204.937604,79.1496586 C208.487066,83.4385927 210.964258,88.2450846 212.369254,93.5692787 C213.77425,98.8934727 214.476737,104.217587 214.476737,109.541781 L214.476737,174.319151 L189.630622,174.319151 L189.630622,160.786892 Z M189.186942,125.736123 L183.197253,125.736123 C178.908319,125.736123 174.397611,125.920988 169.664995,126.290724 C164.932378,126.66046 160.569562,127.473866 156.576416,128.730968 C152.583271,129.988069 149.255699,131.762774 146.593602,134.055135 C143.931505,136.347496 142.600477,139.490203 142.600477,143.483348 C142.600477,145.997551 143.155072,148.105013 144.264279,149.805797 C145.373486,151.506581 146.815434,152.874583 148.590165,153.909843 C150.364897,154.945103 152.361439,155.684563 154.579854,156.128246 C156.798268,156.571928 159.016649,156.793767 161.235063,156.793767 C170.404508,156.793767 177.355435,154.353548 182.088052,149.473036 C186.820669,144.592525 189.186942,137.937383 189.186942,129.507409 L189.186942,125.736123 Z M228.948968,67.8358029 L228.948968,37 L255.126124,37 L255.126124,67.8358029 L281.746961,67.8358029 L281.746961,89.1324725 L255.126124,89.1324725 L255.126124,138.602861 C255.126124,143.335478 255.976504,147.254618 257.677288,150.360398 C259.378072,153.466177 263.186293,155.019044 269.102064,155.019044 C270.876795,155.019044 272.799392,154.834179 274.869912,154.464443 C276.940432,154.094708 278.789083,153.540112 280.41592,152.800641 L281.303281,173.65363 C278.936972,174.540996 276.127023,175.243483 272.873349,175.761113 C269.619675,176.278743 266.513942,176.537554 263.556056,176.537554 C256.457131,176.537554 250.68934,175.539283 246.252512,173.54271 C241.815684,171.546137 238.303247,168.810134 235.715097,165.334618 C233.126948,161.859103 231.352243,157.866017 230.39093,153.355242 C229.429617,148.844466 228.948968,144.001001 228.948968,138.824702 L228.948968,89.1324725 L228.948968,67.8358029 Z M359.696456,96.2313624 C357.330147,93.1255825 354.076522,90.4265524 349.935482,88.1341911 C345.794443,85.8418298 341.283735,84.6956663 336.403224,84.6956663 C332.114289,84.6956663 328.19515,85.5830187 324.645687,87.35775 C321.096225,89.1324814 319.32152,92.0903226 319.32152,96.2313624 C319.32152,100.372402 321.28109,103.29327 325.200288,104.994055 C329.119486,106.694839 334.850304,108.43257 342.392912,110.207302 C346.386057,111.094667 350.416116,112.277804 354.483209,113.756747 C358.550301,115.23569 362.247603,117.195259 365.575224,119.635515 C368.902845,122.075771 371.601875,125.107558 373.672395,128.730968 C375.742915,132.354377 376.77816,136.754166 376.77816,141.930466 C376.77816,148.437814 375.55805,153.946793 373.117795,158.457569 C370.677539,162.968344 367.423914,166.628673 363.356821,169.438664 C359.289728,172.248655 354.557182,174.282171 349.159041,175.539273 C343.7609,176.796374 338.177975,177.424915 332.410098,177.424915 C324.128018,177.424915 316.067901,175.909022 308.229504,172.877189 C300.391108,169.845356 293.883857,165.519513 288.707557,159.899531 L306.232942,143.483348 C309.190827,147.328599 313.036021,150.508279 317.768638,153.022481 C322.501255,155.536684 327.751423,156.793767 333.5193,156.793767 C335.441925,156.793767 337.401495,156.571928 339.398068,156.128246 C341.39464,155.684563 343.243291,154.982076 344.944075,154.020763 C346.64486,153.05945 348.012861,151.765394 349.048121,150.138557 C350.083381,148.51172 350.601003,146.515177 350.601003,144.148869 C350.601003,139.712041 348.567487,136.532361 344.500395,134.609736 C340.433302,132.68711 334.332755,130.764513 326.198569,128.841888 C322.205424,127.954522 318.323257,126.808359 314.551953,125.403363 C310.780649,123.998367 307.416105,122.149717 304.458219,119.857355 C301.500334,117.564994 299.134061,114.718072 297.359329,111.316503 C295.584598,107.914935 294.697246,103.700011 294.697246,98.6716058 C294.697246,92.7558346 295.917355,87.6535585 298.357611,83.3646245 C300.797866,79.0756904 304.014519,75.563254 308.007664,72.8272098 C312.00081,70.0911657 316.511517,68.0576498 321.539923,66.7266013 C326.568328,65.3955528 331.74455,64.7300386 337.068744,64.7300386 C344.759247,64.7300386 352.264769,66.0610671 359.585536,68.7231641 C366.906303,71.3852611 372.711066,75.4522928 377,80.9243811 L359.696456,96.2313624 Z"
              id="eats" stroke="#7DC340" stroke-width="2" fill="#7DC340"></path>
          </g>
        </g>
      </svg>
    </a>
    <app-search *ngIf="thisUrl !== '/home'" [onMenu]="true">
    </app-search>
    <div class="menus">
      <button class="button">
        <a routerLink="/login" *ngIf="!this.auth.isAuthenticated()">로그인</a>
        <a (click)="signout()" *ngIf="this.auth.isAuthenticated()">로그아웃</a>
      </button>
      <button class="button dark" *ngIf="!this.auth.isAuthenticated()">
        <a routerLink="/signup">회원가입</a>
      </button>
      <div class="hover-group">
        <button
          (mouseenter)="showMenu = true"
          class="member-button" *ngIf="this.auth.isAuthenticated()"
          [ngStyle]="{'background-image': 'url(' + this.auth.getUser().img_profile + ')'}">
        </button>
        <div
          *ngIf="showMenu"
          (mouseenter)="showMenu = true"
          (mouseleave)="showMenu = false"
          class="hover-menu">
          <a (click)="connectUser()">계정</a>
          <a routerLink="/orders">주문내역</a>
        </div>
      </div>
      <button class="icon-group" *ngIf="itemCount">
        <a routerLink="/checkout" class="icon">
          <svg width="22px" height="20px" viewBox="0 0 20 22" version="1.1">
            <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Group-3" fill-rule="nonzero" fill="#262626">
                <path d="M1.5,17.9907121 C1.5,19.3714239 2.61928813,20.4907121 4,20.4907121 L14.9473684,20.4907121 C16.3280803,20.4907121 17.4473684,19.3714239 17.4473684,17.9907121 L17.4473684,7.70123839 L1.5,7.70123839 L1.5,17.9907121 Z M0,6.20123839 L18.9473684,6.20123839 L18.9473684,17.9907121 C18.9473684,20.1998511 17.1565074,21.9907121 14.9473684,21.9907121 L4,21.9907121 C1.790861,21.9907121 0,20.1998511 0,17.9907121 L0,6.20123839 Z"
                  id="Rectangle-10"></path>
                <path d="M6.01315789,11.4024768 L6.01315789,5.21052632 C6.01315789,3.29933041 7.5624883,1.75 9.47368421,1.75 C11.3848801,1.75 12.9342105,3.29933041 12.9342105,5.21052632 L12.9342105,11.4024768 C12.9342105,11.8166903 13.269997,12.1524768 13.6842105,12.1524768 C14.0984241,12.1524768 14.4342105,11.8166903 14.4342105,11.4024768 L14.4342105,5.21052632 C14.4342105,2.47090328 12.2133072,0.25 9.47368421,0.25 C6.73406118,0.25 4.51315789,2.47090328 4.51315789,5.21052632 L4.51315789,11.4024768 C4.51315789,11.8166903 4.84894433,12.1524768 5.26315789,12.1524768 C5.67737146,12.1524768 6.01315789,11.8166903 6.01315789,11.4024768 Z"
                  id="Rectangle-3"></path>
              </g>
            </g>
          </svg>
          <span
            class="number">{{ itemCount }}</span>
        </a>
      </button>
    </div>
  </header>
</div>
  `
})
export class HeaderComponent implements OnInit {
  onMenu = false;
  isCart = true;
  isLoggedIn: boolean;
  showMenu: boolean;
  thisUrl: string;
  user;
  cart: Observable<ShoppingCart>;
  itemCount: number;
  cartSubscription: Subscription;
  isAuthenticated: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public auth: AuthService,
    private cartService: CartService
  ) {
    this.router.events.subscribe(data => {
      if (data instanceof NavigationEnd) {
        this.thisUrl = data.urlAfterRedirects;
      }
    });
  }

  ngOnInit() {
    this.cart = this.cartService.get();
    this.cartSubscription = this.cart.subscribe(cart => {
      this.itemCount = cart.items.map(i => i.quantity).reduce((prev, current) => prev + current, 0);
    });
    if (this.auth.isAuthenticated()) {
      this.user = this.auth.getUser();
    }
  }

  connectUser() {
    const pk = this.auth.getUser().pk;
    this.router.navigate(['user', `${pk}`]);
  }

  signout() {
    this.auth.signout();
    this.router.navigate(['home']);
    console.log('successfully logged out', this.auth.isAuthenticated());
  }
}
