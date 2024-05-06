( function( window ) {

'use strict';

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );

(function() {
    if (!String.prototype.trim) {
      String.prototype.trim = function() {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
      };
    }

    [].slice.call( document.querySelectorAll( 'input.input__field, textarea.input__field' ) ).forEach( function( inputEl ) {
        if( inputEl.value.trim() !== '' ) {
            classie.add( inputEl.parentNode, 'input--filled' );
        }
        inputEl.addEventListener( 'focus', onInputFocus );
        inputEl.addEventListener( 'blur', onInputBlur );
    } );

    function onInputFocus( ev ) {
        classie.add( ev.target.parentNode, 'input--filled' );
    }

    function onInputBlur( ev ) {
        if( ev.target.value.trim() === '' ) {
            classie.remove( ev.target.parentNode, 'input--filled' );
        }
    }
})();

function autoExpand() {
  const textarea = document.getElementById("autoExpand");
  textarea.style.height = "auto"; // Reset the height to auto
  textarea.style.height = textarea.scrollHeight + "px"; // Set height to scrollHeight
}

function charCount() {
  const charCount = document.getElementById("charCount");
  const textarea = document.getElementById("autoExpand");
  const maxLength = parseInt(textarea.getAttribute("maxlength"));
  charCount.textContent = `${textarea.value.length}/${maxLength}`;
      
  // Check if the length exceeds the maximum and trim the content if needed
  if (textarea.value.length > maxLength) {
      textarea.value = textarea.value.substring(0, maxLength);
      charCount.textContent = `${maxLength}/${maxLength}`;
  }
}

document.addEventListener("input", autoExpand);
document.addEventListener("focus", autoExpand);