/**
 * Created by Cx on 2017/6/13 0013.
 */
import React from 'react';
import PropTypes from 'prop-types';
import ajaxmode from '../Ajax/ajax.js';
import $ from 'jquery';
import  'babel-polyfill';
export default class ListDetails extends React.Component{
    constructor(props){
        super(props);
        this.state={
            Head:"",
            head:"",
            News:"",
            timeState:0,
            time:"0",
            musicUrl:""
        }
    }
    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }
    async componentDidMount(){
        var data ={
            "action": "wapContentAction",
            "method":"getContentDetails",
            "data": {
                "id": sessionStorage.yinpin //内容id
            }
        };
        const buer = sessionStorage.styleid==6 ? true:false;
        if(buer){
            await ajaxmode(data).then((msg)=>{
                this.setStateAsync({
                    Head:msg.data.contentTitle,
                    News:msg.data.contentDetails,
                });
            });
            $(".ListDetails .ListDetailsNews").html(this.state.News)
        }else {
            await ajaxmode(data).then((msg)=>{
                this.setStateAsync({
                    Head:msg.data.contentTitle,
                    time:msg.data.contentAudio.audioDuration,
                    News:msg.data.contentDetails,
                    head:msg.data.contentAudio.audioTitle,
                    musicUrl:msg.data.contentAudio.audioUrl,
                    HeadNext:msg.data.contentDescription,
                });
            });
            console.log(this.state.News)
            $(".ListDetails .ListDetailsNews").html(this.state.News)
        }


    }
    paly(){
        var audio = document.getElementById("audio");
        if(this.state.timeState==0){
            audio.play();
            this.setState({
                timeState:1
            });
            var _this = this;
            audio.addEventListener('ended',function () {
                _this.setState({
                    timeState:0
                });
            })
        }else if(this.state.timeState==1){
            audio.pause();
            audio.currentTime = 0;
            this.setState({
                timeState:0
            })
        }
    }
    render(){
        const buers = sessionStorage.styleid==6 ? true:false;
        if(buers){
            if(this.state.Head==null||this.state.Head==""){
                return false
            }else {
                const cls = this.state.timeState==1 ? "towButton":"onebutton";
                const clss = sessionStorage.styleid==6 ? "audios":"audio";
                return(
                    <div className="ListDetails">
                        <div className="ListDetailsHead">
                            <div>
                                {this.state.Head}
                            </div>
                            <div className="ListDetailsHead-news">
                                {this.state.HeadNext}
                            </div>
                            <div className="neewsWekk">
                                <p>2017/6/16 18:00</p>
                                <p>来源：<span>123在线教育</span></p>
                            </div>
                        </div>
                        <div className="ListDetailsNews">
                            {this.state.News}
                        </div>
                        <div className={clss}>
                            <div className="audio-head">
                                {this.state.head}
                                <time>{this.state.time}</time>
                            </div>
                            <div className="audio-play">
                                <button className={cls} onClick={this.paly.bind(this)}></button>
                                <audio id="audio" src={this.state.musicUrl} />
                            </div>
                        </div>
                    </div>
                )
            }
        }else {
            if(this.state.musicUrl==null||this.state.musicUrl==""){
                return false
            }else {
                const cls = this.state.timeState==1 ? "towButton":"onebutton";
                const clss = sessionStorage.styleId==6 ? "audios":"audio";
                return(
                    <div className="ListDetails">
                        <div className="ListDetailsHead">
                            <div>
                                {this.state.Head}
                            </div>
                            <div className="ListDetailsHead-news">
                                {this.state.HeadNext}
                            </div>
                            <div className="neewsWekk">
                                <p>2017/6/16 18:00</p>
                                <p>来源：<span>123在线教育</span></p>
                            </div>
                        </div>
                        <div className="ListDetailsNews">
                            {this.state.News}
                        </div>
                        <div className={clss}>
                            <div className="audio-head">
                                {this.state.head}
                                <time>{this.state.time}</time>
                            </div>
                            <div className="audio-play">
                                <button className={cls} onClick={this.paly.bind(this)}></button>
                                <audio id="audio" src={this.state.musicUrl} />
                            </div>
                        </div>
                    </div>
                )
            }
        }



    }
}

