/**
 * Created by ASSU on 2016/11/14.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image
} from 'react-native';
/*引入计时器类库*/
var TimerMixin=require('react-native-mixin');
/*引入json数据*/
var ImageDate=require('./ImageData.json');
var Dimensions=require('Dimensions');
var {width}=Dimensions.get('window');
var ScrollViewDemo=React.createClass({
    /*注册计时器*/
    mixins: [TimerMixin],
    /* 设置固定值*/
    getDefaultProps(){
        return {
            time: 1000
        }

    },
    /*设置可变的初始值*/
    getInitialState(){
        return {
            currentPage: 0
        }

    },
    render(){
        return (
            <View style={styles.container}>
                <ScrollView ref={scrollView}
                            horizontal={true}
                            {/*隐藏水平滚动条*/}
                            showsHorizontalScrollIndicator={false}
                            {/*自动分页*/}
                            pagingEnabled={true}
                            onMomentumScrollEnd={(e)=>this.onAnimationEnd(e)}
                            onScrollBeginDrag={this.onScrollBeginDrag}
                            onScrollEndDrag={this.onScrollEndDrag}
                >
                    {this.renderAllImage()}
                </ScrollView>
                <View style={styles.pagestyle}>
                    {this.renderpage()}
                </View>
            </View>
        );
    },
    /*调用开始拖拽*/
    onScrollBeginDrag(){
        /*停止定时器*/
        this.clearInterval(this.timer)

    },
    onScrollEndDrag(){
        this.startTimer()
    },
    /*实现一些复杂操作*/
    componentDidMount(){
        this.startTimer();
    },
    /*开启定时器*/
    startTimer(){
        /*  拿到scrollview*/
        var scrolView = this.refs.scrollView;
        var imgcount = ImageDate.data.length;
        /*添加定时器*/
        this.timer = this.setInterval(function () {
            /* 设置原点*/
            var activePage = 0;
            /*判断*/
            if ((this.state.currentPage + 1) >= imgcount) {
                activePage = 0
            } else {
                activePage = this.state.currentPage + 1
            }
            /*更新状态机*/
            this.setState({
                currentPage: activePage
            })
            var offsetx = activePage * width;
            scrolView.scrollResponderScrollTo({x: offsetx, y: 0, animated: true})
        }, this.props.time)

    },
    renderAllImage(){
        /* 数组*/
        var allImage = [];
        /*拿到图像数组*/
        var imagesArr = ImageDate.data;
        /*遍历*/
        for (var i = 0; i < imagesArr.length; i++) {
            /* 取出单独的每一个对象*/
            var imgItem = imagesArr[i];
            /*创建组件装入数组*/
            allImage.push(
                <Image key={i} source={{uri: imgItem.img}} style={{width: width, height: 100}}/>
            )
        }
        return allImage;
    },
    renderpage(){
        var pagecircle = [];
        var style;
        var imagesArr = ImageDate.data;
        for (var i = 0; i < imagesArr.length; i++) {
            style = (i == this.state.currentPage) ? {color: 'orange'} : {color: '#fff'}
            pagecircle.push(
                <Text key={i} style={[{fontSize: 20}, style]}>&bull;</Text>
            )

        }
        return renderpage;
    },
    /*当一帧滚动结束后调用*/
    onAnimationEnd(e){
        /*水平方向的偏移量*/
        var offsetx = e.nativeEvent.contentOffset.x;
        /*当前的页数*/
        var currentPage = Math.floor(offsetx / width);
        /*更新状态机 重新绘制ui*/
        this.setState({
            currentPage: currentPage
        })
    },
})

const styles = StyleSheet.create({
    container: {
       marginTop:25
    },
    pagestyle:{
        width:width,
        height:20,
        backgroundColor:'rgba(0,0,0,0.2)',
        position:'absolute',
        bottom:0,
        flexDirection:'row',
        alignItems:'center'



    }
});

AppRegistry.registerComponent('MyProject', () => MyProject);