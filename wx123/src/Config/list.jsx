import React, {Component, PropTypes} from 'react';
import { Router, Route, IndexRoute, hashHistory,browserHistory,Link} from 'react-router';
import ajaxmode from '../Ajax/ajax.js';
import Swiper from 'swiper';
import img from '../images/wxbanner.jpg';
import  '../Style/swiper-3.4.2.min.css';

class Banner extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            paginationClickable: true,
            centeredSlides: true,
            autoplay: 2500,
            autoplayDisableOnInteraction: false
        });
    }
    Link(event){
        let _thisDom = event.currentTarget;
        let _thisIDs = _thisDom.getAttribute("data-eventId");
        let _thisIDcx = _thisDom.getAttribute("data-thisIDcx");
        if(_thisIDs==1){
            hashHistory.push({
                pathname:"/Player/"+_thisIDcx,
            })
        }else if(_thisIDs==2){
            hashHistory.push({
                pathname:"/ListDetails/"+_thisIDcx,
            })
        }else if(_thisIDs==3){
            hashHistory.push({
                pathname:"/ListDetails/"+_thisIDcx,
            })
        }


    }
    render() {
        let item = this.props.server.map((value,index)=>{
           return <div data-eventId={value.contentType} data-thisIDcx={value.id} onClick={this.Link} key={index} className="swiper-slide">
               <img src={value.contentImg} alt=""/>
               <p className="imgTitle">
                   {value.contentTitle}
               </p>
               <div className="mcBanner"></div>
           </div>
        });
        return(
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    {item}
                </div>
                <div className="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets"></div>
            </div>
        )
    }
}
class ListNews extends React.Component{
    constructor(props){
        super(props);
        this.state={
            active:"1",
            listId:"2"
        };
        // this.context.router; // it works
    }
    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }
    Link(event){
        let _thisDom = event.currentTarget;
        let _thisIDs = _thisDom.getAttribute("data-eventId");
        let _thisIDcx = _thisDom.getAttribute("data-thisIDcx");
        if(_thisIDs==1){
            hashHistory.push({
                pathname:"/Player/"+_thisIDcx,
            })
        }else if(_thisIDs==2){
            hashHistory.push({
                pathname:"/ListDetails/"+_thisIDcx,
            })
        }else if(_thisIDs==3){
            hashHistory.push({
                pathname:"/ListDetails/"+_thisIDcx,
            })
        }


    }
    componentDidMount(){

    }

    render(){
        let headNav = [{id:"6",name:"看图说税"},{id:"2",name:"税考课堂"},{id:"3",name:"税考播报"},{id:"5",name:"税考FM"}];
        let items = headNav.map((value,index)=>{
            return <li data-listId={value.id} className="headnav" key={index} onClick={this.props.active}>{value.name}</li>
        });
        let itemList = this.props.lsitServer.map((value,index)=>{
            return(
            <Link data-eventId={value.contentType} data-thisIDcx={value.id} onClick={this.Link} key={index}  >
                <div className="listnewsall-same">
                    <div className="SameLeft">
                        <img src={value.contentImg} alt=""/>
                    </div>
                    <div className="SameRight">
                        <h3>{value.contentTitle}</h3>
                        <p>{value.contentDescription}</p>
                    </div>
                </div>
            </Link>

            )
        });
        return(
            <div>
                <div className="shouyeHead">
                    <ul className="clearfix">
                        {items}
                    </ul>
                </div>
                <div className="listnewsall">
                    {itemList}
                </div>
            </div>

        )
    }
}

export default class LLsk extends React.Component{
    constructor(props){
        super(props);
        this.state={
            server:"",
            lsitServer:"",
            listId:""
        }
    }
    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }
    componentWillUpdate(){

    }

    async active(event){
        var cxs = [{id:2,name:"税考课堂"},{id:3,name:"税考播报"},{id:6,name:"看图说税"},{id:5,name:"税考FM"}];
        var arr = [];
            let _thisDOM = event.currentTarget;
            let allDOM =  document.getElementsByClassName("headnav");
            let listId =  document.getElementsByClassName("listId");
            // js 对象转化为数组类型
            function transform(obj){
                for(var item in obj){
                    arr.push(obj[item]);
                }
                return arr;
            }
            transform(allDOM);
            arr.map((value,index)=>{
                if(index>3){
                    return false
                }else {
                   value.style.color = "#000"
                }
            });
            _thisDOM.style.color = "#21b100";
            sessionStorage.listid = _thisDOM.getAttribute("data-listId");
            cxs.map((value,index)=>{
               if(value.id == sessionStorage.listid ){
                   document.title = value.name;
               }
            });

       await this.setStateAsync({listId:  _thisDOM.getAttribute("data-listId")});
        let dataList = {
            "action": "wapContentAction",
            "method":"getContentList",
            "data": {
                pageNum: 1, //取那一页的数据
                numPerPage: 5, //一页取多少数据
                contentCategoryId: this.state.listId //内容类型id
            }
        };
        await ajaxmode(dataList).then((msg)=>{
            this.setStateAsync({
                lsitServer:msg.data.recordList
            });
        })
    }
    async componentDidMount() {
        let dataBanner = {
            "action": "wapContentAction",
            "method":"getContentList",
            "data": {
                pageNum: 1, //取那一页的数据
                numPerPage: 3, //一页取多少数据
                orderBy: "create_time desc" //按照时间倒序
            }
        };
        let dataList = {
            "action": "wapContentAction",
            "method":"getContentList",
            "data": {
                pageNum: 1, //取那一页的数据
                numPerPage: 5, //一页取多少数据
                contentCategoryId: 6 //内容类型id
            }
        };
       await ajaxmode(dataBanner).then((msg)=>{
           this.setStateAsync({
               server:msg.data.recordList
           });
        });
        await ajaxmode(dataList).then((msg)=>{
            this.setStateAsync({
                lsitServer:msg.data.recordList
            });
        })
    }
    render(){
        if(this.state.server==""||this.state.lsitServer==""){
             return false
        }else {
            let props = {
                server:this.state.server,
                lsitServer:this.state.lsitServer,
            };
            return(
                <div className="bannerlunbo">
                    <Banner {...props} />
                    <ListNews active={this.active.bind(this)} {...props}/>
                </div>
            )
        }

    }
}