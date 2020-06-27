'use strict';

console.log('>> Ready :)');



// Blotter Liquid distort code

(function(Blotter) {

  Blotter.LiquidDistortMaterial = function() {
    Blotter.Material.apply(this, arguments);
  };

  Blotter.LiquidDistortMaterial.prototype = Object.create(Blotter.Material.prototype);

  Blotter._extendWithGettersSetters(Blotter.LiquidDistortMaterial.prototype, (function () {

    function _mainImageSrc () {
      var mainImageSrc = [
        Blotter.Assets.Shaders.Noise3D,

        "void mainImage( out vec4 mainImage, in vec2 fragCoord )",
        "{",
        "    // Setup ========================================================================",

        "    vec2 uv = fragCoord.xy / uResolution.xy;",
        "    float z = uSeed + uGlobalTime * uSpeed;",

        "    uv += snoise(vec3(uv, z)) * uVolatility;",

        "    mainImage = textTexture(uv);",

        "}"
      ].join("\n");

      return mainImageSrc;
    }

    return {

      constructor : Blotter.LiquidDistortMaterial,

      init : function () {
        this.mainImage = _mainImageSrc();
        this.uniforms = {
          uSpeed : { type : "1f", value : 1.0 },
          uVolatility : { type : "1f", value : 0.15 },
          uSeed : { type : "1f", value : 0.1 }
        };
      }
    };

  })());

})(
  this.Blotter
);


// DOM elements calling

const mainTop =document.querySelector('.page__main--top')
const mainBottom = document.querySelector('.page__main--bottom')
const elem = document.querySelector('.distortion-text');

function hideBottom(){
    mainBottom.classList.add(".hidden")
    console.log(mainBottom)
}

//COLOR


function colorGradient(fadeFraction, rgbColor1, rgbColor2, rgbColor3) {
  var color1 = rgbColor1;
  var color2 = rgbColor2;
  var fade = fadeFraction;

  // Do we have 3 colors for the gradient? Need to adjust the params.
  if (rgbColor3) {
    fade = fade * 2;

    // Find which interval to use and adjust the fade percentage
    if (fade >= 1) {
      fade -= 1;
      color1 = rgbColor2;
      color2 = rgbColor3;
    }
  }

  var diffRed = color2.red - color1.red;
  var diffGreen = color2.green - color1.green;
  var diffBlue = color2.blue - color1.blue;

  var gradient = {
    red: parseInt(Math.floor(color1.red + (diffRed * fade)), 10),
    green: parseInt(Math.floor(color1.green + (diffGreen * fade)), 10),
    blue: parseInt(Math.floor(color1.blue + (diffBlue * fade)), 10),
  };

  const color = 'rgb(' + gradient.red + ',' + gradient.green + ',' + gradient.blue + ')';

  return color
}

// BLOTTER - apply effect

var text = new Blotter.Text("META", {
    family : "helvetica",
    size : 200,
    fill : '#171717',
    paddingLeft : 40,
    paddingRight : 40
  });
  
  var material = new Blotter.LiquidDistortMaterial();
  
  // Play with the value for uSpeed. Lower values slow
  // down animation, while higher values speed it up. At
  // a speed of 0.0, animation is stopped entirely.
  material.uniforms.uSpeed.value = 0.20;
  
  // Try uncommenting the following line to play with
  // the "volatility" of the effect. Higher values here will
  // produce more dramatic changes in the appearance of your
  // text as it animates, but you will likely want to keep
  // the value below 1.0.
  //material.uniforms.uVolatility.value = 0.30;
  
  var blotter = new Blotter(material, {
    texts : text
  });
  

var scope = blotter.forText(text);
  
scope.appendTo(elem);