ig.module(

	"game.entities.game1.sampleentity"

).requires(

	"impact.entity"

).defines(function(){

	EntitySampleentity = ig.Entity.extend({

		size: { x : 1, y : 1 },

		type: ig.Entity.TYPE.B,

		wasClicked : false,

		name: "sampleentity",

		mouseIn : 0,

		clicked : function (){

			if( this.wasClicked ) return false;
			
			console.log( " click click ");

			this.wasClicked = true;

			return true;

		},

		mouseOver : function (){

			if ( this.mouseIn !== 0 ) return false;

			console.log( "mouse in ");

			this.mouseIn++;

		},

		mouseOut : function (){

			if ( this.fixed ) return false;

			if( this.mouseIn === 0 ) return false;

			console.log( "mouse out ");

			this.mouseIn--;

		}
		
	});

});
