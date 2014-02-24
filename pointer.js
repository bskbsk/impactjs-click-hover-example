/* 
 * Author Jakub Chamicewicz, contact me jakub.chamicewicz[at]gmail[dot]com :-)
 */


ig.module(

	"game.entities.pointer"

).requires(

	"impact.entity"

).defines(function() {

	EntityPointer = ig.Entity.extend({

		checkAgainst: ig.Entity.TYPE.B,

		size: {x : 1, y: 1},

		isClicking: false,

		lastMouseOver : null,

		lastClikedObject : null,

		init : function( x , y , settings ){

			this.lastClickedObject = null;
			this.parent( x, y, settings );
		},

		update: function() {

			//assign mouse position for entity

			this.pos.x = ig.input.mouse.x;
			this.pos.y = ig.input.mouse.y;

			//check if somebody is clicking

			this.isClicking = ig.input.pressed('mouse1');

			if (  this.lastMouseOver !== null)
				this.checkMouseOver();

			if ( this.lastClickedObject !== null ){

				var _this = this;

				//timeout used because on collision check we may get several entities, so we have to take
				//the one with the biggest zIndex ( the one on the top layer )

				setTimeout( function(){

					if ( _this.lastClickedObject  !== null ){

						if( typeof ( _this.lastClickedObject.clicked ) === 'function' ){

							_this.lastClickedObject.clicked();
							_this.lastClickedObject = null;

						} 

					}

				},50);

			}

		},

		checkMouseOver : function (){

			if( this.lastMouseOver !== null && !this.touches( this.lastMouseOver ) && typeof( this.lastMouseOver.mouseOut ) === 'function' ) {

				this.lastMouseOver.mouseOut();

				this.lastMouseOver = null;

			}

		},

		//check click/hover
		check : function( other ) {

			if ( this.isClicking === false) {

				if ( typeof ( other.mouseOver ) === 'function' && this.lastMouseOver !== other ) {

					other.mouseOver();

					this.lastMouseOver = other;

					return true;

				}

				return false;

			}

			if ( typeof ( other.clicked ) !== 'function' ) return false;

			if( this.lastClickedObject === null) return false;

			//check if this layer is above previouse one

			if ( this.lastClickedObject.zIndex < other.zIndex ){

				this.lastClickedObject = other;

				return true;

			}

			return false;

		}

	});

});
