/**@
* #Joystick
* @category Controls
* @requires Canvas or DOM
* Component to create joystick. 
* 
*/
Crafty.c('Joystick', {			
	_stick : null, 
	_pressed : null,
	_range: 20,

	init: function() {
		this.requires("Mouse");

		return this;
	},
    /**@
    * #.joystick
    * @comp Joystick
    * @sign public this .joystick(Object stickEntity, opts)
    * @param stickEntity - Created entity which move with touch events
    * @param  
    *
    * @example
    * ~~~
    * Crafty.e("2D, Canvas, track").attr({ x: 100, y: 100 })
    *	.joystick(
    *		Crafty.e("2D, Canvas, stick").attr({ x: 100, y: 100 }),
    *		{ mouseDebug : true, range: 20 }
	*	)	
	*
	*
    *
    * ~~~
    */
	joystick: function(stick, opts){
		this._stick = stick; //(stick ? stick : this.buildJoystickStick() );
		if (!this._stick) throw "Error: stick in joystick is not defined";

		this._onUp(); // move stick entity to center of base entity
		this._range = opts.range || 20;
		this._setVisibility( this.isTouchScreenAvailable() || opts.mouseDebug );
		this._initializeEvents(opts.mouseDebug);
		return this;
	},
    /**@
    * #._setVisibility
    * @comp Joystick
    * @sign public this ._setVisibility(Bool value)
    * @param value - param to set visibility of base entity and stick entity 
    */
	_setVisibility : function(value){
		this.visible = value; 
		this._stick.visible = value; 
	},
    /**@
    * #.buildJoystickBase
    * @comp Joystick
    * @sign public this .buildJoystickBase()
    *
    * Implement in near future for DOM and Canvas
    */
	buildJoystickBase: function()
	{
		// var canvas	= document.createElement( 'canvas' );
		// canvas.width	= 126;
		// canvas.height	= 126;
		
		// var ctx		= canvas.getContext('2d');
		// ctx.beginPath(); 
		// ctx.strokeStyle = "cyan"; 
		// ctx.lineWidth	= 6; 
		// ctx.arc( canvas.width/2, canvas.width/2, 40, 0, Math.PI*2, true); 
		// ctx.stroke();	

		// ctx.beginPath(); 
		// ctx.strokeStyle	= "cyan"; 
		// ctx.lineWidth	= 2; 
		// ctx.arc( canvas.width/2, canvas.width/2, 60, 0, Math.PI*2, true); 
		// ctx.stroke();
		
		// return canvas;
	},
    /**@
    * #.buildJoystickStick
    * @comp Joystick
    * @sign public this .buildJoystickStick()
    *
    * Implement in near future for DOM and Canvas
    */
	buildJoystickStick: function()
	{
		// var canvas	= document.createElement( 'canvas' );
		// canvas.width	= 86;
		// canvas.height	= 86;
		// var ctx		= canvas.getContext('2d');
		// ctx.beginPath(); 
		// ctx.strokeStyle	= "cyan"; 
		// ctx.lineWidth	= 6; 
		// ctx.arc( canvas.width/2, canvas.width/2, 40, 0, Math.PI*2, true); 
		// ctx.stroke();
		// return canvas;
	},
    /**@
    * #._initializeEvents
    * @comp Joystick
    * @sign public this ._initializeEvents(Bool mouseDebug)
    * @param mouseDebug - is mouse debug for debug on NO touch machine
    * 
    */
	_initializeEvents: function(mouseDebug){
		Crafty.addEvent( this, Crafty.stage.elem, 'touchstart', this._onDown);
		Crafty.addEvent( this, Crafty.stage.elem, 'touchmove'	, this._onMove);
		Crafty.addEvent( this, Crafty.stage.elem, 'touchend'	, this._onUp);
			
		if (mouseDebug){
			Crafty.addEvent( this, Crafty.stage.elem, 'mousedown', this._onDown);
			Crafty.addEvent( this, Crafty.stage.elem, 'mousemove'	, this._onMove);
			Crafty.addEvent( this, Crafty.stage.elem, 'mouseup'	, this._onUp);
		}
	},
    /**@
    * #._onDown
    * @comp Joystick
    * @sign public this ._onDown(event)
    * @param event - event from listener
    *
    */
	_onDown: function(event){
		this._pressed = true;
		var x = (this.isTouchScreenAvailable() ? event.touches[ 0 ].pageX : event.clientX ),
			y = (this.isTouchScreenAvailable() ? event.touches[ 0 ].pageY : event.clientY ),
			pos = Crafty.DOM.translate(x, y);

		this._stick.x = pos.x - this._stick.w/2;
		this._stick.y = pos.y - this._stick.h/2;
	},
    /**@
    * #._onMove
    * @comp Joystick
    * @sign public this ._onMove(event)
    * @param event - event from listener
    *
    */
	_onMove: function(event){
		if( this._pressed === true ){
			var x = (this.isTouchScreenAvailable() ? event.touches[ 0 ].pageX : event.clientX ),
				y = (this.isTouchScreenAvailable() ? event.touches[ 0 ].pageY : event.clientY ),
				pos = Crafty.DOM.translate(x, y);

			this._stick.x = pos.x - this._stick.w/2;
			this._stick.y = pos.y - this._stick.h/2;
		}
	},
    /**@
    * #._onUp
    * @comp Joystick
    * @sign public this ._onUp(event)
    * @param event - event from listener
    *
    */
	_onUp: function(event){
		this._pressed = false; 
		this._stick.x = this.x + this.w/2 - this._stick.w/2;
		this._stick.y = this.y + this.h/2 - this._stick.h/2;
	},
    /**@
    * #.isTouchScreenAvailable
    * @comp Joystick
    * @sign public this .isTouchScreenAvailable()
    * @return is touch is available on working machine
    *
    */
	isTouchScreenAvailable: function()
	{
		return 'createTouch' in document ? true : false;
	},
    /**@
    * #._deltaX
    * @comp Joystick
    * @sign public this ._deltaX()
    * @return value of amount of move entity from base in OX
    *
    */
	_deltaX: function(){ 
		return this._stick.x + this._stick.w/2 - (this.x + this.w/2);	
	},
    /**@
    * #._deltaY
    * @comp Joystick
    * @sign public this ._deltaY()
    * @return value of amount of move entity from base in OY
    *
    */
	_deltaY: function(){ 
		return this._stick.y +this._stick.h/2 - (this.y + this.h/2);	
	},
    /**@
    * #.isUp
    * @comp Joystick
    * @sign public this .isUp()
    * @return value is entity move to up
    *
    */
	isUp: function(){
		if( this._pressed === false )	return false;
		var deltaX	= this._deltaX(),
			deltaY	= this._deltaY();
		if( deltaY >= 0 )	return false;
		if( Math.abs(deltaY) < this._range && Math.abs(deltaY) < Math.abs(deltaX) ){
			return false;
		}
		return true;
	},
    /**@
    * #.isDown
    * @comp Joystick
    * @sign public this .isDown()
    * @return value is entity move to down
    *
    */
	isDown: function(){
		if( this._pressed === false )	return false;
		var deltaX	= this._deltaX(),
			deltaY	= this._deltaY();
		if( deltaY <= 0 )	return false;
		if( Math.abs(deltaY) < this._range && Math.abs(deltaY) < Math.abs(deltaX) ){
			return false;
		}
		return true;	
	},
    /**@
    * #.isRight
    * @comp Joystick
    * @sign public this .isRight()
    * @return value is entity move to right
    *
    */
	isRight: function(){
		if( this._pressed === false )	return false;
		var deltaX	= this._deltaX(),
			deltaY	= this._deltaY();
		if( deltaX <= 0 )	return false;
		if( Math.abs(deltaX) < this._range && Math.abs(deltaY) > Math.abs(deltaX) ){
			return false;
		}
		return true;	
	},
    /**@
    * #.isLeft
    * @comp Joystick
    * @sign public this .isLeft()
    * @return value is entity move to left
    *
    */
	isLeft: function(){
		if( this._pressed === false )	return false;
		var deltaX	= this._deltaX(),
			deltaY	= this._deltaY();
		if( deltaX >= 0 )	return false;
		if( Math.abs(deltaX) < this._range && Math.abs(deltaY) > Math.abs(deltaX) ){
			return false;
		}
		return true;	
	}		

});

