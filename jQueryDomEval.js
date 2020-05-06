const jsdom = require('jsdom');
const jquery = require('jquery');

const script = require('./iframeDOM');
const __DEBUG = true;
const __DEBUG_2 = false;

const jQueryDomEval = (scriptedCode) => {
  __DEBUG_2 && console.log('\n*** scriptedCode ***: \n \n', scriptedCode)
      
  const { JSDOM } = jsdom;
  // const scriptedCodeSerialized = new XMLSerializer().serializeToString(iFrameDoc);
  // const scriptedCodeSerialized = new XMLSerializer().serializeToString(scriptedCode);
  const dom = new JSDOM(`<!DOCTYPE html> ${scriptedCode}`, { runScripts: "outside-only", resources: "usable" });
  // const dom = new JSDOM(`<!DOCTYPE html> ${scriptedCodeSerialized}`, { runScripts: "dangerously" });
  const $ = jquery(dom.window)
  
  let modifiedDOM;
  
  __DEBUG && console.log('dom.window.document.body.innerHTML: ', dom.window.document.body.innerHTML); // "Hello world"
  $(dom.window.document).ready(function() {
    $("button").addClass("animated shake");
    console.log('hi 2');
    modifiedDOM = dom.window.document.body.innerHTML;
    // __DEBUG && console.log('dom.window.document.body.innerHTML: ', dom.window.document.body.innerHTML); // "Hello world"
    __DEBUG && console.log('modifiedDOM: ', modifiedDOM); // "Hello world"
  });

  $('.well', dom.window.document.body).text();



  
  // console.log('dom.serialize: ', dom.serialize());
  // debugger;
  // console.log('dom.serialize: ', dom.serialize());
  // console.log(dom.window.document);

  console.log('exit');
  return modifiedDOM;
};

console.log('jQueryDomEval: *** ',jQueryDomEval(script));
