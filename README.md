#  Joystick for Crafty JS - Javascript game engine
A joystick create as component for Crafty JS. Base on [VirtualJoystick.js](https://github.com/jeromeetienne/virtualjoystick.js).
 
***

##Example using with Crafty
<code>
    Crafty.e("2D, Canvas, track").attr({ x: 100, y: 100 }) //base element
	.joystick(
	    Crafty.e("2D, Canvas, stick").attr({ x: 100, y: 100 }), //stick element
	    { mouseSupport : true, range: 20 }
	)
</code>

