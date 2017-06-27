import React from 'react';
import PropTypes from 'prop-types';
import ajaxmode from '../Ajax/ajax.js';
import {system} from '../Component/Config.js';//引入默认配置
import renshu from '../images/renshu.png';
class PlayerTop extends React.Component{
    constructor(props){
        super(props);
    }
    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }
    async componentDidMount(){
        var _this = this
        setTimeout(function () {
            var player = polyvObject('#plv').videoPlayer({
                'width':'100%',
                'height':"8rem",
                'vid' :_this.props.vid ,
                'flashParams':{'wmode':'window','allowScriptAccess':'always','allowFullScreen':'true'},
                'flashvars':{'autoplay':'false'}
            });
        },300)

    };
    render(){
        return(
           <div id="plv"></div>
        )
    }
}
class PlayerNews extends React.Component{
    constructor(props){
        super(props);
        this.state={
            active:""
        }
    }
     setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }
    async activeNav(){
        var target = document.getElementById("NewsSame");
        var targets = document.getElementById("NewsJiesao");
        target.style.display = 'none';
        targets.style.display = 'block';
        await this.setStateAsync({
            active:"0"
        })
    }
    async activeNavs(){
        var target = document.getElementById("NewsSame");
        var targets = document.getElementById("NewsJiesao");
        target.style.display = 'block';
        targets.style.display = 'none';
        await this.setStateAsync({
            active:"1"
        });

    }
    async componentDidMount(){
        var timestamp=new Date().getTime(); //获取当前时间戳
        function GetRandomNum(min,max)
        {
            var Range = max-min;
            var Rand = Math.random();
            return (min + Math.round(Rand * Range));
        }

        //生成播放次数
        function playNum(id){
            var playStr=timestamp.toString().substr(4,7)+id;//对时间戳进行运算取值
            var playNum=Math.ceil(playStr/(15000000+id*10000))+GetRandomNum(10,50);
            var _thisSpan = document.getElementById("xqshangbuqi")
            _thisSpan.innerHTML= playNum
        }
        playNum(sessionStorage.platXq)

        var _thisPn = document.getElementById("zhibogaiyao");
        _thisPn.innerHTML =  this.props.zhibogaiyao
    }
    render(){
        const cls = this.state.active == 0 ? "ListActives" : "ListActive";
        const clss = this.state.active == 0 ? "ListActive" : "ListActives";
        const clssx =  sessionStorage.styleid == 3 ? "NewsSamesx" : "NewsSame";
        const clssxs =  sessionStorage.styleid == 3 ? "NewsSamesx" : "NewsSamecx";

       return(
           <div className="playNews">
               <div className="playNews-one">
                   <h3>{this.props.head}</h3>
                   <p className="shijian">时间</p>
                   <div className="xiayiwei clearfix"><p>2017-06-16 18:00</p><p><img src={renshu} alt=""/><span id="xqshangbuqi">746</span>人次</p></div>
               </div>
               <div className="playTeacher">
                   <div className="playTeacher-head">
                       <ul className="clearfix">
                           <li className={clss} onClick={this.activeNav.bind(this)}>视频简介</li>
                           <li id={clssxs} className={cls} onClick={this.activeNavs.bind(this)}>主讲老师</li>
                       </ul>
                   </div>
                   <div id={clssx} className="zhibojianjie">
                       <h3>主讲人 : <span>{this.props.teacherNaem}</span></h3>
                       <div>老师简介 : <p>{this.props.teacherSummary}</p></div>
                   </div>
                   <div id="NewsJiesao" className="zhibojianjiezixun">
                       <div>视频概要 : <p id="zhibogaiyao"></p></div>
                   </div>
               </div>
           </div>
       )
    }
}
export default class Player extends React.Component{
    constructor(props){
        super(props);
        this.state={
            vid:"",
            server:""
        }
    }
    async componentDidMount(){
       var data = {
           "action": "wapContentAction",
           "method":"getContentDetails",
           "data": {
               "id": sessionStorage.platXq //内容id
           }
       };
       ajaxmode(data).then((msg)=>{
           this.setState({
               server:msg.data
           })
       })
    }
    render(){
        if(this.state.server==""){
            return false
        }else {
            let props={
                vid:this.state.server.subjectVideo.vid,
                head:this.state.server.contentTitle,
                teacherNaem:this.state.server.contentTeacher.teacherName,
                teacherSummary:this.state.server.contentTeacher.teacherSummary,
                zhibogaiyao:this.state.server.contentDetails
            };
            return(
                <div className="PlayerBody">
                    <PlayerTop {...props} />
                    <PlayerNews {...props}/>
                </div>
            )
        }


    }
}
