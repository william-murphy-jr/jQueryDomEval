const jsdom = require('jsdom');
const jquery = require('jquery');

const script = require('./iframeDOM');

const __DEBUG = false;
const __DEBUG_2 = false;

const jQueryDomEval = (scriptedCode) => {
  return new Promise ((resolve, reject) => {

    const script = scriptedCode.substring(
      scriptedCode.indexOf('<script>') + 8,
      scriptedCode.indexOf('</script>'),
    );
    
    __DEBUG && console.log('script:\n', script)
  
    const { JSDOM } = jsdom;
    const iFrame = new JSDOM(`<!DOCTYPE html> ${scriptedCode}`, { runScripts: "outside-only", resources: "usable" });
    const $ = jquery(iFrame.window)
    
    iFrame.window.eval(script);

    setTimeout(() => {
      const innerHTML = iFrame.window.document.head.innerHTML + "" + iFrame.window.document.body.innerHTML + "\n";
      resolve(innerHTML);
    }, 100);
  });
};

jQueryDomEval(script)
  .then((contentHTML) => { console.log('\n\n', contentHTML)});
