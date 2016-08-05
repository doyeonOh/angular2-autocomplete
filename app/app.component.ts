import { Component, ViewChild, OnInit } from '@angular/core';
import { CityService } from './services/city.service';
import { City, RelatedItem } from './models/city.model';

@Component({
  selector: 'my-app',
  template: `
    <div>
      <input #searchBox type="text" (keyup)="onKeyup($event)" placeholder="도시를 입력하세요" >
      <ul *ngFor="let city of autoCompleteCitys">
        <li (click)="onSelectCity($event)"><a>{{ city.cityNameLN }}</a></li>
      </ul>
    </div>
  `,
  providers: [ CityService ],
  styles: [`
    input{
      display: block;
      height: 34px;
      padding: 6px 12px;
      font-size: 14px;
      line-height: 1.42857143;
      color: #555;
      background-color: #fff;
      background-image: none;
      border: 1px solid #ccc;
      border-radius: 4px;
      -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
      box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
      -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
      -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
      transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    }
    a{
      display: block;
      padding: 3px 20px;
      clear: both;
      font-weight: 400;
      line-height: 1.42857143;
      color: #333;
      white-space: nowrap;
      background-color: transparent;
    }
    ul{
      display: block;
      position: absolute;
      float: left;
      min-width: 160px;
      padding: 5px 0;
      margin: 2px 0 0;
      font-size: 14px;
      text-align: left;
      list-style: none;
      background-color: #fff;
      -webkit-background-clip: padding-box;
      background-clip: padding-box;
      border: 1px solid #ccc;
      border: 1px solid rgba(0,0,0,.15);
      border-radius: 4px;
      -webkit-box-shadow: 0 6px 12px rgba(0,0,0,.175);
      box-shadow: 0 6px 12px rgba(0,0,0,.175)
    }
    li{
      text-indent: 5px;
      display: list-item;
      text-align: -webkit-match-parent;
      list-style-type: none;
    }
    li:hover{
      background-color: #EEEEEE;
      cursor: pointer;
    }
  `]
})
export class AppComponent implements OnInit {
  @ViewChild('searchBox')
  searchBox;

  citys: City[];
  autoCompleteCitys: City[];

  constructor(
    private _cityService: CityService
  ) { }

  onSelectCity(e){
    let chooseText = e.target.text;
    this.searchBox.nativeElement.value = chooseText;
    this.searchBox.nativeElement.focus();
    this.resetAutoComplete();
  }

  resetAutoComplete(){
    this.autoCompleteCitys = [];
  }

  onKeyup(e){
    let searchText = e.target.value;

    if(searchText.length >= 2){
      this.autoCompleteCitys = this.citys.filter(
        (city) => { return city.cityNameLN.indexOf(searchText) != -1 }
      );
    }else{
      this.resetAutoComplete();
    }
  }

  ngOnInit(){
    this.getCitys();
    this.resetAutoComplete();
  }

  getCitys(): void{
    this._cityService.getCitys()
                .subscribe(
                    result    => this.citys = result,
                    error     => console.error(error),
                    ()        => console.log("this is finally code")
    );
  }
}
