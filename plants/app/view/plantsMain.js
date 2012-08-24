Ext.define('plants.view.plantsMain',{
	extend : 'Ext.Panel',
	xtype: 'plantsMain',
	
	config : {
		layout 	: {type:"vbox", align:'stretch'},
		id 		:'plantsMain',
		defaults: {flex:1},

		items 	: [
		        {
		        	xtype  	: 'button',
		        	text 	: '식물찾기',
		        	id 		: 'buttonSearch',
		        	itemId 	: 'searchPlants',
		        	action 	: 'movePage',
		        	flex 	: 10,
		        },
		        {
		        	xtype 	: 'button',
		        	id  	: 'buttonGallery',
		        	itemId 	: 'galleryBoard',
		        	text 	: '갤러리',
		        	action 	: 'movePage',
		        	flex 	: 10,
		        },
		        {
					xtype 	: 'button',
					id  	: 'buttonMyPage01',
					itemId 	: 'mypage01',
					//cls: 'btnAction',
					text 	: '마이페이지',
					action 	: 'movePage'
				}
		]
	}
});