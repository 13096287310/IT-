import React, {Component, PropTypes} from 'react';
import { Router, Route, IndexRoute, hashHistory,browserHistory,Link} from 'react-router';
import ajaxmode from '../Ajax/ajax.js';
import $ from 'jquery';

class Banner extends React.Component{
    constructor(props){
        super(props);
        this.state={
            head:"",
            news:""
        };
    }
    componentDidMount(){
        var timestamp=new Date().getTime(); //获取当前时间戳
        function GetRandomNum(min,max) {
            var Range = max-min;
            var Rand = Math.random();
            return (min + Math.round(Rand * Range));
        }
        //生成分享，id栏目id 如税考播报=2
        function share(id){
            var shareNum;
            if(localStorage.getItem("share"+id)){
                var rn=GetRandomNum(1,5);
                if(rn>3){
                    shareNum=parseInt(localStorage.getItem("share"+id))+rn;
                }else{
                    shareNum=parseInt(localStorage.getItem("share"+id));
                }
            }else{
                var shareStr=timestamp.toString().substr(4,7);//对时间戳进行运算取值
                shareNum=Math.ceil(shareStr/(10000+id*1000))+GetRandomNum(10,50);
            }
            document.getElementById("memeda").innerHTML = shareNum;
            localStorage.setItem("share"+id,shareNum);
        }
        share(sessionStorage.styleid)
    }
    render() {
        return(
            <div className="LIstHead">
                <div className="HeadNews">
                    <div className="wxLogo"></div>
                    <div className="wxguanzhu">
                        <h3>{this.props.head}</h3>
                        <p><span id="memeda"></span>人关注</p>
                        <p><button> <Link to="/Guanzhu">关注</Link></button></p>
                    </div>
                </div>
            </div>
        )

    }
}
class ListNews extends React.Component{
    constructor(props){
        super(props);
        this.state={
            active:"0"
        }
    }
    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }
    async componentDidMount(){
        var cxs =[];
        var timestamp=new Date().getTime(); //获取当前时间戳
        function GetRandomNum(min,max) {
            var Range = max-min;
            var Rand = Math.random();
            return (min + Math.round(Rand * Range));
        }

        //生成播放次数
        function playNum(id){
            var playStr=timestamp.toString().substr(4,7)+id;//对时间戳进行运算取值
            // alert(playStr);
            var playNum=Math.ceil(playStr/(15000000+id*10000))+GetRandomNum(10,50);
            cxs.push(playNum)
        }
        this.props.server.map((value,index)=>{
            playNum(value.id)
        });

        $(".shangbuqi span").map((index,value)=>{
            $(value).text(cxs[index])
        })

    }
    async activeNav(){
        var target = document.getElementById("NewsSame");
        var targets = document.getElementById("NewsJiesao");
        target.style.display = 'block';
        targets.style.display = 'none';
        await this.setStateAsync({
            active:"0"
        })
    }
    async activeNavs(){
        var target = document.getElementById("NewsSame");
        var targets = document.getElementById("NewsJiesao");
        target.style.display = 'none';
        targets.style.display = 'block';
        await this.setStateAsync({
            active:"1"
        });
    }
    getPlatId(event){
        let _thisCls = event.currentTarget;
        sessionStorage.platXq = _thisCls.getAttribute("data-playid");
        sessionStorage.yinpin = _thisCls.getAttribute("data-playid");
    }
    render(){

        const cls = this.state.active == 0 ? "ListActive" : "ListActives";
        const clss = this.state.active == 0 ? "ListActives" : "ListActive";
        const bur = sessionStorage.styleid == 5 || sessionStorage.styleid ==6 ? "/ListDetails" : "/Player";
        const item = this.props.server;

        let items = item.map((value,index)=>{
            return (
            <Link onClick={this.getPlatId} data-playid={value.id} key={index} to={bur}>
                <div  className="NewsSame">
                    <div className="SameLeft">
                        <img src={value.contentImg} alt=""/>
                        <div className="mianfei">免费</div>
                    </div>
                    <div className="SameRight">
                        <h3>{value.contentTitle}</h3>
                        <p>06-16 18:00</p>
                        <p className="shangbuqi"><span className={value.id}>746</span>人次</p>
                    </div>
                </div>
            </Link>
            )
        });
        return(
            <div className="NewsBody">
                <div className="News-head">
                    <ul>
                        <li className={cls} onClick={this.activeNav.bind(this)}>
                            课堂
                        </li>
                        <li className={clss} onClick={this.activeNavs.bind(this)}>
                            介绍
                        </li>
                    </ul>
                </div>
                <div id="NewsSame" className="NewsSameAll">
                    {items}
                </div>
                <div id="NewsJiesao" className="NewsJiesao">
                     <h3>税考简介</h3>
                     <p>{this.props.news}</p>
                </div>
            </div>
        )
    }
}

export default class LLsk extends React.Component{
    constructor(props){
        super(props);
        var _this = this
        this.state={
            server:"",
            head:"",
            news:"",
            pageNum:"1",
            fenxiang:""
        }
        let cx = [
            {id:"2",head:"税考课堂",news:"知识点精析讲解，步步细分，在思维中构建知识点框架。"},
            {id:"3",head:"税考播报",news:"教材对比、大纲变化、考试锦囊、解题技巧，在这里，应有尽有。"},
            {id:"5",head:"税考FM",news:"耳听为实，静听税考。为知识搭建由耳至脑的高速通道。"},
            {id:"6",head:"看图说税",news:"知识不无聊，学习很轻松，全方位趣味图解，带你体验不一样的税务师。"}
        ];
        cx.map((value,index)=>{
            if(_this.props.location.query.id == value.id){
                document.title=value.head
            }
        })
    }
    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }
     componentWillUpdate(){
        var _this = this;
        //获取滚动条当前的位置
        function getScrollTop(){
            var scrollTop = 0;
            if (document.documentElement && document.documentElement.scrollTop) {
                scrollTop = document.documentElement.scrollTop;
            } else if (document.body) {
                scrollTop = document.body.scrollTop;
            }
            return scrollTop;
        }
        //获取当前可视范围的高度
        function getClientHeight() {
            var clientHeight = 0;
            if (document.body.clientHeight && document.documentElement.clientHeight) {
                clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
            }
            else {
                clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
            }
            return clientHeight;
        }
        //获取文档完整的高度
        function getScrollHeight() {
            return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        }
        var data = {
            "action": "wapContentAction",
            "method":"getContentList",
            "data": {
                pageNum:this.state.pageNum, //取那一页的数据
                numPerPage: 5, //一页取多少数据
                contentCategoryId:this.props.location.query.id //内容类型id
            }
        };
        window.onscroll = function (){
            var cx = [];
            var ck = [];
            var cy = [];
            if (getScrollTop() + getClientHeight() == getScrollHeight()){
                _this.setState({
                    pageNum:++_this.state.pageNum
                });
                data.data.pageNum = _this.state.pageNum;
                ajaxmode(data).then((msg)=>{
                    ck=_this.state.server;
                    cy=msg.data.recordList;
                    cx = ck.concat(cy);
                    _this.setState({
                        server:cx
                    });
                });
            }
        };
    }
    async componentDidMount() {
        sessionStorage.styleid = this.props.location.query.id;
        var data = {
            "action": "wapContentAction",
            "method":"getContentList",
            "data": {
                pageNum: 1, //取那一页的数据
                numPerPage: 5, //一页取多少数据
                contentCategoryId:  sessionStorage.styleid //内容类型id
            }
        };
        await ajaxmode(data).then((msg)=>{
            this.setStateAsync({
                server:msg.data.recordList
            });
        });
        var _this = this;
        let cx = [
            {id:"2",head:"税考课堂",news:"知识点精析讲解，步步细分，在思维中构建知识点框架。"},
            {id:"3",head:"税考播报",news:"教材对比、大纲变化、考试锦囊、解题技巧，在这里，应有尽有。"},
            {id:"5",head:"税考FM",news:"耳听为实，静听税考。为知识搭建由耳至脑的高速通道。"},
            {id:"6",head:"看图说税",news:"知识不无聊，学习很轻松，全方位趣味图解，带你体验不一样的税务师。"}
        ];
        cx.map((value,index)=>{
            if(value.id ==  sessionStorage.styleid){
                _this.setState({
                    head:value.head,
                    news:value.news,
                })
            }
        });
    }

    render(){
        if(this.state.server ==""){
            return false
        }else {
            let props ={
                server:this.state.server,
                head:this.state.head,
                news:this.state.news,
            };
            return(
                <div className="all">
                    <Banner {...props} />
                    <ListNews {...props}/>
                </div>
            )
        }

    }
}