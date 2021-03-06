Ext.define('plants.controller.searchController', {
    extend: 'Ext.app.Controller',
    requires: [
           'plants.view.selectLeafPart'
    ],
    config: {
//    	stores: [
//    	      'searchData'
//    	],
    	refs: {
    		mainView 		 : '#mainView',
    		searchPlants 	 : '#searchPlants',
    		searchRerultPanel: '#searchRerultPanel',
    		detailResult 	 : 'detailResult',
    		resultInfo 		 : 'resultInfo',
    		resultImg        : '#resultImg',
    		overlay 		 : 'overlay',
    		searchMainImg 	 : '#searchMainImg',
    		explane 		 : '#explane',
        },
        control: {
        	'[action=movePage]': {
                tap: 'onMovePage'
            },
            '[action=actionBack]': {
            	tap: 'onActionBack'
            },            
            '[action=showSelect]': {
            	tap: 'onShowSelect'
            },
            '[action=selectLeaf]': {
            	tap: 'onSelectLeaf'
            },
            '[action=clickResultImage]': {
            	tap: 'onClickResultImage'
            },
            '[action=tapMainImg]': {
            	tap: 'onTapMainImg'
            },
            'overlay button[action=closeOverlay]':{
            	tap: 'onCloseOverlay'
            },
            'detailResult':{
				itemtap : 'resultListTap'
			},
			'mainView':{
				 pop 	 	: 'pagePop',
			 	 push 	 	: 'pagePush',
			 	 initialize : 'mainInit',
			},
			'searchMainImg':{
				//tap : 'tapSearchMainImg'
			}
        }
    },
    
    
    ///////////////////  common  /////////////////////////////////////////////////
    
    onMovePage : function(button, e, options){
    	this.getMainView().push({xtype: button.getItemId()});
    	console.log('plants  :  ' + button.getItemId());
    },
    onActionBack : function(button, e, options){
    	this.getMainView().pop(1);
    },
   
    //////////////////////////////////////////////////////////////////////////////
    
    initStoreFilter : function(){
    	Ext.getStore('searchData').clearFilter();
    	leafCondition = 'none';
    	fruitCondition = 'none';
    	flowerCondition = 'none';
    },
    
    //////////////////// main ////////////////////////////////////////////////////
    
    pagePop: function(navi,view, eOpts){
    	console.log('pop : ' + navi.getActiveItem().getId());
    	
    	if(navi.getActiveItem().getId() == 'plantsMain'){
    	//	navi.getNavigationBar().setHidden(true);
    		this.initStoreFilter();
    	}
    },
    
    pagePush: function(navi,view, eOpts){
    	console.log('push : ' + navi.getActiveItem().getId());
//    	if(navi.getActiveItem().getId() == 'plantsMain'){
//    		navi.getNavigationBar().setHidden(false);
//    	}
    },
    
    mainInit: function(me){
    	console.log('init');
    	//me.getNavigationBar().setHidden(true);
    },
    //////////////////////////////////////////////////////////////////////////////
    
    
    
    /////////////////////////  resultInfo   //////////////////////////////////////
    
    resultListTap:function(list, index, target,record, e, eOpts){
    	this.getMainView().push({xtype: 'resultInfo'});
    
    	this.getResultInfo().setHtml(
    			"<div style='margin:5%; width:90%;'>" + 
    				record.get('body') +
    		    "</div>"
    	);
    	
    	this.getResultImg().setSrc(record.get('url'));
    },
    
    //////////////////////////////////////////////////////////////////////////////
    
    onClickResultImage : function( img_m, e, eOpts ){
    	this.getSearchMainImg().setSrc(img_m.getSrc());
    	this.getSearchMainImg().setItemId(img_m.getItemId());
    },
    
    onTapMainImg : function( img_m, e, eOpts ){
    	if(img_m.getItemId() == -1)
    		return;
    	
    	var selectRecord = Ext.getStore('searchData').getData().getAt(img_m.getItemId()-1);
    	this.getMainView().push({xtype: 'resultInfo'});
    	//this.getExplane().setValue(filterData.getAt(img_m.getItemId()-1).get('body')); // +1한거 빼줘야 한다. 
    	this.getResultInfo().setHtml(
    			"<div style='margin:5%; width:90%;'>" + 
    				selectRecord.get('body') +
    		    "</div>"
    	);
    	
    	this.getResultImg().setSrc(selectRecord.get('url'));
    },
    
    //////////////////////// overlay /////////////////////////////////////////////
    
    onShowSelect: function(button, e, options){
    	
    	if(button.getId()=='buttonLeaf'){
    		this.getOverlay().add([{
    								xtype:'selectLeafPart',
    								flex:10,
    		}]);
    	}
    	this.getOverlay().show();
    },
    
    onCloseOverlay : function(button, e, options){
    	this.getOverlay().removeAll(true,false);
    	this.getOverlay().hide();
    },
    
    onSelectLeaf : function(button, e, options){
  
    	leafCondition = button.getText();
    	//스토어에 필터추가 후 로드 데이터  
    	Ext.getStore('searchData').clearFilter();
    	Ext.getStore('searchData').setFilters([
    	       {property: "leaf", value: leafCondition},
    	]);
    	
    	if(fruitCondition == 'none'){
    		console.log('none : fru');
    	}
    	if(flowerCondition == 'none'){
    		console.log('none : flo');
    	}
    	
    	
    	this.getSearchRerultPanel().removeAll(true,true);
    	this.getSearchMainImg().setItemId(-1);
    	
    	var filterData = Ext.getStore('searchData').getData();
    
    	for(var i=0;i<filterData.getCount() && i < 10;i++){
    		if(i==0){
    			this.getSearchMainImg().setSrc(filterData.getAt(i).get('url'));
    			this.getSearchMainImg().setItemId(1);
    		}
    		this.getSearchRerultPanel().add([{
    	    	xtype 	:'panel',
		    	layout 	:'fit',
		    	margin 	:'5 5 5 5',
		    	style 	: "background-image:url('./resources/images/frame_Large.png');" +
				  'border:0;' +
				  'background-color:transparent;' + 
				  'background-repeat:no-repeat;' + 
				  'background-size:100% 100%;',
		    	items 	:{
		    		xtype 	: 'img',
		    		action 	: 'clickResultImage',
		    		itemId  : i+1,								// 0이 입력되면 값이 들어가지 않는다. 그래서 +1 
	    	    	src 	: filterData.getAt(i).get('url'),
	    	    	width 	: '100%',
			   	    height 	: '100%',
		        	mode 	: 'none',
		        	padding : '5 5 5 5',
		    	}
    	    }]);
    	}
    	
    	// 오버레이 숨기기 
    	this.getOverlay().removeAll(true,false);
    	this.getOverlay().hide();
    },
    
    //////////////////////////////////////////////////////////////////////////////
    
    
    /////////////////////////// store ////////////////////////////////////////////
    searchDataLoad : function(button, e, options){
    	console.log('testtest');
    },
    /////////////////////////////////////////////////////////////////////////////
});

var leafCondition = 'none';
var fruitCondition = 'none';
var flowerCondition = 'none';